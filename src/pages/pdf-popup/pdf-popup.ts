import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-pdf-popup',
  templateUrl: 'pdf-popup.html',
})
export class PdfPopupPage {

  img:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform:Platform,
              private transfer: FileTransfer, private file: File,
              private viewCtrl:ViewController,
              private toastCtrl:ToastController,
              private social:SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPopupPage');
      this.img = this.navParams.get("img");
  }


  // downloadPdf() {
  //   let path = null;

  //   if(this.platform.is('ios')) {
  //     path = this.file.documentsDirectory;
  //   } else {
  //     path = this.file.dataDirectory;
  //   }

  //   const fileTransfer = this.transfer.create();

  //   // fileTransfer.download('https://motivationletter.net/wp-content/uploads/2018/09/Motivation-Letter-For-Master-Degree-Sample-PDF.pdf',path + 'myFile.pdf').then(entry => {
  //   fileTransfer.download(this.pdfSrc,path + 'CarFeatures.pdf').then(entry => {
  //     let url = entry.toURL();

  //     console.log(url);
  //     // this.document.viewDocument(url, 'application/pdf',{});
  //     // this.fileOpener.open(url, 'application/pdf');

  //     this.presentToast()
  //   })
  // }

  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'تم تحميل الملف',
  //     duration: 4000,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }


  // closePopup() {
  //   this.viewCtrl.dismiss();
  // }


  // share()
  // {
  //   // if (this.plt.is('ios')) {
  //   console.log()
  //   this.social.share("Message", "sub" ,this.pdfSrc).then(() => {
  //     console.log(" share success")
  //   }).catch(() => {
  //     console.log("not available")
  //   });
  // // }
  // // else{
  // //   this.social.share(this.name , dis ,img ,"https://play.google.com/store/apps/details?id=com.ITRoots.AldahayanAuto&ah=51fJvaVo7chCzf2mS2Fykmh_EBs").then(() => {
  // //     console.log("success")
  // //   }).catch(() => {
  // //     console.log("not available")
  // //   });
  // // }
  // }

}
