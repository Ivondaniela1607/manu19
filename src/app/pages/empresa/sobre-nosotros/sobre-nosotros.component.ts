import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { ArticlesService } from '@app/services/articles.service';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
    selector: 'manu-sobre-nosotros',
    imports: [TranslateModule, ImgErrorDirective, RouterLink, CommonModule],
    templateUrl: './sobre-nosotros.component.html',
    styleUrl: './sobre-nosotros.component.scss'
})
export class SobreNosotrosComponent implements OnInit{


  /* signals */
  lenguaje = signal<string>('');
  data = signal<any>([]);

  /* services */
  private articlesService = inject(ArticlesService);
  private sanitizer = inject(DomSanitizer);


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
        const value = this.sanitizer.bypassSecurityTrustHtml(item.titulo_es)
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

  getTexto3(item: any): any {
    switch (this.lenguaje()) {
      case 'es':
        const valueSanitizedEs = this.sanitizer.bypassSecurityTrustHtml(item.txt_3_es);
        return valueSanitizedEs;
      case 'en':
        const valueSanitizedEn = this.sanitizer.bypassSecurityTrustHtml(item.txt_3_en);
        return valueSanitizedEn;
      case 'fr':
        const valueSanitizedFr = this.sanitizer.bypassSecurityTrustHtml(item.txt_3_fr);
        return valueSanitizedFr;
      case 'po':
        const valueSanitizedPo = this.sanitizer.bypassSecurityTrustHtml(item.txt_3_po);
        return valueSanitizedPo;
      case 'it':
        const valueSanitizedIt = this.sanitizer.bypassSecurityTrustHtml(item.txt_3_it);
        return valueSanitizedIt;
      default:
        const valueSanitizedEss = this.sanitizer.bypassSecurityTrustHtml(item.txt_3_es);
        return valueSanitizedEss;
    }
  }
}
