import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { VehicleBrand, VehicleModel, VehicleYear } from '../state/service-data.models';

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private readonly http: HttpClient) {}

  getBrands(): Observable<VehicleBrand[]> {
    
    return this.http.get<VehicleBrand[]>(`${this.baseUrl}/brands`);
  }

  getModels(brandId: string): Observable<VehicleModel[]> {
    const params = new HttpParams().set('brandId', brandId);
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/models`, { params });
  }

  getYears(modelId: string): Observable<VehicleYear[]> {
    const params = new HttpParams().set('modelId', modelId);
    return this.http.get<VehicleYear[]>(`${this.baseUrl}/years`, { params });
  }
}
