import { CommonModule } from '@angular/common';
import { HostListener,  Component, inject, OnInit, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { CardItemComponent } from './card-item/card-item.component';

@Component({
    selector: 'manu-ofertas',
    imports: [TranslateModule, CardItemComponent, MatTabsModule, RouterLink, CommonModule],
    templateUrl: './ofertas.component.html',
    styleUrl: './ofertas.component.scss'
})
export class OfertasComponent implements OnInit{
  imagenes: string[] = [];
  byCategoriaPI: any = [];
  byCategoriaED: any = [];
  byCategoriaMU: any = [];
  ofertasFilter: any[] = [];
  numerosDeFila: any[] = [];
  url: string = environment.SERVER_URL + '/';
  secuencia: any = [];
  numeroDeFilas: any;
  alturaFilas: any;
  secuenciaPI: any = [];
  numeroDeFilasPI: any;
  alturaFilasPI: any;
  secuenciaED: any = [];
  numeroDeFilasED: any;
  alturaFilasED: any;
  secuenciaMU: any = [];
  numeroDeFilasMU: any;
  alturaFilasMU: any;
  opc: any;
  isMobile = false;
  display: any;

  selectedTabIndex = 0;

  /* signals */
  lenguaje = signal<string>('');
  ofertas = signal<any>([]);
  isLoading = signal<boolean>(false);
  getDataBoolean = signal(false);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);


  constructor() {
    effect(() => {
      this.lenguaje = this.localStorageService.getLanguageSignal();
      if (this.lenguaje() && this.getDataBoolean()) {
        this.opcOferta(1);
      }
    });
  }

  ngOnInit(): void {
    this.checkMobile();
    this.getOferta();
  }



  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }

  detail(item: any){
    this.localStorageService.setItem('opc', JSON.stringify(item));
    this.router.navigate(['detail-product/',item.id_catalogo]);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1200 ? true : false;
  }

  getOferta(){
    this.articlesService
        .getOfertaByCategory({})
        .subscribe({
          next: async (res: any) => {
            this.ofertas.set(res);
            this.opcOferta(1);
            this.getDataBoolean.set(true); 
          },
        });
  }

  opcOferta(opc: any) {
    this.opc = opc;
    let conditionFunction;
    switch (this.lenguaje()) {
      case 'es':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.o_es === '1' && objeto.p_es === '1' : objeto.o_es === '1' && objeto.p_es === '1';
        break;
      case 'en':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.o_en === '1' && objeto.p_en === '1' : objeto.o_en === '1' && objeto.p_en === '1';
        break;
      case 'fr':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.o_fr === '1' && objeto.p_fr === '1' : objeto.o_fr === '1' && objeto.p_fr === '1';
        break;
      case 'po':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.o_po === '1' && objeto.p_po === '1' : objeto.o_po === '1' && objeto.p_po === '1';
        break;
      case 'it':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.o_it === '1' && objeto.p_it === '1' : objeto.o_it === '1' && objeto.p_it === '1';
        break;
      default:
        console.error('Lenguaje no válido');
        return;
    }
    this.byCategoriaPI = this.ofertas().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 1);
    this.byCategoriaED = this.ofertas().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 2);
    this.byCategoriaMU = this.ofertas().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 3);
    this.ofertasFilter = this.ofertas().filter(conditionFunction);
    this.isLoading.set(this.ofertas().length > 0);

    
    this.secuencia= [];

      const numeroDeElementos = this.ofertasFilter.length;
      this.numeroDeFilas = Math.ceil(numeroDeElementos / 5) * 2;

      this.alturaFilas = `repeat(${this.numeroDeFilas}, 210px)`;
      
        
      if(this.isMobile){
        this.display = 'block';
        for (let i = 1; i <= this.numeroDeFilas; i++) {  
          this.secuencia += `"item${i}"\n`;
        }
      } else {
        this.display = 'grid';
        for (let i = 1; i <= this.numeroDeFilas / 2; i++) {  
          this.secuencia += `"item${5 * (i - 1) + 1} item${5 * (i - 1) + 1} item${5 * (i - 1) + 2} item${5 * (i - 1) + 3}"\n`;
          this.secuencia += `"item${5 * (i - 1) + 1} item${5 * (i - 1) + 1} item${5 * (i - 1) + 4} item${5 * (i - 1) + 5}"\n`;
        }
      }

      this.secuenciaPI= [];
      this.secuenciaED= [];
      this.secuenciaMU= [];

      const numeroDeElementosPI = this.byCategoriaPI.length;
      const numeroDeElementosED = this.byCategoriaED.length;
      const numeroDeElementosMU = this.byCategoriaMU.length;

      this.numeroDeFilasPI = Math.ceil(numeroDeElementosPI / 5) * 2;
      this.numeroDeFilasED = Math.ceil(numeroDeElementosED / 5) * 2;
      this.numeroDeFilasMU = Math.ceil(numeroDeElementosMU / 5) * 2;

      this.alturaFilasPI = `repeat(${this.numeroDeFilasPI}, 210px)`;
      this.alturaFilasED = `repeat(${this.numeroDeFilasED}, 210px)`;
      this.alturaFilasMU = `repeat(${this.numeroDeFilasMU}, 210px)`;

      this.secuenciaPI = this.generarSecuencia(this.numeroDeFilasPI);
      this.secuenciaED = this.generarSecuencia(this.numeroDeFilasED);
      this.secuenciaMU = this.generarSecuencia(this.numeroDeFilasMU);

  }


  generarSecuencia(numeroDeFilas:number) {
    let secuencia = "";

    for (let i = 1; i <= numeroDeFilas/2; i++) {
        secuencia += `"item${5 * (i - 1) + 1} item${5 * (i - 1) + 1} item${5 * (i - 1) + 2} item${5 * (i - 1) + 3}"\n`;
        secuencia += `"item${5 * (i - 1) + 1} item${5 * (i - 1) + 1} item${5 * (i - 1) + 4} item${5 * (i - 1) + 5}"\n`;
    }

    return secuencia;
  }

  getNombreProducto(item: any): string {
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

  getOfertaTexto(item: any): string | null {
    const language = this.lenguaje();
    if (language === 'es' && item.o_es === '1') return 'OFERTA';
    if (language === 'en' && item.o_en === '1') return 'OFFER';
    if (language === 'fr' && item.o_fr === '1') return 'OFFRE';
    if (language === 'po' && item.o_po === '1') return 'OFERECER';
    if (language === 'it' && item.o_it === '1') return 'OFFERTA';
    return null;
  }

  getCategoriaTexto(category: any): string {
    if(category && category.length > 0){
      const categoria = category[0];
      if (!categoria) return '';
      switch (this.lenguaje()) {
        case 'es':
          return categoria.categoria_es;
        case 'en':
          return categoria.categoria_en;
        case 'fr':
          return categoria.categoria_fr;
        case 'po':
          return categoria.categoria_po;
        case 'it':
          return categoria.categoria_it;
        default:
          return '';
      }
    }else{
      return ''
    }
  }

}
