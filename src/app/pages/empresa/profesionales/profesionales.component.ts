import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { TranslateModule } from '@ngx-translate/core';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';



@Component({
    selector: 'manu-profesionales',
    imports: [TranslateModule, ImgErrorDirective, RouterLink, CommonModule],
    templateUrl: './profesionales.component.html',
    styleUrl: './profesionales.component.scss'
})
export class ProfesionalesComponent implements OnInit {

  tipo = 'PROFESIONALES';

  /* signals */
  data = signal<any>([]);
  lenguaje = signal<string>('');

  /* servicios */
  private articlesService = inject(ArticlesService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
    this.getTextWebByTipo();
  }

  getTextWebByTipo() {
    this.articlesService
      .getTextWebByTipo({ tipo: this.tipo.toUpperCase() })
      .subscribe({
        next: async (res: any) => {
          this.data.set(res);
        }
      });
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
  getTitulo(item: any): string {
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
