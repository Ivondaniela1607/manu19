import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { TranslateModule } from '@ngx-translate/core';
import { CardSubcategoryComponent } from './card-subcategory/card-subcategory.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'manu-subcategory',
    imports: [TranslateModule, FormsModule, MatExpansionModule, CardSubcategoryComponent, RouterLink, CommonModule],
    templateUrl: './subcategory.component.html',
    styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit {
  /* variables  */
  opc: any;
  idSubcategory: any;
  offset = 15;
  subcatProducts: any = [];
  originalSubcatProducts: any = [];
  colorSeleccionado: any;
  serieSeleccionada: any;
  materialSeleccionado: any;
  edadSeleccionada: any;
  filtros: any = {
    ordenar: {},
    edad: {},
    serie: {},
    color: {},
    material: {},
    inclusivo: false,
    novedad: false,
    oferta: false,
    altura: false,
    superficie: false,
  };
  panelOpenState = false;
  panelOpenState1 = false;
  ordenar: any = [
    {
      id_ordenar: 1,
      label_es: 'Nombre A - Z',
      label_en: 'Name A - Z',
      label_fr: 'Mom A - Z',
      label_po: 'Nome A - Z',
      value: 'ASC',
      opc: 'nombre'
    },
    {
      id_ordenar: 2,
      label_es: 'Nombre Z - A',
      label_en: 'Name Z - A',
      label_fr: 'Mom Z - A',
      label_po: 'Nome Z - A',
      value: 'DESC',
      opc: 'nombre'
    },
    {
      id_ordenar: 3,
      label_es: 'Referencia A - Z',
      label_en: 'Reference A - Z',
      label_fr: 'Référence A - Z',
      label_po: 'Referência A - Z',
      value: 'ASC',
      opc: 'referencia'
    },
    {
      id_ordenar: 4,
      label_es: 'Referencia Z - A',
      label_en: 'Reference Z - A',
      label_fr: 'Référence Z - A',
      label_po: 'Referência Z - A',
      value: 'referencia DESC',
      opc: 'referencia'
    },
  ];



  /* signals */
  lenguaje = signal<string>('');
  category = signal<any>({});
  idCategory = signal<number>(0);
  edades = signal<any>([]);
  colores = signal<any>([]);
  series = signal<any>([]);
  materiales = signal<any>([]);
  alturaCaidaInicio = signal<number>(0);
  alturaCaidaFin = signal<number>(1.99);
  superficieImpactoInicio = signal<number>(0);
  superficieImpactoFin = signal<number>(70.99);
  serieOpc = signal<boolean>(false);
  showData = signal<boolean>(false);
  cantReferencias = signal<number>(0);
  minSelectedAlturaCaida = signal<number>(0);
  maxSelectedAlturaCaida = signal<number>(0);
  minSelectedSuperficieImpacto = signal<number>(0);
  maxSelectedSuperficieImpacto = signal<number>(0);
  minValue = 0;
  maxValue = 1000;
  minValueSuperficie = 0;
  maxValueSuperficie = 1000;
  minPercent = signal<number>(0);
  maxPercent = signal<number>(0);
  minPercentSuperficie = signal<number>(0);
  maxPercentSuperficie = signal<number>(0);
  isLoading = signal<boolean>(false);
  getDataBoolean = signal(false);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);
  constructor() {
    effect( () => {
      this.lenguaje = this.localStorageService.getLanguageSignal();
      if(this.lenguaje() && this.getDataBoolean()){
        this.filtraByPublicado();
      }
    }); 
  }

  ngOnInit(): void {
    const opcString = this.localStorageService.getItem('opcSubcat');
    this.opc = opcString ? JSON.parse(opcString) : null;
    this.lenguaje = this.localStorageService.getLanguageSignal();
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
      this.idCategory.set(parseInt(id));
    });
    if (this.opc) {
      this.getSeriesByCategory();
      this.getMateriales();
      this.getEdades();
      this.getColores();
      if (this.opc.id_subcategoria) {
        this.idSubcategory = this.opc.id_subcategoria;
        this.getSubcatProducts();
        this.serieOpc.set(false);
      } else {
        this.getSeriesProducts()
        this.serieOpc.set(true);
      }
    }


  }

  getCategories() {
    return new Promise((resolve) => {
      this.articlesService
        .getCategories({ id_categoria: this.idCategory() })
        .subscribe({
          next: (res: any) => {
            if (res.length == 0) {
              this.router.navigate(['products']);
              this._snackBar.open('No se ha encontrado infomación para este id', 'Cerrar 🚀', {
                duration: 5000,
                panelClass: ['snackbar-success']
              });
              return;
            }
            this.category.set(res[0]);
            resolve(true);
          },
          error: () => {
            console.log( 'error' )
          },
        });
    })
  }

  getSeriesByCategory() {
    this.articlesService
      .getSeriesByCategory({ id_categoria: this.idCategory() })
      .subscribe({
        next: (res: any) => {
          this.series.set(res);
          this.category.set(res[0]);
        },
      });
  }

  getEdades() {
    this.articlesService
      .getEdades({})
      .subscribe({
        next: (res: any) => {
          this.edades.set(res);
          this.edades().forEach((element: any) => {
            element.selected = false;
          });
        },
      });
  }

  onInputChangeAlturaCaida() {
    this.filtros.altura = true;
    const totalRange = 1000;

    const minSelectedValue = this.alturaCaidaInicio() + (this.minValue / totalRange) * (this.alturaCaidaFin() + this.alturaCaidaInicio());
    const maxSelectedValue = this.alturaCaidaInicio() + (this.maxValue / totalRange) * (this.alturaCaidaFin() - this.alturaCaidaInicio());

    this.minSelectedAlturaCaida.set(parseFloat(minSelectedValue.toFixed(2)));
    this.maxSelectedAlturaCaida.set(parseFloat(maxSelectedValue.toFixed(2)));

    this.minPercent.set((this.minValue / totalRange) * 100);
    this.maxPercent.set(100 - ((this.maxValue / totalRange) * 100));

    this.filtrarProductos();
  }

  onInputChangeSuperficieImpacto() {
    this.filtros.superficie = true;
    const totalRange = 1000;

    const minSelectedValue = this.superficieImpactoInicio() + (this.minValueSuperficie / totalRange) * (this.superficieImpactoFin() + this.superficieImpactoInicio());
    const maxSelectedValue = this.superficieImpactoInicio() + (this.maxValueSuperficie / totalRange) * (this.superficieImpactoFin() - this.superficieImpactoInicio());

    this.minSelectedSuperficieImpacto.set(parseFloat(minSelectedValue.toFixed(2)));
    this.maxSelectedSuperficieImpacto.set(parseFloat(maxSelectedValue.toFixed(2)));

    this.minPercentSuperficie.set((this.minValueSuperficie / totalRange) * 100);
    this.maxPercentSuperficie.set(100 - ((this.maxValueSuperficie / totalRange) * 100));

    this.filtrarProductos();
  }


  getMateriales() {
    this.articlesService.getMateriales({}).subscribe({
      next: (res: any) => {
        this.materiales.set(res);
        this.materiales().forEach((element: any) => {
          element.selected = false;
        });
      },
    });
  }

  getColores() {
    this.articlesService.getColores({}).subscribe({
      next: (res: any) => {
        this.colores.set(res);
        this.colores().forEach((element: any) => {
          element.selected = false;
        });
      },
    });
  }

  filtraByPublicado(){
    let conditionFunction;
    switch (this.lenguaje()) {
      case 'es':
        conditionFunction = (element: any) => element.p_es === '1';
        break;
      case 'en':
        conditionFunction = (element: any) => element.p_en === '1';
        break;
      case 'fr':
        conditionFunction = (element: any) => element.p_fr === '1';
        break;
      case 'po':
        conditionFunction = (element: any) => element.p_po === '1';
        break;
      case 'it':
        conditionFunction = (element: any) => element.p_it === '1';
        break;
      default:
        console.error('Lenguaje no válido');
        return;
    }
    this.subcatProducts = this.originalSubcatProducts.filter((elemento: any) => conditionFunction(elemento));
  }

  getSubcatProducts() {
    this.isLoading.set(true);
    this.showData.set(false);
    this.articlesService
      .getSubcatProducts({ id_subcategoria: this.idSubcategory })
      .subscribe({
        next: async (res: any) => {
          this.subcatProducts = res;
          let conditionFunction;
          switch (this.lenguaje()) {
            case 'es':
              conditionFunction = (element:any) => element.p_es === '1';
              break;
            case 'en':
              conditionFunction = (element:any)  => element.p_en === '1';
              break;
            case 'fr':
              conditionFunction = (element:any)  => element.p_fr === '1';
              break;
            case 'po':
              conditionFunction = (element:any)  => element.p_po === '1';
              break;
            default:
              console.error('Lenguaje no válido');
              return;
          }

          this.showData.set(true);
          this.isLoading.set(false);
          this.getDataBoolean.set(true);
          this.originalSubcatProducts = [...res];
          this.subcatProducts = this.originalSubcatProducts.filter((elemento:any) => conditionFunction(elemento) );
          this.cantReferencias.set(this.subcatProducts.length);
          
        },
      });
  }

  getSeriesProducts() {
    this.showData.set(false);
    this.articlesService
      .getSeriesProducts({ id_categoria: this.idCategory(), id_serie: this.opc.id_serie })
      .subscribe({
        next: async (res: any) => {
          this.subcatProducts = res;
          let conditionFunction;
          switch (this.lenguaje()) {
            case 'es':
              conditionFunction = (element: any) => element.p_es === '1';
              break;
            case 'en':
              conditionFunction = (element: any) => element.p_en === '1';
              break;
            case 'fr':
              conditionFunction = (element: any) => element.p_fr === '1';
              break;
            case 'po':
              conditionFunction = (element: any) => element.p_po === '1';
              break;
            default:
              console.error('Lenguaje no válido');
              return;
          }
          this.originalSubcatProducts = [...res];
          this.subcatProducts = this.originalSubcatProducts.filter((elemento: any) => conditionFunction(elemento));
          this.cantReferencias.set(this.subcatProducts.length);
          this.showData.set(true);
        },
      });
  }

  cargarMasArticulos() {
    this.offset += 15;
    if (this.opc.id_subcategoria) {
      this.getSubcatProducts();
    } else {
      this.getSeriesProducts();
    }
  }

  checkOdernar(event: any) {
    if (this.filtros.ordenar[event.id_ordenar]) {
      this.filtros.ordenar[event.id_ordenar] = false;
    } else {
      Object.keys(this.filtros.ordenar).forEach(idOrdenar => {
        this.filtros.ordenar[idOrdenar] = false;
      });
      this.filtros.ordenar[event.id_ordenar] = true;
    }
    if (event.opc === 'nombre') {
      if (event.value === 'ASC') {
        return this.subcatProducts.sort((a: any, b: any) => a.nombre_es.localeCompare(b.nombre_es) || a.nombre_en.localeCompare(b.nombre_en) || a.nombre_fr.localeCompare(b.nombre_fr) || a.nombre_po.localeCompare(b.nombre_po));
      } else {
        return this.subcatProducts.sort((a: any, b: any) => b.nombre_es.localeCompare(a.nombre_es) || b.nombre_en.localeCompare(b.nombre_en) || b.nombre_fr.localeCompare(b.nombre_fr) || b.nombre_po.localeCompare(b.nombre_po));
      }
    }
    if (event.opc === 'referencia') {
      if (event.value === 'ASC') {
        this.subcatProducts.sort((a: any, b: any) => a.referencia.localeCompare(b.referencia));
      } else {
        this.subcatProducts.sort((a: any, b: any) => b.referencia.localeCompare(a.referencia));
      }
    }
  }

  checkEdades(event: any) {
    this.edadSeleccionada = event;
    if (this.filtros.edad[this.edadSeleccionada.id_edad]) {
      this.filtros.edad[this.edadSeleccionada.id_edad] = false;
    } else {
      this.filtros.edad[this.edadSeleccionada.id_edad] = true;
    }
    this.filtrarProductos();
  }

  checkSeries(event: any) {
    this.serieSeleccionada = event;
    if (this.filtros.serie[this.serieSeleccionada.id_serie]) {
      this.filtros.serie[this.serieSeleccionada.id_serie] = false;
    } else {
      this.filtros.serie[this.serieSeleccionada.id_serie] = true;
    }
    this.filtrarProductos();
  }

  checkColor(event: any) {
    this.colorSeleccionado = event;
    if (this.filtros.color[this.colorSeleccionado.id_color]) {
      this.filtros.color[this.colorSeleccionado.id_color] = false;
    } else {
      this.filtros.color[this.colorSeleccionado.id_color] = true;
    }

    this.filtrarProductos();
}

  checkMateriales(event: any) {
    this.materialSeleccionado = event;
    if (this.filtros.material[this.materialSeleccionado.id_material]) {
      this.filtros.material[this.materialSeleccionado.id_material] = false;
    } else {
      this.filtros.material[this.materialSeleccionado.id_material] = true;
    }

    this.filtrarProductos();
  }

  checkNovedad() {
    this.filtros.novedad = !this.filtros.novedad;
    this.filtrarProductos()
  }

  checkOferta() {
    this.filtros.oferta = !this.filtros.oferta;
    this.filtrarProductos()
  }

  checkInclusivo() {
    this.filtros.inclusivo = !this.filtros.inclusivo;
    this.filtrarProductos()
  }

  filtrarProductos() {
    this.subcatProducts = this.originalSubcatProducts.filter((producto: any) => {
        const alturaCaidaProducto = producto?.altura_caida;
        const superficieImpactoProducto = producto?.superficie_impacto;

        const filtroAltura = !this.filtros.altura || (alturaCaidaProducto && this.valorEntreLimites(alturaCaidaProducto, this.minSelectedAlturaCaida(), this.maxSelectedAlturaCaida()));
        const filtroSuperficie = !this.filtros.superficie || (superficieImpactoProducto && this.valorEntreLimites(superficieImpactoProducto, this.minSelectedSuperficieImpacto(), this.maxSelectedSuperficieImpacto()));
        const filtroInclusivo = !this.filtros.inclusivo || producto.inclusivo === '1';
        /* let filtroEdad = !this.filtros.edad[this.edadSeleccionada?.id_edad] || producto.edades.id_edad === this.edadSeleccionada.id_edad; */
        const filtroNovedad = !this.filtros.novedad || producto.novedad === '1';
        const filtroOferta = !this.filtros.oferta || ((this.lenguaje() === 'es' && producto.o_es === '1') || (this.lenguaje() === 'en' && producto.o_en === '1') || (this.lenguaje() === 'fr' && producto.o_fr === '1') || (this.lenguaje() === 'po' && producto.o_po === '1'));
        const filtroSerie = Object.keys(this.filtros.serie).length === 0 || 
          Object.values(this.filtros.serie).every(selected => !selected) || 
          Object.keys(this.filtros.serie).some(idSerie => 
            this.filtros.serie[idSerie] 
            && producto.series 
            && producto.series.some(
              (series: any) => series.id_serie === parseInt(idSerie)
            )
        );

        const filtroEdad = Object.keys(this.filtros.edad).length === 0 || 
        Object.values(this.filtros.edad).every(selected => !selected) || 
        Object.keys(this.filtros.edad).some(idEdad => {
          const filtroActivo = this.filtros.edad[idEdad];
          const edadCoincide = producto.edades && producto.edades.id_edad === parseInt(idEdad);
          return filtroActivo && edadCoincide;
        });

        const filtroColor = Object.keys(this.filtros.color).every(idColor => 
            !this.filtros.color[idColor] || (producto.colores && producto.colores.some((colores: any) => colores.id_color === parseInt(idColor)))
        );
        const filtroMaterial = !this.filtros.material[this.materialSeleccionado?.id_material] || (producto.materiales && producto.materiales.some((materiales: any) => materiales.id_material === this.materialSeleccionado.id_material));

        return filtroNovedad && filtroOferta && filtroInclusivo && filtroSerie && filtroEdad && filtroColor && filtroMaterial && filtroAltura && filtroSuperficie;
    });
    this.cantReferencias.set(this.subcatProducts.length);
  }
  
  valorEntreLimites(valor: number, limiteInferior: number, limiteSuperior: number): boolean {
    return valor >= limiteInferior && valor <= limiteSuperior;
  }

  valorEntreLimitesSuperficie(valor: number, limiteInferior: number, limiteSuperior: number): boolean {
    return valor >= limiteInferior && valor <= limiteSuperior;
  }

  detail(item: any){
    this.router.navigate(['categoria/',item.id_categoria]);
  }

  getEdad(item: any): string {
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

  getSeries(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.serie_es;
      case 'en':
        return item.serie_en;
      case 'fr':
        return item.serie_fr;
      case 'po':
        return item.serie_po;
      case 'it':
        return item.serie_it;
      default:
        return item.serie_es;
    }
  }

  getMaterialesText(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.material_es;
      case 'en':
        return item.material_en;
      case 'fr':
        return item.material_fr;
      case 'po':
        return item.material_po;
      case 'it':
        return item.material_it;
      default:
        return item.material_es;
    }
  }

  getCategoriaText(item: any): string {
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

  getLabel(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.label_es;
      case 'en':
        return item.label_en;
      case 'fr':
        return item.label_fr;
      case 'po':
        return item.label_po;
      case 'it':
        return item.label_it;
      default:
        return item.label_es;
    }
  }

  getSubcategoriaText(item: any): string {
    switch (this.lenguaje()) {
      case 'es':
        return item.subcategoria_es ? item.subcategoria_es : item.serie_es;
      case 'en':
        return item.subcategoria_en ? item.subcategoria_en : item.serie_en;
      case 'fr':
        return item.subcategoria_fr ? item.subcategoria_fr : item.serie_fr;
      case 'po':
        return item.subcategoria_po ? item.subcategoria_po : item.serie_po;
      case 'it':
        return item.subcategoria_it ? item.subcategoria_it : item.serie_it;
      default:
        return item.subcategoria_es ? item.subcategoria_es : item.serie_es;
    }
  }

}
