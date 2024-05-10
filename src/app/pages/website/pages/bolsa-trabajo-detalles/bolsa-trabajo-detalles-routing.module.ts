import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BolsaTrabajoDetallesPage } from './bolsa-trabajo-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: BolsaTrabajoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolsaTrabajoDetallesPageRoutingModule {}
