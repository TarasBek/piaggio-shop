import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleRendererService } from '../../core/services/title-renderer.service';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent,
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Parts',
    },
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Parts',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
