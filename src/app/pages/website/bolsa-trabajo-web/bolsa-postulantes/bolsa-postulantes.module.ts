import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BolsaPostulantesPageRoutingModule } from './bolsa-postulantes-routing.module';

import { BolsaPostulantesPage } from './bolsa-postulantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BolsaPostulantesPageRoutingModule
  ],
  declarations: [BolsaPostulantesPage]
})
export class BolsaPostulantesPageModule {}
