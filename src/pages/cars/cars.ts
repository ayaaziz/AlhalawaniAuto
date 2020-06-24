import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { DetailsPage } from '../details/details';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SearchPage } from '../search/search';
import { MaindetailPage } from '../maindetail/maindetail';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {
  offers:any="cars"
  alldata:any=[]
  defaultimage:any
  img:any
  show:any=true
  offset:any=1
  show1:any=true
  s:any
  fixedtime:any
  getdata:any=[]
  accestoken:any
  constructor(public toastctrl:ToastController,public plt:Platform,public storage:Storage,public toastCtrl:ToastController,public navCtrl: NavController,public cent:CentralProvider,public mainservice:MainservicesProvider,public social:SocialSharing,public navParams: NavParams,public ViewCtrl:ViewController,public menue :MenuController) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    

this.defaultimage=this.cent.default
this.img=this.cent.imgUrl
}




//ayaaaaaa
loadData() {
  this.show = true;
  this.show1 = true;

  this.mainservice.CarOffer(this.accestoken,this.offset,(data)=> this.CarOfferSuccessCallback(data),(data)=> this.CarOfferFailureCallback(data))
  this.mainservice.mainOffer(this.accestoken,(data)=> this.mainOfferSuccessCallback(data),(data)=> this.mainOfferFailureCallback(data)) 
}

///ayaaaaaa
ionViewWillEnter() {
  this.loadData();
}

 
mainOfferSuccessCallback(data)
{
  this.getdata=data;
  if(this.getdata.length==0)
  {
    this.show1=false
  }
  this.storage.set("mainoffer",this.getdata)
}
mainOfferFailureCallback(data)
{
  this.storage.get("mainoffer").then((val)=>{
    this.getdata=val
  })
  this.presentToast()

}
  search()
  {
    this.navCtrl.push(SearchPage)
  }
  CarOfferSuccessCallback(data)
  {
    this.alldata=data;
    if(this.alldata.length>0)
    {
      this.storage.set("offerdata",this.alldata)
      console.log(JSON.stringify(this.alldata))
    }
    else
    {
      this.show=false
    }
   
  }
  opendetails(name,id,carid)
  {
   
    this.navCtrl.push(DetailsPage,{PageName:"cars",car:id,Name:name,Item:carid})  }
    opendetails2(name,id)
  {
    this.navCtrl.push(MaindetailPage,{PageName:"Main",Item:id,Name:name})  }
  CarOfferFailureCallback(data)
  {
    this.storage.get("offerdata").then((val)=>{
      this.alldata=val
    })
    // this.presentToast()
  }
  shareoffer(name,dis,dis2,img)
  {
    let price=dis+ "بدلا من " +dis2

    if (this.plt.is('ios')) {
      this.social.share(name , price ,img ,"https://apps.apple.com/us/app/%D8%A7%D9%84%D8%AD%D9%84%D9%88%D8%A7%D9%86%D9%8A-%D8%A7%D9%88%D8%AA%D9%88/id1516572071").then(() => {
        console.log("success")
      }).catch(() => {
        console.log("not available")
      });
    }
    else
    {
      this.social.share(name , price ,img ,"https://play.google.com/store/apps/details?id=com.ITRoots.AlhalwanyMotors").then(() => {
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
  doRefresh(refresher) {
    
                  // this.mainservice.CarOffer(this.accestoken,this.offset,(data)=> this.CarOfferSuccessCallback(data),(data)=> this.CarOfferFailureCallback(data))
                  // this.mainservice.mainOffer(this.accestoken,(data)=> this.mainOfferSuccessCallback(data),(data)=> this.mainOfferFailureCallback(data))

                  //ayaaaaaaa
                  this.loadData();
                  refresher.complete();

  }
  doInfinite(ev)
  {
    setTimeout(() => {

      if (this.offset >= 0) {
        this.offset+=1
      
        this.mainservice.CarOffer(this.accestoken,this.offset,(data)=>{
      
          console.log(JSON.stringify(data))
          if (data.length > 0) {
            data.forEach(element => {
              this.alldata.push(element)
            });
           
         
         
          ev.complete();
          }else{
            this.offset=-1;
            this.offsetToast();
            ev.complete();
          }
        },(data)=>{
          
          ev.complete();
        }
      )}
    
      else { ev.complete(); };
    }, 500);
    }
    offsetToast () {
      let toast = this.toastctrl.create({
      message: 'لا توجد اشعارات اخري ',
      duration: 2000,
      position: 'bottom'
      });
      toast.present();
      }


      openmenu() {
        this.menue.open()
      }
      
}
