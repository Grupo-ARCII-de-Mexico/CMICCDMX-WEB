import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { BolsaTrabajo, BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bolsa-trabajo',
  templateUrl: './bolsa-trabajo.page.html',
  styleUrls: ['./bolsa-trabajo.page.scss'],
})
export class BolsaTrabajoPage implements OnInit {
  search: string ='';
  uri: string = environment.image + 'bolsa-trabajo-logos/'
  constructor(
    public headerStatusService:HeaderStatusService,
    private bolsaRepo:BolsaTrabajoRepository,
    private gS:GenericService,
    private toast:ToastrService,
    private fb:FormBuilder
  ) { }
bolsa:BolsaTrabajo[]=[]
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
      sueldo:[null,Validators.required]
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
      sueldo:[null,Validators.required]
    })
    this.bolsaRepo.BolsaTrabajo$.subscribe((res:any) => {
      this.bolsa=res;
    })
  }

  mon(date:Date){
    return moment(date).locale('ES').format('LL')
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
