import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
