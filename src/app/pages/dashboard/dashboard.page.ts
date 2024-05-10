import { Component, OnInit } from '@angular/core';
import { TypeItem } from 'src/app/shared/enums/type.item.enum';
import { Menu } from 'src/app/shared/interfaces/menu.interface';
import { Afiliado, AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  afiliado!:Afiliado
  constructor(
    private afiliadoRepo:AfiliadoRepository
  ) { }

  ngOnInit() {
    this.afiliadoRepo.user$.subscribe((res) => {
      this.afiliado = res[0]
    })
  }
  menu:Menu[] =[
    {
      icon:'albums-outline',
      label:'Licitaciones',
      url:'/dashboard/licitaciones',
      type:TypeItem.ITEM,
    },
 
    {
      icon:'business-outline',
      label:'Bolsa de Trabajo',
      url:'dashboard/bolsa-trabajo',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Mis Empleos',
          url:'/dashboard/bolsa-trabajo',
        },
        {
          icon:'business-outline',
          label:'Crear Empleo',
          url:'/dashboard/bolsa-trabajo/crear-bolsa-trabajo',
        },
      ]
    },
    {
      icon:'albums-outline',
      label:'Bolsa de Postulantes',
      url:'/dashboard/postulantes',
      type:TypeItem.ITEM,
    },
    {
      icon:'globe-outline',
      label:'Volver Al Sitio Web',
      url:'/website',
      type:TypeItem.ITEM,
    },
    {
      icon:'log-out-outline',
      label:'Cerrar Sesión',
      url:'',
      type:TypeItem.ITEM,
    },
    
  ]



}
