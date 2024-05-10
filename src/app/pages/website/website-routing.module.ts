import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsitePage } from './website.page';

const routes: Routes = [
  {
    path: '',
    component: WebsitePage,
    children:[
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
      },
      {
        path: 'instituciones',
        loadChildren: () => import('./pages/instituciones/instituciones.module').then( m => m.InstitucionesPageModule)
      },
      {
        path: 'cmic',
        loadChildren: () => import('./pages/cmic/cmic.module').then( m => m.CmicPageModule)
      },
      {
        path: 'afiliate',
        loadChildren: () => import('./pages/afiliate/afiliate.module').then( m => m.AfiliatePageModule)
      },
      {
        path: 'oportunidad-negocio',
        loadChildren: () => import('./pages/oportunidad-negocio/oportunidad-negocio.module').then( m => m.OportunidadNegocioPageModule)
      },
      {
        path: 'licitaciones',
        loadChildren: () => import('./pages/licitaciones/licitaciones.module').then( m => m.LicitacionesPageModule)
      },
      {
        path: 'privacidad',
        loadChildren: () => import('./pages/privacidad/privacidad.module').then( m => m.PrivacidadPageModule)
      },
      {
        path: 'boletin/:identificador',
        loadChildren: () => import('./pages/boletin/boletin.module').then( m => m.BoletinPageModule)
      },
      {
        path: 'bolsa-trabajo',
        loadChildren: () => import('./pages/bolsa-trabajo/bolsa-trabajo.module').then( m => m.BolsaTrabajoPageModule)
      },
      {
        path: 'bolsa-trabajo/:identificador',
        loadChildren: () => import('./pages/bolsa-trabajo-detalles/bolsa-trabajo-detalles.module').then( m => m.BolsaTrabajoDetallesPageModule)
      },
      {
        path: 'foros',
        loadChildren: () => import('./pages/foros/foros.module').then( m => m.ForosPageModule)
      },
    
    ]
  },

 










];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsitePageRoutingModule {}
