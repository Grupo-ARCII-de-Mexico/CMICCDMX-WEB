import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletinPageRoutingModule } from './boletin-routing.module';

import { BoletinPage } from './boletin.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletinPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [BoletinPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BoletinPageModule {}
