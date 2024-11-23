import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { LocalStorageService } from '@app/services/localStorage.service';
/* import { TranslateModule } from '@ngx-translate/core'; */

@Component({
  
    selector: 'manu-card-item',
    imports: [ ImgErrorDirective, CommonModule],
    templateUrl: './card-item.component.html',
    styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit {
  @Input() item: any;
  @Input() i = 0;
  @Input() url = '';

  /* signals */
  lenguaje = signal<string>('');

  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  getOfertaTexto(item: any): string {
    return item.ofertaTexto;
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
}
