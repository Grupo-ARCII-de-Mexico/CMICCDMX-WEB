import { Component, Input, OnInit,OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss'],
})
export class NegocioComponent  implements OnInit, OnChanges {
  @Input() view=true;
  @Input() negocio:any;
  @Input() sendForm:boolean = false;
  @Input() edit=false;
  @Input() success=false;
  @Output() form = new EventEmitter<any>;
  files:any[] = []
  public contactoForm!:FormGroup
  constructor(
    private fb:FormBuilder
  ) { }
    editArray = [true,true,true,true,true]
  ngOnInit() {
    if(this.edit){
      this.editArray = [false,false,false,false,false]
    }
    this.contactoForm = this.fb.group({
      web:[null],
      empresa:[null,[Validators.required]],
      afiliado:[null,[Validators.required]],
      denominacion:[null,[Validators.required]],
      rfc:[null,[Validators.required]],
      estado:[null,[Validators.required]],
      municipio:[null,[Validators.required]],
      calle:[null,[Validators.required]],
      colonia:[null,[Validators.required]],
      cp:[null,[Validators.required]],
    })
    this.files = Array(30).fill({documento:null,uri:null});
 
    
  }

  ngOnChanges(changes: any){
    if(changes?.sendForm?.currentValue){
      this.form.emit({
        formulario: this.contactoForm.valid ?  this.contactoForm.value : null,
        files:this.files
      })
    }
    if(changes?.success?.currentValue){
      this.contactoForm.reset();
      this.files = Array(this.negocio.documentos.length).fill({documento:null,uri:null});;
    }
  }

  save(){

  }


  a(event:any){
 
  }
  
  onFileSelected(event: any,index:number): void {
    this.files[index] = {
      documento :  this.negocio.documentos[index].texto,
      uri :  event.target.files[0]
    }
    event.target.value = ''
  }

  click(id:any){
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput.click();
  }

}
