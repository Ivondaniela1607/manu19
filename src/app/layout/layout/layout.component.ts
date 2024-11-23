import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ConfigurationService } from '../../services/configuration.service';
import { ISocialNetwork } from '../../interfaces/socialNetwork.interface';

@Component({
    selector: 'manu-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FooterComponent, HeaderComponent, RouterOutlet]
})
export class LayoutComponent implements OnInit{

  /* signals */
  socialNetwoks = signal<ISocialNetwork[]>([]);

  /* servicios */
  private configurationService = inject(ConfigurationService);

  ngOnInit(): void {
    this.getSocialNetworks();
  }

  getSocialNetworks() {
    this.configurationService.getSocialNetworks({}).subscribe({
      next: async (res: any) => {
        this.socialNetwoks.set(res);
      },
    })
  }
}
