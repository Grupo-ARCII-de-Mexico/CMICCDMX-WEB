import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FicPage } from './fic.page';

const routes: Routes = [
  {
    path: '',
    component: FicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FicPageRoutingModule {}
