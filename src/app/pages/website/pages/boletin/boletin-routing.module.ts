import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletinPage } from './boletin.page';

const routes: Routes = [
  {
    path: '',
    component: BoletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletinPageRoutingModule {}
