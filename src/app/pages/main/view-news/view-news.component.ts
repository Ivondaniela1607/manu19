import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { ConfigurationService } from '@app/services/configuration.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
/* import { TranslateModule } from '@ngx-translate/core'; */
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'manu-view-news',
    imports: [MatPaginatorModule, ImgErrorDirective, RouterLink, CommonModule],
    templateUrl: './view-news.component.html',
    styleUrl: './view-news.component.scss'
})
export class ViewNewsComponent implements OnInit {

  url: string  = environment.SERVER_URL + '/';


  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;


  /* signals */
  lenguaje = signal<string>('');
  showData = signal<boolean>(false);
  news = signal<any>([]);
  data = signal<any>([]);

  /* serivces */
  private configurationService = inject(ConfigurationService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getNoticias();
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  async getNoticias() {
    this.showData.set(false);
    this.configurationService.getNoticiasOrderByDate({}).subscribe({
      next: (res) => {
        this.data.set(res);
        this.totalPages = Math.ceil(this.data().length / this.itemsPerPage);
        this.updatePaginatedItems();
        this.showData.set(true);
      },
    });
  }

  viewNews(opc: any) {
    this.router.navigate(['empresa/detail-news/', opc.id_noticia]);
  }

  handleKeyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
     // this.previousPage();
    } else if (event.key === 'ArrowRight') {
      //this.nextPage();
    }
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.news.set(this.data().slice(startIndex, endIndex));
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedItems();
    }
  }

}
