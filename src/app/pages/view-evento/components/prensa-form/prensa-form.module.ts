import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrensaFormPageRoutingModule } from './prensa-form-routing.module';

import { PrensaFormPage } from './prensa-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrensaFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PrensaFormPage],
  exports:[PrensaFormPage]
})
export class PrensaFormPageModule {}
