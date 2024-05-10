import { Component, OnInit } from '@angular/core';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {

  selected:boolean[]=[]
  constructor(
    public headerStatusService:HeaderStatusService,
    private genericS:GenericService
  ) { }
depas:any = []
  ngOnInit() {
    this.genericS.getAll('departamento').subscribe((res:any) => {
      this.depas=res.filter((D:any) => D.directorios.length !== 0);
      this.selected = new Array(this.depas).fill(false);
      this.selected[0] = true
    })
  }

  seleccion(index:number){
    this.selected = this.selected.map(s => false);
    this.selected[index] = true;
    
  }


search:string='';

}
