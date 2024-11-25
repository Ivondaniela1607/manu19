import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointService } from './services/BreakPointObserver.service';
import { Subscription } from 'rxjs';
/* import { TranslateService } from '@ngx-translate/core' */


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit, OnDestroy{

  //*==========================================================
  //  //?BREAK PINT SERVICE
  //*==========================================================
  breakpointService = inject(BreakpointService);
/*   translate = inject(TranslateService); */
  breakpointSubscription = new Subscription();
  breakPointSize = signal<string>('');

  constructor() {
   /*  this.translate.addLangs(['es', 'fr', 'po', 'en', 'it'])
    this.translate.setDefaultLang('es')
    const browserLang:any = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|po|fr|es|it/) ? browserLang : 'es') */
  }

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointService.getBreakpoint().subscribe(breakpoint => {
      this.breakPointSize.set(breakpoint);
    });
  }


  ngOnDestroy(): void {
  
    if (this.breakpointSubscription) {
        this.breakpointSubscription.unsubscribe();
    }
}

}
