import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliatePage } from './afiliate.page';

const routes: Routes = [
  {
    path: '',
    component: AfiliatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfiliatePageRoutingModule {}
