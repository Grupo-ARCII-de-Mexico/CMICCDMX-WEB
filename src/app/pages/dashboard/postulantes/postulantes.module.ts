import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulantesPageRoutingModule } from './postulantes-routing.module';

import { PostulantesPage } from './postulantes.page';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulantesPageRoutingModule,
    PipeModule,
    TablaComponent,
  ],
  declarations: [PostulantesPage]
})
export class PostulantesPageModule {}
