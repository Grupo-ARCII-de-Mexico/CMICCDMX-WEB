import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstitucionesPageRoutingModule } from './instituciones-routing.module';

import { InstitucionesPage } from './instituciones.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderWebComponent,
    FooterWebComponent,
    IonicModule,
    InstitucionesPageRoutingModule
  ],
  declarations: [InstitucionesPage]
})
export class InstitucionesPageModule {}
