import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ImgErrorDirective } from '@app/core/directives/imgError.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalViewImagesComponent } from './modal-view-images/modal-view-images.component';
@Component({

    selector: 'manu-servicios',
    imports: [TranslateModule, ImgErrorDirective, MatTabsModule, RouterLink, CommonModule],
    templateUrl: './servicios.component.html',
    styleUrl: './servicios.component.scss'
})
export class ServiciosComponent {

  selectedTabIndex = 0;

  private _matDialog = inject(MatDialog);

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }

  viewImg(img: string) {
    const dialogRef = this._matDialog.open(ModalViewImagesComponent, {
      width: "900px",
      disableClose: true,
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      data: [img],
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
  }
}
