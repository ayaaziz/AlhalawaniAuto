import { Component } from '@angular/core';
import { NavController, MenuController,Events, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CentralProvider } from '../../providers/central/central';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { DetailsPage } from '../details/details';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MaindetailPage } from '../maindetail/maindetail';
import { AdvicedetailsPage } from '../advicedetails/advicedetails';
import { NotidetailsPage } from '../notidetails/notidetails';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  defaultimage:any
  id: any;
  imageurl:any;
  msg:any=true
  type:any
  fixedtime:any;
  show :any
  idto:any
  notiList:any=[]
  accestoken:any
  nameto:any
  offset:any=1
  constructor(public modalCtrl:ModalController,public event:Events,public toastctrl:ToastController,public storage:Storage,public toastCtrl:ToastController,public menue :MenuController,public mainservice:MainservicesProvider,public cent:CentralProvider,public viewCtrl:ViewController,public navCtrl: NavController) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.imageurl=this.cent.imgUrl
    this.defaultimage=this.cent.default

}
ionViewDidEnter()
{
  this.mainservice.shownotification(this.accestoken,this.cent.DeviceId,"-1",this.offset,(data)=>this.showsuccess(data),(data)=>this.showfail(data))

}

showupsuccess(data)
{
  
  if(this.cent.badge>0)
  {
 this.cent.badge-=1;
  }

  this.event.publish("counter",this.cent.badge);
   if(!(this.type==6 ||this.type==7 || this.type==8 || this.type==9 || this.type==10))
   {
    if (this.type==2)
    {
      this.navCtrl.push(DetailsPage,{Name:this.nameto,car:this.idto,PageName:"notification"})
 
    }
    else if (this.type==5){
      this.navCtrl.push(DetailsPage,{Name:this.nameto,car:this.idto,PageName:"listcars"})

    }
    else if (this.type==3)
    {
     this.navCtrl.push(MaindetailPage,{PageName:"notification",Item:this.idto})
 
    }
    else if (this.type==1)
    {
     this.navCtrl.push(AdvicedetailsPage,{Item:this.idto,Page:"notification"})
 
    }
   }
  else{

   
    let mapModal = this.modalCtrl.create(NotidetailsPage,{Message:this.nameto});
    mapModal.present();
  }

}
showoffer(name,id,offerid,type)
{
  this.idto=offerid
  this.type=type
  this.nameto=name
  this.mainservice.UpdateNotification(this.accestoken,id,"1",(data)=>this.showupsuccess(data),(data)=>this.showfail(data))
}
openmenu()
{
  this.menue.open()
}
  showsuccess(data)
  {
    this.notiList=data
    console.log(JSON.stringify(this.notiList))
    this.notiList.forEach(element => {
    if(!(element.type==6 || element.type==7 || element.type==8 || element.type==9 || element.type==10))
    {
      this.show = true
    }
    else{
      this.show=false
    }
  });
     if (this.notiList.length==0)
     {
       this.msg=false
     }
     else{
     
      this.notiList=data
       this.msg=true
     }
     console.log(JSON.stringify(this.notiList))
    
  }
  showfail(data)
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
  doRefresh(refresher) {
   
      this.mainservice.shownotification(this.accestoken,this.cent.DeviceId,"-1","1",(data)=>this.showsuccess(data),(data)=>this.showfail(data))
       refresher.complete()
        
   
  }
  doInfinite(ev)
  {
    setTimeout(() => {
      if (this.offset >= 0) {
      this.offset+=1
    
      this.mainservice.shownotification(this.accestoken,this.cent.DeviceId,"-1",this.offset,(data)=>{
    
        console.log(JSON.stringify(data))
        if (data.length > 0) {
          data.forEach(element => {
            this.notiList.push(element)
          });
         
       
        console.log(this.notiList)
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
}
