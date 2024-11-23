import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ICategoria } from '@app/interfaces/categoria.interface';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment.development';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { FormsModule } from '@angular/forms';
import { SearchService } from '@app/services/search.service';


@Component({
    standalone: true,
    selector: 'manu-presentacion-header',
    imports: [FormsModule, ImgErrorDirective, CommonModule],
    templateUrl: './presentacion-header.component.html',
    styleUrl: './presentacion-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentacionHeaderComponent implements OnInit {
  /* variables */
  public readonly url = environment.CATEGORIES_PATH;
  busqueda: any = '';

  /* signals */
  categories = signal<ICategoria[]>([]);
  lenguaje = signal<string>('');

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private searchService = inject(SearchService);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.getCategories();
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  getCategories() {
    this.articlesService.getCategories({}).subscribe({
      next: async (res: any) => {
        this.categories.set(res);
        this.isLoading.set(false);
      },
    });
  }

  showCategories(element: ICategoria) {
    this.router.navigate(['/categoria/', element.id_categoria]);
  }

  searchGlobal(){
    this.searchService.realizarBusqueda(this.busqueda);
    this.busqueda = null;
    this.router.navigate(['search']);
  }

  searchGlobalPress(event:any){
    if (event.key === "Enter") {
      this.searchService.realizarBusqueda(this.busqueda);
      this.busqueda = null;
      this.router.navigate(['search']);
    }
  }

  getNombreCategoria(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.categoria_es;
      case 'en':
        return item.categoria_en;
      case 'fr':
        return item.categoria_fr;
      case 'po':
        return item.categoria_po;
      case 'it':
        return item.categoria_it;
      default:
        return item.categoria_es;
    }
  }

}
