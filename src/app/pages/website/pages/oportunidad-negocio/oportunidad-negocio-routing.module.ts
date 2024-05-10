import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OportunidadNegocioPage } from './oportunidad-negocio.page';

const routes: Routes = [
  {
    path: '',
    component: OportunidadNegocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OportunidadNegocioPageRoutingModule {}
