import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-view-images',
    imports: [MatDialogModule],
    templateUrl: './modal-view-images.component.html',
    styleUrl: './modal-view-images.component.scss'
})
export class ModalViewImagesComponent {

  img = signal<string>('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalViewImagesComponent>,
  ) {
    this.img.set(data)
  }
}
