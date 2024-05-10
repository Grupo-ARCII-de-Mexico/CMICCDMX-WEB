import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto proporcionará una única instancia global del servicio
})
export class HeaderStatusService {

  constructor(
    @Inject(PLATFORM_ID) private platform:Object
  ){
    
  }

  private booleanSubject = new BehaviorSubject<boolean>(true);
  booleanObservable$: Observable<boolean> = this.booleanSubject.asObservable();

  setBooleanStatus(event:any) {
    if(isPlatformBrowser(this.platform)) {
      const scrollPosition = event.detail.currentY -50;
      const a = document.getElementById('subheader');
      if(scrollPosition > 100){
        this.booleanSubject.next(false);
      }else{
        this.booleanSubject.next(true);
      }
    }
  }

  setValue(value:boolean){
    this.booleanSubject.next(value)
  }
}
