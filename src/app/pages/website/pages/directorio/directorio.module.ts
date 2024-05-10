import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectorioPageRoutingModule } from './directorio-routing.module';

import { DirectorioPage } from './directorio.page';
import { HeaderWebComponent } from '../../componentes/header-web/header-web.component';
import { FooterWebComponent } from '../../componentes/footer-web/footer-web.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectorioPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent,
    PipeModule
  ],
  declarations: [DirectorioPage]
})
export class DirectorioPageModule {}
