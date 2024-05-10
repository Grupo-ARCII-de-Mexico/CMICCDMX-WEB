import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerPageRoutingModule } from './ver-routing.module';

import { VerPage } from './ver.page';
import { FooterWebComponent } from '../../../componentes/footer-web/footer-web.component';
import { HeaderWebComponent } from '../../../componentes/header-web/header-web.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerPageRoutingModule,
    PipeModule,
    TablaComponent,
    HeaderWebComponent,
    FooterWebComponent,
  ],
  declarations: [VerPage]
})
export class VerPageModule {}
