import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BookingComponent } from './pages/booking/booking.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { ServiceRoutingModule } from './service-routing.module';


@NgModule({
  declarations: [
    ServiceListComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ServiceRoutingModule,
    SharedModule,
  ]
})
export class ServiceModule { }
