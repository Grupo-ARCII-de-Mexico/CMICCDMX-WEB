import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { GenericService } from '../services/generic-service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { Auth, AuthRepository } from '../repos/auth.repository';
import { ErrorService } from '../services/error.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Afiliado, AfiliadoRepository } from '../repos/afiliado.repository';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuard implements CanActivate {
  private first: boolean = true;
  constructor(
    private genericService:GenericService,
    private nav:NavController, 
    private errorService:ErrorService,
    private afiliadoRepo:AfiliadoRepository ) {}
  canActivate(route: ActivatedRouteSnapshot,): boolean {

    if(sessionStorage.getItem(environment.jwt)) {
      console.log('entree');
      
      this.genericService.getOne<any>('afiliados/id',sessionStorage.getItem(environment.jwt) || 0).pipe(
        catchError((error) => {
          this.errorService.catchError(error);
          return of(error)
        }),
        tap( (user:Afiliado) => {
          this.afiliadoRepo.setAfiliado([user]);
        })
      ).subscribe()
      return true; 
     }else {
      this.nav.navigateForward('/website');
      sessionStorage.clear();
      return false;
     }
    


  }



}