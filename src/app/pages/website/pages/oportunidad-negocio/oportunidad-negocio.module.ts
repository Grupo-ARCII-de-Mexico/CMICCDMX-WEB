import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OportunidadNegocioPageRoutingModule } from './oportunidad-negocio-routing.module';

import { OportunidadNegocioPage } from './oportunidad-negocio.page';
import { HeaderPageModule } from 'src/app/shared/components/header/header.module';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterWebComponent,
    HeaderWebComponent,
    OportunidadNegocioPageRoutingModule
  ],
  declarations: [OportunidadNegocioPage]
})
export class OportunidadNegocioPageModule {}
