import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
/* import { TranslateLoader, TranslateModule } from '@ngx-translate/core'; */
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
/* import { TranslateHttpLoader } from '@ngx-translate/http-loader'; */
import { provideServiceWorker } from '@angular/service-worker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// AoT requires an exported function for factories
/* export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
 */


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideRouter(routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),

    
    importProvidersFrom(
      SweetAlert2Module.forRoot(),
/*       TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        },
        defaultLanguage: 'es'
    }) */
    ),
   
    provideHttpClient(withFetch()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideAnimationsAsync(), provideClientHydration(),
  ]
};
