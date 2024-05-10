import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEventoFormPage } from './registro-evento-form.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEventoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEventoFormPageRoutingModule {}
