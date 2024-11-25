import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { ConfigurationService } from '@app/services/configuration.service';
import { LocalStorageService } from '@app/services/localStorage.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'manu-news-detail',
    imports: [TranslateModule, ImgErrorDirective, RouterLink, CommonModule],
    templateUrl: './news-detail.component.html',
    styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {
  /* vriable */
  url: string  = environment.SERVER_URL + '/';

  /* signals */
  lenguaje = signal<string>('');
  idNoticia = signal<number>(0);
  data = signal<any>([]);
  showData = signal<boolean>(false);


  /* servicios */
  private localStorageService = inject(LocalStorageService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private configurationService = inject(ConfigurationService)

  ngOnInit(): void {
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
      this.idNoticia.set(parseInt(id));
    });
    this.getNoticiaById();
  }

  getNoticiaById(){
    this.configurationService
      .getNoticiaById({ id_noticia: this.idNoticia() })
      .subscribe({
        next: async (res: any) => {       
          this.data.set(res);
          this.showData.set(true);
        },
      });
  }
}
