import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteFormPage } from './estudiante-form.page';

const routes: Routes = [
  {
    path: '',
    component: EstudianteFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteFormPageRoutingModule {}
