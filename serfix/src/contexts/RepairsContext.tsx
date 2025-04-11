import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RepairRequest, NewRepairFormData, RepairStatus } from '../types/repair';

interface RepairsContextType {
  repairs: RepairRequest[];
  addRepair: (newRepairData: NewRepairFormData) => string; // Retorna el ID generado
  getRepairs: () => RepairRequest[];
  getRepairById: (id: string) => RepairRequest | undefined;
  updateRepairStatus: (id: string, newStatus: RepairStatus) => boolean;
  updateRepair: (updatedRepair: RepairRequest) => boolean;
  isLoading: boolean;
}

const RepairsContext = createContext<RepairsContextType | undefined>(undefined);

export const useRepairs = (): RepairsContextType => {
  const context = useContext(RepairsContext);
  if (!context) {
    throw new Error('useRepairs debe ser usado dentro de un RepairsProvider');
  }
  return context;
};

interface RepairsProviderProps {
  children: ReactNode;
}

export const RepairsProvider = ({ children }: RepairsProviderProps) => {
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar reparaciones desde localStorage al iniciar
  useEffect(() => {
    const storedRepairs = localStorage.getItem('repairs_data');
    if (storedRepairs) {
      try {
        setRepairs(JSON.parse(storedRepairs));
      } catch (error) {
        console.error('Error al parsear las reparaciones almacenadas:', error);
        localStorage.removeItem('repairs_data');
      }
    }
    setIsLoading(false);
  }, []);

  // Persistir reparaciones en localStorage cuando cambian
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('repairs_data', JSON.stringify(repairs));
    }
  }, [repairs, isLoading]);

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  };

  const addRepair = (newRepairData: NewRepairFormData): string => {
    const id = generateId();
    
    const newRepair: RepairRequest = {
      ...newRepairData,
      id,
      entryDate: new Date().toISOString(),
      status: 'pendiente',
    };
    
    setRepairs(prevRepairs => [...prevRepairs, newRepair]);
    return id;
  };

  const getRepairs = (): RepairRequest[] => {
    return [...repairs].sort((a, b) => 
      new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );
  };

  const getRepairById = (id: string): RepairRequest | undefined => {
    return repairs.find(repair => repair.id === id);
  };

  const updateRepairStatus = (id: string, newStatus: RepairStatus): boolean => {
    const repairIndex = repairs.findIndex(repair => repair.id === id);
    
    if (repairIndex === -1) return false;
    
    const updatedRepairs = [...repairs];
    updatedRepairs[repairIndex] = {
      ...updatedRepairs[repairIndex],
      status: newStatus,
      ...(newStatus === 'completada' ? { completionDate: new Date().toISOString() } : {})
    };
    
    setRepairs(updatedRepairs);
    return true;
  };

  const updateRepair = (updatedRepair: RepairRequest): boolean => {
    const repairIndex = repairs.findIndex(repair => repair.id === updatedRepair.id);
    
    if (repairIndex === -1) return false;
    
    const updatedRepairs = [...repairs];
    updatedRepairs[repairIndex] = updatedRepair;
    
    setRepairs(updatedRepairs);
    return true;
  };

  return (
    <RepairsContext.Provider 
      value={{ 
        repairs, 
        addRepair, 
        getRepairs, 
        getRepairById, 
        updateRepairStatus, 
        updateRepair, 
        isLoading 
      }}
    >
      {children}
    </RepairsContext.Provider>
  );
};

export default RepairsContext; 