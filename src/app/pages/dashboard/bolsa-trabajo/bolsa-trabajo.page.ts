import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { BolsaTrabajo, BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-bolsa-trabajo',
  templateUrl: './bolsa-trabajo.page.html',
  styleUrls: ['./bolsa-trabajo.page.scss'],
})
export class BolsaTrabajoPage implements OnInit {
  idAfiliado!:number;
  constructor(
    private gService:GenericService,
    private bolsaRepo:BolsaTrabajoRepository,
    private afiliadoRepo:AfiliadoRepository
  ) { }

  ngOnInit() {
    this.afiliadoRepo.user$
    .pipe(
      switchMap( res => {
        this.idAfiliado = res[0].id;
        return this.gService.getAll<BolsaTrabajo[]>('bolsa-trabajo')
      })
    ).
    subscribe((res) => {
      this.bolsaRepo.setBolsaTrabajo(res.filter( x => x.idAfiliado && x.idAfiliado == this.idAfiliado))
    } )
  }
}
