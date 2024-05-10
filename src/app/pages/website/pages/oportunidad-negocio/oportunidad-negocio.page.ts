import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/shared/repos/negocio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oportunidad-negocio',
  templateUrl: './oportunidad-negocio.page.html',
  styleUrls: ['./oportunidad-negocio.page.scss'],
})
export class OportunidadNegocioPage implements OnInit {
  uri = environment.image + 'oportunidades-logotipos/'
  constructor(
    private genericS:GenericService
  ) { }

  negocio:Negocio[]=[]
  ngOnInit() {
    this.genericS.getAll('negocio').subscribe(async(res:any) => {
      this.negocio=res. filter((on:any) => on.id !== 4);
   
  })
  }

}
