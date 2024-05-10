import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BolsaTrabajoWebPageRoutingModule } from './bolsa-trabajo-web-routing.module';

import { BolsaTrabajoWebPage } from './bolsa-trabajo-web.page';
import { HeaderPageModule } from 'src/app/shared/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BolsaTrabajoWebPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [BolsaTrabajoWebPage]
})
export class BolsaTrabajoWebPageModule {}
