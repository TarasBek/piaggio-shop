import { createAction, props } from '@ngrx/store';

import { VehicleBrand, VehicleModel, VehicleYear } from './service-data.models';

export class ServiceDataActions {
  static readonly loadBrands = createAction('[Service Data] Load Brands');
  static readonly loadBrandsSuccess = createAction(
    '[Service Data] Load Brands Success',
    props<{ brands: VehicleBrand[] }>(),
  );
  static readonly loadBrandsFailure = createAction(
    '[Service Data] Load Brands Failure',
    props<{ error: string }>(),
  );

  static readonly selectBrand = createAction(
    '[Service Data] Select Brand',
    props<{ brandId: string | null }>(),
  );

  static readonly loadModels = createAction(
    '[Service Data] Load Models',
    props<{ brandId: string }>(),
  );
  static readonly loadModelsSuccess = createAction(
    '[Service Data] Load Models Success',
    props<{ models: VehicleModel[] }>(),
  );
  static readonly loadModelsFailure = createAction(
    '[Service Data] Load Models Failure',
    props<{ error: string }>(),
  );

  static readonly selectModel = createAction(
    '[Service Data] Select Model',
    props<{ modelId: string | null }>(),
  );

  static readonly loadYears = createAction(
    '[Service Data] Load Years',
    props<{ modelId: string }>(),
  );
  static readonly loadYearsSuccess = createAction(
    '[Service Data] Load Years Success',
    props<{ years: VehicleYear[] }>(),
  );
  static readonly loadYearsFailure = createAction(
    '[Service Data] Load Years Failure',
    props<{ error: string }>(),
  );

  static readonly selectYear = createAction(
    '[Service Data] Select Year',
    props<{ yearId: string | null }>(),
  );
}
