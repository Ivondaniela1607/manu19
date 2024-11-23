import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  readonly URL = environment.SERVER_URL + '/api/configuration';
  constructor(private http: HttpClient) {}

  getModules<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getModules`, body);
  }
  getSubmodules<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSubmodules`, body);
  }
  saveRole<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveRole`, body);
  }
  updateRole<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateRole`, body);
  }
  getRoles<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getRoles`, body);
  }
  getModulosByPermisions<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getModulosByPermisions`, body);
  }
  getModulesByRole<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getModulesByRole`, body);
  }
  getPosition<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getPosition`, body);
  }

  deleteNoticia<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteNoticia`, body);
  }
  
  deleteImageInstagram<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteImageInstagram`, body);
  }

  deleteImageNoticia<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteImageNoticia`, body);
  }

  getCountOrderSocialNetwork<T>(): Observable<T> {
    return this.http.get<T>(`${this.URL}/getCountOrderSocialNetwork`);
  }

  saveSocialNetwork<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveSocialNetwork`, body);
  }

  updateSocialNetwork<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateSocialNetwork`, body);
  }

  getSocialNetworks<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSocialNetworks`, body);
  }

  getCabecera<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getCabecera`, body);
  }

  updateCabecera<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateCabecera`, body);
  }

  getNoticias<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getNoticias`, body);
  }

  getNoticiasOrderByDate<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getNoticiasOrderByDate`, body);
  }

  getNoticiasOrderByDateHome<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getNoticiasOrderByDateHome`, body);
  }

  getNoticiaById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getNoticiaById`, body);
  }

  updateNoticia<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateNoticia`, body);
  }

  saveNoticia<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveNoticia`, body);
  }

  getImagesByNoticia<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getImagesByNoticia`, body);
  }

  saveImagenNoticia<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveImagenNoticia`, body);
  }

  getImagenNoticiaById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getImagenNoticiaById`, body);
  }

  updateImagenNoticia<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/updateImagenNoticia`, body);
  }

  
}
