import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
