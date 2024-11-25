import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ConfigurationService } from '@app/services/configuration.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment.development';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';


@Component({
    selector: 'manu-news',
    imports: [TranslateModule, RouterLink, CommonModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  /* variables */
  lenguajes = ['es', 'en', 'fr', 'po', 'it'];
  url: string = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  news = signal<any>([]);


  /* serivces */
  private configurationService = inject(ConfigurationService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
    this.getNoticiasOrderByDateHome();
  }

  detail(item: any) {
    this.router.navigate(['empresa/detail-news/', item.id_noticia]);
  }

  getNoticiasOrderByDateHome() {
    this.configurationService.getNoticiasOrderByDateHome({}).subscribe({
      next: async (res: any) => {
        this.news.set(res);
      },
    });
  }
}
