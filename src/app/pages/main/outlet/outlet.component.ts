import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';

@Component({
    standalone: true,
    selector: 'manu-outlet',
    imports: [ImgErrorDirective, MatTabsModule, RouterLink, CommonModule],
    templateUrl: './outlet.component.html',
    styleUrl: './outlet.component.scss'
})
export class OutletComponent implements OnInit{

  /* variabls */
  outletsFilter: any = [];
  byCategoriaPI: any = [];
  byCategoriaED: any = [];
  byCategoriaMU: any = [];
  url: string = environment.SERVER_URL + '/';
  opc: any;
  selectedTabIndex = 0;
  

  /* signals */
  lenguaje = signal<string>('');
  outlets = signal<any>([]);
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
        this.opcOutlet(1);
      }
    });
  }

  ngOnInit(): void {
    /*     this.checkMobile(); */
    this.getOutlet();
  }

  getOutlet(){
    this.articlesService
        .getOutletByCategory({})
        .subscribe({
          next: async (res: any) => {
            this.outlets.set(res);
            this.opcOutlet(1);
            this.getDataBoolean.set(true);
          },
        });
  }

  opcOutlet(opc: any) {
    this.opc = opc;
    let conditionFunction;
    switch (this.lenguaje()) {
      case 'es':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.ot_es === '1' && objeto.p_es === '1' : objeto.ot_es === '1' && objeto.p_es === '1';
        break;
      case 'en':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.ot_en === '1' && objeto.p_en === '1' : objeto.ot_en === '1' && objeto.p_en === '1';
        break;
      case 'fr':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.ot_fr === '1' && objeto.p_fr === '1' : objeto.ot_fr === '1' && objeto.p_fr === '1';
        break;
      case 'po':
        conditionFunction = (objeto:any) => (opc != 4) ? objeto.id_categoria === opc && objeto.ot_po === '1' && objeto.p_po === '1' : objeto.ot_po === '1' && objeto.p_po === '1';
        break;
      default:
        console.error('Lenguaje no válido');
        return;
    }
    this.byCategoriaPI = this.outlets().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 1);
    this.byCategoriaED = this.outlets().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 2);
    this.byCategoriaMU = this.outlets().filter((elemento:any) => conditionFunction(elemento) && elemento.id_categoria === 3);
    this.outletsFilter = this.outlets().filter(conditionFunction);
    this.isLoading.set(this.outlets().length > 0);
    
  }

  detail(item: any){
    this.localStorageService.setItem('opc', JSON.stringify(item));
    this.router.navigate(['detail-product/',item.id_catalogo]);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
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
