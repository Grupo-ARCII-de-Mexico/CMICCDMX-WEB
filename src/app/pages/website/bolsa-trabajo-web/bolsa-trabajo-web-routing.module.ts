import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BolsaTrabajoWebPage } from './bolsa-trabajo-web.page';

const routes: Routes = [
  {
    path: '',
    component: BolsaTrabajoWebPage
  },
  {
    path: 'bolsa-trabajo',
    loadChildren: () => import('./bolsa-trabajo/bolsa-trabajo.module').then( m => m.BolsaTrabajoPageModule)
  },
  {
    path: 'bolsa-postulantes',
    loadChildren: () => import('./bolsa-postulantes/bolsa-postulantes.module').then( m => m.BolsaPostulantesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolsaTrabajoWebPageRoutingModule {}
