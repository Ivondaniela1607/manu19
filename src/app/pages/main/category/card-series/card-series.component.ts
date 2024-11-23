import { CommonModule} from '@angular/common';
import { Component, inject, Input, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { LocalStorageService } from '@app/services/localStorage.service';
/* import { TranslateModule } from '@ngx-translate/core'; */

@Component({
    selector: 'manu-card-series',
    imports: [ImgErrorDirective, CommonModule],
    templateUrl: './card-series.component.html',
    styleUrl: './card-series.component.scss'
})
export class CardSeriesComponent implements OnInit {

  @Input() cards: any = [];
  @Input() urlSeries = '';
  @Input() categoryBase: any;

  /* signals */
  lenguaje = signal<string>('');

  /* services */
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  getSubcatProducts(opc: any) {
    this.localStorageService.setItem('opcSubcat', JSON.stringify(opc));
    this.router.navigate(['subcategory/', opc.id_categoria]);
  }

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  getSeries(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.serie_es;
      case 'en':
        return item.serie_en;
      case 'fr':
        return item.serie_fr;
      case 'po':
        return item.serie_po;
      case 'it':
        return item.serie_it;
      default:
        return item.serie_es;
    }
  }
}
