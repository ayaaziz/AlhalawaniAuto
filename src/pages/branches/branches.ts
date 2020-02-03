import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {GoogleMaps, GoogleMap,GoogleMapsEvent,GoogleMapOptions,MarkerOptions, Marker ,LatLng, CameraPosition} from '@ionic-native/google-maps';
import { CallNumber } from '@ionic-native/call-number';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
declare var google:any;

@Component({
  selector: 'page-branches',
  templateUrl: 'branches.html',
})
export class BranchesPage {
  differentm: any;
  shownGroup: any;
  location: any=[];
  branch_data:any=[]
  new:any=[]
  color:any="primary"
  @ViewChild('map') mapele:ElementRef
markers:any=[]
  user_email:string=""
  fixedtime:any
  lt : any;
  lg:any;
  map:GoogleMap
  marker:any
  arr:any=[]
  user_message:string=""
  data:any="branches"
  user_phone:any;
  datadetail:any=true
  resplat:any
  resplong:any
  accestoken:any
  constructor(public launchNavigator: LaunchNavigator,public storage:Storage,public geo:Geolocation,public Alert:AlertController,public mainservice:MainservicesProvider,public cent:CentralProvider,public navCtrl: NavController,private callNumber: CallNumber, public toastCtrl:ToastController,public navParams: NavParams,public ViewCtrl:ViewController,public googleMaps: GoogleMaps , public platform:Platform) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.mainservice.branch(0,this.accestoken,(data) => this.branchSuccessCallback(data),(data) => this.branchFailureCallback(data))

    this.platform.ready().then(()=>{
      // this.geo.getCurrentPosition().then((resp) => {
      //   this.resplat=resp.coords.latitude.toString();
      //   this.resplong=resp.coords.longitude.toString();


      // }).catch((error) => {
      //    console.log('Error getting location', error);
      //  });
    }).catch(err =>{console.log(err)});
  
  }
  branchSuccessCallback(data)
  {

    this.branch_data=data
    console.log(JSON.stringify(this.branch_data))
    this.storage.set('branchData',this.branch_data)
    this.googlemap()

  }

  hidedata(name)
  {
    this.show(name)
    this.datadetail=true
  }
  showdata(name) {
    this.show(name)
    this.datadetail=false

  }
  show(name)
  {
      return this.shownGroup === name;
  
  }
  showGroup(name,n2)
  {

    if (this.show(name)) {
      this.shownGroup = null;
      for(var i=0;i<this.markers.length;i++)
      {
      this.markers[i].setMap(null);
      
      }
      this.markers=[]
for(var i=0;i<this.branch_data.length;i++)
{
  
    this.location.push(new google.maps.LatLng(this.branch_data[i].latitude,this.branch_data[i].longitude))

  
}
for (var i = 0; i < this.location.length; i++)
 {
  this.addMarker(this.location[i],this.map,this.branch_data)
 }


    }
       else {
      this.shownGroup =name;
      this.location=[]
      
 for(var i=0;i<this.markers.length;i++)
{
this.markers[i].setMap(null);

}

this.location=[]
this.new=[]
for(var i=0;i<this.branch_data.length;i++)
{
  if(!(this.branch_data[i].name==n2))
  {
    this.location.push(new google.maps.LatLng(this.branch_data[i].latitude,this.branch_data[i].longitude))

  }
}
for (var i = 0; i < this.location.length; i++)
 {
  this.addMarker(this.location[i],this.map,this.branch_data)
 }
  for(var i=0;i<this.branch_data.length;i++)
  {
    
    
    if(this.branch_data[i].name==n2)
    {
      let dposition=new google.maps.LatLng(this.branch_data[i].latitude,this.branch_data[i].longitude)

      this.new.push(dposition)
      let marker= new google.maps.Marker({
        position: dposition
        ,
        map:this.map,
       
      })
      marker.setIcon('assets/imgs/marker.png');
      let luncher=this.launchNavigator
 marker.addListener('click', function(evt) {
  let lt=evt.latLng.lat()
  let lng=evt.latLng.lng()
  luncher.navigate([lt, lng])
  .then(
  success => console.log('Launched navigator'),
  error => console.log('Error launching navigator', error)
  );});

      
this.markers.push(marker)


// this.map.moveCamera(Camposition);
    
        }
  }
  }



// for(var i=0;i<this.markers.length;i++)
// {
//  this.markers[i].setMap(null);
// }

  
  
  }
  branchFailureCallback(data)
  {
this.storage.get('branchData').then((val)=>{
  this.branch_data=val
})
this.presentToast1()
  }

