import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEventoFormPageRoutingModule } from './registro-evento-form-routing.module';

import { RegistroEventoFormPage } from './registro-evento-form.page';
import { PagosPageModule } from '../pagos/pagos.module';
import { AfiliadoFormPageModule } from '../afiliado-form/afiliado-form.module';
import { PrensaFormPageModule } from '../prensa-form/prensa-form.module';
import { EstudianteFormPageModule } from '../estudiante-form/estudiante-form.module';
import { GeneralFormPageModule } from '../general-form/general-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroEventoFormPageRoutingModule,
    PagosPageModule,
    AfiliadoFormPageModule,
    PrensaFormPageModule,
    EstudianteFormPageModule,
    GeneralFormPageModule
  ],
  declarations: [RegistroEventoFormPage],
  exports:[RegistroEventoFormPage]
})
export class RegistroEventoFormPageModule {}
