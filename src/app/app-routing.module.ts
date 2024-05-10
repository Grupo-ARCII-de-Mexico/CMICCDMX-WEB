import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'website',
    loadChildren: () => import('./pages/website/website.module').then( m => m.WebsitePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'evento/:identificador',
    loadChildren: () => import('./pages/view-evento/view-evento.module').then( m => m.ViewEventoPageModule)
  },
  {
    path: 'registro/:identificador',
    loadChildren: () => import('./pages/view-evento/components/registro-evento-form/registro-evento-form.module').then( m => m.RegistroEventoFormPageModule)
  },
  {
    path: 'evento/:identificador',
    loadChildren: () => import('./pages/view-evento/view-evento.module').then( m => m.ViewEventoPageModule)
  },
  {
    path: 'oportunidad-negocio/:id',
    loadChildren: () => import('./pages/oportunidad-negocio/oportunidad-negocio.module').then( m => m.OportunidadNegocioPageModule)
  },
  {
    path: '',
    redirectTo: 'website',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'website',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
