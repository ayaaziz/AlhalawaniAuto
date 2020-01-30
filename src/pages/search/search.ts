import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CentralProvider } from '../../providers/central/central';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { DetailsPage } from '../details/details';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  input: any;
  show:any=true
 myInput:any
 array:any=[]
 hide:boolean=true
 fixedtime:any
 searchPlaceholder:"بحث ......."
 accestoken:any
  constructor(public storage:Storage,public toastCtrl:ToastController,public cent:CentralProvider,public mainservice:MainservicesProvider,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
  }

 
onInput(myinput)
{
  this.input=myinput
  this.show=false;
  this.mainservice.searchcar(this.accestoken,myinput,(data) => this.searchcarSuccessCallback(data), (data) => this.searchcarFailureCallback(data))

}
searchcarSuccessCallback(data)
{
  if(this.input=="")
  {
    this.array=[]
    this.show=true;
    this.hide=true

  }
  else{
    
  this.array=data
  if(this.array.length==0)
  {
this.hide=false
this.show=true
  }
  else{
    this.hide=true
    this.array=data
  this.show=true;
  }
  }

}
getoffer(id,name)
{
  this.myInput=name
  this.navCtrl.push(DetailsPage,{PageName:"listcars",car:id,Name:name})

}
searchcarFailureCallback(data)
{
this.presentToast()
}
onCancel(e) {
  this.myInput = "";
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

  let date =new Date();
  let hours=date.getHours();
  let minutes=date.getMinutes();
  let seconds=date.getSeconds();
  let time=((hours*3600) +( minutes*60) +seconds)
  this.storage.set('time',time)
  this.storage.set('fixedtime',data.expires_in)
  this.storage.set('access_token', data.access_token);        
  this.cent.time=data.expires_in;
  this.cent.appAccess=data.access_token;
  console.log(data.access_token)

}
authFailureCallback(data)
{
  this.presentToast()
}

ionViewDidLoad()
    {
  
    }
}
