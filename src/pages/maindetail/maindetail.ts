import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CentralProvider } from '../../providers/central/central';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';

/**
 * Generated class for the MaindetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-maindetail',
  templateUrl: 'maindetail.html',
})
export class MaindetailPage {
  alldata:any=[]
  slide:any
  page:any
  name:any
  getdata:any=[]
  id:any
  Sliders:any=[]
  maindata:any
  image:any
  details:any="detail"
  fixedtime:any
  defaultimage:any
  accestoken:any
  constructor(public plt:Platform,public storage:Storage,public toastCtrl:ToastController,public mainservice:MainservicesProvider,public cent:CentralProvider,public social :SocialSharing,public navCtrl: NavController, public navParams: NavParams,public ViewCtrl:ViewController) {
  // this.name=this.navParams.get("Name")
  this.cent.status=0
  this.accestoken= localStorage.getItem('adftrmee')
  this.page=this.navParams.get("PageName")
  this.id=this.navParams.get("Item")
  this.image=this.cent.imgUrl
this.defaultimage=this.cent.default
    this.mainservice.mainOffer(this.accestoken,(data)=> this.mainOfferSuccessCallback(data),(data)=> this.mainOfferFailureCallback(data))

  }
  mainOfferSuccessCallback(data)
  {
    this.alldata=data

  
   for(var i=0;i<this.alldata.length;i++)
   {
     if(this.alldata[i].id==this.id)
     {
       this.name=this.alldata[i].name;
       this.getdata.push(this.alldata[i])
       console.log(this.getdata)
     }
   }

   for(var j=0;j<this.getdata.length;j++)
   {
     this.Sliders.push(this.getdata[j].image)
     this.slide=this.getdata[j].image

 }


  }

 
  search()
  {
    this.navCtrl.push(SearchPage)
  }
  mainOfferFailureCallback(data)
  {
this.presentToast()
  }
  shareoffer(disc,dis,img)
  {
    if (this.plt.is('ios')) {
    console.log(dis+img)
    this.social.share(disc , dis ,img ,"https://itunes.apple.com/us/app/%D8%A7%D9%84%D8%B6%D8%AD%D9%8A%D8%A7%D9%86-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/id1421240637?ls=1&mt=8").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
  else{
    console.log(dis+img)
    this.social.share(disc , dis ,img ,"https://play.google.com/store/apps/details?id=com.ITRoots.AldahayanAuto&ah=51fJvaVo7chCzf2mS2Fykmh_EBs").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالخادم',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  authSuccessCallback(data) {

  
    this.cent.appAccess=data.access_token;
    this.mainservice.mainOffer(this.accestoken,(data)=> this.mainOfferSuccessCallback(data),(data)=> this.mainOfferFailureCallback(data))

  }
  authFailureCallback(data)
  {
    this.presentToast()
  }
 
  ionViewDidLoad()
      {
    
       
      }
      doRefresh(ev)
      {
        this.alldata=[]
        this.getdata=[]
        this.Sliders=[]
        this.mainservice.mainOffer(this.accestoken,(data)=> this.mainOfferSuccessCallback(data),(data)=> this.mainOfferFailureCallback(data))
        ev.complete()
      }
}
