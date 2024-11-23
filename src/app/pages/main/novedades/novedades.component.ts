import { CommonModule} from '@angular/common';
import { Component,  inject, OnInit, signal, HostListener, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { CardItemComponent } from './card-item/card-item.component';

@Component({
    selector: 'manu-novedades',
    imports: [CardItemComponent, MatTabsModule, RouterLink, CommonModule],
    templateUrl: './novedades.component.html',
    styleUrl: './novedades.component.scss'
})
export class NovedadesComponent implements OnInit {

  imagenes: string[] = [];
  byCategoriaPI: any = [];
  byCategoriaED: any = [];
  byCategoriaMU: any = [];
  novedadesFilter: any[] = [];
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
  novedades = signal<any>([]);
  isLoading = signal<boolean>(false);
  getDataBoolean = signal(false);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);


  constructor() {
    effect( () => {
      this.lenguaje = this.localStorageService.getLanguageSignal();
      if(this.lenguaje() && this.getDataBoolean()){
        this.opcNovedad(1)

      }
    }); 
  }

  ngOnInit(): void {
    this.checkMobile();
    this.getNovedades();
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1200 ? true : false;
  }

  getNovedades(){
    this.articlesService
        .getNoveltyByCategory({})
        .subscribe({
          next: async (res: any) => {
            this.novedades.set(res);
            this.getDataBoolean.set(true);
            this.opcNovedad(1);
          },
        });
  }

  opcNovedad(opc: any) {
    this.opc = opc;
    let conditionFunction;
    switch (this.lenguaje()) {
      case 'es':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc  && objeto.p_es === '1' : objeto.p_es === '1';
        break;
      case 'en':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc  && objeto.p_en === '1' : objeto.p_en === '1';
        break;
      case 'fr':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc  && objeto.p_fr === '1' : objeto.p_fr === '1';
        break;
      case 'po':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc  && objeto.p_po === '1' : objeto.p_po === '1';
        break;
      case 'it':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc  && objeto.p_it === '1' : objeto.p_it === '1';
        break;
      default:
        console.error('Lenguaje no válido');
        return;
    }
    this.byCategoriaPI = this.novedades().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 1);
    this.byCategoriaED = this.novedades().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 2);
    this.byCategoriaMU = this.novedades().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 3);
    this.novedadesFilter = this.novedades().filter(conditionFunction);
    this.isLoading.set(this.novedades().length > 0);

    this.secuencia= [];

      const numeroDeElementos = this.novedadesFilter.length;
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

  detail(item: any){
    this.localStorageService.setItem('opc', JSON.stringify(item));
    this.router.navigate(['detail-product/',item.id_catalogo]);
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
