import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralFormPageRoutingModule } from './general-form-routing.module';

import { GeneralFormPage } from './general-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GeneralFormPage],
  exports:[GeneralFormPage]
})
export class GeneralFormPageModule {}
