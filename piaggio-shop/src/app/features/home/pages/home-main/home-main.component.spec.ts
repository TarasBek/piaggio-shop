/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { SelectModule } from 'primeng/select';

import { SharedModule } from '../../../../shared/shared.module';
import { selectBrandOptions, selectBrandStatus } from '../../../service/state/service-data.selectors';
import { HomeMainComponent } from './home-main.component';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainComponent],
      imports: [CommonModule, FormsModule, SelectModule, SharedModule, NoopAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBrandOptions, value: [] },
            { selector: selectBrandStatus, value: 'idle' },
          ],
        }),
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
