import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { ICabecera } from '@app/interfaces/cabecera.interface';
import { environment } from '@env/environment.development';
import { Router } from '@angular/router';


@Component({
    selector: 'manu-header-main',
    imports: [UpperCasePipe],
    templateUrl: './header-main.component.html',
    styleUrl: './header-main.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMainComponent implements OnInit{
  
  txt_btn = computed(() => {
    if(this.lenguaje() == 'es'){
      return this.data()?.txt_btn_es;
    }else if(this.lenguaje() == 'en'){
      return this.data()?.txt_btn_en;
    }else if(this.lenguaje() == 'fr'){
      return this.data()?.txt_btn_fr;
    }else if(this.lenguaje() == 'po'){
      return this.data()?.txt_btn_po;
    }else if(this.lenguaje() == 'it'){
      return this.data()?.txt_btn_it;
    }else {
      return this.data()?.txt_btn_es;
    }
  });

  /* variables */
  lenguajes = ['es', 'en', 'fr', 'po', 'it'];
  url: string = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  data = signal<ICabecera>({});
  showData = signal<boolean>(false);


  /* serivces */
  private configurationService =inject(ConfigurationService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getCabecera();
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  getCabecera() {
    this.configurationService.getCabecera({}).subscribe({
      next: async (res: any) => {
        this.showData.set(res.length > 0 ? true : false);
        this.data.set(res[0]); 
      },
    });
  }

  ver(opc: any) {
    this.router.navigate([opc.link]);
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

  getEslogan(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.eslogan_es;
      case 'en':
        return item.eslogan_en;
      case 'fr':
        return item.eslogan_fr;
      case 'po':
        return item.eslogan_po;
      case 'it':
        return item.eslogan_it;
      default:
        return item.eslogan_es;
    }
  }

  getTexto(item: any): string {
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
