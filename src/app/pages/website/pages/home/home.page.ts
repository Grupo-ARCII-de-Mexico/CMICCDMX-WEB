import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as moment from 'moment';
import { Boletin, BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { Comentario, ComentarioRepository } from 'src/app/shared/repos/comentarios.repo';
import { Curso, CursoRepository } from 'src/app/shared/repos/curso.repository';
import { Slider, SliderRepository } from 'src/app/shared/repos/slider.repo';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { MetaService } from 'src/app/shared/services/meta.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element/bundle';
moment.locale('ES')
register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
      slidesPerView: 3,
    },
    // Cuando la ventana tiene un ancho menor a 768px (teléfonos)
    567: {
      slidesPerView: 2,
    },
    167: {
      slidesPerView: 1,
    },
  };
  @ViewChild('SwiperBol') mySwiper?: ElementRef ;
  constructor(
    public headerStatusService:HeaderStatusService,
    private sliderRepo:SliderRepository,
    private boletinRepo:BoletinRepository,
    private cursoRepo:CursoRepository,
    private comentariosRepo:ComentarioRepository,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platform:Object,
    private metaS:MetaService
  ) {
    this.sliderRepo.slider$.subscribe((res:any) =>{
      this.sliders=res.sort((a:any,b:any) => a.position - b.position)
      if(res.length>0){
        this.metaS.update('CMIC | CIUDAD DE MÉXICO','Sitio Oficial CMICCDMX',this.uri+this.sliders[0].imagen);
      }
    })
   }
  cursos:Curso[]=[];
  boletines:Boletin[]=[];
  sliders:Slider[]=[];
  comentarios:Comentario[]=[];
  uri= environment.image + "sliders/"
  uri2= environment.image + "boletines/"
  uri3= environment.image + "cursos/"
  uri4= environment.image + "comentarios/"
  ngOnInit() {
 

    this.boletinRepo.boletin$.subscribe((res:any) =>{
      this.boletines= res
    })
    this.cursoRepo.curso$.subscribe((res:any) =>{
      this.cursos= this.shuffleArray(res)
    })
    this.comentariosRepo.comentario$.subscribe((res:any) =>{
      this.comentarios= res
    })
  }
  checkSection(event:any): void {
    if(isPlatformBrowser(this.platform)) {
      const scrollPosition = event.detail.currentY -50;
      const a = document.getElementById('subheader');
      if(scrollPosition > 100){
        a?.classList.remove('d-md-block')
      }else{
        a?.classList.add('d-md-block')
      }
    }
  }

  next(){
    if (this.mySwiper) {
      this.mySwiper?.nativeElement.swiper.slideNext();
    }
  }
  back(){
    if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
      this.mySwiper.nativeElement.swiper.slidePrev();
    }
  }


  go(uri:string | undefined){
    if(uri !== ('null' || null)){
      window.open(uri,'_blank')
    }
  }

  mon(date:Date){
    return moment(date).format('LL')
  }

  safe(texto:string){
    return this.sanitizer.bypassSecurityTrustHtml(texto)
  }


  openUrl(url:string){
    window.open(url,'_blank')
  }

  shuffleArray(array:Curso[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  meterimagen(boletin:Boletin){
    if(boletin.imagen){
      return this.uri2 + boletin.imagen;
    }else{
      return this.uri2 + boletin.imagenes[0];
    }
  } 
}