call(phone)
{
  this.callNumber.callNumber(phone, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}

 
  googlemap()
  {
   
    const locations =new google.maps.LatLng('24.7136','46.6753')
let mapOptions = {
    center:locations,
    zoom:10,
    };
    this. map =new google.maps.Map(this.mapele.nativeElement,mapOptions)
     for(var i=0;i<this.branch_data.length;i++)
     {
      this.location.push( new google.maps.LatLng(this.branch_data[i].latitude,this.branch_data[i].longitude))
    }
   
        for (var i = 0; i < this.location.length; i++)
        {
            this.addMarker(this.location[i],this.map,this.branch_data)
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.branch_data.length; i++) {
         bounds.extend(new google.maps.LatLng(this.branch_data[i].latitude,this.branch_data[i].longitude));
        }
    }
    addMarker(position,map,data)
    {
 this.marker= new google.maps.Marker({
  position:position,
  map:map
  
 
})

let luncher=this.launchNavigator
this.marker.addListener('click', function(evt) {
  let lt=evt.latLng.lat()
  let lng=evt.latLng.lng()
  luncher.navigate([lt, lng])
  .then(
  success => console.log('Launched navigator'),
  error => console.log('Error launching navigator', error)
  );});



this.markers.push(this.marker)
       return this.marker
       
    }
   
  nav(lt,lng)
  {
    this.launchNavigator.navigate([lt, lng])
  .then(
  success => console.log('Launched navigator'),
  error => console.log('Error launching navigator'+ error)
  );
  }
    colormarker(name)
    {
   
    
   for(var i=0;i<this.markers.length;i++)
   {
    this.markers[i].setMap(null);

   }
    
      for(var i=0;i<this.branch_data.length;i++)
      {
        
       
        if(this.branch_data[i].name==name)
        {
           this.new.push( new google.maps.LatLng(this.branch_data[i].latitude,this.branch_data[i].longitude))
          for (var i = 0; i < this.new.length; i++)
          {
            
            let marker= new google.maps.Marker({
              position:this.new[i],
              map:this.map,
             
            })
               marker.setIcon('assets/imgs/marker.png');
           
          }
        }
      }


    }
    

   
    send()
    {
      let num=this.user_phone +""
     
      if(this.user_email=="" || this.user_message=="" || this.user_phone=="")
      {
       
this.presentConfirm3()
      }
      else if (!((this.user_email.includes("@")) && (this.user_email.includes(".com")||this.user_email.includes(".net"))))
      {
      this.presentConfirm6()
    }
    else if (!(num.length ==10)  )
    {
        this.presentConfirm4()
    }

      else {
      this.mainservice.contact(this.accestoken,this.user_message,this.user_email,this.user_phone,(data) => this.contactSuccessCallback(data), (data) => this.contactFailureCallback(data))
      }
    }
    presentConfirm4() {
      let alert = this.toastCtrl.create({
        message: 'رقم الجوال غير صحيح',
        duration: 3000,
          position: 'bottom'
      });
      alert.present();
    }
    presentToast1() {
      let toast = this.toastCtrl.create({
        message: 'تاكد من اتصالك بالخادم',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();
    }
    presentConfirm6() {
      let alert = this.toastCtrl.create({
        message: 'البريد الالكتروني غير صحيح',
        duration: 3000,
          position: 'bottom'
      });
      alert.present();
    }
    presentConfirm3() {
      let alert = this.toastCtrl.create({
        message: 'من فضلك ادخل البيانات كامله',
        duration:3000,
        position:'bottom'
      });
      alert.present();
    }
    contactSuccessCallback(data)
    {
      this.user_email=""
      this.user_message=""
      this.user_phone=""
      this.presentToast()

    }
    contactFailureCallback(data)
    {
      this.presentToast1()
    }
    presentToast(){
      let toast = this.toastCtrl.create({
          message: 'تم ارسال رسالتك بنجاح',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      // AIzaSyAs4l_Dt3i1bXvGjm4-vWWOqmJDJ-vfuXE

      ionViewDidLoad()
      {
    
        
      }
    
     
  }
