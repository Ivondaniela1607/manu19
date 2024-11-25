import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { LocalStorageService } from '@app/services/localStorage.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({

    selector: 'manu-card-item',
    imports: [TranslateModule, ImgErrorDirective, CommonModule],
    templateUrl: './card-item.component.html',
    styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit{
  @Input() item: any;
  @Input() i = 0;
  @Input() url = '';

  /* signals */
  lenguaje = signal<string>('');

  private localStorageService = inject(LocalStorageService);


  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
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

  getOfertaTexto(item: any): string | null {
    const language = this.lenguaje();
    if (language === 'es' && item.o_es === '1') return 'OFERTA';
    if (language === 'en' && item.o_en === '1') return 'OFFER';
    if (language === 'fr' && item.o_fr === '1') return 'OFFRE';
    if (language === 'po' && item.o_po === '1') return 'OFERECER';
    if (language === 'it' && item.o_it === '1') return 'OFFERTA';
    return null;
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
}
