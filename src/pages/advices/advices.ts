import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { AdvicedetailsPage } from '../advicedetails/advicedetails';
import { LAZY_LOADED_TOKEN } from 'ionic-angular/util/module-loader';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-advices',
  templateUrl: 'advices.html',
})
export class AdvicesPage {
alldata:any=[]
s:any
defaultimage:any
fixedtime:any
img:any
accestoken:any
  constructor(public modalCtrl:ModalController,public storage:Storage,public toastCtrl:ToastController,public navCtrl: NavController,public cent:CentralProvider,public mainservice:MainservicesProvider, public navParams: NavParams ,public ViewCtrl:ViewController,public social:SocialSharing) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.defaultimage=this.cent.default
    this.img= this.cent.imgUrl;
    this.mainservice.Advaices(this.accestoken,(data) => this.AdvaicesSuccessCallback(data), (data) => this.AdvaicesFailureCallback(data))
  
  }

  searc()
  {
  let modal = this.modalCtrl.create(SearchPage);
      modal.present();
  }
  AdvaicesSuccessCallback(data)
  {

    this.alldata=data
    console.log(JSON.stringify(this.alldata))
    this.storage.set('data',this.alldata)
  }
  AdvaicesFailureCallback(data)
  {
    this.storage.get('data').then((val)=>
  {
    this.alldata=val
  })
this.presentToast()
  }
  showmore(item)
  {
    for (var i=0;i<this.alldata.length;i++)
    {
      if(this.alldata[i].id==item)
      {
        this.navCtrl.push(AdvicedetailsPage,{Array:this.alldata[i]})

      }
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


  doRefresh(refresher) {

       this.mainservice.Advaices(this.accestoken,(data) => this.AdvaicesSuccessCallback(data), (data) => this.AdvaicesFailureCallback(data))
                  refresher.complete();
   
   
  }
 
  
}
