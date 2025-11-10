import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { FallbackImageDirective } from './directives/fallback-image.directive';

@NgModule({
  declarations: [ProductCardComponent, SearchBarComponent, ButtonComponent],
  imports: [CommonModule, ButtonModule, CarouselModule, FallbackImageDirective],
  exports: [ButtonComponent, CarouselModule, FallbackImageDirective],
})
export class SharedModule {}
