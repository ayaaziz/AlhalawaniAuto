import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
@IonicPage()
@Component({
  selector: 'page-pdf-popup',
  templateUrl: 'pdf-popup.html',
})
export class PdfPopupPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public document:DocumentViewer,
              private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPopupPage');

    // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // }
    
    // this.document.viewDocument('file:///android_asset/www/assets/1a.pdf', 'application/pdf', options)

  //   this.fileOpener.open('../src/assets/1a.pdf', 'application/pdf')
  // .then(() => console.log('File is opened'))
  // .catch(e => console.log('Error opening file', e));

  // this.fileOpener.showOpenWithDialog('path/to/file.pdf', 'application/pdf')
  //   .then(() => console.log('File is opened'))
  //   .catch(e => console.log('Error opening file', e))
  }

}
