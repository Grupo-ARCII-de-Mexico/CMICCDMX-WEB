import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmicPageRoutingModule } from './cmic-routing.module';

import { CmicPage } from './cmic.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmicPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [CmicPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CmicPageModule {}
