import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LocalStorageService } from '@app/services/localStorage.service';
import { ArticlesService } from '@app/services/articles.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '@env/environment.development';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
    selector: 'manu-novelty',
    imports: [CarouselModule, CommonModule, RouterLink, ImgErrorDirective],
    templateUrl: './novelty.component.html',
    styleUrl: './novelty.component.scss'
})
export class NoveltyComponent implements OnInit {
  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    autoWidth: true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    dotsData: true,
    // margin: 2,
    center: true,

    // slideBy: 2,
    navSpeed: 700,
    URLhashListener: false,
    freeDrag: true,
    stagePadding: 30,
    startPosition: 'URLHash',
    navText: [
      '<',
      '>'
    ],
    // navText: ['Anterior', 'Siguiente'],
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  isMobile = false;
  arregloRes: any = [];

  /* variables */
  lenguajes = ['es', 'en', 'fr', 'po', 'it'];
  url: string = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  slidesStore = signal<any[]>([]);
  slideBoolean = signal<boolean>(false);


  /* serivces */
  private sanitizer = inject(DomSanitizer);
  private articlesService = inject(ArticlesService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);


  constructor() {
    const sanitizedLeftNav = this.sanitizer.bypassSecurityTrustHtml(
      '<img src="assets/icons/chevron-left.svg" style="width: 70px; height: 70px;">'
    );

    const sanitizedRightNav = this.sanitizer.bypassSecurityTrustHtml(
      '<img src="assets/icons/chevron-right.svg" style="width: 70px; height: 70px;">'
    );
    effect( () => {
      this.lenguaje = this.localStorageService.getLanguageSignal();
      if (this.lenguaje()) {
        this.filtraByPublicado();
      }
    }); 
  }

  ngOnInit(): void {
    this.getNoveltyByCategoryHome();
  }

  filtraByPublicado(){
    let conditionFunction;
    switch (this.lenguaje()) {
      case 'es':
        conditionFunction = (element:any) =>
          element.p_es === '1';
        break;
      case 'en':
        conditionFunction = (element:any) =>
          element.p_en === '1';
        break;
      case 'fr':
        conditionFunction = (element:any) =>
          element.p_fr === '1';
        break;
      case 'po':
        conditionFunction = (element:any) =>
          element.p_po === '1';
        break;
      case 'it':
        conditionFunction = (element:any) =>
          element.p_it === '1';
        break;
      default:
        console.error('Lenguaje no válido');
        return;
    }

        
    this.slidesStore.set(this.arregloRes.filter(
      (elemento:any) =>
        conditionFunction(elemento)
    ));

/*     this.slidesStore.set(
      this.arregloRes
        .filter((elemento: any) => {
          return conditionFunction(elemento) && elemento.image && elemento.image.ruta;
        })
        .map((elemento: any) => {
          elemento.image.sanitizedRuta = this.sanitizer.bypassSecurityTrustUrl(elemento.image.ruta);
          return elemento;
        })
    );  */   

  }

  getNoveltyByCategoryHome() {
    this.slideBoolean.set(false);
    this.articlesService.getNoveltyByCategoryHome({}).subscribe({
      next: async (res: any) => {
        this.arregloRes = res;
        this.filtraByPublicado();
        
      },
    });
  }

  isDragging = false;

  onMouseDown(): void {
    this.isDragging = false;
  }

  onMouseMove(): void {
    this.isDragging = true;
  }

  onMouseUp(item: any): void {
    if (!this.isDragging) {
      this.detail(item);
    }
    this.isDragging = false;
  }

  detail(item: any): void {
    this.localStorageService.setItem('opc', JSON.stringify(item));
    this.router.navigate(['detail-product/', item.id_catalogo]);
  }

  getNombreCatalogo(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.nombre_es;
      case 'en':
        return item.nombre_en;
      case 'fr':
        return item.nombre_fr;
      case 'po':
        return item.nombre_po;
      case 'it':
        return item.nombre_it;
      default:
        return item.nombre_es;
    }
  }

}
