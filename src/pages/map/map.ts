import { Component, ViewChild, ElementRef } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { Events } from 'ionic-angular';
 import { Geolocation } from '@ionic-native/geolocation';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Platform } from 'ionic-angular/platform/platform';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
declare var google:any
var map;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  resplat:any
  resplong:any
  lat:any
  long:any
  map: GoogleMaps;
  location: any=[];
  branch_data:any=[]
  lt:any
  lg:any
  data:any
  TIME_IN_MS = 5000;
  interval:any
  address;
  position:any
  @ViewChild('map') mapele:ElementRef

  constructor(public plt:Platform,public loadingCtrl:LoadingController,public Alert:AlertController,public diagnostic:Diagnostic,public toastCtrl:ToastController,public geo:Geolocation,public platform:Platform,public events:Events,public navCtrl: NavController, public navParams: NavParams,public ViewCtrl:ViewController) {
    if(this.plt.is('ios'))
    {

this.diagnostic.requestLocationAuthorization("always");

    }
    else{
      this.diagnostic.requestLocationAuthorization();


    }
    this.checklocation()
  }
  checklocation()
  {
    let LocationEnabledsuccessCallback= (isAvailable) => {
      if (isAvailable) {
        this.GPSOpened();
      }
      else{
        this.requestOpenGPS();
        this.interval=  setInterval(()=>{ 
          this.gpsCheck()
        }, 5000);
      }
    }
    let LocationEnablederrorCallback = (e) =>{ 
      console.log("error")
    };
    let LocationAuthorizedsuccessCallback = (isAvailable) => {
      console.log('Is available? ' + isAvailable);
      if (isAvailable) {
        this.diagnostic.isLocationEnabled().then(LocationEnabledsuccessCallback).catch(LocationEnablederrorCallback);
     
      }
      else {
        this.diagnostic.isLocationEnabled().then(LocationEnabledsuccessCallback).catch(LocationEnablederrorCallback);
       
      }
    };
    let LocationAuthorizederrorCallback = (e) =>{ 
      console.log("error")
    };
    
    this.diagnostic.isLocationAvailable().then(LocationAuthorizedsuccessCallback).catch(LocationAuthorizederrorCallback);
  
  }
  gpsCheck(){
    let LocationEnabledsuccessCallback= (isAvailable) => {
      if (isAvailable) {
        clearInterval(this.interval)
        this.GPSOpened();
      }
    }
    let LocationEnablederrorCallback = (e) =>{ 
      console.log("error")
    };
    let LocationAuthorizedsuccessCallback = (isAvailable) => {
      console.log('Is available? ' + isAvailable);
      if (isAvailable) {
        this.diagnostic.isLocationEnabled().then(LocationEnabledsuccessCallback).catch(LocationEnablederrorCallback);
      }
      else {
        this.diagnostic.isLocationEnabled().then(LocationEnabledsuccessCallback).catch(LocationEnablederrorCallback);
       
      }
    };
    let LocationAuthorizederrorCallback = (e) =>{ 
      console.log("error")
    };
    
    this.diagnostic.isLocationAvailable().then(LocationAuthorizedsuccessCallback).catch(LocationAuthorizederrorCallback);
  
  }
  ionViewDidEnter()
  {

  }
  ionViewDidLoad() {
    // this.platform.ready().then(()=>{
    //   let LocationEnabledsuccessCallback= (isAvailable) => {
    //     if (isAvailable) {
    //       this.GPSOpened();
    //       clearInterval()
    //     }
    //     else{
    //       this.requestOpenGPS();

    //     }
    //   }
    //   let LocationEnablederrorCallback = (e) =>{ 
    //     console.log("error")
    //   };
    //   let LocationAuthorizedsuccessCallback = (isAvailable) => {
    //     console.log('Is available? ' + isAvailable);
    //     if (isAvailable) {
    //       this.diagnostic.isLocationEnabled().then(LocationEnabledsuccessCallback).catch(LocationEnablederrorCallback);

    //     }
    //     else {
    //       this.diagnostic.isLocationEnabled().then(LocationEnabledsuccessCallback).catch(LocationEnablederrorCallback);

    //     }
    //   };
    //   let LocationAuthorizederrorCallback = (e) =>{ 
    //     console.log("error")
    //   };
      
    //   this.diagnostic.isLocationAvailable().then(LocationAuthorizedsuccessCallback).catch(LocationAuthorizederrorCallback);
    


    // }).catch(err =>{console.log(err)});
   
  }
  
  GPSOpened()
  {
            var page=this;
          console.log("ssslkhkkk")
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("1")
           console.log(position.coords.latitude)
          localStorage.clear()
          page.lat=position.coords.latitude
           page.long=position.coords.longitude
           localStorage.setItem("lat",page.lat)
         localStorage.setItem("long",page.long)
            page.googlemap(page.lat,page.long)
              
          });
  }
  googlemap(lat,long)
  {
 
   
    const locations =new google.maps.LatLng(lat,long)
   
let mapOptions = {
    center:locations,
    zoom:18
    };
     map =new google.maps.Map(this.mapele.nativeElement,mapOptions)
     var myMarker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      draggable:true,
      position: locations
  });
     
       google.maps.event.addListener(myMarker, 'dragend', function(evt){
         localStorage.clear()
         localStorage.setItem("lat",evt.latLng.lat())
         localStorage.setItem("long",evt.latLng.lng())
         this.lt=evt.latLng.lat()
         this.lg=evt.latLng.lng()
        
       

    });
        
       
    this.addYourLocationButton(map, myMarker);
   
  }
       
  
  requestOpenGPS()
  {
    this.googlemap('24.7136','46.6753')

    let alert = this.Alert.create({
      message: ' من فضلك قم بتفعيل موقعك (GPS)',
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'موافق',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
           

          }
        }
      ]
    });
    alert.present();
       
      
      
    
  }
  
  
  presentToast1() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالانترنت',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  back()
  {
    let page=this
    console.log(localStorage.getItem("lat"))
    let geocoder = new google.maps.Geocoder();
    var latlng = {lat: parseFloat(localStorage.getItem("lat")), lng: parseFloat(localStorage.getItem("long"))};
    geocoder.geocode( {location:latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
        this.address =  results[0].formatted_address
        localStorage.setItem("Address",results[0].formatted_address)
        console.log( localStorage.getItem("Address"))
        page.ViewCtrl.dismiss({Lat:localStorage.getItem("lat"),Long:localStorage.getItem("long"),Address:localStorage.getItem("Address")
      })
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });

   
  
  }
  addYourLocationButton(map, marker) 
{
  let page=this;
    let controlDiv = document.createElement('div');

    let firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    let secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'dragend', function() {
       
    });

    firstChild.addEventListener('click', function() {
        var imgX = '0';
        var animationInterval = setInterval(function(){
            if(imgX == '-18') imgX = '0';
            else imgX = '-18';
           
        }, 500);
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
             localStorage.clear()
              localStorage.setItem("lat",(position.coords.latitude).toString())
              localStorage.setItem("long",(position.coords.longitude).toString())
            
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setPosition(latlng);
             
                map.setCenter(latlng);
                
                clearInterval(animationInterval);
                
            });
        }
        else{

          let alert = page.Alert.create({
            message: ' من فضلك قم بتفعيل موقعك (GPS)',
            buttons: [
              {
                text: 'الغاء',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'موافق',
                handler: () => {
                  page.diagnostic.switchToLocationSettings();
                  let hideFooterTimeout = setTimeout( () => {
                      page.GPSOpened()
                  }, page.TIME_IN_MS);
      
      
                }
              }
            ]
          });
          alert.present();
             
        }
    });

    // controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}
doRefresh(refresher)
{
  let loading = this.loadingCtrl.create({
  }); 
  loading.present();

  let LocationAuthorizedsuccessCallback = (isAvailable) => {
    console.log('Is available? ' + isAvailable);
    if (isAvailable) {
      this.GPSOpened();
      loading.dismiss()

    }
    else {
      this.requestOpenGPS();
      loading.dismiss()

    }
  };
  let LocationAuthorizederrorCallback = (e) =>{ 
    this.requestOpenGPS();
  };
  this.diagnostic.isLocationAvailable().then(LocationAuthorizedsuccessCallback).catch(LocationAuthorizederrorCallback);




}
 
}
