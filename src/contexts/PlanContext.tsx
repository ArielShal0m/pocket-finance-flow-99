
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PlanType = 'bronze' | 'silver' | 'gold';

interface PlanContextType {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => void;
  canUpgrade: boolean;
  getUpgradeOption: () => PlanType | null;
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
  const [currentPlan, setCurrentPlan] = useState<PlanType>('bronze');

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

  return (
    <PlanContext.Provider value={{
      currentPlan,
      setCurrentPlan,
      canUpgrade,
      getUpgradeOption
    }}>
      {children}
    </PlanContext.Provider>
  );
};
