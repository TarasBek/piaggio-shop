import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { BookingComponent } from './pages/booking/booking.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ServiceListComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule
  ]
})
export class ServiceModule { }
