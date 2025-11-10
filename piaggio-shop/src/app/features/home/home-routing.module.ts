import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TitleRendererService } from '../../core/services/title-renderer.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Parts',
    },
  },
  // {
  //   path: 'product-detail',
  //   component: ProductDetailComponent,
  //   canActivateChild: [TitleRendererService],
  //   data: {
  //     title: 'Piaggio Shop — Parts',
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
