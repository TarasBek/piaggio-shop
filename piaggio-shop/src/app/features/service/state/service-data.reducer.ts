import { createReducer, on } from '@ngrx/store';

import { ServiceDataActions } from './service-data.actions';
import { LoadState, VehicleDataState } from './service-data.models';

const idle: LoadState = 'idle';

export const initialState: VehicleDataState = {
  brands: [],
  models: [],
  years: [],
  brandStatus: idle,
  modelStatus: idle,
  yearStatus: idle,
  brandError: null,
  modelError: null,
  yearError: null,
  selectedBrandId: null,
  selectedModelId: null,
  selectedYearId: null,
};

export const serviceDataReducer = createReducer(
  initialState,
  on(ServiceDataActions.loadBrands, (state) => ({
    ...state,
    brandStatus: 'loading',
    brandError: null,
  })),
  on(ServiceDataActions.loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands,
    brandStatus: 'success',
  })),
  on(ServiceDataActions.loadBrandsFailure, (state, { error }) => ({
    ...state,
    brandStatus: 'error',
    brandError: error,
  })),
  on(ServiceDataActions.selectBrand, (state, { brandId }) => ({
    ...state,
    selectedBrandId: brandId,
    selectedModelId: null,
    selectedYearId: null,
    models: [],
    years: [],
    modelStatus: idle,
    yearStatus: idle,
    modelError: null,
    yearError: null,
  })),
  on(ServiceDataActions.loadModels, (state) => ({
    ...state,
    modelStatus: 'loading',
    modelError: null,
    models: [],
    years: [],
    selectedModelId: null,
    selectedYearId: null,
  })),
  on(ServiceDataActions.loadModelsSuccess, (state, { models }) => ({
    ...state,
    modelStatus: 'success',
    models,
  })),
  on(ServiceDataActions.loadModelsFailure, (state, { error }) => ({
    ...state,
    modelStatus: 'error',
    modelError: error,
  })),
  on(ServiceDataActions.selectModel, (state, { modelId }) => ({
    ...state,
    selectedModelId: modelId,
    selectedYearId: null,
    years: [],
    yearStatus: idle,
    yearError: null,
  })),
  on(ServiceDataActions.loadYears, (state) => ({
    ...state,
    yearStatus: 'loading',
    yearError: null,
    years: [],
    selectedYearId: null,
  })),
  on(ServiceDataActions.loadYearsSuccess, (state, { years }) => ({
    ...state,
    yearStatus: 'success',
    years,
  })),
  on(ServiceDataActions.loadYearsFailure, (state, { error }) => ({
    ...state,
    yearStatus: 'error',
    yearError: error,
  })),
  on(ServiceDataActions.selectYear, (state, { yearId }) => ({
    ...state,
    selectedYearId: yearId,
  })),
);
