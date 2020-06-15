import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject ,} from '@ionic-native/file-transfer';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { AnimationKeyframesSequenceMetadata } from '@angular/core/src/animation/dsl';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { Platform } from 'ionic-angular/platform/platform';

declare var cordova;
@Component({
  selector: 'page-jop',
  templateUrl: 'jop.html',
})
export class JopPage {
  
  filename: string;
  namee:any
  phonee:any
  skill:any
  remark:any
  exp:any
  qua:any

  imageFileName:any;
  isenabled:any
  url:any
    data:FormGroup
    fixedtime:any
    name:AbstractControl
    email:AbstractControl
    phone:AbstractControl
    address:AbstractControl
    skills:AbstractControl
    qualification:AbstractControl
    experience:AbstractControl
    cv:AbstractControl
    remarks:AbstractControl
    alldata:any=[]
    nativepath: string;
    cvdata:any
    fileExt:any
    accestoken:any
  constructor(public loadingCtrl:LoadingController,public filepicker:IOSFilePicker,public base64:Base64,public filepath:FilePath,public storage:Storage,public file:File,public transferob:Transfer,public transfer:FileTransfer,private fileChooser: FileChooser,public toastCtrl:ToastController,public mainservice:MainservicesProvider,public cent:CentralProvider,public formBuilder:FormBuilder,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,public plt:Platform) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.storage.get('name').then(val=>{
      if(!(val==null))
      {
        this.name.setValue(val)
      }
    })

    this.storage.get('phone').then(val=>{
      if(!(val==null))
      {
        this.phone.setValue(val)
      }
    })
    this.mainservice.jobs(this.accestoken,(data)=>this.jobsSuccess(data),(data)=>this.jobsfail(data))
    this.data = this.formBuilder.group({
      name: ['',Validators.required],
      phone: ['',Validators.required,],
      email: ['',Validators.required],
      address: ['',Validators.required,],
      experience: ['',Validators.required,],
     cv: ['',Validators.required,],
     qualification:['',Validators.required,],
     skills:['',Validators.required,],
     remarks:['',Validators.required,],

    });
    this.name=this.data.controls['name'];
    this.phone=this.data.controls['phone'];
    this.email=this.data.controls['email'];
    this.address=this.data.controls['address'];
    this.experience=this.data.controls['experience'];
    this.cv=this.data.controls['cv'];
    this.qualification=this.data.controls['qualification']
    this.skills=this.data.controls['skills']
    this.remarks=this.data.controls['remarks']
// this.getcv()

  }

