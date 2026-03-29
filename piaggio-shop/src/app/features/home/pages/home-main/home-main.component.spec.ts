/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { of } from 'rxjs';

import { SharedModule } from '../../../../shared/shared.module';
import { ServiceApiService } from '../../../service/data-access/service-api.service';
import { HomeMainComponent } from './home-main.component';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainComponent],
      imports: [CommonModule, FormsModule, SelectModule, SharedModule, NoopAnimationsModule],
      providers: [
        {
          provide: ServiceApiService,
          useValue: {
            getBrands: () => of([]),
            getModels: () => of([]),
            getCcs: () => of([]),
            getYears: () => of([]),
            getFrameTypes: () => of([]),
            getCategories: () => of([]),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
