import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'contacto-negocio',
  templateUrl: './contacto-negocio.component.html',
  styleUrls: ['./contacto-negocio.component.scss'],
})
export class ContactoNegocioComponent  implements OnInit, OnChanges {
  @Input() view=true;
  @Input() edit=false;
  @Input() success=false;
  @Output() form = new EventEmitter<any>;
  @Input() sendForm:boolean = false;
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
      nombre:[null,[Validators.required,Validators.minLength(1)]],
      paterno:[null,[Validators.required,Validators.minLength(1)]],
      materno:[null],
      telefono:[null,[Validators.required,Validators.minLength(1)]],
      telefonoOficina:[null,[Validators.required,Validators.minLength(1)]],
      email:[null,[Validators.required,Validators.minLength(1)]]
    })
  }
ngOnChanges(changes: any): void {
  if(changes?.sendForm?.currentValue){
     this.form.emit({
      formulario: this.contactoForm.valid ?  this.contactoForm.value : null,
    })
  }
  if(changes?.success?.currentValue){
    this.contactoForm.reset();
  }
}

}
