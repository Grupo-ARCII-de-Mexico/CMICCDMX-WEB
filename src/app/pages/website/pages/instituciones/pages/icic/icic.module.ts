import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IcicPageRoutingModule } from './icic-routing.module';

import { IcicPage } from './icic.page';
import { HeaderWebComponent } from 'src/app/pages/website/componentes/header-web/header-web.component';
import { FooterWebComponent } from 'src/app/pages/website/componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IcicPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [IcicPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class IcicPageModule {}
