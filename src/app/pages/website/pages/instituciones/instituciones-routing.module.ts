import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitucionesPage } from './instituciones.page';

const routes: Routes = [
  {
    path: '',
    component: InstitucionesPage
  },
  {
    path: 'icic',
    loadChildren: () => import('./pages/icic/icic.module').then( m => m.IcicPageModule)
  },
  {
    path: 'itc',
    loadChildren: () => import('./pages/itc/itc.module').then( m => m.ItcPageModule)
  },
  {
    path: 'fic',
    loadChildren: () => import('./pages/fic/fic.module').then( m => m.FicPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitucionesPageRoutingModule {}
