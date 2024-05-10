import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OportunidadNegocioPageRoutingModule } from './oportunidad-negocio-routing.module';

import { OportunidadNegocioPage } from './oportunidad-negocio.page';
import { HeaderPageModule } from 'src/app/shared/components/header/header.module';
import { ContactoNegocioComponent } from './forms/contacto-negocio/contacto-negocio.component';
import { NegocioComponent } from './forms/negocio/negocio.component';
import { ConvocatoriaComponent } from './forms/convocatoria/convocatoria.component';
import { HeaderWebComponent } from '../website/componentes/header-web/header-web.component';
import { FooterWebComponent } from '../website/componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OportunidadNegocioPageRoutingModule,
    HeaderPageModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [OportunidadNegocioPage,ContactoNegocioComponent,NegocioComponent,ConvocatoriaComponent]
})
export class OportunidadNegocioPageModule {}
