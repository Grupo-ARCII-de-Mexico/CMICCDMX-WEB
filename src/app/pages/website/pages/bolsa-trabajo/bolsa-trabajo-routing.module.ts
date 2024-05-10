import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BolsaTrabajoPage } from './bolsa-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: BolsaTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolsaTrabajoPageRoutingModule {}
