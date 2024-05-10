import { Component, Input, OnInit } from '@angular/core';
import { EmisionRegistroEvento } from 'src/app/shared/interfaces/emisionParticipante.interface';
import { Evento } from 'src/app/shared/repos/evento.repository';
import { LoadingController, ModalController } from '@ionic/angular';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/generic-service';
import { TipoPagos, TipoPagosArray } from 'src/app/shared/enums/tipoPagos.enum';
import { Costo } from 'src/app/shared/interfaces/costos.interface';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  tipoPago = Object.values(TipoPagos).splice(2,3);
  tipoPagoEnum = TipoPagos;
  tipoPagoArray: any = TipoPagosArray;
  pago:number = TipoPagos.TRANSFERENCIA;
  factura:boolean=false;
  
  @Input() evento!:Evento;
  @Input() emision!:EmisionRegistroEvento;
  
  constructor(
    private genericS:GenericService,
    private modalC:ModalController,
    private toast:ToastrService,
    private loading:LoadingController
  ) { }
  costos:Costo[] = []
  ngOnInit() {

    if(typeof(this.evento?.costos) == 'string'){
      this.evento.costos = JSON.parse(this.evento?.costos ?? '[]')
    }else{
      this.evento.costos = this.evento.costos
    }
    this.costos = this.evento.costos.filter((c:any) => c.publico === this.emision.tipo);
}

  habilitarBotton(tipoPagos:TipoPagos){
    return this.evento.pasarelasPago.indexOf(String(tipoPagos)) !== -1 
  }

  async realizarPago(token?:string){
    const loading = await this.loading.create({
      id:'pago',
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Procesando...'
    });
    await loading.present();
    const info: any = {
      quieroFactura:this.factura,
      evento:this.evento.id,
      costo:Math.floor(this.total()),
      plataformaPago:TipoPagos.STRIPE,
      participante:this.emision.id,
      privilegio:this.costoSeleccionado.nombre
    }
    this.genericS.post<{boleto:any, tokenPago:string}>('boleto',info).pipe(
      switchMap( async (res) => await this.genericS.post('boleto/confirm/'+res.boleto.id,{token, costo:Math.floor(this.total()*100)}).toPromise()),
      tap( async (bolean) => {
        this.modalC.dismiss()
        await loading.dismiss()
        this.toast.success('Registro Guardado', 'Revise su correo')
      })
    ).subscribe()
  }
  costoSeleccionado!:any;


  costoStripe(costo :number){
   return  (Math.ceil(costo * .036)) + 3
  }

  total(){
      return Number(this.costoSeleccionado.costo)
  }

}
