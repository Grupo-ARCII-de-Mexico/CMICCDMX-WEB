import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Delegacion } from 'src/app/shared/interfaces/delegacion.interface';
import { Estado } from 'src/app/shared/interfaces/estado.interface';
import { EMPTY, of, zip } from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import { Participante } from 'src/app/shared/interfaces/participante.interface';
import { EmisionRegistroEvento } from 'src/app/shared/interfaces/emisionParticipante.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Evento } from 'src/app/shared/repos/evento.repository';
import { PagosPage } from '../pagos/pagos.page';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { TipoPagos } from 'src/app/shared/enums/tipoPagos.enum';
import { TipoPublico } from 'src/app/shared/enums/tipoPublico.enum';
import * as moment from 'moment';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'evento-form',
  templateUrl: './registro-evento-form.page.html',
  styleUrls: ['./registro-evento-form.page.scss'],
})
export class RegistroEventoFormPage implements OnInit {
  tipo:number =1;
  @Input() evento!:Evento;
  delegaciones: Delegacion[] = [];
  estados: Estado[] = [];
  extranjero!: Estado;
  typeForm: string = '0';
  readonly tipoPublico=TipoPublico
  @Output() usuarioGuardado = new EventEmitter<EmisionRegistroEvento>();
  constructor(
    private fb: FormBuilder,
    private compressService: CompressImageService,
    private genericS: GenericService,
    private alert: AlertService,
    private toast:ToastrService,
    private loading:LoadingController,
    private route: ActivatedRoute,
    private modalc:ModalController,
    private router:Router,
    private titleService: Title
  ) {
  
  }

  ngOnInit() {

    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.getCurrentNavigation()?.trigger === 'popstate') {
          await this.alert.hide()
        }
      }
    });
    zip(
      this.genericS.getAll<Delegacion[]>('delegacion'),
      this.genericS.getAll<Estado[]>('estados'),
      this.route.params
    ).pipe(
      map(res => {
        this.delegaciones = res[0].sort(function (a, b) {
          return a.ciudad.localeCompare(b.ciudad);
        });
            this.extranjero = res[1].find(e => e.id ===33) as any;
            this.estados = res[1].filter((e) => e.id !== 33).sort(function (a, b) {
              // Utiliza localeCompare para comparar las ciudades alfabéticamente
              return a.nombre.localeCompare(b.nombre);
            });
            return res[2]
      }),
      switchMap((params) => {
        if(params['identificador'] && this.router.url.includes('registro')){
          return this.genericS.getOne<Evento>('evento',params['identificador'])
        }else {
          this.cerrarRegistro(this.evento)  
          return EMPTY
        }
      }),
      tap( (evento) => {
        if(evento){
          this.evento = evento;
          this.titleService.setTitle( this.evento.titulo+' | CMIC'); 
          this.cerrarRegistro(evento)  
        }else{
          this.titleService.setTitle( this.evento.titulo+' | CMIC'); 
        }
      })
    )
    .subscribe()

  }
  evidencia: any
 
  async upload() {
    this.evidencia = await this.compressService.returnImageCompress()
  }
  async save(usuarioForm:any) {
      const load = await this.loading.create({
        animated:true,
        spinner: 'dots',
        translucent:true,
        message:'Preparando Registro...'
      });
      await load.present();
      const formData = new FormData();
      for (const key in  usuarioForm) {
        if (usuarioForm.hasOwnProperty(key)) {
          if(key === 'evidencia' && this.evidencia){
            formData.append(key, this.compressService.dataURItoBlob(this.evidencia));
          }else{
            if(usuarioForm[key]){
              formData.append(key,usuarioForm[key]);
            }
          }

        }
      }
      this.genericS.post<Participante>( 'participante',formData
        ).subscribe(async(res) => {
          await load.dismiss();
          if(this.evento){
            this.getUser( {id:res.id, tipo:usuarioForm.tipo});
          }else{
            this.usuarioGuardado.emit({id:res.id, tipo:usuarioForm.tipo})
          }
          }, 
          async (err:any )=> {
            this.toast.error('Sucedió un Error intente más tarde')
            await load.dismiss();
          });
  }

  async getUser(event:EmisionRegistroEvento){
    if(this.evento.esGratis || event.tipo === this.tipoPublico.PRENSA){
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
        plataformaPago:TipoPagos.STRIPE,
        participante:event.id
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
          evento:this.evento,
        },
        backdropDismiss:false,
        keyboardClose: false,
      });
      modal.present();
    }
  
  }
  disabled=false;
  async cerrarRegistro(evento:Evento){
    const fechaInicio = moment(evento.fechaInicio);
    const fechaLimite = moment(evento.fechaInicio).startOf('day').add(1, 'day');
    if(fechaInicio.isSameOrAfter(fechaLimite)  || !evento.active) {
      let titulo, descripcion;
      if(evento?.modal?.titulo && evento?.modal?.titulo !== ''){
        titulo = evento?.modal?.titulo
      }
      if(evento?.modal?.descripcion && evento?.modal?.descripcion !== ''){
        descripcion = evento?.modal?.descripcion
      }
      this.disabled=true;
      await this.alert.setData({
        header: titulo ?? 'Registro Cerrado',
        message: descripcion ??  'Lo sentimos el registro se encuentra cerrado',
        animated:true
      })
    }
  }


}

