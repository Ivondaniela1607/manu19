import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({

    selector: 'manu-card-busqueda',
    imports: [TranslateModule, ImgErrorDirective, CommonModule],
    templateUrl: './card-busqueda.component.html',
    styleUrl: './card-busqueda.component.scss'
})
export class CardBusquedaComponent implements OnInit {

  /* signals */
  lenguaje = signal<string>('');

  @Input() byCategoriaPI: any = [];
  @Input() byCategoriaED: any = [];
  @Input() byCategoriaMU: any = [];

  url: string = environment.SERVER_URL + '/';


  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  detail(item: any){
    this.localStorageService.setItem('opc', JSON.stringify(item))
    this.router.navigate(['detail-product/',item.id_catalogo]);
  }
  handleKeyEvent(event: KeyboardEvent) {
  }
  getNombreCategoria(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.categoria_es;
      case 'en':
        return item.categoria_en;
      case 'fr':
        return item.categoria_fr;
      case 'po':
        return item.categoria_po;
      case 'it':
        return item.categoria_it;
      default:
        return item.categoria_es;
    }
  }
  
  getNombreCatalago(item: any): string {
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

}
