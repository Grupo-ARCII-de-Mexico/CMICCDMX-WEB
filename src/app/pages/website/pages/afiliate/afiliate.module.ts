import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfiliatePageRoutingModule } from './afiliate-routing.module';

import { AfiliatePage } from './afiliate.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfiliatePageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [AfiliatePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AfiliatePageModule {}
