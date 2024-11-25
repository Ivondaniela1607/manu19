import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { SearchService } from '@app/services/search.service';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { CardBusquedaComponent } from './card-busqueda/card-busqueda.component';


@Component({
    selector: 'manu-search',
    imports: [RouterLink, CommonModule, CardBusquedaComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  busqueda: any;
  byCategoriaPI: any = [];
  byCategoriaED: any = [];
  byCategoriaMU: any = [];


  /* signals */
  lenguaje = signal<string>('');
  resultadoBusqueda = signal<any>([]);
  showData = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  


  /* serivces */
  private searchService = inject(SearchService);
  private localStorageService = inject(LocalStorageService);
  private articlesService = inject(ArticlesService);
  private router = inject(Router);

  constructor() {
    effect( () => {
      this.busqueda = this.searchService.busqueda$;
      this.lenguaje = this.localStorageService.getLanguageSignal();
      if(this.lenguaje()){
        this.getBusqueda();
      }
    }); 
  }

  ngOnInit(): void {
    this.showData.set(false);
    this.busqueda = this.searchService.busqueda$;
    if(!this.busqueda()){
      this.router.navigate([''])
    }
    if (this.busqueda()) {
      this.getBusqueda();
    }
    this.lenguaje = this.localStorageService.getLanguageSignal();
    this.byCategoriaPI = [];
    this.byCategoriaED = [];
    this.byCategoriaMU = [];
  }


  getBusqueda() {
    this.showData.set(false);
    this.isLoading.set(true);
    this.articlesService.getBusqueda({ busqueda: this.busqueda() }).subscribe({
      next: async (res: any) => {
        this.resultadoBusqueda.set(res);

        this.isLoading.set(false);
        this.showData.set(true);
        let conditionFunction;
        switch (this.lenguaje()) {
          case 'es':
            conditionFunction = (element:any) =>
              element.p_es === '1' && element.activo === 1;
            break;
          case 'en':
            conditionFunction = (element:any) =>
              element.p_en === '1' && element.activo === 1;
            break;
          case 'fr':
            conditionFunction = (element:any) =>
              element.p_fr === '1' && element.activo === 1;
            break;
          case 'po':
            conditionFunction = (element:any) =>
              element.p_po === '1' && element.activo === 1;
            break;
          case 'it':
            conditionFunction = (element:any) =>
              element.p_it === '1' && element.activo === 1;
            break;
          default:
            console.error('Lenguaje no válido');
            return;
        }

        this.byCategoriaPI = this.resultadoBusqueda().filter(
          (elemento:any) =>
            conditionFunction(elemento) && elemento.id_categoria === 1
        );
        this.byCategoriaED = this.resultadoBusqueda().filter(
          (elemento:any) =>
            conditionFunction(elemento) && elemento.id_categoria === 2
        );
        this.byCategoriaMU = this.resultadoBusqueda().filter(
          (elemento:any) =>
            conditionFunction(elemento) && elemento.id_categoria === 3
        );

      },
    });
  }
}
