import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private languageSignal = signal(this.getLanguage());
  private cartSignal = signal(this.getCarrito());
  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const cart = this.getShoppingCartProducts();
      this.cartSubject.next(cart);

      window.addEventListener('storage', () => {
        this.languageSignal.set(this.getLanguage());
        this.cartSignal.set(this.getShoppingCartProducts());
        const updatedCart = this.getShoppingCartProducts();
        this.cartSubject.next(updatedCart);
      });
    }
  }

  private getLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('language') || 'es';
    }
    return 'es';
  }
  private getCarrito(): any {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('carrito') || [];
    }
    return 'es';
  }

      private getShoppingCartProducts(): any[] {
        if (isPlatformBrowser(this.platformId)) {
          const cart = localStorage.getItem('carrito');
          return cart ? JSON.parse(cart) : [];
        }
        return [];
      }

  setLanguage(language: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
      this.languageSignal.set(language);
    }
  }

  setCarrito(carrito: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrito', carrito);
      this.cartSubject.next(carrito);
    }
  }

  getLanguageSignal() {
    return this.languageSignal;
  }

    getCartSignal() {
      return this.cartSignal;
    }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }
  
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  getCarritoObservable(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }

}