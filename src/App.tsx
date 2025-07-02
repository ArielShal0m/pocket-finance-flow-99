
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlanProvider } from "@/contexts/PlanContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import FreeDashboard from "./pages/FreeDashboard";
import BronzeDashboard from "./pages/BronzeDashboard";
import SilverDashboard from "./pages/SilverDashboard";
import GoldDashboard from "./pages/GoldDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useOnlineStatus();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PlanProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/free" element={
                <ProtectedRoute>
                  <FreeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/bronze" element={
                <ProtectedRoute>
                  <BronzeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/silver" element={
                <ProtectedRoute>
                  <SilverDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/gold" element={
                <ProtectedRoute>
                  <GoldDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PlanProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
