import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEventoPage } from './view-evento.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEventoPage,
    title:'Evento | CMIC'
  },
  {
    path: 'afiliado-form',
    loadChildren: () => import('./components/afiliado-form/afiliado-form.module').then( m => m.AfiliadoFormPageModule)
  },
  {
    path: 'general-form',
    loadChildren: () => import('./components/general-form/general-form.module').then( m => m.GeneralFormPageModule)
  },
  {
    path: 'estudiante-form',
    loadChildren: () => import('./components/estudiante-form/estudiante-form.module').then( m => m.EstudianteFormPageModule)
  },
  {
    path: 'prensa-form',
    loadChildren: () => import('./components/prensa-form/prensa-form.module').then( m => m.PrensaFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEventoPageRoutingModule {}
