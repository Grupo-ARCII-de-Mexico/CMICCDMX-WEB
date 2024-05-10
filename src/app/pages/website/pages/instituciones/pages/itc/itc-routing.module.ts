import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItcPage } from './itc.page';

const routes: Routes = [
  {
    path: '',
    component: ItcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItcPageRoutingModule {}
