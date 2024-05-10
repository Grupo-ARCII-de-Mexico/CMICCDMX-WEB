import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'web-footer',
  templateUrl: './footer-web.component.html',
  styleUrls: ['./footer-web.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule, RouterModule]
})
export class FooterWebComponent  implements OnInit {

  constructor(
    private afiliadoRepo :AfiliadoRepository
  ) { }
  sessionActive = false;
  ngOnInit() {
    this.afiliadoRepo.user$.subscribe(user=>{
      if(user.length>0){
        this.sessionActive=true
      }else{
        this.sessionActive=false
      }
    })
    if(sessionStorage.getItem(environment.jwt)){
      this.sessionActive=true
    }
  }

  ionViewWillEnter(){
    if(sessionStorage.getItem(environment.jwt)){
      this.sessionActive=true
    }
  }
  openUrl(url:string){
    window.open(url,'_blank')
  }
}
