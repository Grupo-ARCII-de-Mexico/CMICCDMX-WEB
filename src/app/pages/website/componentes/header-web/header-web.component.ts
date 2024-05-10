import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, MenuController, NavController, PopoverController } from '@ionic/angular';
import { AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'web-header',
  templateUrl: './header-web.component.html',
  styleUrls: ['./header-web.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class HeaderWebComponent  implements OnInit {
  popover!: HTMLIonPopoverElement;
  constructor(
    private menu:MenuController,
    public headerStatusService:HeaderStatusService,
    private router:NavController,
    private popoverController: PopoverController,
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
  open(){
    this.menu.open('website')
  }

  openUrl(url:string){
    window.open(url,'_blank')
  }

  redirect(url:string){
    this.router.navigateForward(url,{animated:false})
  }
  showMenu=false

  async presentPopover() {

  }

  async closePopover() {

      await this.popoverController.dismiss(null,'','popover-button');
   
  }
}
