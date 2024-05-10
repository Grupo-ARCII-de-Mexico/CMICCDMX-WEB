import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosPageRoutingModule } from './pagos-routing.module';

import { PagosPage } from './pagos.page';
import { StripePageModule } from 'src/app/shared/components/stripe/stripe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosPageRoutingModule,
    StripePageModule
  ],
  declarations: [PagosPage],
  exports: [PagosPage],
})
export class PagosPageModule {}
