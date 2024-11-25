import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticlesService } from '@app/services/articles.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '@app/services/localStorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'manu-text-web',
    imports: [TranslateModule, RouterLink, CommonModule],
    templateUrl: './text-web.component.html',
    styleUrl: './text-web.component.scss'
})
export class TextWebComponent implements OnInit{


  tipo: any;

  /* signals */
  lenguaje = signal<string>('');
  data = signal<any>([]);

  /* servicios */
  private articlesService = inject(ArticlesService);
  private localStorageService = inject(LocalStorageService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
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
      this.tipo = id;
    });
    this.getTextWebByTipo();

  }

  getTextWebByTipo() {
    this.articlesService
      .getTextWebByTipo({ tipo: this.tipo.toUpperCase()})
      .subscribe({
        next: async (res: any) => {
          this.data.set(res);

        }
      });
  }

    
  getNombre(item: any): string {
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
  
  getTexto(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.texto_es;
      case 'en':
        return item.texto_en;
      case 'fr':
        return item.texto_fr;
      case 'po':
        return item.texto_po;
      case 'it':
        return item.texto_it;
      default:
        return item.texto_es;
    }
  }
}
