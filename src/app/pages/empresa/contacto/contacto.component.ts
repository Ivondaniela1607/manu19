import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '@app/services/articles.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup,FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import Swal from 'sweetalert2';
import { LocalStorageService } from '@app/services/localStorage.service';

@Component({
    selector: 'manu-contacto',
    imports: [TranslateModule, ImgErrorDirective, ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
    templateUrl: './contacto.component.html',
    styleUrl: './contacto.component.scss'
})
export class ContactoComponent implements OnInit{

  form!: FormGroup;

  /* signals */
  lenguaje = signal<string>('');


  private formBuilder = inject(FormBuilder);
  private articlesService = inject(ArticlesService);
  private _snackBar = inject(MatSnackBar);
  private localStorageService = inject(LocalStorageService);

  constructor() {this.formControl();}

  ngOnInit(): void {
    this.lenguaje = this.localStorageService.getLanguageSignal();
  }

  formControl() {
    this.form = this.formBuilder.group(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        
        empresa: ['', [ Validators.minLength(3)]],
        direccion: ['', [Validators.minLength(3)]],
        localidad: ['', [ Validators.minLength(3)]],
        codigo_postal: [''],
        provincia: ['', [Validators.required, ]],
        telefono: ['', [Validators.required, Validators.minLength(3),]],
        email: ['', [Validators.required, ]],
        observaciones: [''],
        check1: ['', ],
        check2: [false, [Validators.requiredTrue]],
      },
  /*     {
        validator: this.checksValidator
      } */
    )
  }

  checksValidator(group: FormGroup) {
    const check1Control = group.get('check1');
    const check1 = check1Control ? check1Control.value : null;
    const check2Control = group.get('check2');
    const check2 = check2Control ? check2Control.value : null;
    if (!check1 || !check2) {
      return { checksNotSelected: true };
    }
    return null;
  }

  enviar(){
    if (this.form.invalid) return;
    const body = { 
      ...this.form.value 
    };
    this.articlesService.sendEmailContacto(body).subscribe({
      next: (res: any) => {
        const mensajes: any = {
          'es': 'Se ha enviado la información con éxito',
          'en': 'The information has been sent successfully',
          'fr': 'Les informations ont été envoyées avec succès',
          'po': 'As informações foram enviadas com sucesso',
          'it': 'Le informazioni sono state inviate con successo',
        };
        const texto = mensajes[this.lenguaje()]
        Swal.fire({
          icon: 'success',
          text: texto,
        });


        if (!res['ok']) {

          const mensajes: any = {
            'es': 'Ha ocurrido un error al enviar la información',
            'en': 'The information has been sent successfully',
            'fr': 'Les informations ont été envoyées avec succès',
            'po': 'As informações foram enviadas com sucesso',
            'it': 'Le informazioni sono state inviate con successo',
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
        this._snackBar.open('Ha ocurrido un error al enviar la información', 'Cerrar 🚀', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
      },
    });

  }
}
