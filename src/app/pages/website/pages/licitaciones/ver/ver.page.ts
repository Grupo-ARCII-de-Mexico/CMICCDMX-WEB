import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Licitacion, LicitacionRepository } from 'src/app/shared/repos/licitacion.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { LoadingService } from 'src/app/shared/tools/loading.service';

moment.locale('es')
@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {

  constructor(
    private genericS: GenericService,
    private navigator:NavController,
    private licitacionesRE:LicitacionRepository,
    private toast:ToastrService,
    private loading:LoadingService
  ) { }

  ngOnInit() {
    this.init()
  }

  async init(){
    this.loading.setData({
      message:'Cargando Licitaciones',
    })
    await this.loading.create()
    await this.loading.show()
    this.genericS.getAll<Licitacion[]>("licitaciones").subscribe((res) => {
      this.licitacionesRE.setLicitacion(res);
      this.licitaciones= res;
      if(res.length == 0){
        this.toast.warning('Por ahora no tenemos licitaciones cargadas en el sistema','Una Disculpa')
      }
      this.loading.hide()
    })
  }

  licitacionModal!:Licitacion;
  licitaciones:Licitacion[] = []
  search!:string;
  licitacionesSelected:Licitacion[]= []
  divisor = 15;
  openModal=false;
  pagina= 0 
   getPagina(pagina:number){
    this.pagina= pagina
      this.licitacionesSelected= this.licitaciones.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
   }

   mon(data:any){
    return moment(data).format('ll')
   }

}
