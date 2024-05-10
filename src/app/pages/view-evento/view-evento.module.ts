import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEventoPageRoutingModule } from './view-evento-routing.module';

import { ViewEventoPage } from './view-evento.page';
import { WhatsappPageModule } from 'src/app/shared/components/whatsapp/whatsapp.module';
import { PagosPageModule } from './components/pagos/pagos.module';
import { RegistroEventoFormPageModule } from './components/registro-evento-form/registro-evento-form.module';
import { NgxEditorModule } from 'ngx-editor';
import { HeaderPageModule } from 'src/app/shared/components/header/header.module';
import { HeaderWebComponent } from '../website/componentes/header-web/header-web.component';
import { FooterWebComponent } from '../website/componentes/footer-web/footer-web.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewEventoPageRoutingModule,
    RegistroEventoFormPageModule,
    PagosPageModule,
    WhatsappPageModule,
    NgxEditorModule,
    HeaderPageModule,
    HeaderWebComponent,
    FooterWebComponent,
  ],
  declarations: [ViewEventoPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewEventoPageModule {}
