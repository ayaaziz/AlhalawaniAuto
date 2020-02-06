//#region original
// import { Component ,ViewChild } from '@angular/core';
// import { IonicPage, NavController, NavParams ,Content, Platform } from 'ionic-angular';
// import { ViewController } from 'ionic-angular/navigation/view-controller';
// // import { Socket } from 'ng-socket-io';
// import { Observable } from 'rxjs/Observable';
// import { ToastController } from 'ionic-angular/components/toast/toast-controller';
// import * as firebase from 'Firebase';
// import { DateTime } from 'ionic-angular/components/datetime/datetime';
// import { ChatPage } from '../chat/chat';
// import { CentralProvider } from '../../providers/central/central';
// // import { HttpClient } from '@angular/common/http/src/client';
// import { HttpClient } from '@angular/common/http/';
// import { HttpHeaders } from '@angular/common/http';
// import { MainservicesProvider } from '../../providers/mainservices/mainservices';
// @Component({
//   selector: 'page-chatpage',
//   templateUrl: 'chatpage.html',
// })
// export class ChatpagePage {
//   alldata:any
//   @ViewChild (Content) content:Content;  
//   data = { type:'', user:'', message:'',deviceid:'',regid:'' };
// chats = [];
// roomkey:string;
// nickname:string;
// disable:any=true;
// markid:any
// isenabled:any="true"
// modlid:any
// yearid:any
// device:any
// accestoken:any
// start_work:any
// end_work:any
// user:any
// offStatus:boolean = false;
// page:any
// time:any
// hide:any=false
// msg:any
// send:any
// Page:any
// plat:any
//   constructor(public plt:Platform,public mainservice:MainservicesProvider,public http: HttpClient,public cent : CentralProvider,public toastCtrl:ToastController,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
   
//     this.cent.status=1
//     if(this.plt.is('ios'))
//     {
//       this.plat="ios"
//     }
//     else if (this.plt.is('android')){
//       this.plat="android"
//     }
//     this.accestoken= localStorage.getItem('adftrmee')
//     this.nickname=this.navParams.get("Name")
//     this.device=this.navParams.get("Device")
//     this.modlid=this.navParams.get("Model")
//     this.markid=this.navParams.get("Mark")
//     this.yearid=this.navParams.get("Year")
//     this.start_work=this.navParams.get("Start")
//     this.page=this.navParams.get("Page")
//     this.end_work=this.navParams.get("End")
//     this.data.type = 'message';
//     this.data.user=this.nickname.split(',')[0]
//     this.user=this.data.user
//     if(this.data.message=='')
//     {
//       this.disable=true
//     }
//     else{
//       this.disable=false
//     }
//     if(this.page=="Chat")
//     {
//       this.time=new Date().getHours()
//       if(this.start_work ==null ||  this.end_work==null)
//       {

//       }
//       else{
//    this.start_work= this.start_work.split(':')[0]
//    this.end_work= this.end_work.split(':')[0]
//       }
//    this.data.deviceid=this.cent.DeviceId;
//   //  this.mainservice.chat(this.accestoken,this.markid,this.modlid,this.yearid,this.user,this.data.deviceid,(data) =>this.chatSuccessCallback(data),(data) =>this.chatFailureCallback(data))

   
//     }

//   else if(this.page=="Notification")
//   {
//    this.data.deviceid=this.device;

//   }
  
//   this.data.regid=this.cent.regid

//   firebase.database().ref('chatrooms/'+this.nickname+'/chats').on('value', resp => {
//     this.chats = [];
//     this.chats = snapshotToArray(resp);
//     setTimeout(() => {
//       if(this.offStatus === false) {
//         this.content.scrollToBottom(300);
//       }
//     }, 1000);
//   });
  

//   }
//   enable()
//   {
//     if(this.data.message=="")
//     {
//       this.isenabled=true
//     }
//     else
//     {
//       this.isenabled=false
//     }
//   }
//   ionViewDidLoad() {
//   }
  
//   sendMessage()
//   {    

//     if(this.data.message == "" )  
//       {}
// else
// {
//     let newData = firebase.database().ref('chatrooms/'+this.nickname+'/chats').push();
//   newData.set({
//     type:this.data.type,
//     user:this.data.user,
//     message:this.data.message,
//     devid:this.data.deviceid,
//     regid:this.data.regid,
//     sendDate:Date.now()

