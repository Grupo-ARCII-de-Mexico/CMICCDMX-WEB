import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfiliadoFormPageRoutingModule } from './afiliado-form-routing.module';

import { AfiliadoFormPage } from './afiliado-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfiliadoFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AfiliadoFormPage],
  exports:[AfiliadoFormPage]
})
export class AfiliadoFormPageModule {}
