
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use service role key to bypass RLS for updates
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating to free plan");
      await supabaseClient.from("profiles").update({
        current_plan: 'free',
        plan_started_at: null,
        updated_at: new Date().toISOString(),
      }).eq('id', user.id);
      
      return new Response(JSON.stringify({ 
        subscribed: false, 
        current_plan: 'free' 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    const hasActiveSub = subscriptions.data.length > 0;
    let currentPlan = 'free';

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      const productId = subscription.items.data[0].price.product as string;
      
      // Map product IDs to plan names
      switch (productId) {
        case 'prod_SbhzvjlMGFqb7M':
          currentPlan = 'bronze';
          break;
        case 'prod_Sbi3aWwuokUxJV':
          currentPlan = 'silver';
          break;
        case 'prod_Sbi44iGeJS1Qxf':
          currentPlan = 'gold';
          break;
        default:
          currentPlan = 'free';
      }
      
      logStep("Active subscription found", { 
        subscriptionId: subscription.id, 
        productId,
        currentPlan 
      });
    } else {
      logStep("No active subscription found");
    }

    // Update user profile with current plan
    await supabaseClient.from("profiles").update({
      current_plan: currentPlan,
      plan_started_at: hasActiveSub ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id);

    logStep("Updated profile with plan", { currentPlan, hasActiveSub });
    
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      current_plan: currentPlan
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