//   });
//   this.data.message = '';
//   if((this.time< this.start_work && this.time>this.end_work))
//   {
//     this.hide=true
//     this.send=Date.now()
//   this.msg=" شكرا لاستخدامك خدمه التواصل  تطبيق الضحيان اوتو مواعيد العمل من ٩ صباحا حتي ٩ مساءا سيتم التواصل معك غدا"
//   }
// }
//   }
//   chatSuccessCallback(data)
//   {
//     console.log("success")
//   }
//   chatFailureCallback(data)
//   {
//     this.presentToast()
//   }
//   presentToast() {
//     let toast = this.toastCtrl.create({
//       message: 'تاكد من اتصالك بالخادم',
//       duration: 4000,
//       position: 'bottom'
//     });
//     toast.present();
//   }
//   showToast(msg) {
//     let toast = this.toastCtrl.create({
//       message: msg,
//       duration: 2000
//     });
//     toast.present();
//   }
//   handleLogin()
// {
//   // this.mainservice.chat(this.accestoken,this.markid,this.modlid,this.yearid,this.user,this.data.deviceid,(data) =>this.chatSuccessCallback(data),(data) =>this.chatFailureCallback(data))
//   if(this.data.message == '')
//   {}
// else
// {
//     let newData = firebase.database().ref('chatrooms/'+this.nickname+'/chats').push();
//   newData.set({
//     type:this.data.type,
//     user:this.data.user,
//     message:this.data.message,
//     devid:this.data.deviceid,
//     regid:this.data.regid,
//     sendDate:Date.now()

//   });
//   this.data.message = '';
//   if((this.time< this.start_work && this.time>this.end_work))
//   {
//     this.hide=true
//     this.send=Date.now()
//   this.msg=" شكرا لاستخدامك خدمه التواصل  تطبيق الضحيان اوتو مواعيد العمل من ٩ صباحا حتي ٩ مساءا سيتم التواصل معك غدا"
//   }
// }
// }
// }

// export const snapshotToArray = snapshot => {
//     let returnArr = [];

//     snapshot.forEach(childSnapshot => {
//         let item = childSnapshot.val();
//         item.key = childSnapshot.key;
        
//         returnArr.push(item);
//     });

//     return returnArr;
// };

//#endregion

import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content, Platform, ActionSheetController, PopoverController} from 'ionic-angular';
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


//ayaaaaa
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { PdfPopupPage } from '../pdf-popup/pdf-popup';

@Component({
  selector: 'page-chatpage',
  templateUrl: 'chatpage.html',
})
export class ChatpagePage {
  alldata:any
  @ViewChild (Content) content:Content;  
  // data = { type:'', user:'', message:'',deviceid:'',regid:'' };
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
plat:any;
lastImage: string = null;

