import { Component } from '@angular/core';
import {  NavController, NavParams, Platform } from 'ionic-angular';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchPage } from '../search/search';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@Component({
  selector: 'page-advicedetails',
  templateUrl: 'advicedetails.html',
})
export class AdvicedetailsPage {
  id:any=[]
  ID:any
  alldata:any=[]
  img:any;
  defaultimage:any
  array:any=[]
  fixedtime:any;
  spedata:any=[]
  accestoken:any
  pagename:any
  constructor(public plt:Platform,public modalCtrl:ModalController,public storage:Storage,public toastCtrl:ToastController,public ViewCtrl:ViewController,public socialSharing:SocialSharing,public navCtrl: NavController,public mainservice:MainservicesProvider,public cent:CentralProvider, public navParams: NavParams) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.pagename=this.navParams.get("Page");
    this.id=this.navParams.get("Array");
    this.ID=this.navParams.get("Item");
    this.cent.status=0
    this.img=this.cent.imgUrl
    this.defaultimage=this.cent.default
    if(this.pagename=="notification"){

      this.mainservice.Advaices(this.accestoken,(data) => this.AdvaicesSuccessCallback(data), (data) => this.AdvaicesFailureCallback(data))

    }
    else{
    this.spedata.push(this.id)
    }
  }
  searc()
  {
  let modal = this.modalCtrl.create(SearchPage);
      modal.present();
  }
  AdvaicesSuccessCallback(data)
  {
   
   this.array =data
 
   this.array.forEach(element => {
     if(element.id==this.ID)
     {
       this.spedata.push(element)
     }
     
   });

  }
  share(name,img)
  {
    console.log(name,img)
    if (this.plt.is('ios')) {
    this.socialSharing.share("الحلواني اوتو" , name , img ,"https://itunes.apple.com/us/app/%D8%A7%D9%84%D8%B6%D8%AD%D9%8A%D8%A7%D9%86-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/id1421240637?ls=1&mt=8").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
  else
  {
    this.socialSharing.share("الحلواني اوتو" , name , img ,"https://play.google.com/store/apps/details?id=com.ITRoots.AlhalwanyMotors").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
  }
  AdvaicesFailureCallback(data)
  {
this.presentToast()
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالخادم',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  doRefresh(ev)
  {
    this.spedata=[]
    if(this.pagename=="notification"){

      this.mainservice.Advaices(this.accestoken,(data) => this.AdvaicesSuccessCallback(data), (data) => this.AdvaicesFailureCallback(data))

    }
    else{
    this.spedata.push(this.id)
    }
    ev.complete()
  }
 
}
