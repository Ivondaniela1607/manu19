import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { ArticlesService } from '@app/services/articles.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilesService } from '@app/services/files.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
    selector: 'manu-shopping-cart',
    imports: [MatProgressSpinnerModule, ImgErrorDirective, CdkStepperModule, MatStepperModule, ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss',
    providers: [{ provide: CdkStepper }]
})
export class ShoppingCartComponent implements OnInit{
  @ViewChild('stepper') stepper!: MatStepper;
  isEditable = false;
  formFieldHelpers:any
  motivoSelected = 0;
  importeSelected = 0;
  showStepper = true;
  form!: FormGroup
  shoppingCartProducts: any = [];
  parquesIfantiles: any = [];
  equipamientoDeportivo: any = [];
  mobiliarioUrbano: any = [];
  noShopping = true;
  url = environment.SERVER_URL + '/';
  atornillar = true;
  empotrar = false;
  seguridad = true;
  proteccion = false;
  resultado = 0;
  opc = false;
  referencia: any;
  stepTwoEnabled = false;
  islinear = false;

  /* signals */
  lenguaje = signal<string>('');
  carritoSignal = signal<any>({});
  downloadPdf = signal<boolean>(false);

  /* serivces */
  private articlesService = inject(ArticlesService)
  private localStorageService = inject(LocalStorageService);
  private formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  private filesService = inject(FilesService);

  constructor(
  ) {
    this.formControl()
  }

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();

