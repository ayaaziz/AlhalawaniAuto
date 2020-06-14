import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { MaintainancePage } from '../../pages/maintainance/maintainance';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CarsPage } from '../cars/cars';
import { ListcarsPage } from '../../pages/listcars/listcars';
import {Storage} from '@ionic/storage';
import { CentralProvider } from '../../providers/central/central';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SearchPage } from '../search/search';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Platform } from 'ionic-angular/platform/platform';
import { Device } from '@ionic-native/device';
import { ChatPage } from '../chat/chat';
import { DetailsPage } from '../details/details';
import { AdvicedetailsPage } from '../advicedetails/advicedetails';
import { MaindetailPage } from '../maindetail/maindetail';
import { BranchesPage } from '../branches/branches';
import { ChatpagePage } from '../chatpage/chatpage';
import { AboutPage } from '../about/about';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RefreshTokenInterceptor } from '../../providers/mainservices/refresh-token.interceptor';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  percent:any=[]
  rootPage:any = TabsPage;
  fixedtime:any;
  devID:any;
  badgeg:any
  pltType:any=0
  accestoken:any
  constructor(public event:Events,public viewctrl:ViewController,public alertctrl:AlertController,public toastCtrl:ToastController, public device: Device,public plt:Platform,public modalCtrl:ModalController,public navCtrl: NavController,public push : Push,public storage:Storage, public cent:CentralProvider,public menue :MenuController,public mainservice:MainservicesProvider) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0

    this.plt.ready().then(()=> {
      this.devID = device.uuid  
      this.cent.DeviceId= device.uuid 

 if (this.plt.is('ios')) {
   this.pltType=1
 }

    //  this.mainservice.financerate(this.accestoken,this.cent.DeviceId,(data)=>this. financesuccess(data),(data)=>this .financefail(data))
    });
  }
  financesuccess(data)
  {
    let arr:any=[]
    this.percent.push(data)
   console.log(JSON.stringify(this.percent))
   

  for(var i =0;i<this.percent.length;i++)
  {
    
   this.storage.set('limit',this.percent[i].limit)
   arr=this.percent[i].CountNotifcationNotRead

  }
  for(var i =0;i<arr.length;i++)
  {
    this.badgeg=arr[i].notread

  }
 this.cent.badge=this.badgeg
  }
  financefail(data)
  {
    this.presentToast()
  }
  ionViewDidEnter()
  {
    if(!(navigator.onLine)) 
    {
     

      let toast = this.toastCtrl.create({
        message: 'تاكد من اتصالك بالانترنت',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();       

    }
    else{
    this.mainservice.financerate(this.accestoken,this.cent.DeviceId,(data)=>this. financesuccess(data),(data)=>this .financefail(data))
    }
    this.event.subscribe("counter", (badge) => {
      this.badgeg = badge;
     
      this.cent.badge=badge
    });
    this.badgeg=this.cent.badge
   
  }
  ionViewDidLoad()
  {
    if(!(navigator.onLine)) 
    {
     

      let toast = this.toastCtrl.create({
        message: 'تاكد من اتصالك بالانترنت',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();       

    }
    else{
      this.mainservice.financerate(this.accestoken,this.cent.DeviceId,(data)=>this. financesuccess(data),(data)=>this .financefail(data))
      }
      this.event.subscribe("counter", (badge) => {
        this.badgeg = badge;
       
        this.cent.badge=badge
      });
      this.badgeg=this.cent.badge
     
  }
  maintainanceorderSuccessCallback(data)
  {

  }
  noti()
  {
    this.navCtrl.push(AboutPage)
  }
  maintainanceorderFailureCallback(data)
  {
    this.presentToast()
  }
  opencarspage()
  {
    this.navCtrl.push(ListcarsPage)
  }
  openmenu()
  {
    this.menue.open()
  }
  authFailureCallback(data) {
  this.presentToast()
  }
  authSuccessCallback(data) {

    this.cent.appAccess=data.access_token;

  }
  search()
  {
    this.navCtrl.push(SearchPage)

  }
  optain()
  {
    this.navCtrl.push(MaintainancePage)

  }
 offers()
  {
    this.navCtrl.push(CarsPage)
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالخادم',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  openparts()
  {
    this.navCtrl.push(ChatPage)
  }

  readAboutCompany() {
    this.navCtrl.push("AboutCompanyPage");
  }
  
}

