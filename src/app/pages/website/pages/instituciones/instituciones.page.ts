import { Component, OnInit } from '@angular/core';
import { Calendario, CalendarioRepository } from 'src/app/shared/repos/calendarios.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.page.html',
  styleUrls: ['./instituciones.page.scss'],
})
export class InstitucionesPage implements OnInit {

  constructor(
    public headerStatusService:HeaderStatusService,
    private genericS:GenericService,
    private calendarioRepo:CalendarioRepository
  ) { }

  ngOnInit() {

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

}
