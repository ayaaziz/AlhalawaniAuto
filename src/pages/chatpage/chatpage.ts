import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
// import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import * as firebase from 'Firebase';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { ChatPage } from '../chat/chat';
import { CentralProvider } from '../../providers/central/central';
// import { HttpClient } from '@angular/common/http/src/client';
import { HttpClient } from '@angular/common/http/';
import { HttpHeaders } from '@angular/common/http';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
@Component({
  selector: 'page-chatpage',
  templateUrl: 'chatpage.html',
})
export class ChatpagePage {
  alldata:any
  @ViewChild (Content) content:Content;  
  data = { type:'', user:'', message:'',deviceid:'',regid:'' };
chats = [];
roomkey:string;
nickname:string;
disable:any=true;
markid:any
isenabled:any="true"
modlid:any
yearid:any
device:any
accestoken:any
start_work:any
end_work:any
user:any
offStatus:boolean = false;
page:any
time:any
hide:any=false
msg:any
send:any
Page:any
plat:any
  constructor(public plt:Platform,public mainservice:MainservicesProvider,public http: HttpClient,public cent : CentralProvider,public toastCtrl:ToastController,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
   
    this.cent.status=1
    if(this.plt.is('ios'))
    {
      this.plat="ios"
    }
    else if (this.plt.is('android')){
      this.plat="android"
    }
    this.accestoken= localStorage.getItem('adftrmee')
    this.nickname=this.navParams.get("Name")
    this.device=this.navParams.get("Device")
    this.modlid=this.navParams.get("Model")
    this.markid=this.navParams.get("Mark")
    this.yearid=this.navParams.get("Year")
    this.start_work=this.navParams.get("Start")
    this.page=this.navParams.get("Page")
    this.end_work=this.navParams.get("End")
    this.data.type = 'message';
    this.data.user=this.nickname.split(',')[0]
    this.user=this.data.user
    if(this.data.message=='')
    {
      this.disable=true
    }
    else{
      this.disable=false
    }
    if(this.page=="Chat")
    {
      this.time=new Date().getHours()
      if(this.start_work ==null ||  this.end_work==null)
      {

      }
      else{
   this.start_work= this.start_work.split(':')[0]
   this.end_work= this.end_work.split(':')[0]
      }
   this.data.deviceid=this.cent.DeviceId;
  //  this.mainservice.chat(this.accestoken,this.markid,this.modlid,this.yearid,this.user,this.data.deviceid,(data) =>this.chatSuccessCallback(data),(data) =>this.chatFailureCallback(data))

   
    }

  else if(this.page=="Notification")
  {
   this.data.deviceid=this.device;

  }
  
  this.data.regid=this.cent.regid

  firebase.database().ref('chatrooms/'+this.nickname+'/chats').on('value', resp => {
    this.chats = [];
    this.chats = snapshotToArray(resp);
    setTimeout(() => {
      if(this.offStatus === false) {
        this.content.scrollToBottom(300);
      }
    }, 1000);
  });
  

  }
  enable()
  {
    if(this.data.message=="")
    {
      this.isenabled=true
    }
    else
    {
      this.isenabled=false
    }
  }
  ionViewDidLoad() {
  }
  
  sendMessage()
  {    

    if(this.data.message == "" )  
      {}
else
{
    let newData = firebase.database().ref('chatrooms/'+this.nickname+'/chats').push();
  newData.set({
    type:this.data.type,
    user:this.data.user,
    message:this.data.message,
    devid:this.data.deviceid,
    regid:this.data.regid,
    sendDate:Date.now()

  });
  this.data.message = '';
  if((this.time< this.start_work && this.time>this.end_work))
  {
    this.hide=true
    this.send=Date.now()
  this.msg=" شكرا لاستخدامك خدمه التواصل  تطبيق الضحيان اوتو مواعيد العمل من ٩ صباحا حتي ٩ مساءا سيتم التواصل معك غدا"
  }
}
  }
  chatSuccessCallback(data)
  {
    console.log("success")
  }
  chatFailureCallback(data)
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
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  handleLogin()
{
  // this.mainservice.chat(this.accestoken,this.markid,this.modlid,this.yearid,this.user,this.data.deviceid,(data) =>this.chatSuccessCallback(data),(data) =>this.chatFailureCallback(data))
  if(this.data.message == '')
  {}
else
{
    let newData = firebase.database().ref('chatrooms/'+this.nickname+'/chats').push();
  newData.set({
    type:this.data.type,
    user:this.data.user,
    message:this.data.message,
    devid:this.data.deviceid,
    regid:this.data.regid,
    sendDate:Date.now()

  });
  this.data.message = '';
  if((this.time< this.start_work && this.time>this.end_work))
  {
    this.hide=true
    this.send=Date.now()
  this.msg=" شكرا لاستخدامك خدمه التواصل  تطبيق الضحيان اوتو مواعيد العمل من ٩ صباحا حتي ٩ مساءا سيتم التواصل معك غدا"
  }
}
}
}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        
        returnArr.push(item);
    });

    return returnArr;
};

