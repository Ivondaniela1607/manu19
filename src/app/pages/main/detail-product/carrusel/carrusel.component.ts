import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { environment } from '@env/environment';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    standalone: true,
    selector: 'manu-carrusel',
    imports: [ImgErrorDirective, CarouselModule, CommonModule],
    templateUrl: './carrusel.component.html',
    styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnChanges{
  @Input() images: any = [];
  rows :any = [];
  selectedImage: any;
  url = environment.SERVER_URL + '/';

  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="assets/icons/chevron-left.svg" style="width: 70px; height: 70px;">',
      '<img src="assets/icons/chevron-right.svg" style="width: 70px; height: 70px;">'
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 4,
      },
      767: {
        items: 4, 
      },
      992: {
        items: 4,
      },
    },
    nav: true,
  };

  async ngOnChanges() {
    this.rows = [...this.images];
    this.selectedImage = this.url+this.images[0]?.ruta
  }

  selectImage(image: any) {
    this.selectedImage = this.url+image.ruta;
  }

}