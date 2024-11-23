import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardComponent } from './card/card.component';
import { CardSeriesComponent } from './card-series/card-series.component';
import { environment } from '@env/environment';

@Component({
    selector: 'manu-category',
    imports: [CardComponent, CardSeriesComponent, RouterLink, CommonModule],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  @ViewChild('cardComponent') cardComponent!: CardComponent;

  url: string  = environment.SERVER_SUBCATEGORIA_URL + '/';
  urlSeries: string = environment.SERVER_SERIES_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  idCategory = signal<number>(0);
  category = signal<any>({});
  categories = signal<any>([]);
  subcategories = signal<any>([]);
  series = signal<any>([]);
  showData = signal<boolean>(false);

  /* serivces */
  private articlesService = inject(ArticlesService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.router.navigate(['']);
        this._snackBar.open('No hay parámetros en la ruta', 'Cerrar 🚀', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
        return;
      }
      this.idCategory.set(parseInt(id));
    });

    Promise.all([
      this.getSubcategoriesByCategory(),
      this.getCategories(),
      this.getSeriesByCategory(),
    ])
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

  getCategories() {
    return new Promise((resolve) => {
    this.articlesService
      .getCategories({ id_categoria: this.idCategory() })
      .subscribe({
        next: (res: any) => {
          if (res.length == 0) {
            this.router.navigate(['products']);
            this._snackBar.open('No se ha encontrado infomación para este id', 'Cerrar 🚀', {
              duration: 5000,
              panelClass: ['snackbar-success']
            });
            return;
          }
          this.category.set(res[0]);
          resolve(true);
        },
      });
    })
  }

  getSubcategoriesByCategory() {
    return new Promise((resolve) => {
    this.articlesService
      .getSubcategoriesByCategory({ id_categoria: this.idCategory() })
      .subscribe({
        next: (res: any) => {
          this.subcategories.set(res);
          this.showData.set(true);
          resolve(true);
        },
        error: () => {
          this.showData.set(false);
        },
      });
    });
  }

  getSeriesByCategory() {
    return new Promise((resolve) => {
    this.articlesService
      .getSeriesByCategory({ id_categoria: this.idCategory() })
        .subscribe({
          next: (res: any) => {
            this.series.set(res);
            resolve(true)
          },
          error: () => {
   /*          this.app.closeLoader(); */
          },
      });
    })
  }

}
