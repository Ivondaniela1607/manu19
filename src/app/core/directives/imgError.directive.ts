import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appImgError]',  
})
export class ImgErrorDirective {

  private elementImg = inject(ElementRef);

  @HostListener('error')
  onImageError() {
    this.elementImg.nativeElement.src = './assets/images/no-image.webp';
  }

}
