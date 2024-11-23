import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {


  private breakpontObserver = inject(BreakpointObserver);
  private _breakpoint = new BehaviorSubject<string>('');
  private breakpointSubscription: Subscription;

   breakpointNames = {
    [Breakpoints.XSmall]: 'XSmall',
    [Breakpoints.Small]: 'Small',
    [Breakpoints.Medium]: 'Medium',
    [Breakpoints.Large]: 'Large',
    [Breakpoints.XLarge]: 'XLarge',
    [Breakpoints.Handset]: 'Handset',
    [Breakpoints.Tablet]: 'Tablet',
    [Breakpoints.Web]: 'Web',
    [Breakpoints.HandsetPortrait]: 'HandsetPortrait',
    [Breakpoints.TabletPortrait]: 'TabletPortrait',
    [Breakpoints.WebPortrait]: 'WebPortrait',
    [Breakpoints.HandsetLandscape]: 'HandsetLandscape',
    [Breakpoints.TabletLandscape]: 'TabletLandscape',
    [Breakpoints.WebLandscape]: 'WebLandscape',
  };


  constructor() {

    this.breakpointSubscription = this.breakpontObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
      // Breakpoints.Handset,
      // Breakpoints.Tablet,
      // Breakpoints.Web,
      // Breakpoints.HandsetPortrait,
      // Breakpoints.TabletPortrait,
      // Breakpoints.WebPortrait,
      // Breakpoints.HandsetLandscape,
      // Breakpoints.TabletLandscape,
      //Breakpoints.WebLandscape,
    ]).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          const breakpointName = this.breakpointNames[query];
          this._breakpoint.next(breakpointName);

          console.log('\x1b[34m%s\x1b[0m', 'BREAKPOINT', breakpointName);
          break;
        }
      }
    });
  }

  getBreakpoint(): Observable<string> {
    return this._breakpoint.asObservable();
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }
}
