import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private titleService: Title, private metaService: Meta) { 
    this.titleService.setTitle('CMIC Ciudad de México');
    this.metaService.updateTag({ name: 'description', content: 'Sitio Oficial de la CMIC CDMX' });
    // Twitter
    this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ property: 'twitter:title', content: 'CMIC CDMX' });
    this.metaService.updateTag({ property: 'twitter:description', content: 'Sitio Oficial de la CMIC CDMX' });
    this.metaService.updateTag({ property: 'twitter:image', content: 'https://www.cmiccdmx.org/assets/logo-cd-mexico-1.png' });
    // Facebook
    this.metaService.updateTag({ property: 'og:url', content: '/second' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:description', content: 'Sitio Oficial de la CMIC CDMX' });
    this.metaService.updateTag({ property: 'og:title', content: 'CMIC CDMX' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.cmiccdmx.org/assets/logo-cd-mexico-1.png' });
 
  }


  update(title:string, description: string, image:string){
    console.log(title,description,image);
    
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    // Twitter
    this.metaService.updateTag({ property: 'twitter:card', content: image});
    this.metaService.updateTag({ property: 'twitter:title', content: title });
    this.metaService.updateTag({ property: 'twitter:description', content: description });
    this.metaService.updateTag({ property: 'twitter:image', content: image });
    // Facebook
    this.metaService.updateTag({ property: 'og:url', content: '/second' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:image', content: image });
  }


}
