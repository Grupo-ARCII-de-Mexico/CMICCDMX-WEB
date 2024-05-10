import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { GenericService } from 'src/app/shared/services/generic-service';
import { MetaService } from 'src/app/shared/services/meta.service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastService } from 'src/app/shared/tools/toast.service';
import { WhatsApp } from 'src/app/shared/tools/whats.widget';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oportunidad-negocio',
  templateUrl: './oportunidad-negocio.page.html',
  styleUrls: ['./oportunidad-negocio.page.scss'],
})
export class OportunidadNegocioPage implements OnInit {
  file?:File;
  option:string ='A';
  negocio:any;
  terminos=false;
  uri=environment.image+'oportunidades-logotipos/'
  success=false;
  constructor(
    private loading:LoadingService,
    private route: ActivatedRoute,
    private genericS:GenericService,
    private toast:ToastrService,
    private alertS:AlertService,
    @Inject(PLATFORM_ID) private platform:Object,
    private meta:MetaService
  ) { 

    this.route.params.subscribe(params => {
      const slug = params['id']; // Obtén el valor del identificador desde la URL
        this.genericS.getOne('negocio',slug).subscribe(async(res:any) => {
            this.negocio=res;
           this.meta.update('Oportinidad de Trabajo'+this.negocio.empresa,'CMIC CDMX',this.uri+this.negocio.logotipo)
        })
      });
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platform)){
      WhatsApp()
    }

  }

  dataNegocio:any;
  contactos:any
  getFormulario($event:any){
    this.dataNegocio = $event
    
  }
  getContacto($event:any){
    this.contactos = $event
 
  }

  politicas(event:any){
    this.terminos=event.detail.checked
  }

  especialidades:any[]=[]
  setEspecialidad($event:any,especialidad:string){
  
    if($event.detail.checked){
      this.especialidades.push(especialidad);
      this.especialidades = Array.from(new Set(this.especialidades))
    }else{
      this.especialidades = this.especialidades.filter((a) => a !== especialidad)
    }
  }
  async save(){
    if(this.contactos.formulario === null || this.dataNegocio.formulario ===null){
        this.toast.warning('Llene todos los campos obligatorios','Advertencia')
        this.terminos=false;
        return
    }
    if(this.especialidades.length===0 && this.negocio.especialidades.length > 0){
      this.toast.warning('Debe de seleccionar minimo una especialidad','Advertencia')
      this.terminos=false;
      return
    }
    const files: any=[]
    for(const document of this.dataNegocio.files){
      if(document.uri){
        const form = new FormData();
        form.append('documento',document.uri);
        const uri = await this.genericS.post<any>('negocio/documentos',form).toPromise();
        files.push({
          documento:document.documento,
          uri:uri.file
        });
      }
    }
    this.loading.setData({
      animated:true,
      message:'Subiendo...',
      spinner:'dots'
    })
    await this.loading.create();
    await this.loading.show();

    this.genericS.post<any>('negocio/oportunidad',{...this.dataNegocio.formulario,documentos:files, negocio:this.negocio.id,especialidades:this.especialidades}).pipe(
      switchMap( res => this.genericS.post('negocio/contacto',{...this.contactos.formulario,oportunidad:res.id})),
      tap( async (res:any) =>
       {
        await this.loading.hide();
        this.toast.success('Espere notificaciones por el correo del contacto','Registro Guardado');
        this.success=true;
        this.especialidades=[];
        this.terminos=false;
        await this.alertS.setData({
          animated:true,
          header:'Registro Guardado',
          message:'Le llegará un correo con la confirmación de su registro en caso de no recibirlo o haber mandando mal el correo favor de hacer captura de esta pantalla con el siguiente folio: '+ res.folio ,
          buttons:[
            {
              text:'Cerrar'
            }
          ]
        })
        setTimeout(() => {
          this.success=false;
        }, 200);
       }
      )
    ).subscribe()
  }


}
