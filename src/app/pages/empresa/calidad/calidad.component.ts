import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { environment } from '@env/environment';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';

@Component({
    selector: 'manu-calidad',
    imports: [ImgErrorDirective, RouterLink, CommonModule],
    templateUrl: './calidad.component.html',
    styleUrl: './calidad.component.scss'
})
export class CalidadComponent implements OnInit {
  id: any;
  /* variables */
  idCalidad: any;
  linkES: any;
  url: string = environment.SERVER_URL + '/';
  data = signal<any>([]);
  /* signals */
  lenguaje = signal<string>('');
  documentsCalidad = signal<any>([]);

  /* serivces */
  private localStorageService = inject(LocalStorageService);
  private articlesService = inject(ArticlesService);
  

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
    this.getTextWebByTipo();
    this.getDocumentosCalidad();
  }

  getDocumentosCalidad() {
    this.articlesService.getDocumentosCalidad({}).subscribe({
      next: async (res: any) => {
        this.documentsCalidad.set(res);
      },
    });
  }

  getTextWebByTipo() {
    this.articlesService
      .getTextWebByIdGarantia({ })
      .subscribe({
        next: async (res: any) => {
          this.data.set(res);
        }
      });
  }

  onClick(item: any) {
    this.idCalidad = item.id_calidad;
    if (item.tipo === 'A') {
      if (this.lenguaje() === 'es') {
        this.linkES = item.linkexterno_es;
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_es);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'en') {
        this.linkES = item.linkexterno_es;
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_en);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'fr') {
        this.linkES = item.linkexterno_es;
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_fr);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'po') {
        this.linkES = item.linkexterno_es;
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_po);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'it') {
        this.linkES = item.linkexterno_es;
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_po);
        a.setAttribute("target", '_blank');
        a.click();
      }
    }
    if (item.tipo === 'B') {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('target', '_blank');
      const filePath = item.ruta;
      const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
      if (this.lenguaje() === 'es') {
        link.href = environment.SERVER_URL + `/` + directoryPath + `/` + item.documento_es;
      }
      if (this.lenguaje() === 'en') {
        link.href = environment.SERVER_URL + `/` + directoryPath + `/` + item.documento_en;
      }
      if (this.lenguaje() === 'fr') {
        link.href = environment.SERVER_URL + `/` + directoryPath + `/` + item.documento_fr;
      }
      if (this.lenguaje() === 'po') {
        link.href = environment.SERVER_URL + `/` + directoryPath + `/` + item.documento_po;
      }
      if (this.lenguaje() === 'it') {
        link.href = environment.SERVER_URL + `/` + directoryPath + `/` + item.documento_it;
      }
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  getDocumentoText(item: any) {
    switch (this.lenguaje()) {
      case 'es':
        return item.txt_es;
      case 'en':
        return item.txt_en;
      case 'fr':
        return item.txt_fr;
      case 'po':
        return item.txt_po;
      case 'it':
        return item.txt_it;
      default:
        return item.txt_es;
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


}
