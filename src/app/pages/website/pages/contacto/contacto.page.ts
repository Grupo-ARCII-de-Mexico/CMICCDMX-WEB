import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  constructor(
    private gService:GenericService,
    private loading:LoadingService,
    private toast:ToastrService
  ) { }

  ngOnInit() {
  }

  form = {
    name:'',
    tel:'',
    correo:'',
    mensaje:''
  }


async send(){

  await this.loading.setData({
    animated:true,
    message:'Enviando'
  })
  await this.loading.create()
  await this.loading.show()
  this.gService.post('contacto',this.form).subscribe(async () =>{
    await this.loading.hide()
  this.form = {
    name:'',
    tel:'',
    correo:'',
    mensaje:''
  }
  this.toast.success('Nos pondremos en contacto a la brevedad','Gracias por su interés')
  })

}


}
