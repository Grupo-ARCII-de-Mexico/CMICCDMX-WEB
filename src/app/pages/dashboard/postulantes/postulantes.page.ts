import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.page.html',
  styleUrls: ['./postulantes.page.scss'],
})
export class PostulantesPage implements OnInit {

 
  constructor(
    private genericS: GenericService,
    private navigator:NavController,
    private toast:ToastrService,
    private loading:LoadingService
  ) { }

  ngOnInit() {
    this.init()
  }
bolsa:any[] = []
bolsaSelected:any[] = []

  async init(){
    this.loading.setData({
      message:'Cargando bolsa',
    })
    await this.loading.create()
    await this.loading.show()
    this.genericS.getAll<any[]>("bolsa-participante").subscribe((res) => {
      this.bolsa= res;
      this.bolsaSelected= res;
      if(res.length == 0){
        this.toast.warning('Por ahora no tenemos postulantes cargados en el sistema','Una Disculpa')
      }
      this.loading.hide()
    })
  }
  licitacionModal:any
  anyModal!:any;
  anyes:any[] = []
  search!:string;
  anyesSelected:any[]= []
  divisor = 15;
  openModal=false;
  pagina= 0 
   getPagina(pagina:number){
    this.pagina= pagina
      this.anyesSelected= this.anyes.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
   }

   mon(data:any){
    return moment(data).format('ll')
   }

   uri2: string = environment.image + 'bolsa-trabajo-curriculum/'

   download(documento:any){
    const link = document.createElement('a');
    link.href =  this.uri2 + documento;
    link.download = 'curriculum.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}
}
