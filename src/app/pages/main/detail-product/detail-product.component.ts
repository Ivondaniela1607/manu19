import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRelacionadoComponent } from '../product-relacionado/product-relacionado.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CarruselComponent } from './carrusel/carrusel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import Swal from 'sweetalert2';


@Component({   
    selector: 'manu-detail-product',
    imports: [TranslateModule, ImgErrorDirective, MatExpansionModule, CarruselComponent, MatTooltipModule, ProductRelacionadoComponent, RouterLink, CommonModule],
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  /* variables */
  idCatalago: any;
  opc: any;
  descES = '';
  descEN = '';
  descFR = '';
  descPO = '';
  descIT = '';
  idCategory: any;
  images: any = [];
  shoppingCartProducts: any = [];
  url: any = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  articulo = signal<any>({});
  showData = signal<boolean>(false);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    effect( () => {
      this.lenguaje = this.localStorageService.getLanguageSignal();
      if(
        (this.articulo().p_es == '0' && this.lenguaje() == 'es') || 
        (this.articulo().p_en == '0' && this.lenguaje() == 'en') || 
        (this.articulo().p_fr == '0' && this.lenguaje() == 'fr') || 
        (this.articulo().p_po == '0' && this.lenguaje() == 'po') ||
        (this.articulo().p_it == '0' && this.lenguaje() == 'it') 
      ){
        this.router.navigate(['/']);
        return;
      }
    }); 
  }


  ngOnInit(): void {

    this.lenguaje = this.localStorageService.getLanguageSignal();
    const opcString = this.localStorageService.getItem('opc');
    this.opc = opcString ? JSON.parse(opcString) : null;
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.router.navigate(['']);
        this._snackBar.open('No hay parámetros en la ruta', 'Cerrar 🚀', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
        return;
      }
      this.idCatalago = (parseInt(id));
    });
    this.getImagenArticuloById();
    this.getArticuloById();
    this.shoppingCartProducts = this.localStorageService.getItem('carrito');
    this.shoppingCartProducts = JSON.parse(this.shoppingCartProducts);
  }

  getImagenArticuloById() {
    this.articlesService
      .getImagesByArticulo({ id_catalogo: this.idCatalago })
      .subscribe({
        next: async (res: any) => {
          this.images = res;

        },
      });
  }

  onClick(item: any) {
    if (item.tipo === 'A') {
      if (this.lenguaje() === 'es') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_es);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'en') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_en);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'fr') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_fr);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'po') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_po);
        a.setAttribute("target", '_blank');
        a.click();
      }
    }
    if (item.tipo === 'B') {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('target', '_blank');
      const directoryPath = '/uploads/varios_documents/';

      if (this.lenguaje() === 'es') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_es;
      }
      if (this.lenguaje() === 'en') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_en;
      }
      if (this.lenguaje() === 'fr') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_fr;
      }
      if (this.lenguaje() === 'po') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_po;
      }
      if (this.lenguaje() === 'it') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_it;
      }
      document.body.appendChild(link);
      link.click();
      link.remove();

    }
  }

  onClickImage(item: any) {
    if (item.tipo === 'A') {
      if (this.lenguaje() === 'es') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_es);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'en') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_en);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'fr') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_fr);
        a.setAttribute("target", '_blank');
        a.click();
      }
      if (this.lenguaje() === 'po') {
        const a = document.createElement("a");
        a.setAttribute("href", item.linkexterno_po);
        a.setAttribute("target", '_blank');
        a.click();
      }
    }
    if (item.tipo === 'B') {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('target', '_blank');
      const directoryPath = '/uploads/catalogo_documents/';

      if (this.lenguaje() === 'es') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_es;
      }
      if (this.lenguaje() === 'en') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_en;
      }
      if (this.lenguaje() === 'fr') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_fr;
      }
      if (this.lenguaje() === 'po') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_po;
      }
      if (this.lenguaje() === 'it') {
        link.href = environment.SERVER_URL + directoryPath + item.documento_it;
      }
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  getArticuloById() {
    this.showData.set(false);
    return new Promise((resolve) => {
      this.articlesService
        .getArticuloByIdDetail({ id_catalogo: this.idCatalago })
        .subscribe({
          next: async (res: any) => {
            if(res.length == 0){
              const mensajes: any = {
                'es': 'No existe ningún artículo con este ID',
                'en': 'There is no article with this ID',
                'fr': 'Il n`y a aucun article avec cet identifiant',
                'po': 'Não há nenhum artigo com este ID',
                'it': 'Non c`è nessun articolo con questo ID',
              };
              const texto = mensajes[this.lenguaje()]
              Swal.fire({
                icon: 'error',
                text: texto,
              });
              this.router.navigate(['/']);
              return ;
            }
            this.articulo.set(res[0]);
            this.showData.set(true);
            this.descES = res[0].desc_es;
            this.descEN = res[0].desc_en;
            this.descFR = res[0].desc_fr;
            this.descPO = res[0].desc_po;
            this.descIT = res[0].desc_it;
            if (res.length === 0) {
              this._snackBar.open('No hay ningún articulo con este id', 'Cerrar 🚀', {
                duration: 5000,
                panelClass: ['snackbar-success']
              });

              return;
            }
            resolve(true);
          },
        });
    });
  }

  addShopping() {
    const mensajes: any = {
      'es': 'Producto agregado exitosamente',
      'en': 'Product successfully added',
      'fr': 'Produit ajouté avec succès',
      'po': 'Produto adicionado com sucesso',
      'it': 'Prodotto aggiunto con successo',
    };
    const texto = mensajes[this.lenguaje()]

    Swal.fire({
      icon: 'success',
      text: texto,
    });
    const body = {
      product: this.articulo(),
      cant: 1
    }
    this.addShoppingCart(body)
  }

  volverCat(item: any){
    this.router.navigate(['/categoria', item.id_categoria]);
  }

  volverSubCat(item: any){
    this.router.navigate(['/subcategory', item.id_categoria]);
  }

  addShoppingCart(product: any) {
    if (this.shoppingCartProducts && Array.isArray(this.shoppingCartProducts)) {
      if (this.shoppingCartProducts.length > 0) {
        let encontrado = false;
        this.shoppingCartProducts.forEach((element: any, index: any) => {
          if (element.product.id_catalogo === product.product.id_catalogo) {
            encontrado = true;
            this.shoppingCartProducts[index].cant++;
          }
        });
        if (!encontrado) {
          this.shoppingCartProducts.push(product);
        }
      } else {
        this.shoppingCartProducts.push(product);
      }
      this.localStorageService.setCarrito(JSON.stringify(this.shoppingCartProducts));
    } else {
      this.shoppingCartProducts = [product];
      this.localStorageService.setCarrito(JSON.stringify(this.shoppingCartProducts));
    }
  }

  getNombreCategoria(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.categoria_es;
      case 'en':
        return item.categoria_en;
      case 'fr':
        return item.categoria_fr;
      case 'po':
        return item.categoria_po;
      case 'it':
        return item.categoria_it;
      default:
        return item.categoria_es;
    }
  }

  getNombreCatalogo(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.nombre_es;
      case 'en':
        return item.nombre_en;
      case 'fr':
        return item.nombre_fr;
      case 'po':
        return item.nombre_po;
      case 'it':
        return item.nombre_it;
      default:
        return item.nombre_es;
    }
  }

  getDescrCatalogo(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.desc_es;
      case 'en':
        return item.desc_es;
      case 'fr':
        return item.desc_es;
      case 'po':
        return item.desc_es;
      case 'it':
        return item.desc_es;
      default:
        return item.desc_es;
    }
  }

  getEdades(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.edad_es;
      case 'en':
        return item.edad_en;
      case 'fr':
        return item.edad_fr;
      case 'po':
        return item.edad_po;
      case 'it':
        return item.edad_it;
      default:
        return item.edad_es;
    }
  }

  getText(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.txt_es;
      case 'en':
        return item.txt_en;
      case 'fr':
        return item.txt_fr;
      case 'po':
        return item.txt_po;
      case 'it':
        return item.txt_it;
      default:
        return item.txt_es;
    }
  }

  getSubCategoriaOrSeries(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.subcategoria_es ? item.subcategoria_es : item.series[0].serie_es;
      case 'en':
        return item.subcategoria_en ? item.subcategoria_en : item.series[0].serie_en;
      case 'fr':
        return item.subcategoria_fr ? item.subcategoria_fr : item.series[0].serie_fr;
      case 'po':
        return item.subcategoria_po ? item.subcategoria_po : item.series[0].serie_es;
      case 'it':
        return item.subcategoria_es ? item.subcategoria_es : item.series[0].serie_es;
      default:
        return item.subcategoria_es ? item.subcategoria_es : item.series[0].serie_es;
    }
  }
  
  getNombreDoc(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.txt_es === "" ? item.tipo_documento_es : item.txt_es;
      case 'en':
        return item.txt_en === "" ? item.tipo_documento_en : item.txt_en;
      case 'fr':
        return item.txt_fr === "" ? item.tipo_documento_fr : item.txt_fr;
      case 'po':
        return item.txt_po === "" ? item.tipo_documento_po : item.txt_po;
      case 'it':
        return item.txt_it === "" ? item.tipo_documento_it : item.txt_it;
      default:
        return item.txt_es === "" ? item.tipo_documento_es : item.txt_es;
    }
  }

  getDescripcion(): string {
    const lang = this.lenguaje();
    switch (lang) {
      case 'es':
        return this.descES;
      case 'en':
        return this.descEN;
      case 'fr':
        return this.descFR;
      case 'po':
        return this.descPO;
      case 'it':
        return this.descIT;
      default:
        return this.descES;
    }
  }

}
