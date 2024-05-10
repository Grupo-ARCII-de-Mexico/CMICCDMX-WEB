import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { switchMap, tap } from 'rxjs/operators';
import { BolsaTrabajo, BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share'
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-bolsa-trabajo-detalles',
  templateUrl: './bolsa-trabajo-detalles.page.html',
  styleUrls: ['./bolsa-trabajo-detalles.page.scss'],
})
export class BolsaTrabajoDetallesPage implements OnInit {
  uri: string = environment.image + 'bolsa-trabajo-logos/'
  trabajo!:BolsaTrabajo;
  identificador!:string;
  html:any;
  constructor(
    public headerStatusService:HeaderStatusService,
    private activeParams: ActivatedRoute,
    private bolsaRepo:BolsaTrabajoRepository,
    private gS:GenericService,
    private nav:NavController,
    private router:Router,
    private toast:ToastrService,
    private sanitizer:DomSanitizer,
    private fb:FormBuilder

  ) { }
  participanteForm!:FormGroup
  participanteFormItc!:FormGroup
  ngOnInit() {
    this.participanteForm = this.fb.group({
      nombre:[null,Validators.required],
      telefono:[null,Validators.required],
      correo:[null,Validators.required],
      idiomas:[null,Validators.required],
      alcaldia:[null,Validators.required],
      competencias:[null,Validators.required],
      experiencia:[null,Validators.required],
      area:[null,Validators.required],
    })
    this.participanteFormItc = this.fb.group({
      nombre:[null,Validators.required],
      telefono:[null,Validators.required],
      correo:[null,Validators.required],
      idiomas:[null,Validators.required],
      alcaldia:[null,Validators.required],
      competencias:[null,Validators.required],
      experiencia:[null,Validators.required],
      area:[null,Validators.required],
      matricula:[null,Validators.required],
    })
    this.activeParams.params.pipe(
      switchMap( (res:any) =>{
        this.identificador=res.identificador;
        return this.bolsaRepo.BolsaTrabajo$
      }
      ),
      tap( async (bolsas) => {
        const find = bolsas.find((l) => l.identificador === this.identificador)
        if(find){
          this.trabajo = find;
          this.html = this.sanitizer.bypassSecurityTrustHtml(this.trabajo.descripcion)
        }else{
          const bb = await this.gS.getOne<BolsaTrabajo>('bolsa-trabajo',this.identificador).toPromise();
          if(bb){
            this.trabajo=bb
            this.html = this.sanitizer.bypassSecurityTrustHtml(this.trabajo.descripcion)
          }else{
            this.nav.navigateRoot('/website/bolsa-trabajo')
          }
        }
      
      })
    ).subscribe();
  }

  mon(date:Date){
    return moment(date).locale('ES').format('LL')
  }

  async share(){
    try {
      await Share.share({
        url: 'https://cmiccdmx.org/'+this.router.url,
        text:'¡Tengo una oferta que puede ser de tu interés!'
      });
    } catch (error) {
      await navigator.clipboard.writeText('¡Tengo una oferta que puede ser de tu interés!  \n' + 'https://cmiccdmx.org/'+this.router.url,)
      this.toast.success('Enlace copiado','Correcto')
    }
   

  }
  file:any= {
    documento :  '',
    uri : ''
  };
  onFileSelected(event: any): void {
    this.file = {
      documento :  'Curriculum.pdf',
      uri :  event.target.files[0]
    }
    event.target.value = ''
  }

  click(){
    const fileInput = document.getElementById('curri') as HTMLInputElement;
    fileInput.click();
  }

  send(){
    const form = new FormData();
    form.append('curriculum',this.file.uri);
    form.append('nombre', this.participanteForm.controls['nombre'].value);
    form.append('telefono', this.participanteForm.controls['telefono'].value);
    form.append('correo', this.participanteForm.controls['correo'].value);
    form.append('trabajo',this.trabajo.id.toString())
    this.gS.post('bolsa-participante',form).pipe(
      switchMap((res:any) => {
        return this.gS.update('bolsa-participante',res.id,this.participanteForm.value)
      })
    ).subscribe((res) =>{
      this.toast.success('Estate Atento a tu Correo','Recibido')
      this.openModal=false;
      this.participanteForm.reset()
      this.file = {
        documento :  '',
        uri :  ''
      }
    })
  }

  sendItc(){
    const form = new FormData();
    form.append('curriculum',this.file.uri);
    form.append('nombre', this.participanteFormItc.controls['nombre'].value);
    form.append('telefono', this.participanteFormItc.controls['telefono'].value);
    form.append('correo', this.participanteFormItc.controls['correo'].value);
    form.append('trabajo',this.trabajo.id.toString())
    this.gS.post('bolsa-participante',form).pipe(
      switchMap((res:any) => {
        return this.gS.update('bolsa-participante',res.id,this.participanteFormItc.value)
      })
    ).subscribe((res) =>{
      this.toast.success('Estate Atento a tu Correo','Recibido')
      this.openModalItc=false;
      this.participanteFormItc.reset()
      this.file = {
        documento :  '',
        uri :  ''
      }
    })
  }
  
  openModal=false;
  openModalItc=false;

}
