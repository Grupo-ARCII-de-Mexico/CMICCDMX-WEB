import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BolsaTrabajoPageRoutingModule } from './bolsa-trabajo-routing.module';

import { BolsaTrabajoPage } from './bolsa-trabajo.page';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BolsaTrabajoPageRoutingModule,
    FooterWebComponent,
    HeaderWebComponent,
    ReactiveFormsModule
  ],
  declarations: [BolsaTrabajoPage]
})
export class BolsaTrabajoPageModule {}
