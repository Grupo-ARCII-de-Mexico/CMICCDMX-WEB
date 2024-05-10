import { Component, OnInit } from '@angular/core';
import { Calendario, CalendarioRepository } from 'src/app/shared/repos/calendarios.repository';
import { Curso, CursoRepository } from 'src/app/shared/repos/curso.repository';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';

register();
@Component({
  selector: 'app-fic',
  templateUrl: './fic.page.html',
  styleUrls: ['./fic.page.scss'],
})
export class FicPage implements OnInit {
  paginationConfig = {
    el: '.swiper-pagination', // Selector CSS del elemento que contendrá la paginación
    type: 'bullets', // Tipo de paginación (otros tipos incluyen 'fraction', 'progressbar', etc.)
    clickable: true // Permite hacer clic en los puntos de paginación para cambiar de slide
  };
  breakpoints={
    // Cuando la ventana tiene un ancho mayor o igual a 1024px (pantallas grandes)
    1024: {
      slidesPerView: 4,
    },
    // Cuando la ventana tiene un ancho mayor o igual a 768px pero menor que 1024px (tablets)
    768: {
      slidesPerView: 3,
    },
    // Cuando la ventana tiene un ancho menor a 768px (teléfonos)
    567: {
      slidesPerView: 2,
    },
    167: {
      slidesPerView: 1,
    },
  };
  constructor(
    public headerStatusService:HeaderStatusService,
    private cursoRepo:CursoRepository,
    private calendarioRepo:CalendarioRepository
  ) { }
  uri3= environment.image + "cursos/"
  cursos:Curso[]=[];
  calendarios:Calendario[] = []
  ngOnInit() {
    this.cursoRepo.curso$.subscribe((res:any) =>{
      this.cursos= res.filter((a:any) => a.tipo == 'FIC' )
    })
    this.calendarioRepo.calendario$.subscribe( (res:Calendario[]) => {
      this.calendarios=res.filter((d) => d.tipo == 2)
    })
  }

  checkSection(event:any): void {
    const scrollPosition = event.detail.currentY -50;
    const a = document.getElementById('subheader');
    if(scrollPosition > 100){
      a?.classList.remove('d-md-block')
    }else{
      a?.classList.add('d-md-block')
    }
  }

  openUrl(url:string){
    window.open(url,'_blank')
  }

  urlArchivo = environment.image+'calendarios/'
descargarArchivo(item: Calendario) {
  const a = document.createElement('a');
  a.href = this.urlArchivo + item.archivo;
  a.download = item.texto; // Puedes cambiar 'nombre_archivo' por el nombre que desees para el archivo
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

}
