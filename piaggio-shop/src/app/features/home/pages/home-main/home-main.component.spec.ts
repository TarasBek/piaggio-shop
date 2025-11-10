/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'primeng/select';
import { HomeMainComponent } from './home-main.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainComponent],
      imports: [CommonModule, FormsModule, SelectModule, SharedModule, NoopAnimationsModule],
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
