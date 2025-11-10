import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatalogPageComponent } from './catalog-page.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogPageComponent],
      imports: [CommonModule, FormsModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
