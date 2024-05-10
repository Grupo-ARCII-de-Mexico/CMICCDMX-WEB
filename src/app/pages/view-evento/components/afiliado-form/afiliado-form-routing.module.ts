import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliadoFormPage } from './afiliado-form.page';

const routes: Routes = [
  {
    path: '',
    component: AfiliadoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfiliadoFormPageRoutingModule {}
