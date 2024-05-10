import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItcPageRoutingModule } from './itc-routing.module';

import { ItcPage } from './itc.page';
import { FooterWebComponent } from 'src/app/pages/website/componentes/footer-web/footer-web.component';
import { HeaderWebComponent } from 'src/app/pages/website/componentes/header-web/header-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItcPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [ItcPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ItcPageModule {}
