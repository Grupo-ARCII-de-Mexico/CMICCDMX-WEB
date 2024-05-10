import { Component, OnInit } from '@angular/core';
import { Comisiones, ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';

register();

@Component({
  selector: 'app-cmic',
  templateUrl: './cmic.page.html',
  styleUrls: ['./cmic.page.scss'],
})
export class CmicPage implements OnInit {
  paginationConfig = {
    el: '.swiper-pagination', // Selector CSS del elemento que contendrá la paginación
    type: 'bullets', // Tipo de paginación (otros tipos incluyen 'fraction', 'progressbar', etc.)
    clickable: true // Permite hacer clic en los puntos de paginación para cambiar de slide
  };
  constructor(
    public headerStatusService:HeaderStatusService,
    private comisionesRepo:ComisionesRepository
  ) { }
  comisiones:Comisiones[] = [];
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
  ngOnInit() {
    this.comisionesRepo.comisiones$.subscribe((res) => this.comisiones = res )
  }
  url = environment.image + 'comisiones/'
  checkSection(event:any): void {
    const scrollPosition = event.detail.currentY -50;
    const a = document.getElementById('subheader');
    if(scrollPosition > 100){
      a?.classList.remove('d-md-block')
    }else{
      a?.classList.add('d-md-block')
    }
  }
  go(url?:string){
    if(url && url !== 'null'){
      window.open(url,'_blank')
    }

  }
}
