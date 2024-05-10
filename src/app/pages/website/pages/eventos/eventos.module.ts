import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosPageRoutingModule } from './eventos-routing.module';

import { EventosPage } from './eventos.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderWebComponent,
    FooterWebComponent,
    EventosPageRoutingModule,
    RouterModule
  ],
  declarations: [EventosPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventosPageModule {}
