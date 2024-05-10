import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoPublico } from 'src/app/shared/enums/tipoPublico.enum';

@Component({
  selector: 'prensa-form',
  templateUrl: './prensa-form.page.html',
  styleUrls: ['./prensa-form.page.scss'],
})
export class PrensaFormPage implements OnInit {

  usuarioForm!:FormGroup;
  @Input() disabled=false;
  @Output() usuarioGuardado = new EventEmitter<any>();
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      cargo: [null, Validators.required],
      empresa: [null, Validators.required], // Eliminamos Validators.required para hacerlo opcional
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      tipo: [TipoPublico.PRENSA],
    })
  }


  emit(){
    console.log(this.usuarioForm.value);
    
    this.usuarioGuardado.emit(this.usuarioForm.value)
    this.usuarioForm.reset({
      tipo: [TipoPublico.PRENSA],
  })
  }

}
