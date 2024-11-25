import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { IUrbangym } from '@app/interfaces/urbangym.interface';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment.development';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
/* import { TranslateModule } from '@ngx-translate/core'; */


@Component({
    selector: 'manu-urban-gym',
    imports: [ImgErrorDirective, CarouselModule, CommonModule],
    templateUrl: './urban-gym.component.html',
    styleUrl: './urban-gym.component.scss'
})
export class UrbanGymComponent implements OnInit{
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
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
  };

    /* variables */
    lenguajes = ['es', 'en', 'fr', 'po', 'it'];
    url: string = environment.SERVER_URL + '/';

    arregloRes: any = [];
  
    /* signals */
    lenguaje = signal<string>('');
    data = signal<IUrbangym>({});
    slidesStore = signal<any>([]);
    slideBoolean = signal<boolean>(false);
    getDataBoolean = signal(false);
  
    /* serivces */
    private articlesService = inject(ArticlesService);
    private localStorageService = inject(LocalStorageService);
    private router = inject(Router);

    constructor() {
      effect(() => {
        this.lenguaje = this.localStorageService.getLanguageSignal();
        if (this.lenguaje() && this.getDataBoolean()) {
          this.filtraByPublicado();
        }
      });
    }

    ngOnInit(): void {
      this.getUrbanGymConfig();
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
      
      this.slidesStore.set(this.arregloRes.filter((elemento:any) =>conditionFunction(elemento)));
    }

    getUrbanGymConfig() {
      this.slideBoolean.set(false);
      this.articlesService.getUrbanGymConfig({}).subscribe({
        next: async (res: any) => {
          this.data.set(res[0]);
          this.articlesService.getUrbanGym({ id_subcategoria: this.data().id_subcategoria }).subscribe({
            next: async (res: any) => {
              this.arregloRes = res;
              this.slideBoolean.set(true);
              this.getDataBoolean.set(true);
            },
          });
        },
      });
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

    getSubcatProducts() {
      this.localStorageService.setItem('opcSubcat', JSON.stringify(this.slidesStore()[0]));
      this.router.navigate(['subcategory/', this.slidesStore()[0].id_categoria]);
    }

    isDragging = false;

    onMouseDown(): void {
      this.isDragging = false;
    }
  
    onMouseMove(): void {
      this.isDragging = true;
    }
  
    onMouseUp( item: any): void {
      if (!this.isDragging) {
        this.detail(item);
      }
      this.isDragging = false;
    }
  
    detail(item: any){
      this.localStorageService.setItem('opc', JSON.stringify(item));
      this.router.navigate(['detail-product/',item.id_catalogo]);
    }

}
