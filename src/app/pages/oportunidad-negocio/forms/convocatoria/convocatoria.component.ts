import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.scss'],
})
export class ConvocatoriaComponent  implements OnInit {

  @Input() convocatoria!:string;
  @Input() documento!:string;

  uri= environment.image + 'oportunidades-documentoInformativo/'
  constructor() { }

  ngOnInit() {}

}
