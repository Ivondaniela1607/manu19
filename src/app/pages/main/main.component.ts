import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderMainComponent } from "./header-main/header-main.component";
/* import { PresentacionHeaderComponent } from "./presentacion-header/presentacion-header.component";

import { UrbanGymComponent } from './urban-gym/urban-gym.component';
import { NewsComponent } from './news/news.component';
import { InstagramImagesComponent } from './instagram-images/instagram-images.component';
import { NoveltyComponent } from './novelty/novelty.component';

 */

@Component({
    standalone: true,
    selector: 'manu-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderMainComponent]
})
export class MainComponent { }
