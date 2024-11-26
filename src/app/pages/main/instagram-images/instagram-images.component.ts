import { CommonModule } from '@angular/common';
import { Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { ArticlesService } from '@app/services/articles.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'manu-instagram-images',
    imports: [TranslateModule, CarouselModule, CommonModule],
    templateUrl: './instagram-images.component.html',
    styleUrl: './instagram-images.component.scss'
})

export class InstagramImagesComponent implements OnInit{
  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    autoWidth: false,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    dotsData: true,
    // margin: 2,
    center: true,

    // slideBy: 2,
    navSpeed: 700,
    URLhashListener: false,
    freeDrag: true,
    stagePadding: 30,
    startPosition: 'URLHash',
    navText: [
      `<span class="material-icons">arrow_back_ios</span>`,
      `<span class="material-icons">arrow_forward_ios</span>`
    ],
    // navText: ['Anterior', 'Siguiente'],
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
  };

  url: string = environment.SERVER_URL + '/';

  /* signals */
  slidesStore = signal<any>([]);
  slideBoolean = signal<boolean>(false);

  /* serivces */
  private articlesService = inject(ArticlesService);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('touchstart', () => {}, { passive: true });
    });
    this.getImagenesInstagram();

  }

  getImagenesInstagram() {
    this.slideBoolean.set(false);
    this.articlesService.getImagenesInstagram({}).subscribe({
      next: async (res: any) => {
        this.slidesStore.set(res);
        this.slideBoolean.set(true);
      },
    });
  }
}