jobsSuccess(data)
{
  this.alldata=data
}
jobsfail(data)
{
}

  confirmorder()
  { 
    let num=this.phone.value + ""

      if(this.name.value=="" || this.phone.value=="" || this.experience.value=="" || this.skills.value==""|| this.qualification.value=="" )
{
  let toast = this.toastCtrl.create({
    message: ' من فضلك ادخل البيانات كامله',
    duration: 4000,
    position: 'bottom'
  });
  toast.present();
  if(this.name.value=="")
  {
   
    this.namee='true'
  }
  if(this.phone.value=="")
  {
    this.phonee='true'
  }
 
  if(this.experience.value=="")
  {
    this.exp='true'
  }
  if(this.skills.value=="")
  {
    this.skill='true'
  }
  if(this.qualification.value=="")
  {
    this.qua='true'
  }


} 

  else if (!(num.length ==10)  )
  {
this.presentConfirm5()
  }

else{
 

 
if(this.fileExt==undefined && this.cvdata==undefined)
{
  this.cvdata=null
  this.fileExt=null
  this.mainservice.carrier(this.accestoken,this.name.value,this.phone.value,this.experience.value,this.cvdata,this.fileExt,this.qualification.value,this.skills.value,this.remarks.value,this.cent.DeviceId,(data)=>this.success(data),(data)=>this.fail(data))

}

else{
  if (this.fileExt=='pdf' || this.fileExt=='docx'||this.fileExt =='doc' ){
    this.mainservice.carrier(this.accestoken,this.name.value,this.phone.value,this.experience.value,this.cvdata,this.fileExt,this.qualification.value,this.skills.value,this.remarks.value,this.cent.DeviceId,(data)=>this.success(data),(data)=>this.fail(data))

    }
    else{
      this.presentToast2()

    }
}


} 

 

  }
 
  deljop()
  {
    this.exp='false'

  }
  delname()
  {
    this.namee='false'
  }
  delqua()
  {
    this.qua='false'
  }
  delskill()
  {
    this.skill='false'
  }
  delexp()
  {
    this.exp='false'
  }
  
  delphone()
  {
   
    this.phonee='false'
  }
   presentConfirm5() {
    let alert = this.toastCtrl.create({
      message: 'رقم الجوال غير صحيح. يجب إدخال ١٠ أرقام',
      duration: 3000,
      position: 'bottom'
    });
    alert.present();
  }
  success(data)
  {
   
    this.data.reset()
    this.filename=""
    this.experience.setValue("اختر الوظيفه")
    this.presentToast()
    
    
  }
  fail(data)
  {
    this.presentToast1()
  }
  cancelorder()
  {
    this.data.reset();
    this.filename=""
  }
  carrierSuccessCallback(data)
  {

    this.data.reset()
    this.presentToast();
  }
 
  presentToast(){
    let toast = this.toastCtrl.create({
        message: 'تم ارسال طلبك بنجاح',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();
    }
    presentToast2(){
      let toast = this.toastCtrl.create({
          message: 'الملف لابد ان يكون pdf  او docx',
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
      }
  carrierFailureCallback(data)
  {
this.presentToast1()
  }
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".pdf";
    return newFileName;
  }
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  private copyFileToLocalDir(namePath, name, newFileName) {
    this.file.copyFile(namePath,name,  cordova.file.dataDirectory, newFileName).then(success => {
      console.log("succes copy file " + newFileName)
      this.url = this.pathForImage(newFileName);
      this.filename = newFileName;

    }, error => {
});
  }
  uploadd()
  {
  
    if (this.plt.is('ios')) {
      let self = this;
      self.filepicker.pickFile()
  .then(uri => {

 
  
  let correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
  self. filename=uri.substr(uri.lastIndexOf('/') + 1)
  self. fileExt = this.filename.split('.').pop();
  self .file.readAsDataURL("file:///"+correctPath,this.filename).then((val)=>{
    this.cvdata=val

    this.base64.encodeFile(val).then((base64File: string) => {
      this.cvdata=base64File
    })
       }).catch(err => console.log('Error reader'+ err));


    }) .catch(err => console.log('Error'+ err));
   

// self.filepicker.pickFile().then(uri => {

// let correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
// let currentName = uri.substring(uri.lastIndexOf('/') + 1);
// self.file.readAsDataURL("file:///" + correctPath, currentName).then(result=>{                           


// })
// })
  }
    else if(this.plt.is('android'))
    {
    this.fileChooser.open()
    .then(uri => {
      this.filepath.resolveNativePath(uri).then((result) => {
        this.nativepath = result;
         
         

   this.base64.encodeFile(this.nativepath).then((base64File: string) => {
    this.cvdata=base64File
    console.log(this.cvdata)
    this. filename=this.nativepath.substr(this.nativepath.lastIndexOf('/') + 1)
         this. fileExt = this.filename.split('.').pop();
  }, (err) => {
    console.log("base"+err);
  });

      }, (err) => {
        console.log(err);
      })
     

   })
    .catch(e => console.log(e));
  }
  
}
  presentToast1() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالخادم',
      duration: 4000,
      position: 'bottom'
    }
  );
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
    this.mainservice.jobs(this.cent.appAccess,(data)=>this.jobsSuccess(data),(data)=>this.jobsfail(data))

  
  }
  authFailureCallback(data)
  {
    this.presentToast1()
  }
  ionViewDidLoad()
      {
    
      }
}
