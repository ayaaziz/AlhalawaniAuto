import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ChatpagePage } from '../chatpage/chatpage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
// import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  manufacture_id: any;
  model_id: any;
  val:any
  isenabled:any=true
  data:FormGroup
  namee:any
  start_work:any
  modeel:any
  yeaar:any
  maark:any
  end_work:any
  name:AbstractControl
  chasiss:AbstractControl
  model:AbstractControl
  mark:AbstractControl
  cardate:AbstractControl
  year:AbstractControl
  yeardata:any=[]
  brand_data:any=[]
  brandtype:any
  alldata:any=[]
  butDisabled:any=true
  butDisabled1:any=true
  fixedtime:any
  accestoken:any
  constructor(public toastCtrl:ToastController,public storage:Storage,public menue :MenuController,public toast:ToastController,public Alert:AlertController,public modalCtrl:ModalController,public mainservice:MainservicesProvider,public cent:CentralProvider,public formBuilder:FormBuilder,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.storage.get("mark").then(val=>{
      if(!(val==null))
      {
       this.mark.setValue(val)
       this.mainservice.brandtype(0,this.accestoken,this.mark.value,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))

      }
     })
     this.storage.get("model").then(val=>{
      if(!(val==null))
      {
       this.model.setValue(val)
      }
     })
     this.storage.get("year").then(val=>{
      if(!(val==null))
      {
       this.year.setValue(val)
      }
     })
    this.mainservice.manufactureyear(this.accestoken,(data) => this.manufactureyearSuccessCallback(data),(data) => this.manufactureyearFailureCallback(data))

    this.storage.get("name").then(val=>{
    if(!(val==null))
    {
     this.name.setValue(val)
    }
   })
    this.mainservice.brands(0,this.accestoken,(data) => this.brandsSuccessCallback(data),(data) => this.brandsFailureCallback(data))
    this.data = this.formBuilder.group({
      name: ['',Validators.required],
      chasiss: ['',Validators.required,],
      model: ['',Validators.required],
      mark: ['',Validators.required,],
      cardate: ['',Validators.required,],
      year: ['',Validators.required,],


    });
    this.name=this.data.controls['name'];
    this.chasiss=this.data.controls['chasiss'];
    this.model=this.data.controls['model'];
    this.mark=this.data.controls['mark'];
    this.cardate=this.data.controls['cardate'];
    this.year=this.data.controls['year'];

  }

 
  brandsSuccessCallback(data)
  {

    this.brand_data=data
   
   
  }
  chatFailureCallback(data)
  {
  }
  chatSuccessCallback(datuua)
  {
    this.isenabled=true
    this.storage.set('mark',this.mark.value)
    this.storage.set('model',this.model.value)
    this.storage.set('year',this.year.value)
    this.mainservice.branch(0,this.accestoken,(data) => this.branchSuccessCallback(data),(data) => this.branchFailureCallback(data))

  

  }
  branchSuccessCallback(data1)
  {
    this.storage.set("name",this.name.value)

    console.log(JSON.stringify(data1))
    data1.forEach(element => {

      this.start_work=element.start_work
      this.end_work=element.end_work
      
    });
    let data=this.name.value+","+this.cent.DeviceId
    let mapModal = this.modalCtrl.create(ChatpagePage,{Name:data,Model:this.model.value,Mark:this.mark.value,Year:this.year.value,Start:this.start_work,End:this.end_work,Page:"Chat"});
    mapModal.onDidDismiss(data=>{
     this.isenabled=false

    })
    mapModal.present();

  }
  branchFailureCallback(data)
  {

  }
  openmenu()
{
  this.menue.open()
}
  optionsFn()
  {
        this.mainservice.brandtype(0,this.accestoken,this.mark.value,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))
  }
  cancelorder()
  {
    this.data.reset()
  }
  confirmorder()
  {
    
    if(this.name.value==""||    this.year.value=="" || this.mark.value=="" || this.model.value=="")
    {
      this.presentConfirm()
      if(this.name.value=="")
      {
       
        this.namee='true'
      }
      if(this.year.value=="")
      {
      
        this.yeaar='true'
      }
      if(this.mark.value=="")
      {
        
        this.maark='true'
      }
      if(this.model.value=="")
      {
        
        this.modeel='true'
      }
  
    }
    else if  (this.name.value.length<= 6){
      this.presentConfirm1()

    }
    else
    {

    

      // this.mainservice.chat(this.accestoken,this.mark.value,this.model.value,this.year.value,this.name.value,this.cent.DeviceId,(data) =>this.chatSuccessCallback(data),(data) =>this.chatFailureCallback(data))
      this.isenabled=true
      this.storage.set('mark',this.mark.value)
      this.storage.set('model',this.model.value)
      this.storage.set('year',this.year.value)
      this.mainservice.branch(0,this.accestoken,(data) => this.branchSuccessCallback(data),(data) => this.branchFailureCallback(data))
    
    }
  }
  delmodel()
  {
    this.modeel='false'
  }
  delyear()
  {
    this.yeaar='false'
  }
  delname()
  {
    this.namee='false'
  }
  optionsFn1(ev)
  {
    this.maark='false'
  this.model_id=ev.target.value
  this.butDisabled1=false
  }
  optionsFn2(ev)
  {
      this.manufacture_id=ev.target.value
  }
  brandsFailureCallback(data)
  {
// this.presentToast()
  }
  brandtypeSuccessCallback(data)
  {

    this.alldata=data
    this.butDisabled=false
    this.isenabled=false

  }
  manufactureyearSuccessCallback(data)
  {
    this.yeardata=data

  }
 manufactureyearFailureCallback(data)
 {
this.presentToast()
 }
 brandtypeFailureCallback(data)
  {

    this.presentToast()
  }
  presentConfirm() {
    let alert = this.toast.create({
      message: 'من فضلك ادخل البيانات كامله',
     duration:3000,
     position:'bottom'
    });
    alert.present();
  }
  presentConfirm1() {
    let alert = this.toast.create({
      message: 'من فضلك ادخل الاسم كاملا',
      duration:3000,
      position:'bottom'
    });
    alert.present();
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
    this.mainservice.brands(0,this.cent.appAccess,(data) => this.brandsSuccessCallback(data),(data) => this.brandsFailureCallback(data))

  
  }
  authFailureCallback(data)
  {
    this.presentToast()
  }
  ionViewDidLoad()
      {
    
      }
      
}