    this.localStorageService.getCarritoObservable().subscribe((carrito:any) => {
      if (typeof carrito === 'object') {
        this.shoppingCartProducts = carrito;   
      }else {
        try {
          this.shoppingCartProducts = JSON.parse(carrito);
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          return;
        }
      }
    });
    this.proceesData();
  }

  formControl() {
    this.form = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        empresa: ['', [Validators.minLength(3)]],
        direccion: ['', [Validators.minLength(3)]],
        localidad: ['', [Validators.minLength(3)]],
        codigo_postal: ['', []],
        cant: ['', []],
        provincia: ['', [Validators.required,]],
        telefono: ['', [Validators.required,]],
        email: ['', [Validators.required,]],
        observaciones: ['', []],
        check1: ['', ],
        check2: [false, [Validators.requiredTrue]],
        empotrar: [''],
        atornillar: [''],
        seguridad: [false],
        proteccion: [false],
      },
    )
  }

  proceesData() {
    if (this.shoppingCartProducts && Array.isArray(this.shoppingCartProducts)) {
      if (this.shoppingCartProducts.length > 0) {
        this.noShopping = false;
        this.parquesIfantiles = this.shoppingCartProducts.filter(item => {
          return item.product.resultCategoria.some((categoria:any) => categoria.id_categoria === 1);
        });

        this.parquesIfantiles.forEach((element:any) => {
          element.showEmpotrar = element.product.empotrar === '1';
          element.showAtornillar = element.product.atornillar === '1';
          element.product.atornillar = false;
          element.product.empotrar = false;
        });
        this.equipamientoDeportivo = this.shoppingCartProducts.filter(item => {
          return item.product.resultCategoria.some((categoria:any) => categoria.id_categoria === 2);
        });
        this.mobiliarioUrbano = this.shoppingCartProducts.filter(item => {
          return item.product.resultCategoria.some((categoria:any) => categoria.id_categoria === 3);
        });
      } else {
        this.noShopping = true;
      }
    } else {
      this.noShopping = true;
    }
  }

  changeEmpoAtor(checkbox: string, item: any) {
    if (checkbox === 'empotrar') {
      item.product.empotrar = !item.product.empotrar;
      if (item.product.atornillar && item.product.empotrar) {
        item.product.atornillar = false;
      }
    } else if (checkbox === 'atornillar') {
      item.product.atornillar = !item.product.atornillar;
      if (item.product.atornillar && item.product.empotrar) {
        item.product.empotrar = false;
      }
    }
  }

  deleteArticulo(opc: any) {
    const index = this.shoppingCartProducts.findIndex((element:any) => element.product.id_catalogo === opc.product.id_catalogo);
    if (index !== -1) {
      this.shoppingCartProducts.splice(index, 1);
      this.localStorageService.setCarrito(JSON.stringify(this.shoppingCartProducts));

      this.shoppingCartProducts = [...this.shoppingCartProducts];
      this.proceesData();
    } else {
      this.proceesData();
    }
  }

  sumar(opc: any) {
    const index = this.shoppingCartProducts.findIndex((element:any) => element.product.id_catalogo === opc.product.id_catalogo);
    if (index !== -1) {
      this.shoppingCartProducts[index].cant++;
      this.localStorageService.setCarrito(JSON.stringify(this.shoppingCartProducts));
      this.shoppingCartProducts = [...this.shoppingCartProducts];
      this.proceesData();
    } else {
      this.proceesData();
    }
  }

  restar(opc: any) {
    const index = this.shoppingCartProducts.findIndex((element:any) => element.product.id_catalogo === opc.product.id_catalogo);
    if (index !== -1) {
      this.shoppingCartProducts[index].cant--;
      if (this.shoppingCartProducts[index].cant === 0) {
        this.shoppingCartProducts.splice(index, 1);
        this.proceesData();
      }
      this.localStorageService.setCarrito(JSON.stringify(this.shoppingCartProducts));
      this.shoppingCartProducts = [...this.shoppingCartProducts];
      this.proceesData();
    } else {
      this.proceesData();
    }
  }

  enviar() {
    if (this.form.invalid) return;
    const body = {
      carrito: this.shoppingCartProducts,
      ...this.form.value
    };
    
    this.articlesService.sendEmailContacto(body).subscribe({
      next: (res: any) => {
        const mensajes: any = {
          'es': 'Se ha enviado el presupuesto con éxito',
          'en': 'The quote has been sent successfully',
          'fr': 'Le devis a été envoyé avec succès',
          'po': 'A cotação foi enviada com sucesso',
          'it': 'Il preventivo è stato inviato con successo',
        };
        const texto = mensajes[this.lenguaje()]
        Swal.fire({
          icon: 'success',
          text: texto,
        });

        this.referencia = res.idInsert;
        this.localStorageService.removeItem('carrito');
        if (!res['ok']) {

          const mensajes: any = {
            'es': 'Ha ocurrido un error al enviar el presupuesto',
            'en': 'An error occurred while sending the quote',
            'fr': 'Une erreur s`est produite lors de l`envoi du devis',
            'po': 'Ocorreu um erro ao enviar a cotação',
            'it': 'Si è verificato un errore durante l`invio del preventivo',
          };
          const texto = mensajes[this.lenguaje()]
          Swal.fire({
            icon: 'error',
            text: texto,
          });
     
          return;
        }
        return;
 
      },
      error: () => {
        this._snackBar.open('Ha ocurrido un error al enviar el presupuesto', 'Cerrar 🚀', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
      },
    });
  }

  presupuestoPDF() {
    this.downloadPdf.set(true);
    if (this.shoppingCartProducts.length == 0) {
      this.downloadPdf.set(false);
      const mensajes: any = {
        'es': 'No hay datos para exportar',
        'en': 'There is no data to export',
        'fr': 'Il n`y a aucune donnée à exporter',
        'po': 'Não há dados para exportar',
        'it': 'Non ci sono dati da esportare',
      };
      const texto = mensajes[this.lenguaje()]
      Swal.fire({
        icon: 'info',
        text: texto,
      });
      return;
      
    }
    this.filesService.desacargarBBDD('presupuesto.pdf').subscribe(() => {
      const mensajes: any = {
        'es': 'Descargando detalle del presupuesto',
        'en': 'Downloading budget details',
        'fr': 'Télécharger les détails du budget',
        'po': 'Baixando detalhes do orçamento',
        'it': 'Download dei dettagli del budget',
      };
      const texto = mensajes[this.lenguaje()]
      Swal.fire({
        icon: 'info',
        text: texto,
        timer: 5000
      });
      const cabeceras = [
        {
          Producto: 'Producto',
          '': '',
          Cantidad: 'Creado por'
        },
      ];

      const data = this.shoppingCartProducts.map((c: any) => {
      let producto;

      switch (this.lenguaje()) {
        case 'es':
          producto = c.product.nombre_es;
          break;
        case 'en':
          producto = c.product.nombre_en;
          break;
        case 'fr':
          producto = c.product.nombre_fr;
          break;
        case 'po':
          producto = c.product.nombre_po;
          break;
        case 'it':
          producto = c.product.nombre_it;
          break;
        default:
          producto = 'Nombre de producto no disponible en este idioma';
      }

      return {
        Producto: `<strong>${c.product.referencia}</strong> ${producto} `,
        Opc: `<strong>${c.product.atornillar == '1' ? ' atornillar' : ''} ${c.product.empotrar == '1' ? ' empotrar' : ''} </strong>`,
        Cantidad: `${c.cant}`
      };
    });
    const titulo = 'presupuesto';
    const formulario = this.form.value;
    this.filesService
      .exportDataPdf({ cabeceras, data, titulo, formulario })
      .subscribe((res: any) => {
          this.downloadPdf.set(false);
          if (res.type === 'application/pdf') {
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'presupuesto.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          } else {
            console.error('La respuesta no es un Blob de tipo PDF.');
          }

        });
      });
  }
}
