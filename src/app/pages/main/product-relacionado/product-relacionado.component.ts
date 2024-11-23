import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    standalone: true,
    selector: 'manu-product-relacionado',
    imports: [CarouselModule, CommonModule, ImgErrorDirective],
    templateUrl: './product-relacionado.component.html',
    styleUrl: './product-relacionado.component.scss'
})
export class ProductRelacionadoComponent implements OnInit{

  opc: any;
  arregloRes: any = [];
  url: string = environment.SERVER_URL + '/';
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
    URLhashListener: true,
    freeDrag: true,
    stagePadding: 30,
    startPosition: 'URLHash',
    navText: [
      '<img src="assets/icons/chevron-left.svg" style="width: 70px; height: 70px;">',
      '<img src="assets/icons/chevron-right.svg" style="width: 70px; height: 70px;">'
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
  /* signals */
  lenguaje = signal<string>('');
  showData = signal<boolean>(false);
  data = signal<any>([]);
  getDataBoolean = signal(false);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  constructor() {
    effect( () => {
      this.lenguaje = this.localStorageService.getLanguageSignal();
     
      if(this.lenguaje() && this.getDataBoolean()){
        this.filtraByPublicado()
      }

    }); 
  }


  ngOnInit(): void {
    const opcString:any = this.localStorageService.getItem('opc');
    this.opc = JSON.parse(opcString);
    if(this.opc){
      this.getProductosRelacionados();
    }

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
    this.data.set(this.arregloRes.filter((elemento:any) =>conditionFunction(elemento)));
  }

  getProductosRelacionados() {
    this.showData.set(false);
    this.articlesService
      .getProductosRelacionados({ id_categoria: this.opc.id_categoria, id_subcategoria: this.opc.id_subcategoria })
      .subscribe({
        next: async (res: any) => {
          this.arregloRes = res;
          this.showData.set(true);
          this.getDataBoolean.set(true);
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

  detail(item: any) {
    localStorage.setItem('opc', JSON.stringify(item));
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['detail-product/', item.id_catalogo]);
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
}
