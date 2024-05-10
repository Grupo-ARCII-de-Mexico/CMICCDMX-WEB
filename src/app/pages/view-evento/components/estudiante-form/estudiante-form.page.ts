import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoPublico } from 'src/app/shared/enums/tipoPublico.enum';

@Component({
  selector: 'estudiante-form',
  templateUrl: './estudiante-form.page.html',
  styleUrls: ['./estudiante-form.page.scss'],
})
export class EstudianteFormPage implements OnInit {

  usuarioForm!:FormGroup;
  @Input() disabled=false;
  @Input() delegaciones: any;
  @Input() extranjero?:any;
  @Input() estados?:any;
  @Output() usuarioGuardado = new EventEmitter<any>();
  @Output() upload = new EventEmitter<any>();
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      curp: [null, Validators.required], // Eliminamos Validators.required para hacerlo opcional
      evidencia: [], // Eliminamos Validators.required para hacerlo opcional
      estado: [], // Eliminamos Validators.required para hacerlo opcional
      tipo: [TipoPublico.ESTUDIANTES],
    })
  }


  emit(){
    this.usuarioGuardado.emit(this.usuarioForm.value)
    this.usuarioForm.reset({
      tipo: [TipoPublico.ESTUDIANTES],
  })
  }

  uploads(){
    this.upload.emit(true)
  }

}
