import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  VehicleBrand,
  VehicleCategory,
  VehicleModel,
  VehicleYear,
} from '../state/service-data.models';

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private readonly http: HttpClient) {}

  getBrands(): Observable<VehicleBrand[]> {
    return this.http.get<unknown>(`${this.baseUrl}/brands`).pipe(
      map((response) => this.normalizeBrands(response)),
      catchError(() =>
        this.http
          .get<unknown>(`${this.baseUrl}/brands`)
          .pipe(map((response) => this.normalizeBrands(response))),
      ),
    );
  }

  getModels(brandId: string): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(
      `${this.baseUrl}/brands/${brandId}/models`,
    );
  }

  getCcs(modelId: string): Observable<string[]> {
    return this.http
      .get<unknown>(`${this.baseUrl}/models/${modelId}/cc`)
      .pipe(
      map((response) => this.normalizeStringOptions(response, ['cc', 'capacity', 'name', 'label', 'value'])),
    );
  }
  getYears(modelId: string, cc: number): Observable<VehicleYear[]> {
    console.log(`Fetching years for model ${modelId} with cc ${cc}`);
    return this.http
      .get<unknown>(`${this.baseUrl}/years/${modelId}/models/${cc}/cc`)
      .pipe(map((response) => this.normalizeYears(response, modelId)));
  }


  getCategories(modelId: string, yearId?: string | null): Observable<VehicleCategory[]> {
    const query = this.buildYearQuery(yearId);
    const genericQuery = this.buildCategoryQuery(modelId, yearId);
    const urls = [
      `${this.baseUrl}/models/${modelId}/categories${query}`,
      `${this.baseUrl}/categories/models/${modelId}${query}`,
      `${this.baseUrl}/categories/${modelId}/models${query}`,
      `${this.baseUrl}/categories${genericQuery}`,
    ];

    return this.requestWithFallback(urls).pipe(
      map((response) => this.normalizeCategories(response)),
    );
  }

  getFrameTypes(
    brandId: string,
    modelId: string,
    year: number,
    cc?: string | number | null,
  ): Observable<string[]> {
    return this.http
      .get<unknown>(
        `${this.baseUrl}/brands/${brandId}/models/${modelId}/cc/${cc}/years/${year}/types`,
      )
      .pipe(map((response) => this.normalizeFrameTypes(response)));
  }

  private normalizeBrands(response: unknown): VehicleBrand[] {
    const items = this.extractItems(response);
    const normalized: VehicleBrand[] = [];
    for (const item of items) {
      const id = this.pickString(item, ['id', 'brandId', 'value']);
      const name = this.pickString(item, [
        'name',
        'brandName',
        'label',
        'title',
      ]);
      const logoUrl = this.pickString(item, ['logoUrl', 'logo', 'imageUrl']);
      if (!id || !name) {
        continue;
      }
      normalized.push({ id, name, logoUrl: logoUrl || undefined });
    }
    return normalized;
  }

  private normalizeCategories(response: unknown): VehicleCategory[] {
    const items = this.extractItems(response);
    const normalized: VehicleCategory[] = [];

    for (const item of items) {
      const id = this.pickString(item, ['id', 'categoryId', 'value']);
      const name = this.pickString(item, [
        'name',
        'title',
        'label',
        'categoryName',
      ]);
      if (!id || !name) {
        continue;
      }

      normalized.push({
        id,
        name,
        imageUrl: this.pickString(item, ['imageUrl', 'image', 'thumbnailUrl', 'diagramUrl']) || undefined,
        description: this.pickString(item, ['description', 'subtitle', 'details']) || undefined,
      });
    }

    return normalized;
  }

  private normalizeFrameTypes(response: unknown): string[] {
    const direct = this.normalizeStringOptions(response, [
      'type',
      'frame',
      'frameNumber',
      'name',
      'label',
      'value',
    ]);
    if (direct.length) {
      return direct;
    }

    if (typeof response !== 'object' || !response) {
      return [];
    }

    const envelope = response as Record<string, unknown>;
    const items = envelope['types'] ?? envelope['items'] ?? envelope['data'];
    if (Array.isArray(items)) {
      return this.normalizeFrameTypes(items);
    }

    return [];
  }

  private normalizeStringOptions(response: unknown, keys: string[]): string[] {
    if (!Array.isArray(response)) {
      return [];
    }

    return response
      .map((item) => {
        if (typeof item === 'string') {
          return item.trim();
        }
        if (typeof item === 'number') {
          return String(item);
        }
        if (typeof item === 'object' && item) {
          return this.pickString(item as Record<string, unknown>, keys);
        }
        return null;
      })
      .filter((x): x is string => !!x);
  }

  private buildCategoryQuery(modelId: string, yearId?: string | null): string {
    const params = new URLSearchParams();
    params.set('modelId', modelId);
    if (yearId) {
      params.set('yearId', yearId);
    }
    const query = params.toString();
    return query ? `?${query}` : '';
  }

  private buildYearQuery(yearId?: string | null): string {
    if (!yearId) {
      return '';
    }
    return `?yearId=${encodeURIComponent(yearId)}`;
  }

  private requestWithFallback(urls: string[]): Observable<unknown> {
    if (!urls.length) {
      return throwError(() => new Error('No endpoint configured'));
    }

    const [url, ...rest] = urls;
    return this.http.get<unknown>(url).pipe(
      catchError((error) => {
        if (!rest.length) {
          return throwError(() => error);
        }
        return this.requestWithFallback(rest);
      }),
    );
  }

  private extractItems(response: unknown): Record<string, unknown>[] {
    if (Array.isArray(response)) {
      return response.filter(
        (x): x is Record<string, unknown> => typeof x === 'object' && !!x,
      );
    }

    if (typeof response !== 'object' || !response) {
      return [];
    }

    const envelope = response as Record<string, unknown>;
    const candidates = ['items', 'data', 'result', 'results', 'brands', 'categories'];
    for (const key of candidates) {
      const value = envelope[key];
      if (Array.isArray(value)) {
        return value.filter(
          (x): x is Record<string, unknown> => typeof x === 'object' && !!x,
        );
      }
    }

    return [];
  }

  private pickString(
    item: Record<string, unknown>,
    keys: string[],
  ): string | null {
    for (const key of keys) {
      const value = item[key];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
      if (typeof value === 'number') {
        return String(value);
      }
    }
    return null;
  }

  private normalizeYears(response: unknown, modelId: string): VehicleYear[] {
    if (Array.isArray(response)) {
      return response
        .map((item) => this.toVehicleYear(item, modelId))
        .filter((item): item is VehicleYear => !!item);
    }

    if (typeof response !== 'object' || !response) {
      return [];
    }

    const payload = response as Record<string, unknown>;
    const productionFrom = this.pickNumber(payload, ['productionFrom']);
    const productionTo =
      this.pickNumber(payload, ['productionTo']) ?? productionFrom;

    if (!productionFrom || !productionTo) {
      return [];
    }

    const from = Math.min(productionFrom, productionTo);
    const to = Math.max(productionFrom, productionTo);
    const years: VehicleYear[] = [];
    for (let year = to; year >= from; year--) {
      years.push({
        id: `${modelId}-${year}`,
        modelId,
        year,
      });
    }
    return years;
  }

  private toVehicleYear(item: unknown, fallbackModelId: string): VehicleYear | null {
    if (typeof item === 'number') {
      return {
        id: `${fallbackModelId}-${item}`,
        modelId: fallbackModelId,
        year: item,
      };
    }

    if (typeof item !== 'object' || !item) {
      return null;
    }

    const entry = item as Record<string, unknown>;
    const year = this.pickNumber(entry, ['year']);
    if (!year) {
      return null;
    }

    const modelId =
      this.pickString(entry, ['modelId']) ?? fallbackModelId;
    return {
      id: this.pickString(entry, ['id']) ?? `${modelId}-${year}`,
      modelId,
      year,
    };
  }

  private pickNumber(
    item: Record<string, unknown>,
    keys: string[],
  ): number | null {
    for (const key of keys) {
      const value = item[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
      if (typeof value === 'string' && value.trim()) {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
          return parsed;
        }
      }
    }
    return null;
  }
}
