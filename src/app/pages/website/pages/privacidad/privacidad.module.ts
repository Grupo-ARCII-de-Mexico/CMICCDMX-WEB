import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacidadPageRoutingModule } from './privacidad-routing.module';

import { PrivacidadPage } from './privacidad.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderWebComponent,
    FooterWebComponent,
    PrivacidadPageRoutingModule
  ],
  declarations: [PrivacidadPage]
})
export class PrivacidadPageModule {}
