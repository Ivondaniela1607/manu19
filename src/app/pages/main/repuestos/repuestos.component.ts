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
    selector: 'manu-repuestos',
    imports: [ImgErrorDirective, MatTabsModule, RouterLink, CommonModule],
    templateUrl: './repuestos.component.html',
    styleUrl: './repuestos.component.scss'
})
export class RepuestosComponent implements OnInit {

  /* variables */
  imagenes: string[] = [];
  repuestosFilter: any[] = [];
  byCategoriaPI: any = [];
  byCategoriaED: any = [];
  byCategoriaMU: any = [];
  url: string = environment.SERVER_URL + '/';
  opc: any;
  selectedTabIndex = 0;

  /* signals */
  lenguaje = signal<string>('');
  repuestos = signal<any>([]);
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
        this.opcRepuesto(1);
      }
    });
  }
  
  ngOnInit(): void {
    /* this.checkMobile(); */
    this.getRepuestos();
  }
  
  getRepuestos(){
    this.articlesService
        .getRepuestosByCategory({})
        .subscribe({
          next: async (res: any) => {
            this.repuestos.set(res);
            this.opcRepuesto(1);
            this.getDataBoolean.set(true); 
          },
        });
  }
  
  opcRepuesto(opc: any){
    this.opc = opc;
    let conditionFunction;
    switch (this.lenguaje()) {
      case 'es':
        conditionFunction = (objeto: any) => (opc != 4) ? objeto.id_categoria === opc && objeto.p_es === '1' : objeto.p_es === '1';
        break;
      case 'en':
        conditionFunction = (objeto: any) => (opc != 4) ? objeto.id_categoria === opc && objeto.p_en === '1' : objeto.p_en === '1';
        break;
      case 'fr':
        conditionFunction = (objeto: any) => (opc != 4) ? objeto.id_categoria === opc && objeto.p_fr === '1' : objeto.p_fr === '1';
        break;
      case 'po':
        conditionFunction = (objeto: any) => (opc != 4) ? objeto.id_categoria === opc && objeto.p_po === '1' : objeto.p_po === '1';
        break;
      case 'it':
        conditionFunction = (objeto: any) => (opc != 4) ? objeto.id_categoria === opc && objeto.p_it === '1' : objeto.p_it === '1';
        break;
      default:
        console.error('Lenguaje no válido');
        return;
    }
  
   
    this.byCategoriaPI = this.repuestos().filter((elemento: any) => conditionFunction(elemento) && elemento.id_categoria === 1);
    this.byCategoriaED = this.repuestos().filter((elemento: any) => conditionFunction(elemento) && elemento.id_categoria === 2);
    this.byCategoriaMU = this.repuestos().filter((elemento: any) => conditionFunction(elemento) && elemento.id_categoria === 3);
    this.repuestosFilter = this.repuestos().filter(conditionFunction);

    this.isLoading.set(true); 
  }
  
  detail(item: any){
    this.localStorageService.setItem('opc', JSON.stringify(item));
    this.router.navigate(['detail-product/',item.id_catalogo]);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
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
}
