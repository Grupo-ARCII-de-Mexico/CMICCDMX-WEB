import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [

      {
        path: 'bolsa-trabajo',
        loadChildren: () => import('./bolsa-trabajo/bolsa-trabajo.module').then( m => m.BolsaTrabajoPageModule),
        title: 'MODULO DE BOLSA DE TRABAJO | CRM | CMIC CDMX'
      },

      {
        path: 'licitaciones',
        loadChildren: () => import('../website/pages/licitaciones/ver/ver.module').then( m => m.VerPageModule),
        title: 'MODULO DE LICITACIONES | CRM | CMIC CDMX'
      },
      {
        path: 'postulantes',
        loadChildren: () => import('./postulantes/postulantes.module').then( m => m.PostulantesPageModule),
        title: 'MODULO DE POSTULANTES | CRM | CMIC CDMX'
      },
      {
        path: '**',
        redirectTo: 'licitaciones',
      },
     
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
