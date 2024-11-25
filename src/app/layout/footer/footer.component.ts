import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImgErrorDirective } from '../../core/directives/imgError.directive';
import { environment } from '@env/environment';
import { BreakpointService } from '@app/services/BreakPointObserver.service';
import { TranslateModule } from '@ngx-translate/core';



@Component({
    selector: 'manu-footer',
    imports: [TranslateModule, ImgErrorDirective, CommonModule, RouterLink, MatTooltipModule, ImgErrorDirective],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class FooterComponent {

  year = new Date().getFullYear();
  socialNetwoks = input<any>([]);

  SOCIAL_PATH =  environment.SERVER_UPLOADS_URL + '/social_networks/';  

  private breakpointService = inject(BreakpointService);
  private router = inject(Router);

  breakpoint = toSignal(this.breakpointService.getBreakpoint()) ;
 
  info(ruta: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['info/', ruta]);
    });
  }

  onClick(item: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([item]);
    });
  }

}
