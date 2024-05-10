import { Component, OnInit } from '@angular/core';
import { IonicSafeString, ModalController, NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';


register();
@Component({
  selector: 'app-licitaciones',
  templateUrl: './licitaciones.page.html',
  styleUrls: ['./licitaciones.page.scss'],
})
export class LicitacionesPage implements OnInit {

  constructor(
    public headerStatusService:HeaderStatusService,
    private modal:ModalController,
    private gService:GenericService,
    private loading:LoadingService,
    private toast:ToastrService,
    private nav:NavController,
    private afiliadoRepo: AfiliadoRepository
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    if(sessionStorage.getItem(environment.jwt)){
      this.nav.navigateForward("/dashboard/licitaciones")
    }
  }

  checkSection(event:any): void {
    const scrollPosition = event.detail.currentY -50;
    const a = document.getElementById('subheader');
    if(scrollPosition > 100){
      a?.classList.remove('d-md-block')
    }else{
      a?.classList.add('d-md-block')
    }
  }


  cancel(){
    this.modal.dismiss()
  }


  afiliado!:string;
  nip!:string;

  async access(){

    await this.loading.setData({
      animated:true,
      message:'Enviando'
    })
    await this.loading.create()
    await this.loading.show()
    this.gService.getOne('afiliados',String(this.afiliado).padStart(8, '0')).subscribe(async (info:any) =>{
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

go(url:string){
  window.open(url,'_blank')
}
}
