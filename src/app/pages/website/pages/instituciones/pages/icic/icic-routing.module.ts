import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IcicPage } from './icic.page';

const routes: Routes = [
  {
    path: '',
    component: IcicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IcicPageRoutingModule {}
