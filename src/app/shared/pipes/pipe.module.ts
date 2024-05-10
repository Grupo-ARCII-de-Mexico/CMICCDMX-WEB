import { NgModule } from "@angular/core";
import { FiltroBusquedaPipe } from "./filtro-busqueda.pipe";
import { FiltroUsuarioPipe } from "./filtro-usuario";
import { FiltroEmpresaPipe } from "./filtro-empresa.pipe";
import { FiltroEventoPipe } from "./filtro-evento.pipe";
import { FiltroLicitacionPipe } from "./filtro-licitacion.pipe";
import { FiltroNegocioPipe } from "./filtro-negocio.pipe";
import { FiltroDirectorioPipe } from "./filtro-directorio.pipe";
import { FiltroBolsaTrabajoPipe } from "./filtro-bolsa-trabajo.pipe";
import { FiltroBolsaTrabajoPostulantePipe } from "./filtro-bolsa-trabajo-postulantes";

@NgModule({
  declarations: [FiltroUsuarioPipe, FiltroBusquedaPipe, FiltroEmpresaPipe, FiltroEventoPipe, FiltroLicitacionPipe, FiltroNegocioPipe, FiltroDirectorioPipe, FiltroBolsaTrabajoPipe,FiltroBolsaTrabajoPostulantePipe],
  exports: [FiltroUsuarioPipe, FiltroBusquedaPipe, FiltroEmpresaPipe, FiltroEventoPipe, FiltroLicitacionPipe, FiltroNegocioPipe, FiltroDirectorioPipe, FiltroBolsaTrabajoPipe, FiltroBolsaTrabajoPostulantePipe]
})
export class PipeModule { }
