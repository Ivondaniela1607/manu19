import { NgClass, isPlatformBrowser, CommonModule } from '@angular/common';
import { TransferState, makeStateKey, ChangeDetectionStrategy, ChangeDetectorRef, Component, PLATFORM_ID, Inject , inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
/* import { TranslateModule, TranslateService } from '@ngx-translate/core' */
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImgErrorDirective } from '../../core/directives/imgError.directive';
import { environment } from '@env/environment.development';
import { LocalStorageService } from '@app/services/localStorage.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuTrigger } from '@angular/material/menu';
import { SearchService } from '@app/services/search.service';
import { FormsModule } from '@angular/forms';


const CARRITO_KEY = makeStateKey<any>('carrito');
@Component({    
    selector: 'manu-header',
    imports: [FormsModule, ImgErrorDirective, MatToolbarModule, CommonModule, ImgErrorDirective, RouterLink, MatIconModule, MatTooltipModule, NgClass, MatMenuModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{

  /* variables */
  SOCIAL_PATH =  environment.SERVER_UPLOADS_URL + '/social_networks/';  
  carrito: any
  menuItems: any[] = [];
  languages = [
    { code: 'es', src: 'assets/images/illustrator/españaAI.svg', alt: 'spain' },
    { code: 'en', src: 'assets/images/illustrator/inglaterraAI.svg', alt: 'inglaterra' },
    { code: 'fr', src: 'assets/images/illustrator/franciaAI.svg', alt: 'france' },
    { code: 'po', src: 'assets/images/illustrator/portugalAI.svg', alt: 'portugal' },
    { code: 'it', src: 'assets/images/illustrator/italia.svg', alt: 'italia' }
  ];
  currentFlag = this.languages[0];
  menuOpen = false;
  busqueda: any = '';
  carritoSignal: any;

  /* signals */
  socialNetwoks = input<any>([]);
  lenguaje = signal<string>('es');
  languageDefault = signal<string>('es');

  /* servicios */
/*   private translate = inject(TranslateService); */
  private localStorageService = inject(LocalStorageService);
  private searchService = inject(SearchService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  constructor(@Inject(PLATFORM_ID) private platformId: any,   private state: TransferState,) {
    this.makeMenu();
  }

  changeLanguague(lang: string) {
 /*    this.translate.use(lang) */
    this.lenguaje.set(lang)
    this.languageDefault.set(lang);
    this.localStorageService.setLanguage(lang);
    this.currentFlag = this.languages.find(language => language.code === lang) || this.languages[0];
  }


  hasItems(item: any) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false
  }

  @ViewChild('menuIdioma') menuIdioma!: MatMenuTrigger;
  @ViewChild('menu1') menu1!: MatMenuTrigger;


  ngOnInit(): void {
    this.makeMenu();
/*     this.languageDefault.set(this.translate.getBrowserLang()||''); */
    this.changeLanguague(this.languageDefault())
    this.lenguaje = this.localStorageService.getLanguageSignal();
 
    if (isPlatformBrowser(this.platformId)) {
        this.localStorageService.getCarritoObservable().subscribe((carrito: any) => {
      let carritoResp: any;
      if (typeof carrito === 'object') {
        carritoResp = carrito;
        this.state.set(CARRITO_KEY, carritoResp);
      } else {
        try {
          carritoResp = JSON.parse(carrito);
          this.state.set(CARRITO_KEY, carritoResp);
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          return;
        }
      }

      if (typeof carritoResp === 'object' && carritoResp !== null) {

        this.carrito = carritoResp.reduce((acumulador:any, objeto:any) => acumulador + objeto.cant, 0);
        this.cd.detectChanges();
      } 
    });
    }else {
      this.state.get(CARRITO_KEY, null as any);
    }

  }

  makeMenu() {
    this.menuItems = [
      {
        label_es: 'PRODUCTOS',
        label_en: 'PRODUCTS',
        label_fr: 'PRODUITS',
        label_po: 'PRODUTOS',
        label_it: 'PRODOTTI',
        subItems: [
          {
            label_es: 'Parques infantiles',
            label_en: 'Playground equipment',
            label_fr: 'Aires de jeux',
            label_po: 'Parques infantis',
            label_it: 'Parchi per bambini',
            link: 'categoria/1',
          },
          {
            label_es: 'Mobiliario urbano',
            label_en: 'Urban forniture',
            label_fr: 'Mobilier urbain',
            label_po: 'Mobiliário urbano',
            label_it: 'Arredo urbano',
            link: 'categoria/3',
          },
          {
            label_es: 'Equipamiento deportivo',
            label_en: 'Sports equipment',
            label_fr: 'Equipement sportif',
            label_po: 'Equipamento desportivo',
            label_it: 'Attrezzatura sportiva',
            link: 'categoria/2',
          },
          {
            label_es: 'Repuestos',
            label_en: 'Spare parts',
            label_fr: 'Des pièces de rechange',
            label_po: 'Peças de reposição',
            label_it: 'Pezzi di ricambio',
            link: 'repuestos',
          },
          {
            label_es: 'Novedades',
            label_en: 'New products',
            label_fr: 'Nouveautes',
            label_po: 'Novo produto',
            label_it: 'Notizia',
            link: 'novedades',
          },
          {
            label_es: 'Ofertas',
            label_en: 'Offers',
            label_fr: 'Offres',
            label_po: 'Ofertas',
            label_it: 'Offerte',
            link: 'ofertas',
          },
          {
            label_es: 'Outlet',
            label_en: 'Outlet',
            label_fr: 'Outlet',
            label_po: 'Outlet',
            label_it: 'Outlet',
            link: 'outlet',
          },
        ],
      },
      {
        label_es: 'EMPRESA',
        label_en: 'COMPANY',
        label_fr: 'ENTREPRISE',
        label_po: 'EMPRESA',
        label_it: 'AZIENDA',
        subItems: [
          {
            label_es: 'Sobre nosotros',
            label_en: 'About us',
            label_fr: 'À propos de nous',
            label_po: 'Sobre nós',
            label_it: 'Chi siamo',
            link: 'empresa/sobrenosotros',
          },
          {
            label_es: 'Garantía',
            label_en: 'Warranty',
            label_fr: 'Garantie',
            label_po: 'Garantia',
            label_it: 'Garanzia',
            link: 'empresa/garantia',
          },
          {
            label_es: 'Noticias',
            label_en: 'News',
            label_fr: 'Nouvelles',
            label_po: 'Notícias',
            label_it: 'Notizia',
            link: 'view-news',
          },
          {
            label_es: 'Profesionales',
            label_en: 'Professionals',
            label_fr: 'Professionnels',
            label_po: 'Profissionais',
            label_it: 'Professionisti',
            link: 'empresa/profesionales',
          },
          {
            label_es: 'Catálogos',
            label_en: 'Catalogs',
            label_fr: 'Catalogues',
            label_po: 'Catálogos',
            label_it: 'Cataloghi',
            link: 'catalogo',
          },
        ],
      },
      {
        label_es: 'SERVICIOS',
        label_en: 'SERVICES',
        label_fr: 'PRESTATIONS DE SERVICE',
        label_po: 'SERVIÇOS',
        label_it: 'SERVIZI',
        link: 'empresa/servicios',
      },
      {
        label_es: 'CONTACTO',
        label_en: 'CONTACT',
        label_fr: 'CONTACT',
        label_po: 'CONTATO',
        label_it: 'CONTATTO',
        link: 'empresa/contacto',
      },
    ]
  }

  expandInput() {
    const input = document.querySelector('.input-field') as HTMLInputElement;
    input.style.width = '130%';
  }

  collapseInput() {
    const input = document.querySelector('.input-field') as HTMLInputElement;
    input.style.width = '25%';
  }

  getLabel(item: any): string {
    if (!item) return '';
    const language = this.lenguaje();
    switch (language) {
      case 'es': return item.label_es;
      case 'en': return item.label_en;
      case 'fr': return item.label_fr;
      case 'po': return item.label_po;
      case 'it': return item.label_it;
      default: return item.label_es || '';
    }
  }

  onClick(item: any) {
    if (!item) return;
    if(item.link) {
      this.menuOpen = !this.menuOpen;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([item.link]);
  
      });
    }
  }

  onClick1(item: any) {
    if (!item) return;
    if(item.link) {
      this.menuOpen = !this.menuOpen;
      this.router.navigate([item.link]);
    }
  }

  onClickNoResp(item: any) {
    if (!item) return;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([item]);
    });
  }

  onClick1NoResp(item: any) {
    if (!item) return;
    if(item.link) {
      this.router.navigate([item.link]);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleSubMenu(item: any): void {
    item.open = !item.open;
  }

  searchGlobalPress(event:any){
    if (event.key === "Enter") {
      this.searchService.realizarBusqueda(this.busqueda);
      this.busqueda = null;
      this.router.navigate(['search']);
    }
  }

  searchGlobal(){
    this.searchService.realizarBusqueda(this.busqueda);
    this.busqueda = null;
    this.router.navigate(['search']);
  }

}
