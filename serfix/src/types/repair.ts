export type RepairStatus = 'pendiente' | 'en_progreso' | 'completada' | 'cancelada';

export type DeviceType = 'smartphone' | 'tablet' | 'computadora' | 'televisor' | 'electrodoméstico' | 'otro';

export interface RepairRequest {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  deviceType: DeviceType;
  brand?: string;
  model?: string;
  problemDescription: string;
  entryDate: string;
  status: RepairStatus;
  estimatedCost?: number;
  completionDate?: string;
  notes?: string;
}

export interface NewRepairFormData {
  clientName: string;
  email: string;
  phone?: string;
  deviceType: DeviceType;
  brand?: string;
  model?: string;
  problemDescription: string;
  estimatedCost?: number;
  notes?: string;
} 