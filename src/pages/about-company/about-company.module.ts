import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutCompanyPage } from './about-company';

@NgModule({
  declarations: [
    AboutCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutCompanyPage),
  ],
})
export class AboutCompanyPageModule {}
