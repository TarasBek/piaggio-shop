import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

import { ServiceApiService } from '../data-access/service-api.service';
import { ServiceDataActions } from './service-data.actions';

@Injectable()
export class ServiceDataEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(ServiceApiService);

  readonly loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceDataActions.loadBrands),
      switchMap(() =>
        this.api.getBrands().pipe(
          tap((x)=>console.log(x)),
          map((brands) => ServiceDataActions.loadBrandsSuccess({ brands })),
          catchError((error) =>
            of(
              ServiceDataActions.loadBrandsFailure({
                error: this.formatError(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceDataActions.loadModels),
      switchMap(({ brandId }) =>
        this.api.getModels(brandId).pipe(
          map((models) => ServiceDataActions.loadModelsSuccess({ models })),
          catchError((error) =>
            of(
              ServiceDataActions.loadModelsFailure({
                error: this.formatError(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly loadYears$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceDataActions.loadYears),
      switchMap(({ modelId }) =>
        this.api.getYears(modelId).pipe(
          map((years) => ServiceDataActions.loadYearsSuccess({ years })),
          catchError((error) =>
            of(
              ServiceDataActions.loadYearsFailure({
                error: this.formatError(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly selectBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceDataActions.selectBrand),
      filter(({ brandId }) => !!brandId),
      map(({ brandId }) => ServiceDataActions.loadModels({ brandId: brandId! })),
    ),
  );

  readonly selectModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceDataActions.selectModel),
      filter(({ modelId }) => !!modelId),
      map(({ modelId }) => ServiceDataActions.loadYears({ modelId: modelId! })),
    ),
  );

  private formatError(error: unknown): string {
    if (!error) {
      return 'Unknown error';
    }

    if (typeof error === 'string') {
      return error;
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'object' && 'message' in (error as Record<string, unknown>)) {
      const maybeMessage = (error as { message?: unknown }).message;
      if (typeof maybeMessage === 'string') {
        return maybeMessage;
      }
    }

    return 'Unable to process request';
  }
}
