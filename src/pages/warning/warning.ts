import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CentralProvider } from '../../providers/central/central';
import { Screenshot } from '@ionic-native/screenshot';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { SearchPage } from '../search/search';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@Component({
  selector: 'page-warning',
  templateUrl: 'warning.html',
})
export class WarningPage {
  img:any;
  alldata:any=[]
  defaultimage:any
  s:any
  fixedtime:any
  accestoken:any
  constructor(public storage:Storage,public modalCtrl:ModalController,public navCtrl: NavController,public mainservice:MainservicesProvider,public cent:CentralProvider, public toast:ToastController,public socialSharing:SocialSharing,public plt:Platform,public navParams: NavParams,public ViewCtrl:ViewController,public screenshot:Screenshot) {
    this.defaultimage=this.cent.default
    this.img=this.cent.imgUrl;
    console.log(this.cent.appAccess)
   this.accestoken= localStorage.getItem('adftrmee')
   this.cent.status=0
    this.mainservice.WarningSign(this.accestoken,(data) => this.WarningSignSuccessCallback(data), (data) => this.WarningSignFailureCallback(data))
  }

 
  share()
  {
    
    this.screenshot.save('jpg', 50, 'myScreenShot' + this.cent.screen()).then((data) => this.onScrShotSuccess(data), this.onScrShotError);

  }
  WarningSignSuccessCallback(data)
  {
    this.alldata=data
    this.storage.set("warningData",this.alldata)
  }  
  WarningSignFailureCallback(data)
  {
    this.storage.get("warningData").then((val)=>
  {
    this.alldata=val
  })
    this.presentToast1()

  }
  searc()
  {
  let modal = this.modalCtrl.create(SearchPage);
      modal.present();
  }
  onScrShotSuccess(data) {
   
      if (this.plt.is('ios')) {
        let appurl="https://apps.apple.com/us/app/%D8%A7%D9%84%D8%AD%D9%84%D9%88%D8%A7%D9%86%D9%8A-%D8%A7%D9%88%D8%AA%D9%88/id1516572071";

        //For iOS
        this.socialSharing.share(" للمزيد حول العلامات التحذيريه حمل التطبيق الآن", null,'file://' + data.filePath, appurl)
      }
      else {
        let appurl="https://play.google.com/store/apps/details?id=com.ITRoots.AlhalwanyMotors";

        //For android
        this.socialSharing.share(" للمزيد حول العلامات التحذيريه حمل التطبيق الآن", null, 'file://' + data.filePath, appurl);
      }

 
    }
    onScrShotError() {
    }
    presentToast()
    {
      let toast = this.toast.create({
        message: 'تاكد من اتصالك بالخادم',
        duration: 4000,
        position: 'top'
      });
    
     
    
      toast.present();
    

    }
    presentToast1() {
      let toast = this.toast.create({
        message: 'تاكد من اتصالك بالخادم',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();
    }
    doRefresh(refresher) {
            this.mainservice.WarningSign(this.accestoken,(data) => this.WarningSignSuccessCallback(data), (data) => this.WarningSignFailureCallback(data))

                          refresher.complete();


  
     
     
    }
  
    
    ionViewDidLoad()
        {
      
         
        }
    
}
