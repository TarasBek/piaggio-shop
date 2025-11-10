import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHasRoleGuard } from './core/guards/user-has-role.guard';
import { TitleRendererService } from './core/services/title-renderer.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Parts',
    },
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Catalog',
    },
  },
  {
    path: 'service',
    loadChildren: () =>
      import('./features/service/service.module').then((m) => m.ServiceModule),
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Piaggio Shop — Service',
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Sign In',
    },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [UserHasRoleGuard],
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Admin Panel',
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./features/blog/blog.module').then((m) => m.BlogModule),
    canActivateChild: [TitleRendererService],
    data: {
      title: 'Blog',
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
