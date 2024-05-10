import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { Calendario, CalendarioRepository } from 'src/app/shared/repos/calendarios.repository';
import { ComentarioRepository } from 'src/app/shared/repos/comentarios.repo';
import { ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { CursoRepository } from 'src/app/shared/repos/curso.repository';
import { SliderRepository } from 'src/app/shared/repos/slider.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { MetaService } from 'src/app/shared/services/meta.service';
import { WhatsApp } from 'src/app/shared/tools/whats.widget';

moment.locale('es')
@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.scss'],
})
export class WebsitePage implements OnInit {

  constructor(
    private menu:MenuController,
    private genericS:GenericService,
    private sliderRepo:SliderRepository,
    private boletinRepo:BoletinRepository,
    private cursoRepo:CursoRepository,
    private comentarioRepo:ComentarioRepository,
    private comisionesRepo:ComisionesRepository,
    private bolsaTrabajo:BolsaTrabajoRepository,
    private calendarioRepo: CalendarioRepository,
    @Inject(PLATFORM_ID) private platform:Object,

  ) { }

  ngOnInit() {
    if(isPlatformBrowser(this.platform)){
      WhatsApp()
    }
    this.genericS.getAll('sliders').subscribe((res:any) =>{
      this.sliderRepo.setSliders(res)
    })
    this.genericS.getAll('boletines').subscribe((res:any) =>{
      this.boletinRepo.setBoletins(res)
    })
    this.genericS.getAll('cursos').subscribe((res:any) =>{
      this.cursoRepo.setCursos(res)
    })
    this.genericS.getAll('comentarios').subscribe((res:any) =>{
      this.comentarioRepo.setComentarios(res)
    })
    this.genericS.getAll('comisiones').subscribe((res:any) =>{
      this.comisionesRepo.setComisioness(res)
    })
    this.genericS.getAll('bolsa-trabajo').subscribe((res:any) =>{
      this.bolsaTrabajo.setBolsaTrabajo(res)
    })
    this.genericS.getAll<Calendario[]>('calendario-capacitaciones').subscribe((res) => this.calendarioRepo.setCalendarios(res))
  }

  closemenu(){
    this.menu.close()
  }
}
