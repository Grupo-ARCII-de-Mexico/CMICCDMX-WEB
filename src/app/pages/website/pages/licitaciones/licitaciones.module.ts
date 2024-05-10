import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitacionesPageRoutingModule } from './licitaciones-routing.module';

import { LicitacionesPage } from './licitaciones.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacionesPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [LicitacionesPage]
})
export class LicitacionesPageModule {}
