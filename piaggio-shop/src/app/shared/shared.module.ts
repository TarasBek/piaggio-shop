import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { Button, ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ProductCardComponent,
    SearchBarComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports:[
    ButtonComponent
  ]
})
export class SharedModule { }
