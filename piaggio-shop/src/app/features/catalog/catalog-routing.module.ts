import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CatalogModule } from './catalog.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleRendererService } from '../../core/services/title-renderer.service';
import { CartPageComponent } from '../cart/pages/cart-page/cart-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'page',
    component: CatalogPageComponent,
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Запчастини',
    },
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Запчастини',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
