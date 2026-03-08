import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { ServiceDataActions } from '../../state/service-data.actions';
import {
  LoadState,
  VehicleBrand,
  VehicleModel,
  VehicleYear,
} from '../../state/service-data.models';
import {
  selectBrandError,
  selectBrandStatus,
  selectBrands,
  selectModelError,
  selectModelStatus,
  selectModels,
  selectSelectedBrandId,
  selectSelectedModelId,
  selectSelectedYearId,
  selectSummary,
  selectYearError,
  selectYearStatus,
  selectYears,
} from '../../state/service-data.selectors';

@Component({
  selector: 'app-service-list',
  standalone: false,
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly brands$: Observable<VehicleBrand[]> = this.store.select(selectBrands);
  readonly models$: Observable<VehicleModel[]> = this.store.select(selectModels);
  readonly years$: Observable<VehicleYear[]> = this.store.select(selectYears);

  readonly brandStatus$: Observable<LoadState> =
    this.store.select(selectBrandStatus);
  readonly modelStatus$: Observable<LoadState> =
    this.store.select(selectModelStatus);
  readonly yearStatus$: Observable<LoadState> =
    this.store.select(selectYearStatus);

  readonly brandError$ = this.store.select(selectBrandError);
  readonly modelError$ = this.store.select(selectModelError);
  readonly yearError$ = this.store.select(selectYearError);

  readonly selectedBrandId$ = this.store.select(selectSelectedBrandId);
  readonly selectedModelId$ = this.store.select(selectSelectedModelId);
  readonly selectedYearId$ = this.store.select(selectSelectedYearId);

  readonly summary$ = this.store.select(selectSummary);

  ngOnInit(): void {
    this.store.select(selectBrandStatus).pipe(take(1)).subscribe((status) => {
      if (status === 'idle' || status === 'error') {
        this.store.dispatch(ServiceDataActions.loadBrands());
      }
    });
  }

  onBrandChange(brandId: string): void {
    this.store.dispatch(
      ServiceDataActions.selectBrand({ brandId: brandId || null }),
    );
  }

  onModelChange(modelId: string): void {
    this.store.dispatch(
      ServiceDataActions.selectModel({ modelId: modelId || null }),
    );
  }

  onYearChange(yearId: string): void {
    this.store.dispatch(
      ServiceDataActions.selectYear({ yearId: yearId || null }),
    );
  }

  reloadBrands(): void {
    this.store.dispatch(ServiceDataActions.loadBrands());
  }

  trackById = (_: number, item: { id: string | number }) => item.id;
}
