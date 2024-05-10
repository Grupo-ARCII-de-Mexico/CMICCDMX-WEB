import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comisiones, ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastService } from 'src/app/shared/tools/toast.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';


register();
@Component({
  selector: 'app-afiliate',
  templateUrl: './afiliate.page.html',
  styleUrls: ['./afiliate.page.scss'],
})
export class AfiliatePage implements OnInit {
  paginationConfig = {
    el: '.swiper-pagination', // Selector CSS del elemento que contendrá la paginación
    type: 'bullets', // Tipo de paginación (otros tipos incluyen 'fraction', 'progressbar', etc.)
    clickable: true // Permite hacer clic en los puntos de paginación para cambiar de slide
  };
  breakpoints={
    // Cuando la ventana tiene un ancho mayor o igual a 1024px (pantallas grandes)
    1024: {
      slidesPerView: 3,
    },
    // Cuando la ventana tiene un ancho mayor o igual a 768px pero menor que 1024px (tablets)
    768: {
      slidesPerView: 2,
    },
    // Cuando la ventana tiene un ancho menor a 768px (teléfonos)
    567: {
      slidesPerView: 1,
    },
    167: {
      slidesPerView: 1,
    },
  };
  breakpoints2={
    // Cuando la ventana tiene un ancho mayor o igual a 1024px (pantallas grandes)
    1024: {
      slidesPerView: 5,
    },
    // Cuando la ventana tiene un ancho mayor o igual a 768px pero menor que 1024px (tablets)
    768: {
      slidesPerView: 2,
    },
    // Cuando la ventana tiene un ancho menor a 768px (teléfonos)
    567: {
      slidesPerView: 1,
    },
    167: {
      slidesPerView: 1,
    },
  };
  comisiones:Comisiones[] =[]
  url = environment.image + 'comisiones/'
  constructor(
    public headerStatusService:HeaderStatusService,
    private comisionesRepo:ComisionesRepository,
    private gService:GenericService,
    private loading:LoadingService,
    private toast:ToastrService
  ) { }

  ngOnInit() {
    this.comisionesRepo.comisiones$.subscribe((res) => this.comisiones=res)
  }

  form = {
    name:'',
    tel:'',
    correo:'',
    mensaje:''
  }


async send(){

  await this.loading.setData({
    animated:true,
    message:'Enviando'
  })
  await this.loading.create()
  await this.loading.show()
  this.gService.post('contacto',this.form).subscribe(async () =>{
    await this.loading.hide()
  this.form = {
    name:'',
    tel:'',
    correo:'',
    mensaje:''
  }
  this.toast.success('Nos pondremos en contacto a la brevedad','Gracias por su interés')
  })

}

  go(url?:string){
    if(url){
      window.open(url,'_blank')
    }

  }

  afiliate(){
    let seccion = document.getElementById('afiliate');
    if(seccion){
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  
  }

  open(url?:string){
    if(url && url !== 'null'){
      window.open(url,'_blank')
    }

  }

}
