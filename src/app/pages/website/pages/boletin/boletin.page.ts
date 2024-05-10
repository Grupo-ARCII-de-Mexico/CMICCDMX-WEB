import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Boletin, BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';

moment.locale('Es')
register();
@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.page.html',
  styleUrls: ['./boletin.page.scss'],
})
export class BoletinPage implements OnInit {
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
  constructor(
    private params:ActivatedRoute,
    private boletinRepo:BoletinRepository,
    private nav:NavController,
    private sanitizer: DomSanitizer,
  ) { }
  identificador!:string;
  boletin?: Boletin;
  boletines:Boletin[]=[];
  @ViewChild('SwiperBol') mySwiper?: ElementRef ;
  uri:string = environment.image + 'boletines/'
  imgFilter:any=[]
  ngOnInit() {

  }
  ionViewWillEnter(){
    this.params.params.
    pipe(
      switchMap((res:any) => {
        if(res.identificador){
          this.identificador=res.identificador;
          return this.boletinRepo.boletin$
        }
        return EMPTY
      })
    ).
    subscribe((res) => {
      if(res){
        this.boletin = res.find((b) => b.identificador === this.identificador);
        this.boletines = res.filter((b) => b.identificador !== this.boletin?.identificador);
        this.imgFilter = this.boletin?.imagenes.filter( (img:any) => !img.includes('[]'))
        if(!this.boletin){
          this.nav.navigateForward('/website')
        }
      }else{
        this.nav.navigateForward('/website')
      }
    })
  }
  safe(texto:string){
    return this.sanitizer.bypassSecurityTrustHtml(texto.replace(/<p><\/p>/g, '<br style="height:50px">'))
  }

  mon(date:Date | string){
    return moment(date).format('LL')
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

}
