import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from '@env/environment'
@Injectable({
  providedIn: 'root',
})
export class FilesService {

  private readonly URL = environment.SERVER_URL + '/api/files';

  private readonly http = inject(HttpClient);


  getViewFile<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getViewFile`, body)
  }

  exportDataPdf<T>(body: any): Observable<T> {
    return this.http.post<T>(`${this.URL}/exportDataPdf`, body)
  }

  desacargarBBDD(filename: string) {
    return this.http.post(`${this.URL}/archivo`, { archivo: filename }, { responseType: 'blob' });
     }
}