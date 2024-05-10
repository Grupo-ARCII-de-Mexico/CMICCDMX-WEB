import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoPublico } from 'src/app/shared/enums/tipoPublico.enum';

@Component({
  selector: 'afiliado-form',
  templateUrl: './afiliado-form.page.html',
  styleUrls: ['./afiliado-form.page.scss'],
})
export class AfiliadoFormPage implements OnInit {

  usuarioForm!:FormGroup;
  @Input() disabled=false;
  @Input() delegaciones: any;
  @Input() extranjero?:any;
  @Input() estados?:any;
  @Output() usuarioGuardado = new EventEmitter<any>();
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      rfc: [null], // Eliminamos Validators.required para hacerlo opcional
      cargo: [null], // Eliminamos Validators.required para hacerlo opcional
      delegacion: [null, Validators.required], // Eliminamos Validators.required para hacerlo opcional
      numAfiliado: [null, Validators.required], // Eliminamos Validators.required para hacerlo opcional
      estado: [null], // Eliminamos Validators.required para hacerlo opcional
      tipo: [TipoPublico.AFILIADOS],
    })
  }


  emit(){
    this.usuarioGuardado.emit(this.usuarioForm.value);
    this.usuarioForm.reset({
      tipo: [TipoPublico.AFILIADOS],
  })
  }
}
