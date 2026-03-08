import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  serviceDataFeatureKey,
  VehicleDataState,
} from './service-data.models';

export const selectServiceDataState =
  createFeatureSelector<VehicleDataState>(serviceDataFeatureKey);

export const selectBrands = createSelector(
  selectServiceDataState,
  (state) => state.brands,
);

export const selectModels = createSelector(
  selectServiceDataState,
  (state) => state.models,
);

export const selectYears = createSelector(
  selectServiceDataState,
  (state) => state.years,
);

export const selectBrandStatus = createSelector(
  selectServiceDataState,
  (state) => state.brandStatus,
);

export const selectModelStatus = createSelector(
  selectServiceDataState,
  (state) => state.modelStatus,
);

export const selectYearStatus = createSelector(
  selectServiceDataState,
  (state) => state.yearStatus,
);

export const selectBrandError = createSelector(
  selectServiceDataState,
  (state) => state.brandError,
);

export const selectModelError = createSelector(
  selectServiceDataState,
  (state) => state.modelError,
);

export const selectYearError = createSelector(
  selectServiceDataState,
  (state) => state.yearError,
);

export const selectSelectedBrandId = createSelector(
  selectServiceDataState,
  (state) => state.selectedBrandId,
);

export const selectSelectedModelId = createSelector(
  selectServiceDataState,
  (state) => state.selectedModelId,
);

export const selectSelectedYearId = createSelector(
  selectServiceDataState,
  (state) => state.selectedYearId,
);

export const selectSummary = createSelector(
  selectServiceDataState,
  (state) => ({
    brand: state.brands.find((brand) => brand.id === state.selectedBrandId) ?? null,
    model: state.models.find((model) => model.id === state.selectedModelId) ?? null,
    year: state.years.find((year) => year.id === state.selectedYearId) ?? null,
  }),
);

export const selectBrandOptions = createSelector(selectBrands, (brands) =>
  brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  })),
);
