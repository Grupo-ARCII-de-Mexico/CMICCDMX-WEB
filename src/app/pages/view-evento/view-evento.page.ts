import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Evento } from 'src/app/shared/repos/evento.repository';
import { environment } from 'src/environments/environment';
import { LoadingController, ModalController } from '@ionic/angular';
import { EmisionRegistroEvento } from 'src/app/shared/interfaces/emisionParticipante.interface';
import { ToastrService } from 'ngx-toastr';
import { TipoPublico } from 'src/app/shared/enums/tipoPublico.enum';
import { GenericService } from 'src/app/shared/services/generic-service';
import { PagosPage } from './components/pagos/pagos.page';
import { switchMap, tap } from 'rxjs/operators';
import { TipoPagos } from 'src/app/shared/enums/tipoPagos.enum';
import { WhatsApp } from 'src/app/shared/tools/whats.widget';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { MetaService } from 'src/app/shared/services/meta.service';

moment.locale('es');
@Component({
  selector: 'app-view-evento',
  templateUrl: './view-evento.page.html',
  styleUrls: ['./view-evento.page.scss'],
})
export class ViewEventoPage implements OnInit {
  tipoPublico = TipoPublico;
  uri = environment.image+'eventos/';
  uriP = environment.image
  @Input() evento!:Evento;
  segment =1;
  html:any;

  constructor(
    private route: ActivatedRoute,
    private genericS:GenericService,
    private modalc: ModalController,
    private toast:ToastrService,
    private loading: LoadingController,
    private sanitizer: DomSanitizer,
    private router:Router,
    private meta:MetaService,
    @Inject(PLATFORM_ID) private platform:Object
  ) { 
    this.route.params.subscribe(params => {
      const slug = params['identificador']; // Obtén el valor del identificador desde la URL
        if(params['iframe']){
          this.iframe = true
        }
        this.genericS.getOne('evento',slug).subscribe(async(res:any) => {
          this.evento = res;
          if(typeof(this.evento?.costos) == 'string'){
            this.evento.costos = JSON.parse(this.evento?.costos ?? '[]')
          }else{
            this.evento.costos = this.evento.costos
          }
          this.html = this.sanitizer.bypassSecurityTrustHtml(this.evento.detalles)
          this.meta.update(this.evento.titulo,'CMIC CDMX',this.uri+this.evento.imagen)
          if(this.evento.titulo.toLowerCase().includes('foro de')){
              window.location.href = 'https://foro.cmiccdmx.org/'
          }     
        }, error => {
        })
      });
  }
    iframe:boolean = false;
    url!:string;
  ngOnInit() {
    this.url = this.router.url
    if(isPlatformBrowser(this.platform)){
      WhatsApp()
    }
   


  }

  mon(date:Date){
    return moment(new Date(date)).format('LL') + ' a las ' + moment(new Date(date)).utc().format('LTS')
  }

 

  async verMapa(){


  }

  async getUser(event:EmisionRegistroEvento){
    if(this.evento.esGratis || event.tipo == this.tipoPublico.PRENSA){
      const loading = await this.loading.create({
        id:'pago',
        animated:true,
        spinner: 'dots',
        translucent:true,
        message:'Procesando...'
      });
      await loading.present();
      const info: any = {
        evento:this.evento.id,
        plataformaPago:TipoPagos.STRIPE
      }
      if(event.tipo === 0 ){
        info['afiliado'] = event.id;
      }else{
        info['participante'] = event.id;
      }
      this.genericS.post<{boleto:any, tokenPago:string}>('boleto',info).pipe(
      switchMap( res => this.genericS.post('boleto/confirm-free/'+res.boleto.id,{}) ),
        tap( async (bolean) => {
          this.modalc.dismiss()
          await loading.dismiss()
          this.toast.success('Registro Guardado', 'Revise su correo')
        })
      ).subscribe()
    }else{
      const modal = await this.modalc.create({
        component: PagosPage,
        componentProps:{
          emision:event,
          evento:this.evento
        },
        backdropDismiss:false,
        keyboardClose: false,
      });

      modal.present();
    }
  
  }

  async verpago(){
    const modal = await this.modalc.create({
      component: PagosPage,
      backdropDismiss:false,
      keyboardClose: false,
      componentProps:{
        evento:this.evento,
        emision :{id:10,tipo:TipoPublico.ESTUDIANTES}
      }
    });
    modal.present();
  }



}
