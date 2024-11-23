import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { LocalStorageService } from '@app/services/localStorage.service';
/* import { TranslateModule } from '@ngx-translate/core'; */

@Component({
    selector: 'manu-card',
    imports: [ImgErrorDirective, CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, OnChanges{

  @Input() cards: any = [];
  @Input() url = '';
  @Input() categoryBase: any;

  /* signals */
  lenguaje = signal<string>('');
  category = signal<any>({});

  /* services */
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  ngOnChanges() {
    if (!this.categoryBase) return;
    this.category.set({ ...this.categoryBase })
    if (this.category()?.color?.includes('#')) {
      this.category().color = this.hexToRgb(this.category()?.color);
    }
  }
  
  hexToRgb(hex:any) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(
          result[2],
          16
        )}, ${parseInt(result[3], 16)}, 0.4)`
      : null;
  }

  getSubcatProducts(opc: any) {
    this.localStorageService.setItem('opcSubcat', JSON.stringify(opc));
    this.router.navigate(['subcategory/', opc.id_categoria]);
  }

  getNombreSubcategoria(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.subcategoria_es;
      case 'en':
        return item.subcategoria_en;
      case 'fr':
        return item.subcategoria_fr;
      case 'po':
        return item.subcategoria_po;
      case 'it':
        return item.subcategoria_it;
      default:
        return item.subcategoria_es;
    }
  }
}
