import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmicPage } from './cmic.page';

const routes: Routes = [
  {
    path: '',
    component: CmicPage,
  },
  {
    path: 'contacto',
    loadChildren: () => import('../contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'directorio',
    loadChildren: () => import('../directorio/directorio.module').then( m => m.DirectorioPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmicPageRoutingModule {}
