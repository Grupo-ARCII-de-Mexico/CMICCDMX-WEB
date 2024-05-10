import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoPageRoutingModule } from './contacto-routing.module';

import { ContactoPage } from './contacto.page';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoPageRoutingModule,
    FooterWebComponent,
    HeaderWebComponent
  ],
  declarations: [ContactoPage]
})
export class ContactoPageModule {}
