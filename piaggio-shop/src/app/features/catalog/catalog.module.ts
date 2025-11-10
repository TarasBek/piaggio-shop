import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CatalogPageComponent, ProductDetailComponent],
  imports: [CommonModule, FormsModule, SharedModule, CatalogRoutingModule],
})
export class CatalogModule {}
