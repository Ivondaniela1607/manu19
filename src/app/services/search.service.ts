
import { Injectable } from '@angular/core';
import { computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  busquedaSignal = signal<any>(null);
  busqueda$ = computed(() => this.busquedaSignal());

  realizarBusqueda(busqueda: string) {
    this.busquedaSignal.set(busqueda);
  }

}