  constructor(public plt:Platform,
              public mainservice:MainservicesProvider,
              public http: HttpClient,
              public cent : CentralProvider,
              public toastCtrl:ToastController,
              public viewCtrl:ViewController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl:ActionSheetController,
              public camera:Camera,
              private file: File, 
              private filePath: FilePath,
              public popoverCtrl:PopoverController
              // private firebaseService:firebase
            ) {
   
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

    if(this.data.message == "")  
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
    sendDate:Date.now(),
    image:""

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


  //ayaaaaaaa
  // public presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Select Image Source',
  //     buttons: [
  //       {
  //         text: 'Load from Library',
  //         handler: () => {
  //           this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  //         }
  //       },
  //       {
  //         text: 'Use Camera',
  //         handler: () => {
  //           this.takePicture(this.camera.PictureSourceType.CAMERA);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // public takePicture(sourceType) {
  //   // Create options for the Camera Dialog
  //   var options = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   };
   
  //   // Get the data of an image
  //   this.camera.getPicture(options).then((imagePath) => {
  //     console.log("getPicture");
  //     // Special handling for Android library
  //     if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  //       this.filePath.resolveNativePath(imagePath)
  //         .then(filePath => {
  //           let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
  //           let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
  //           this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
  //         });

  //     console.log("getPicture android");
          
  //     } else {
  //       var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
  //       var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
  //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      
  //     console.log("getPicture ios");
        
  //     }
  //   }, (err) => {
  //     console.log("getPicture error "+JSON.stringify(err));
      
  //     this.presentToast1('Error while selecting image.');
  //   });
  // }


  // // Create a new name for the image
  // private createFileName() {
  //   var d = new Date(),
  //   n = d.getTime(),
  //   newFileName =  n + ".jpg";
  //   return newFileName;
  // }

  // // Copy the image to a local folder
  // private copyFileToLocalDir(namePath, currentName, newFileName) {
  //   console.log("copyFileToLocalDir");

  //   this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
  //     // this.lastImage = newFileName;

  //     //aya
  //     // this.lastImage = this.file.dataDirectory + newFileName;

  //     this.lastImage = this.cent.imgUrl + newFileName;
      

  //     let newData = firebase.database().ref('chatrooms/'+this.nickname+'/chats').push();
  //     newData.set({
  //       type:this.data.type,
  //       user:this.data.user,
  //       message:"",
  //       devid:this.data.deviceid,
  //       regid:this.data.regid,
  //       sendDate:Date.now(),
  //       image:this.lastImage

  //     });
  //     this.data.message = '';
  //     if((this.time< this.start_work && this.time>this.end_work))
  //     {
  //       this.hide=true
  //       this.send=Date.now()
  //     this.msg=" شكرا لاستخدامك خدمه التواصل  تطبيق الضحيان اوتو مواعيد العمل من ٩ صباحا حتي ٩ مساءا سيتم التواصل معك غدا"
  //     }

  //     console.log("this.lastImage "+this.lastImage );
  //   }, error => {
  //     this.presentToast1('Error while storing file.');
  //   });
  // }

  getimg() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'التقاط صورة',
          handler: () => {
            this.take(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'اختيار صورة من معرض الصور',
          handler: () => {
            this.take(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'إلغاء',
          // role: 'cancel'
          role:'destructive'
        }
      ]
    });
    actionSheet.present(); 
  }

  take(sourceType) {
  
    var options = {
      quality: 100, //50
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      // allowEdit:true,
      // targetWidth:200,
      // targetHeight:200
    };

    this.camera.getPicture(options).then((imageData: string) => {
    
      // this.lastImage = 'data:image/jpeg;base64,' + imageData;  
    //  let imgdata = encodeURIComponent(imageData);
      // this.photo = base64Image;

      // //update image in db

      // this.uploadImageToFirebase(imageData);


      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('pic'+new Date().getMilliseconds());
      // this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(imageData, 'base64', {contentType:'image/png'})
        .then(snapshot => {
          console.log("snapshot.downloadURL "+snapshot.downloadURL);

          let newData = firebase.database().ref('chatrooms/'+this.nickname+'/chats').push();
          newData.set({
            type:this.data.type,
            user:this.data.user,
            message:"",
            devid:this.data.deviceid,
            regid:this.data.regid,
            sendDate:Date.now(),
            image:snapshot.downloadURL
    
          });
          this.data.message = '';
          if((this.time< this.start_work && this.time>this.end_work))
          {
            this.hide=true
            this.send=Date.now()
          this.msg=" شكرا لاستخدامك خدمه التواصل  تطبيق الضحيان اوتو مواعيد العمل من ٩ صباحا حتي ٩ مساءا سيتم التواصل معك غدا"
          }
        }, err => {
          // reject(err);
        })
      // this.mainservice.changeProfilePicture(imageData,'jpeg',data => {
      //   console.log(data);

  
      // },
      // error => {
      //   console.log(error);
      // });
        
        
        

    }, (err) => {
      console.log(JSON.stringify(err))
    });
  }


  // uploadImageToFirebase(image){

  //   console.log("image 1 "+image)
  //   image = normalizeURL(image);

  //   console.log("image 2 "+image)
    
  
  //   //uploads img to firebase storage
  //   this.mainservice.uploadImage(image)
  //   .then(photoURL => {
  
  //     let toast = this.toastCtrl.create({
  //       message: 'Image was updated successfully',
  //       duration: 3000
  //     });
  //     toast.present();
  //     })
  //   }
  
  private presentToast1(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    console.log("pathForImage "+ img);

    if (img === null) {
      // alert("null")
      return '';
    } else {
      // alert(this.file.dataDirectory);
      // alert(img);
      
      // this.data.image = this.file.dataDirectory + img + new Date().getMilliseconds();

    

      return this.file.dataDirectory + img + new Date().getMilliseconds();
    }
  }


openImg(img) {
  let popup = this.popoverCtrl.create(PdfPopupPage,{img:img})

  popup.present();
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



