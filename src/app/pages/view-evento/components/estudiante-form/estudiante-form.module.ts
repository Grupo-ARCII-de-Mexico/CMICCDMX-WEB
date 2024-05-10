import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudianteFormPageRoutingModule } from './estudiante-form-routing.module';

import { EstudianteFormPage } from './estudiante-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudianteFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EstudianteFormPage],
  exports: [EstudianteFormPage]
})
export class EstudianteFormPageModule {}
