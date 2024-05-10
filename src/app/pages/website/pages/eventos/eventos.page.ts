import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Boletin, BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { Evento } from 'src/app/shared/repos/evento.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element/bundle';

register();
moment.locale('ES')
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  uri = environment.image + 'eventos/'
  uri2= environment.image + "boletines/"
  boletines:Boletin[]=[]
  highlightedDates:any[] = [];
  year = new Date().getFullYear()+2
  constructor(
    public headerStatusService:HeaderStatusService,
    private genericService:GenericService,
    private boletinRepo:BoletinRepository
  ) { }
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
    968: {
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
  @ViewChild('SwiperBol') mySwiper?: ElementRef ;
  eventos:Evento[] = []
  selectedEventos:Evento[]=[];
  ngOnInit() {
    this.boletinRepo.boletin$.subscribe((res:any) =>{
      this.boletines= res
    })
   this.genericService.getAll<Evento[]>('evento').subscribe((res: Evento[]) => {
      this.eventos = res.sort((a,b) => new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime());
      this.viewSelect()
      for( const event of res){
        this.highlightedDates.push({
          textColor:'var(--ion-color-light)',
          backgroundColor:'var(--ion-color-dark)',

          date: moment(event.fechaInicio).format('YYYY-MM-DD')
        })
      }

    }) 
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


  viewSelect(event?:any){
    if(this.eventos.length<=5){
      this.selectedEventos =  this.eventos
      return
    }

    const result = [];
    const diaActual = [];
    const eventosFuturos = [];
    const eventosPasados = [];
    const fechaActual = event?.detail?.value ? moment(event?.detail?.value) : moment();
    
    for (const event of this.eventos) {
      if (moment(event.fechaInicio).isSame(fechaActual, 'day')) {
        diaActual.push(event);
      } else if (moment(event.fechaInicio).isAfter(fechaActual)) {
        eventosFuturos.push(event);
      } else {
        eventosPasados.push(event);
      }
    }
    
    // Ordenar eventos futuros por proximidad a la fecha actual
    eventosFuturos.sort((a, b) => moment(a.fechaInicio).diff(moment(b.fechaInicio)));
    eventosPasados.sort((a, b) => moment(b.fechaInicio).diff(moment(a.fechaInicio)));

    // Obtener los 5 eventos iniciales
    const eventosIniciales = [...diaActual, ...eventosFuturos, ...eventosPasados].slice(0, 5);
    
    
    this.selectedEventos =  eventosIniciales
    this.selectedEventos = Array.from(new Set([...this.selectedEventos]))
    this.selectedEventos = this.selectedEventos.slice(0,5)
   
  }

  fecha(date:string | Date){
    return moment(date).format('LL');
  }

  
}


