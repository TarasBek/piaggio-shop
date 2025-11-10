import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleRendererService } from '../../core/services/title-renderer.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [TitleRendererService],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Piaggio Shop — Вхід' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Piaggio Shop — Реєстрація' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
