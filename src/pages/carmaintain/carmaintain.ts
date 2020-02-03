import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import { CentralProvider } from '../../providers/central/central';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { MaintainancePage } from '../maintainance/maintainance';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-carmaintain',
  templateUrl: 'carmaintain.html',
})
export class CarmaintainPage {
  detail:any=true
  maintenance_type_id: any;
  model_id: any;
  brand_id: any;
  price: any;
  htmlContent: any;
  brandtype: any;
  show:any=true
  val2:any
  modelid:any;
  maufacturedata:any=[]
  val:any
  isenabled:any=true
  val1:any
  data:any;
  markname:any
  fixedtime:any
  modelname:any
  yearname:any
  typename:any
  model:AbstractControl
  mark:AbstractControl
  year:AbstractControl
  mintype:AbstractControl
  brand_data:any=[]
  alldata:any=[]
  butDisabled:any=true
  butDisabled1:any=true
  butDisabled2:any=true
  maufacturetype:any=[]
  sel:any
  accestoken:any
  constructor(public storage:Storage,public toastCtrl:ToastController, public toast :ToastController,public Alert:AlertController,public mainservice:MainservicesProvider,public cent:CentralProvider,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.storage.get("mark").then(val=>{
      if(!(val==null))
      {
       this.mark.setValue(val)
       this.mainservice.brandtype(1,this.accestoken,this.mark.value,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))

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
     this.storage.get("markname").then(val=>{
      if(!(val==null))
      {
       this.markname=val
      }
     })
     this.storage.get("modelname").then(val=>{
      if(!(val==null))
      {
       this.modelname=val

      }
     
     })
     this.storage.get("yearname").then(val=>{
      if(!(val==null))
      {
       this.yearname=val
      }
     })
    this.data = this.formBuilder.group({
      model: ['',Validators.required],
      mark: ['',Validators.required],
      year: ['',Validators.required],
      mintype: ['',Validators.required],

    });

    this.model=this.data.controls['model'];
    this.mark=this.data.controls['mark'];
    this.year=this.data.controls['year'];
    this.mintype=this.data.controls['mintype'];
    this.mainservice.manufactureyear(this.accestoken,(data) => this.manufactureyearSuccessCallback(data),(data) => this.manufactureyearFailureCallback(data))

    this.mainservice.brands(1,this.accestoken,(data) => this.brandsSuccessCallback(data),(data) => this.brandsFailureCallback(data))
    
  }

 
  brandsSuccessCallback(data)
  {
    this.brand_data=data
  }
  brandsFailureCallback(data)
  {
// this.presentToast()
  }
  optionsFn()
  {
 this.brand_id=this.mark.value
    
     this.mainservice.brandtype(1,this.accestoken,this.brand_id,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))
   
  }
  brandtypeSuccessCallback(data)
  {

    this.alldata=data
    this.butDisabled=false


  }
  manufactureyearSuccessCallback(data)
  {
    this.maufacturedata=data
    this.butDisabled1=false
    this.mainservice.maintenancetype(this.accestoken,(data) => this.maintenancetypeSuccessCallback(data),(data) => this.maintenancetypeFailureCallback(data))

  }
 manufactureyearFailureCallback(data)
 {
this.presentToast()
 }
 maintenancetypeSuccessCallback(data)
 {
     this.maufacturetype=data
 }
 maintenancetypeFailureCallback(data)
 {

 }
 showGroup()
  {
    if(this.detail==false)
    {
      this.detail=true
    }
    else{
    this.detail=false
    }
  }
 brandtypeFailureCallback(data)
  {

  }
  optionsFn1()
  {
    if( this.brand_id=="" || this.model_id=="" || this.maintenance_type_id=="")
    {
        this.presentConfirm3()
    }
    else
    {
    this.mainservice.carmaintenance(this.accestoken,this.mark.value,this.model.value,this.mintype.value,(data) => this.carmaintenanceSuccessCallback(data),(data) => this.carmaintenanceFailureCallback(data))
    }
  }
  presentConfirm3() {
    let alert = this.toast.create({
      message: 'من فضلك ادخل البيانات كامله',
      duration:3000,
      position:'bottom'
    });
    alert.present();
  }
  options()
  {
    this.maintenance_type_id=this.year.value

  }
  optionsFn2()
  {
    this.model_id=this.model.value
    if( this.brand_id=="" || this.model_id=="" || this.maintenance_type_id=="")
    {
        this.presentConfirm3()
    }
    else
    {
    this.mainservice.carmaintenance(this.accestoken,this.mark.value,this.model.value,this.mintype.value,(data) => this.carmaintenanceSuccessCallback(data),(data) => this.carmaintenanceFailureCallback(data))
    }

  }
  carmaintenanceSuccessCallback(data)
 {
   
   if (data.length==0)
   {
    this.show=true
    this.detail=true
    this.presentToast1()
   }
   else {
  this.show=false
  this.detail=true

   let all:any=[];
   all=data

   all.forEach(element => {
     this.price = element.price
    this.htmlContent = element.description;
  
   });
   this.isenabled=false
  }
 }

 receive()
 {
  this.storage.set('mark',this.mark.value)
  this.storage.set('model',this.model.value)
  this.storage.set('year',this.year.value)
 for(var i =0;i<this.brand_data.length;i++)
 {
   if(this.brand_data[i].id==this.mark.value)
   {
     this.markname=this.brand_data[i].name

     }
 }
 for(var i =0;i<this.alldata.length;i++)
 {
   if(this.alldata[i].id==this.model.value)
   {
     this.modelname=this.alldata[i].name

     }
 }
 for(var i =0;i<this.maufacturedata.length;i++)
 {
   if(this.maufacturedata[i].id==this.year.value)
   {
     this.yearname=this.maufacturedata[i].name

     }
 }
 for(var i =0;i<this.maufacturetype.length;i++)
 {
   if(this.maufacturetype[i].id==this.mintype.value)
   {
     this.typename=this.maufacturetype[i].name
     }
 }

   this.navCtrl.push(MaintainancePage,{Page:"car",markname:this.markname,modelname:this.modelname,yearname:this.yearname,typename:this.typename ,markid:this.mark.value,modelid:this.model.value,yearid:this.year.value,mintype:this.mintype.value})
  this.isenabled=true
  }
 carmaintenanceFailureCallback(data)
 {

 }
 presentToast() {
  let toast = this.toastCtrl.create({
    message: 'تاكد من اتصالك بالخادم',
    duration: 4000,
    position: 'bottom'
  });
  toast.present();
}
presentToast1() {
  let toast = this.toastCtrl.create({
    message: 'غير متوفر سعر صيانه للطلب الحالى',
    duration: 4000,
    position: 'bottom'
  });
  toast.present();
}

}

