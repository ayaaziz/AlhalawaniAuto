import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController,App ,Nav, ToastController, AlertController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NavController} from 'ionic-angular';
import { PaidPage } from '../pages/paid/paid';
import { MaintainancePage } from '../pages/maintainance/maintainance';
import { CarsPage } from '../pages/cars/cars';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppRate } from '@ionic-native/app-rate';
import { ListcarsPage } from '../pages/listcars/listcars';
import { BranchesPage } from '../pages/branches/branches';
import { AdvicesPage } from '../pages/advices/advices';
import { WarningPage } from '../pages/warning/warning';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { JopPage } from '../pages/jop/jop';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { CarmaintainPage } from '../pages/carmaintain/carmaintain';
import { SettingPage } from '../pages/setting/setting';
import { ChatPage } from '../pages/chat/chat';
import { Storage } from '@ionic/storage';

import Moment from 'moment'
import { DetailsPage } from '../pages/details/details';
import { MaindetailPage } from '../pages/maindetail/maindetail';
import { AdvicedetailsPage } from '../pages/advicedetails/advicedetails';
import { ChatpagePage } from '../pages/chatpage/chatpage';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { CentralProvider } from '../providers/central/central';
import { MainservicesProvider } from '../providers/mainservices/mainservices';
import { SearchPage } from '../pages/search/search';
import { Device } from '@ionic-native/device';
var config = {
  apiKey: "AIzaSyB9Zx37mn8D6XiboHffxA-ibDKVCtTUPSc",
  authDomain: "alhalwanymotors.firebaseapp.com",
  databaseURL: "https://alhalwanymotors.firebaseio.com",
  projectId: "alhalwanymotors",
  storageBucket: "alhalwanymotors.appspot.com",
  messagingSenderId: "958559604712"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navctrl:Nav;
  @ViewChild("content") nav: NavController
  rootPage:any = TabsPage;
  devID:any
  pltType:any=0
  accestoken:any
  constructor(public inap :InAppBrowser,public device:Device,public cent :CentralProvider,public mainservice:MainservicesProvider,public modalCtrl:ModalController,public alertctrl:AlertController,public push :Push,public toastCtrl:ToastController,public plt:Platform,public storage:Storage,public app:App,public platform: Platform, public screen : ScreenOrientation,statusBar: StatusBar,splashScreen: SplashScreen,public appRate:AppRate, public menue :MenuController,public socialSharing: SocialSharing) {
    platform.setDir('rtl',true)
    this.accestoken= localStorage.getItem('adftrmee')

 this.cent.status=0
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
      this.devID = device.uuid  
    
      this.cent.DeviceId= device.uuid 

 if (this.plt.is('ios')) {
   this.pltType=1
 }
 this.notification()
    });
    firebase.initializeApp(config);
  }
 ionViewDidLoad()
 {
  this.platform.ready().then(() => {
   
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    this.devID = this.device.uuid  
  
    this.cent.DeviceId= this.device.uuid 

if (this.plt.is('ios')) {
 this.pltType=1
}
this.notification()
  });
  firebase.initializeApp(config);
 }
  offers()
  {
    this.nav.setRoot(TabsPage, {tabIndex: 1});

    this.menue.close()
  }
  openwarning()
  {
    this.nav.push(WarningPage)
    this.menue.close()
  }
  opencontactus()
  {
    this.nav.push(BranchesPage)
    this.menue.close()

  }
  openparts()
  {
    this.nav.push(CarmaintainPage)
    this.menue.close()
  }
  openchat()
  {
this.nav.setRoot(TabsPage, {tabIndex: 2});
    this.menue.close()
  }
  openpaid()
  {
this.nav.setRoot(TabsPage, {tabIndex: 3});   
 this.menue.close()
  }
  opensetting()
  {
    this.nav.push(SettingPage)
    this.menue.close()
  }
  openadvices()
  {
    this.nav.push(AdvicesPage)
    this.menue.close()

  }
  optain()
  {
    this.nav.push(MaintainancePage)
    this.menue.close()

  }
  openbranches()
  {
    this.nav.push(BranchesPage)
    this.menue.close()

  }
