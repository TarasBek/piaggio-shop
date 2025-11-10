import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, ButtonModule, ToolbarModule,AvatarModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
