import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForosPageRoutingModule } from './foros-routing.module';

import { ForosPage } from './foros.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForosPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [ForosPage]
})
export class ForosPageModule {}