shareapp()
{

  if (this.plt.is('ios')) {
  this.socialSharing.share("الحلواني اوتو" , null , null ,"https://apps.apple.com/us/app/%D8%A7%D9%84%D8%AD%D9%84%D9%88%D8%A7%D9%86%D9%8A-%D8%A7%D9%88%D8%AA%D9%88/id1516572071").then(() => {
    console.log("success")
  }).catch(() => {
    console.log("not available")
  });
}
else{
  this.socialSharing.share("الحلواني اوتو" , null , null ,"https://play.google.com/store/apps/details?id=com.ITRoots.AlhalwanyMotors").then(() => {
    console.log("success")
  }).catch(() => {
    console.log("not available")
  });
}
}
opencarspage()
{
  this.nav.push(ListcarsPage)
  this.menue.close()

}
openjopp()
{
  this.nav.push(JopPage)
  this.menue.close()

}
loginpage()
{
  this.nav.push(LoginPage)
  this.menue.close()

}
apprate()
{
  this.platform.ready().then(()=>{
  this.appRate.preferences.storeAppURL = {
    ios: '1516572071',
    android: 'market://details?id=com.ITRoots.AlhalwanyMotors',
  },

  this.appRate.preferences.customLocale={
    title: 'قيم الحلواني اوتو',
     message: 'إذا اعجبك تطبيق الحلولني للسيارات , هل تمانع من اخذ دقيقه لتقيمه؟ شكرا لدعمك',
      rateButtonLabel: 'قيم البرنامج الان',
      cancelButtonLabel:'الغاء',
       laterButtonLabel:'ذكرني لاحقا'
     
  },
  this.appRate.navigateToAppStore();
      //this.appRate.promptForRating(true);

 

}).catch((err)=>{
  console.log(err)
});
}
notification()
  {
   
    const options: PushOptions = {
      android: {
        senderID:"958559604712",
        forceShow: true,
         clearNotifications: false
      },
      ios: {
          alert: 'true',
          badge: 'true',
          sound: 'true'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   pushObject.on('notification').subscribe((notification: any) => {
    // this.mainservice.financerate(this.accestoken,this.cent.DeviceId,(data)=>this. financesuccess(data),(data)=>this .financefail(data))
    setTimeout(() => {
     if(this.plt.is('ios'))
     {
       if(notification.additionalData.foreground)
       {
        if (notification.additionalData["gcm.notification.type"] == "4" )
        {
          if( this.cent.status==1)
          {
   

          }
          else
          {
            let alert = this.alertctrl.create({
              title:notification["title"],
              message:notification["body"],
              buttons: [
               {
                 text: 'إلغاء',
                 role: 'cancel',
                 handler: () => {
                   console.log('Cancel');
                 }
               },
               {
                 text: 'عرض',
                 handler: () => {
            let mapModal = this.modalCtrl.create(ChatpagePage,{Name:notification.additionalData["gcm.notification.name"],Device:notification.additionalData["gcm.notification.device_id"],Page:"Notification"});
            mapModal.present();

                 }
                }]
                });
                alert.present();
          }
        }
        else{
         let alert = this.alertctrl.create({
           title:notification["title"],
           message:notification["body"],
           buttons: [
            {
              text: 'إلغاء',
              role: 'cancel',
              handler: () => {
                console.log('Cancel');
              }
            },
            {
              text: 'عرض',
              handler: () => {
                if (notification.additionalData["gcm.notification.type"] == "2" ) {
                      this.navctrl.setRoot(TabsPage).then(() => {
                        this.navctrl.push(DetailsPage,{PageName:"notification",car:notification.additionalData["gcm.notification.ID"],Type:notification.additionalData["gcm.notification.type"]})
                        console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
                      })
                    }
                      else if (notification.additionalData["gcm.notification.type"] == "3" )
                      {
                        this.navctrl.setRoot(TabsPage).then(() => {
                          this.navctrl.push(MaindetailPage,{PageName:"notification",Item:notification.additionalData["gcm.notification.ID"],Type:notification.additionalData["gcm.notification.type"]})
                          console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
                        })
                      }
                      else if (notification.additionalData["gcm.notification.type"] == "1" )
                      {
                        this.navctrl.setRoot(TabsPage).then(() => {
                          this.navctrl.push(AdvicedetailsPage,{Item:notification.additionalData["gcm.notification.ID"]})
                          console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
                        })
                      }
                      else if (notification.additionalData["gcm.notification.type"] == "4" )
                      {
                       
                        if( this.cent.status==1)
                            {
                                    
                            }
                            else
                            {
                          let mapModal = this.modalCtrl.create(ChatpagePage,{Name:notification.additionalData["gcm.notification.name"],Device:notification.additionalData["gcm.notification.device_id"],Page:"Notification"});
                          mapModal.present();
                            }
                      }
                      else if (notification.additionalData["gcm.notification.type"] == "5" )
                      {
                        this.navctrl.setRoot(TabsPage).then(() => {
                          this.navctrl.push(DetailsPage,{PageName:"listcars",car:notification.additionalData["gcm.notification.ID"],Type:notification.additionalData["gcm.notification.type"]})

                            console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
                        })
                      
                      }
                      else if (notification.additionalData["gcm.notification.type"]=="6" || notification.additionalData["gcm.notification.type"] =="7" || notification.additionalData["gcm.notification.type"] =="8" || notification.additionalData["gcm.notification.type"] =="9"|| notification.additionalData["gcm.notification.type"] =="10")
                      {
                        this.navctrl.setRoot(TabsPage).then(() => {
                        this.navctrl.push(AboutPage)
                        })
                      }
                     
                      else
                      {
                        
                          this.navctrl.setRoot(HomePage, {tabIndex: 0});
  
                        
                      }
                
              }
            }
          ]
        });
        alert.present();

      }
    }
      else{
        if (notification.additionalData["gcm.notification.type"] == "2" ) {
          this.navctrl.setRoot(TabsPage).then(() => {
            this.navctrl.push(DetailsPage,{PageName:"notification",car:notification.additionalData["gcm.notification.ID"],Type:notification.additionalData["gcm.notification.type"]})
            console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
          })
        }
          else if (notification.additionalData["gcm.notification.type"] == "3" )
          {
            this.navctrl.setRoot(TabsPage).then(() => {
              this.navctrl.push(MaindetailPage,{PageName:"notification",Item:notification.additionalData["gcm.notification.ID"],Type:notification.additionalData["gcm.notification.type"]})
              console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
            })
          }
          else if (notification.additionalData["gcm.notification.type"] == "1" )
          {
            this.navctrl.setRoot(TabsPage).then(() => {
              this.navctrl.push(AdvicedetailsPage,{Item:notification.additionalData["gcm.notification.ID"]})
              console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
            })
          }
          else if (notification.additionalData["gcm.notification.type"] == "4" )
          {
            if( this.cent.status==1)
            {
  
            }
            else{
            this.navctrl.setRoot(TabsPage).then(() => {
              let mapModal = this.modalCtrl.create(ChatpagePage,{Name:notification.additionalData["gcm.notification.name"],Device:notification.additionalData["gcm.notification.device_id"],Page:"Notification"});
              mapModal.present();
            })
          }
          }
          else if (notification.additionalData["gcm.notification.type"] == "5" )
          {
            this.navctrl.setRoot(TabsPage).then(() => {
              this.navctrl.push(DetailsPage,{PageName:"listcars",car:notification.additionalData["gcm.notification.ID"],Type:notification.additionalData["gcm.notification.type"]})

                console.log("noti id type" + notification.additionalData["gcm.notification.ID"] + " " + notification.additionalData["gcm.notification.type"])
            })
          }
          else if (notification.additionalData["gcm.notification.type"]=="6" || notification.additionalData["gcm.notification.type"] =="7" || notification.additionalData["gcm.notification.type"] =="8" || notification.additionalData["gcm.notification.type"] =="9"|| notification.additionalData["gcm.notification.type"] =="10")
                      {
                        this.navctrl.setRoot(TabsPage).then(() => {
                        this.navctrl.push(AboutPage)
                        })
                      }
                     
                      else
                      {
                        
                          this.navctrl.setRoot(HomePage, {tabIndex: 0});
  
                        
                      }

      }
    }
    else {
     if(notification.additionalData.type =="2"   )
     {
      this.navctrl.setRoot(TabsPage).then(() => {
      this.navctrl.push(DetailsPage,{PageName:"notification",car:notification.additionalData.ID,Type:notification.additionalData.type})
      }); 
    }else if(notification.additionalData.type=="3")
     {
      this.navctrl.setRoot(TabsPage).then(() => {
      this.navctrl.push(MaindetailPage,{PageName:"notification",Item:notification.additionalData.ID,Type:notification.additionalData.type})
      });
     }

     else if(notification.additionalData.type=="1"){
      this.navctrl.setRoot(TabsPage).then(() => {
      this.navctrl.push(AdvicedetailsPage,{Item:notification.additionalData.ID,Page:"notification"})
      });
     }

     else if(notification.additionalData.type=="4"){
    

      if( this.cent.status==1)
      {

      }
      else{
        this.navctrl.setRoot(TabsPage).then(() => {
          let mapModal = this.modalCtrl.create(ChatpagePage,{Name:notification.additionalData.name,Device:notification.additionalData.device_id,Page:"Notification"});
           mapModal.present();
          });
    }
     
     }
     else if(notification.additionalData.type =="5"   )
     {
      this.navctrl.setRoot(TabsPage).then(() => {
      this.navctrl.push(DetailsPage,{PageName:"listcars",car:notification.additionalData.ID,Type:notification.additionalData.type})
      }); 
    }
     else if (notification.additionalData.type =="6" || notification.additionalData.type =="7" || notification.additionalData.type =="8" || notification.additionalData.type =="9" || notification.additionalData.type =="10")
                      {
                        this.navctrl.setRoot(TabsPage).then(() => {
                        this.navctrl.push(AboutPage)
                        });
                      }
                      else
                      {
                        
                          this.navctrl.setRoot(HomePage, {tabIndex: 0});
  
                        
                      }
    }
  },1000);
  });

   pushObject.on('registration').subscribe((registration: any) => {
     this.cent.regid=registration.registrationId;
     console.log(JSON.stringify(registration.registrationId))
   this.mainservice.Notification(this.accestoken,this.devID,registration.registrationId,this.pltType,(data)=>this. NotificationSuccessCallback(data),(data)=>this.NotificationFailureCallback(data))
  
   
  });


   pushObject.on('error').subscribe(error => console.log('Error with Push plugin'+ error));
   
   
  }
  search()
  {
    let modal = this.modalCtrl.create(SearchPage);
      modal.present();
  }
  NotificationSuccessCallback(data)
  {
  
  }
  NotificationFailureCallback(data)
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
  openSnapchat() {
    
   this.inap.create('https://www.snapchat.com/add/alhalawaniauto', '_system', 'location=yes');
   this.menue.close();
  }

  openinsta() {
   this.inap.create('http://www.instagram.com/alhalawaniauto/', '_system', 'location=yes');
   this.menue.close();

  }

  openfacebook() { 
   this.inap.create('https://www.facebook.com/alhalawaniauto', '_system', 'location=yes');
   this.menue.close();
  }

  openWhatsapp() {
    this.inap.create('https://wa.me/966551493210', '_system', 'location=yes');
    this.menue.close();
  }
  }
