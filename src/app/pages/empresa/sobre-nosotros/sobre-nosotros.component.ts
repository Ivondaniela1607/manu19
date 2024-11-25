import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { ArticlesService } from '@app/services/articles.service';
/* import { TranslateModule } from '@ngx-translate/core'; */


@Component({
    selector: 'manu-sobre-nosotros',
    imports: [ImgErrorDirective, RouterLink, CommonModule],
    templateUrl: './sobre-nosotros.component.html',
    styleUrl: './sobre-nosotros.component.scss'
})
export class SobreNosotrosComponent implements OnInit{

  /* signals */
  lenguaje = signal<string>('');
  data = signal<any>([]);

  private articlesService = inject(ArticlesService);

  ngOnInit(): void {
    this.getTextWebByTipo();
  }

  getTextWebByTipo() {
    this.articlesService
      .getTextWebByIdSobrenosotros({ })
      .subscribe({
        next: async (res: any) => {
          this.data.set(res);
        }
      });
  }

  getTitulo(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.titulo_es;
      case 'en':
        return item.titulo_en;
      case 'fr':
        return item.titulo_fr;
      case 'po':
        return item.titulo_po;
      case 'it':
        return item.titulo_it;
      default:
        return item.titulo_es;
    }
  }

  getTexto1(item: any): string {

    switch (this.lenguaje()) {
      case 'es':
        return item.txt_1_es;
      case 'en':
        return item.txt_1_en;
      case 'fr':
        return item.txt_1_fr;
      case 'po':
        return item.txt_1_po;
      case 'it':
        return item.txt_1_it;
      default:
        return item.txt_1_es;
    }
  }
  getTexto2(item: any): string {

    switch (this.lenguaje()) {
      case 'es':
        return item.txt_2_es;
      case 'en':
        return item.txt_2_en;
      case 'fr':
        return item.txt_2_fr;
      case 'po':
        return item.txt_2_po;
      case 'it':
        return item.txt_2_it;
      default:
        return item.txt_2_es;
    }
  }
  getTexto3(item: any): string {

    switch (this.lenguaje()) {
      case 'es':
        return item.txt_3_es;
      case 'en':
        return item.txt_3_en;
      case 'fr':
        return item.txt_3_fr;
      case 'po':
        return item.txt_3_po;
      case 'it':
        return item.txt_3_it;
      default:
        return item.txt_3_es;
    }
  }
}
