import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CentralProvider } from '../../providers/central/central';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  catNotifichecked:boolean=false
  all=true
  advicechecked:boolean=false
  maintainchecked:boolean=false
  jop:boolean=false
  time:boolean=false
  satha:boolean=false
  paid:boolean=false
  chat:boolean=false
  date:boolean=false
  newcar:boolean=false
  carchecked:boolean=false
  fixedtime:any
  accestoken:any
  constructor(public storage:Storage,public toastCtrl:ToastController,public navCtrl: NavController, public cent:CentralProvider,public mainservice:MainservicesProvider,public navParams: NavParams,public ViewCtrl:ViewController) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.mainservice.devicestatus(this.accestoken,this.cent.DeviceId,(data) => this.devicestatusSuccessCallback(data), (data) => this.devicestatusFailureCallback(data));
    this.cent.status=0
  }

  devicestatusSuccessCallback(data)
  {
    console.log(JSON.stringify(data))
    data.forEach(element => {
      if(element.status=="1")
      {
     
        this.all=false
        this.catNotifichecked=true
      }
      else{
        this.all=true
        this.catNotifichecked=false
  
      }
      if( element.type=="1")
      {
        if(element.noti_status=="1")
        {
        this.advicechecked=true
        }
        else
        {
          this.advicechecked=false
        }
      }
     
      if( element.type=="2")
      {
        if(element.noti_status=="1" )
        {
        this.carchecked=true
        }
      else
      {
        this.carchecked=false
      }
    }
      if( element.type=="3")
      {
        if(element.noti_status=="1")
        {
        this.maintainchecked=true  
        } 
         
      else
      {
        this.maintainchecked=false
            }
          }
          if( element.type=="4")
          {
            if(element.noti_status=="1" )
            {
            this.chat=true
            }
          else
          {
            this.chat=false
          }
        }
        if( element.type=="5")
        {
          if(element.noti_status=="1" )
          {
          this.newcar=true
          }
        else
        {
          this.newcar=false
        }
      }
      if( element.type=="6")
      {
        if(element.noti_status=="1" )
        {
        this.time=true
        }
      else
      {
        this.time=false
      }
    }
    if( element.type=="7")
    {
      if(element.noti_status=="1" )
      {
      this.satha=true
      }
    else
    {
      this.satha=false
    }
  }
  if( element.type=="8")
  {
    if(element.noti_status=="1" )
    {
    this.jop=true
    }
  else
  {
    this.jop=false
  }
}
if( element.type=="9")
{
  if(element.noti_status=="1" )
  {
  this.paid=true
  }
else
{
  this.paid=false
}
}
if( element.type=="10")
{
  if(element.noti_status=="1" )
  {
  this.date=true
  }
else
{
  this.date=false
}
}
    });
  
   
   
  }
  devicestatustypeSuccessCallback(data)
  {
    console.log(JSON.stringify(data))
   
  }
  devicestatustypeFailureCallback(data)
  {
    this.presentToast()
  }
  devicestatusFailureCallback(data)
  {
  }

  catNotifiChanged()
  {
    if(this.catNotifichecked==true)
    {
      this.mainservice.changeAllStatusNotification(this.accestoken,this.cent.DeviceId,"1",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));
       this.all=false
       this.advicechecked=true;
       this.maintainchecked=true;
       this.carchecked=true;
       this.newcar=true
       this.time=true
       this.chat=true
       this.satha=true
       this.jop=true
       this.paid=true
       this.date=true


    }
    else{
      this.advicechecked=false;
      this.maintainchecked=false;
      this.carchecked=false;
      this.newcar=false
      this.time=false
      this.chat=false
      this.satha=false
      this.jop=false
      this.paid=false
      this.date=false
      this.all=true
      this.mainservice.changeAllStatusNotification(this.accestoken,this.cent.DeviceId,"0",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
  }
  changeAllStatusNotificationSuccessCallback(data)
  {
   
  }
  changeAllStatusNotificationFailureCallback(data)
  {

    this.presentToast()
  }
  adviceChanged()
  {

    if(this.advicechecked==true)
    {
      this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","1",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
    else{
      this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","1",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
  }
  maintainChanged()
  {
    if(this.maintainchecked==true)
    {
      this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","3",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
    else{
      this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","3",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
  }
    carChanged()
    {
      if(this.maintainchecked==true)
      {
        this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","2",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));
  
      }
      else{
        this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","2",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));
  
      }
  }
  chatChanged()
  {
    if(this.chat==true)
    {
      this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","4",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
    else{
      this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","4",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

    }
}
newcarChanged()
{
  if(this.newcar==true)
  {
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","5",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
  else{
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","5",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
}
timeChanged()
{
  if(this.time==true)
  {
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","6",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
  else{
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","6",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
}
sathaChanged()
{
  if(this.satha==true)
  {
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","7",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
  else{
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","7",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
}
jopChanged()
{
  if(this.jop==true)
  {
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","8",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
  else{
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","8",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
}
paidChanged()
{
  if(this.paid==true)
  {
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","9",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
  else{
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","9",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
}
dateChanged()
{
  if(this.date==true)
  {
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"1","10",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

  }
  else{
    this.mainservice.changeStatusNotification(this.accestoken,this.cent.DeviceId,"0","10",(data) => this.changeAllStatusNotificationSuccessCallback(data), (data) => this.changeAllStatusNotificationFailureCallback(data));

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
  
  }
  authFailureCallback(data)
  {
    this.presentToast()
  }
  
  ionViewDidLoad()
      {
    
        
      }
  
}
