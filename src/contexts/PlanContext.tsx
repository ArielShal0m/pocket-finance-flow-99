
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export type PlanType = 'bronze' | 'silver' | 'gold';

interface PlanContextType {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => Promise<void>;
  canUpgrade: boolean;
  getUpgradeOption: () => PlanType | null;
  loading: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider = ({ children }: PlanProviderProps) => {
  const { profile, upgradePlan, loading } = useAuth();
  
  const currentPlan = profile?.current_plan || 'bronze';
  const canUpgrade = currentPlan !== 'gold';

  const getUpgradeOption = (): PlanType | null => {
    switch (currentPlan) {
      case 'bronze':
        return 'silver';
      case 'silver':
        return 'gold';
      case 'gold':
        return null;
      default:
        return null;
    }
  };

  const setCurrentPlan = async (plan: PlanType) => {
    const { error } = await upgradePlan(plan);
    if (error) {
      console.error('Error upgrading plan:', error);
      throw error;
    }
  };

  return (
    <PlanContext.Provider value={{
      currentPlan,
      setCurrentPlan,
      canUpgrade,
      getUpgradeOption,
      loading
    }}>
      {children}
    </PlanContext.Provider>
  );
};
