import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';
import { IconComponent } from './components/icon/icon.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { FallbackImageDirective } from './directives/fallback-image.directive';

@NgModule({
  declarations: [
    ProductCardComponent,
    SearchBarComponent,
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    InputComponent,
    IconComponent,
  ],
  imports: [CommonModule, ButtonModule, CarouselModule, FallbackImageDirective],
  exports: [
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    InputComponent,
    IconComponent,
    CarouselModule,
    FallbackImageDirective,
  ],
})
export class SharedModule {}
