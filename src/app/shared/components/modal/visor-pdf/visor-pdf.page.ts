import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.page.html',
  styleUrls: ['./visor-pdf.page.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule]
})
export class VisorPdfPage implements OnInit {

  @Input() titulo:string='JUAN'
  @Input() pdf!:string
  uri = environment.image+'oportunidades-documentos/'
  visible=false;
  constructor(
    public modalc:ModalController,
    @Inject(PLATFORM_ID) private platform:Object
  ) { }

  ngOnInit() {
    if(isPlatformBrowser(this.platform)){
      this.visible=true
    }
  }

}
