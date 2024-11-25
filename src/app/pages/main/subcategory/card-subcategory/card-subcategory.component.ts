import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'manu-card-subcategory',
    imports: [TranslateModule, ImgErrorDirective, CommonModule],
    templateUrl: './card-subcategory.component.html',
    styleUrl: './card-subcategory.component.scss'
})
export class CardSubcategoryComponent implements OnInit{
  @Input() subcatProducts: any = [];
  @Input() opc: any = [];

  url: string = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');

  /* serivces */
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  detail(item: any){
    this.localStorageService.setItem('opc', JSON.stringify(item));
    this.router.navigate(['detail-product/',item.id_catalogo]);
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
}
