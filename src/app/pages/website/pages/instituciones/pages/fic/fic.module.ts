import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FicPageRoutingModule } from './fic-routing.module';

import { FicPage } from './fic.page';
import { FooterWebComponent } from 'src/app/pages/website/componentes/footer-web/footer-web.component';
import { HeaderWebComponent } from 'src/app/pages/website/componentes/header-web/header-web.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FicPageRoutingModule,
    HeaderWebComponent,
    FooterWebComponent
  ],
  declarations: [FicPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FicPageModule {}
