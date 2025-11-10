import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

import { HomeRoutingModule } from './home-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeMainComponent } from './pages/home-main/home-main.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent, HomeMainComponent],
  imports: [CommonModule, FormsModule, SelectModule, HomeRoutingModule,  SharedModule],
})
export class HomeModule {}
