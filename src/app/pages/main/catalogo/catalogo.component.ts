import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';


@Component({
    selector: 'manu-catalogo',
    imports: [TranslateModule, ImgErrorDirective, RouterLink,  CommonModule],
    templateUrl: './catalogo.component.html',
    styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit{

  /* variables */
  idDescarga: any;
  linkES: any;
  url: string = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  documentsDownloads = signal<any>([]);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.getDocumentosDownloads();
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  getDocumentosDownloads() {
    this.articlesService.getDocumentosDownloads({}).subscribe({
      next: async (res: any) => {
        this.documentsDownloads.set(res);
      },
    });
  }

  onClick(item:any){
    this.idDescarga = item.id_descarga;
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
    }
    if (item.tipo === 'B') {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('target', '_blank');

      const directoryPath = 'uploads/downloads_documents';

      if (this.lenguaje() === 'es') {
        link.href = environment.SERVER_URL + `/`+directoryPath + `/`+item.documento_es;
      }
      if (this.lenguaje() === 'en') {
        link.href = environment.SERVER_URL + `/`+directoryPath + `/`+item.documento_en;
      }
      if (this.lenguaje() === 'fr') {
        link.href = environment.SERVER_URL + `/`+directoryPath + `/`+item.documento_fr;
      }
      if (this.lenguaje() === 'po') {
        link.href = environment.SERVER_URL + `/`+directoryPath + `/`+item.documento_po;
      }
      if (this.lenguaje() === 'it') {
        link.href = environment.SERVER_URL + `/`+directoryPath + `/`+ item.documento_it;
      }
      document.body.appendChild(link);
      link.click();
      link.remove();

    }
  }
  getCatalogoText(item: any){
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
}
