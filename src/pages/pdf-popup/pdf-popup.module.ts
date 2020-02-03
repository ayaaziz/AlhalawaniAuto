import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfPopupPage } from './pdf-popup';

@NgModule({
  declarations: [
    PdfPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(PdfPopupPage),
  ],
})
export class PdfPopupPageModule {}
