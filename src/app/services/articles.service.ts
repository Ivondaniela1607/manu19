
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  readonly URL = environment.SERVER_URL + '/api/articles';
  constructor(private http: HttpClient) {}

  filtroActual = '';
  estadoRuta: { url: string, filtro: string } = { url: '', filtro: '' };

  guardarFiltro(filtro: string) {
    this.filtroActual = filtro.toLowerCase();
  }

  obtenerFiltro(): string {
    return this.filtroActual;
  }

  guardarFiltroEstadoRuta(url: string, filtro: string) {
    this.estadoRuta.url = url;
    this.estadoRuta.filtro = filtro;
  }

  obtenerFiltroEstadoRuta(): { url: string, filtro: string } {
    return this.estadoRuta;
  }

  getCategories<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getCategories`, body);
  }

  getCategoriesById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getCategoriesById`, body);
  }

  saveCategory<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveCategory`, body);
  }

  updateCategory<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateCategory`, body);
  }

  getSubcategories<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSubcategories`, body);
  }

  getSubcategoriesByCategory<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSubcategoriesByCategory`, body);
  }

  getSeriesByCategory<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSeriesByCategory`, body);
  }

  getSubcategoryById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSubcategoryById`, body);
  }

  saveSubcategory<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveSubcategory`, body);
  }

  updateSubcategory<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateSubcategory`, body);
  }

  getSubcatProducts<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSubcatProducts`, body);
  }

  getSeriesProducts<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSeriesProducts`, body);
  }

  orderNameRef<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/orderNameRef`, body);
  }

  getLastOrderSubcategory<T>(): Observable<T> {
    return this.http.get<T>(`${this.URL}/getLastOrderSubcategory`);
  }

  getTextsWeb<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTextsWeb`, body);
  }

  getTextWebById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTextWebById`, body);
  }

  getTextWebByTipo<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTextWebByTipo`, body);
  }
  getTextWebByIdSobrenosotros<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTextWebByIdSobrenosotros`, body);
  }
  
  getTextWebByIdGarantia<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTextWebByIdGarantia`, body);
  }

  updateTextWeb<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateTextWeb`, body);
  }

  getDocumentosDownloads<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosDownloads`, body);
  }

  saveDocumentosDownloads<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveDocumentosDownloads`, body);
  }

  getDocumentosDownloadById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosDownloadById`, body);
  }

  updateDocumentosDownloads<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateDocumentosDownloads`, body);
  }

  getDocumentosCalidad<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosCalidad`, body);
  }

  saveDocumentosCalidad<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveDocumentosCalidad`, body);
  }

  getDocumentosCalidadById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosCalidadById`, body);
  }

  updateDocumentosCalidad<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateDocumentosCalidad`, body);
  }

  getDocumentosVarios<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosVarios`, body);
  }

  saveDocumentosVarios<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveDocumentosVarios`, body);
  }

  getDocumentosVariosById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosVariosById`, body);
  }
  
  updateDocumentosVarios<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateDocumentosVarios`, body);
  }

  getArticulos<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getArticulos`, body);
  }

  getTotalItems<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTotalItems`, body);
  }

  saveArticulo<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveArticulo`, body);
  }

  getArticuloById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getArticuloById`, body);
  }

  getArticuloByIdDetail<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getArticuloByIdDetail`, body);
  }

  getDocumentosCertificado<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getCertificados`, body);
  }

  getDocumentosCertificadoById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosCertificadoById`, body);
  }

  updateArticulo<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateArticulo`, body);
  }

  updateStatus<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateStatus`, body);
  }

  getImagesByArticulo<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getImagesByArticulo`, body);
  }

  saveImagenArticulo<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveImagenArticulo`, body);
  }

  saveCertificados<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveCertificados`, body);
  }

  updateCertificados<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateCertificados`, body);
  }

  getImagenArticuloById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getImagenArticuloById`, body);
  }

  getProductosRelacionados<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getProductosRelacionados`, body);
  }

  updateImagenArticulo<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/updateImagenArticulo`, body);
  }

  getDocumentosCatalogo<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosCatalogo`, body);
  }

  saveDocumentosCatalogo<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveDocumentosCatalogo`, body);
  }
  
  changeOrder<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/changeOrder`, body);
  }

  updateDocumentosCatalogo<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateDocumentosCatalogo`, body);
  }

  getDocumentosCatalogoById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentosCatalogoById`, body);
  }

  getTipoDocumentosCatalogo<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTipoDocumentosCatalogo`, body);
  }

  getNoveltyByCategory<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getNoveltyByCategory`, body);
  }
  getNoveltyByCategoryHome<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getNoveltyByCategoryHome`, body);
  }

  getRepuestosByCategory<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getRepuestosByCategory`, body);
  }

  getOutletByCategory<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getOutletByCategory`, body);
  }

  getOfertaByCategory<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getOfertaByCategory`, body);
  }

  getCertificados<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getCertificados`, body);
  }

  getEdades<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getEdades`, body);
  }

  getAlturaCaida<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getAlturaCaida`, body);
  }

  getSuperficieImpacto<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSuperficieImpacto`, body);
  }

  deleteArticulo<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteArticulo`, body);
  }

  deleteSubcategoria<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteSubcategoria`, body);
  }

  deleteDocumentCalidad<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteDocumentCalidad`, body);
  }
  deleteDocumentCatalogo<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteDocumentCatalogo`, body);
  }

  deleteCertificado<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteCertificado`, body);
  }

  deleteMaterial<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteMaterial`, body);
  }

  deleteDocVarios<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteDocVarios`, body);
  }

  deleteSerie<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteSerie`, body);
  }

  deleteImageInstagram<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteImageInstagram`, body);
  }

  deleteDocumentDownload<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/deleteDocumentDownload`, body);
  }

  sendEmailContacto<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/sendEmailContacto`, body);
  }

  saveUrbanGym<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveUrbanGym`, body);
  }
  
  updateUrbanGym<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateUrbanGym`, body);
  }

  getUrbanGym<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getUrbanGym`, body);
  }

  /* series */

  saveSeries<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveSeries`, body);
  }
  
  updateSeries<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateSeries`, body);
  }

  getSeries<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSeries`, body);
  }

  /* materiales */

  getMateriales<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getMateriales`, body);
  }

  saveMateriales<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveMateriales`, body);
  }

  updateMateriales<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateMateriales`, body);
  }

  /* colores */

  getColores<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getColores`, body);
  }

  getUrbanGymConfig<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getUrbanGymConfig`, body);
  }

  updateUrbanGymConfig<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateUrbanGymConfig`, body);
  }
   /* busqueda */

   getBusqueda<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getBusqueda`, body);
  }
  /* imagenes instagram */
  getImagenesInstagram<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getImagenesInstagram`, body);
  }

  saveImagenesInstagram<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveImagenesInstagram`, body);
  }

  updateImagenesInstagram<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateImagenesInstagram`, body);
  }

  /* presupuesto */

  getPresupuesto<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getPresupuesto`, body);
  }

  updateStatusPresupuesto<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateStatusPresupuesto`, body);
  }
}
