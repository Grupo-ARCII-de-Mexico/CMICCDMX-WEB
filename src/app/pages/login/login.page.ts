import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { ErrorService } from 'src/app/shared/services/error.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastService } from 'src/app/shared/tools/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  viewPassword:boolean = false;
  constructor(
    private loading:LoadingService,
    private toast:ToastrService,
    private genericService:GenericService,
    private nav:NavController,
    private afiliadoRepo:AfiliadoRepository
  ) { }

  ngOnInit() {
    this.loading.setData({
      animated:true,
      backdropDismiss:false,
      message:'Iniciando Sesión',
      spinner:'crescent'
    });

  }

  ionViewWillEnter(){
    if(sessionStorage.getItem(environment.jwt) ){
      this.nav.navigateForward('/dashboard/licitaciones')
    }
  }

  afiliado!:string;
  nip!:number;

  async login(){
    await this.loading.create();
    await this.loading.show();
    this.genericService.getOne('afiliados',String(this.afiliado).padStart(8, '0')).subscribe(async (info:any) =>{
      console.log(info);
      if(info.nip != this.nip){
        this.toast.warning('Credenciales Inválidas','No Autorizado')
      }else{
        this.toast.success(info.nombre,'Bienvenido:')
        sessionStorage.setItem(environment.jwt,info.id.toString())
        this.afiliadoRepo.setAfiliado([info])
        this.nav.navigateForward("/dashboard/licitaciones")
      }
    await this.loading.hide();
    }, async (err) => {
      this.toast.warning('Credenciales Inválidas','No Autorizado')
      await this.loading.hide()
    })

  }


}
