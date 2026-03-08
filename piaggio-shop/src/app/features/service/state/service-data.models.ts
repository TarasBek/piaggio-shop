export interface VehicleBrand {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface VehicleModel {
  id: string;
  name: string;
  brandId: string;
}

export interface VehicleYear {
  id: string;
  modelId: string;
  year: number;
}

export type LoadState = 'idle' | 'loading' | 'success' | 'error';

export interface VehicleDataState {
  brands: VehicleBrand[];
  models: VehicleModel[];
  years: VehicleYear[];
  brandStatus: LoadState;
  modelStatus: LoadState;
  yearStatus: LoadState;
  brandError: string | null;
  modelError: string | null;
  yearError: string | null;
  selectedBrandId: string | null;
  selectedModelId: string | null;
  selectedYearId: string | null;
}

export const serviceDataFeatureKey = 'serviceData';
