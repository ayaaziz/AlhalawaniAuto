import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-pdf-popup',
  templateUrl: 'pdf-popup.html',
})
export class PdfPopupPage {

  pdfSrc:string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform:Platform,
              private transfer: FileTransfer, private file: File,
              private viewCtrl:ViewController) {

                // this.pdfSrc = this.navParams.get("pdfFile");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPopupPage');
  }

  downloadPdf() {
    let path = null;

    if(this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }

    const fileTransfer = this.transfer.create();

    // fileTransfer.download('https://motivationletter.net/wp-content/uploads/2018/09/Motivation-Letter-For-Master-Degree-Sample-PDF.pdf',path + 'myFile.pdf').then(entry => {
    fileTransfer.download(this.pdfSrc,path + 'CarFeatures.pdf').then(entry => {
      let url = entry.toURL();

      console.log(url);
      // this.document.viewDocument(url, 'application/pdf',{});
      // this.fileOpener.open(url, 'application/pdf');
    })
  }


  closePopup() {
    this.viewCtrl.dismiss();
  }

}
