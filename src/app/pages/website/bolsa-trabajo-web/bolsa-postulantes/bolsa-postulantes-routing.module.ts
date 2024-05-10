import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BolsaPostulantesPage } from './bolsa-postulantes.page';

const routes: Routes = [
  {
    path: '',
    component: BolsaPostulantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolsaPostulantesPageRoutingModule {}
