import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { DetailsPage } from '../details/details';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SearchPage } from '../search/search';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'page-listcars',
  templateUrl: 'listcars.html',
})
export class ListcarsPage {
  model_id: any;
  id: any;
  disable1:any=true
 year:any
  maufacturedata: any=[];
data:any=[]
hide:any
value1:any
offset:any=1
val2:any;
brand_data:any=[]
val:any
defaultimage:any
s:any
date:any=[]
value:any
alldata:any=[]
image:any;
brandtype:any
myear:any
fixedtime:any
butDisabled:any=true
butDisabled1:any=true
accestoken:any
hide1:any
hide2:any
show:any
  constructor(public toastctrl:ToastController,public plt:Platform,public storage:Storage,public toastCtrl:ToastController,public navCtrl: NavController, public social:SocialSharing,public mainservice:MainservicesProvider,public cent:CentralProvider, public navParams: NavParams , public ViewCtrl:ViewController) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.image=this.cent.imgUrl
    this.defaultimage=this.cent.default

    this.cent.status=0
  }
  ionViewDidLoad(){
  this.mainservice.getallliscar(this.accestoken,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

  this.mainservice.brands(0,this.accestoken,(data) => this.brandsSuccessCallback(data),(data) => this.brandsFailureCallback(data))
  this.mainservice.manufactureyear(this.accestoken,(data) => this.manufactureyearSuccessCallback(data),(data) => this.manufactureyearFailureCallback(data))

}
  shareoffer(name,price,img)
  {
    if (this.plt.is('ios')) {
    console.log(name,price,img)
    this.social.share(name , price , img ,"https://apps.apple.com/us/app/%D8%A7%D9%84%D8%AD%D9%84%D9%88%D8%A7%D9%86%D9%8A-%D8%A7%D9%88%D8%AA%D9%88/id1516572071").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    }); 
  }
  else{
    console.log(name,price,img)
    this.social.share(name , price , img ,"https://play.google.com/store/apps/details?id=com.ITRoots.AlhalwanyMotors").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
   }
  opendetails(name,id)
  {
    this.id=id
     this.navCtrl.push(DetailsPage,{car:id,PageName:"listcars",Name:name})
  }
  
  
 
  optionsFn(item)
  {
    this.hide=true
    console.log(item)
    if(item == " الكل")
    {
      this.hide1=false
      this.hide2=false
      this.value=""
      this.value1=""
        this.mainservice.getallliscar(this.accestoken,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
  
     
    }
    else{
      console.log("no")
 
        this.brandtype=item
        this.mainservice.brandtype(0,this.accestoken,this.brandtype,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))

        if(this.value ==null && this.value1==null)
        {
         
        this.mainservice.getliscar(this.accestoken, null,this.brandtype,null,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
        }
        else if(this.value ==null)
        {
         
          this.mainservice.getliscar(this.accestoken,null,item,this.value1,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        else if(this.value1==null)
        {
        
          this.mainservice.getliscar(this.accestoken, this.value,item,null,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        else{
         
          this.mainservice.getliscar(this.accestoken, this.value,item,this.value1,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        // else{
        //   if(!(this.myear==null || this.model_id==null))
        //   {
       
        //   }
        // }


  }
  }

  search()
  {
    this.navCtrl.push(SearchPage)
  }
  options(value)
  {
    this.hide1=true
    console.log(value)
    this.butDisabled1=false
    if(value==" الكل")
    {
     this.hide=false
     this.hide2=false
     this.val=""
     this.value1=""
        this.mainservice.getallliscar(this.accestoken,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
  
     
    }
    else 
    {
   
        this.model_id=value
       
        if(this.val==null && this.value1==null)
        {
        
        this.mainservice.getliscar(this.accestoken, this.model_id,null,null,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
        }
        else if(this.val ==null)
        {
        
          this.mainservice.getliscar(this.accestoken,this.model_id,null,this.value1,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        else if(this.value1==null)
        {
        
          this.mainservice.getliscar(this.accestoken, this.model_id,this.val,null,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        else{
         
          this.mainservice.getliscar(this.accestoken, this.value,this.val,this.value1,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }      // }
      //  }
  
 
    
  }
}
  options1(val)
  {
    this.hide2=true
    console.log(val)
   
    if(val ==" الكل ")
    {
      console.log("yes")
     this.hide=false
     this.hide1=false
     this.value=""
     this.val=""
        this.mainservice.getallliscar(this.accestoken,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
  
     
    }
    else{
      console.log("lll")
  
                   

        this.myear=val
        if(this.value ==null && this.val==null)
        {
         
        this.mainservice.getliscar(this.accestoken, null,null,this.myear,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
        }
        else if(this.value ==null)
        {
       
          this.mainservice.getliscar(this.accestoken,null,this.val,this.myear,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        else if(this.val==null)
        {
         
          this.mainservice.getliscar(this.accestoken, this.value,null,this.myear,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
        else{
         
          this.mainservice.getliscar(this.accestoken, this.value,this.val,this.myear,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))

        }
  
  }
  }
  getliscarSuccessCallback(data)
  {
   
    this.alldata=data
    if(this.alldata.length ==0)
    {
      this.show=false
    }
    else
    {
      this.show=true
    }
    this.storage.set("listcar",this.alldata)
    console.log(this.alldata)
  }
  getliscarFailureCallback(data)
  {
    this.storage.get("listcar").then((val)=>{
      this.alldata=val
    })
    this.presentToast()
  }
 
  brandtypeSuccessCallback(data)
  {
   
    this.date=data
    this.butDisabled=false
    this.disable1=false
    // console.log(this.date)
  }
  manufactureyearSuccessCallback(data)
  {
  
    this.maufacturedata=data
  }
 manufactureyearFailureCallback(data)
 {
// this.presentToast()
 }
 brandtypeFailureCallback(data)
  {
// this.presentToast()
  }
  brandsSuccessCallback(data)
  {

    // console.log("brand",JSON.stringify(data))
    this.brand_data=data

  }
  brandsFailureCallback(data)
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
  doRefresh(refresher) {
    
    this.val=""
    this.value=""
    this.value1=""
    this.hide=false
    this.hide1=false
    this.hide2=false
     this.mainservice.getallliscar(this.accestoken,this.offset,(data) => this.getliscarSuccessCallback(data),(data) => this.getliscarFailureCallback(data))
                  this.mainservice.brands(0,this.accestoken,(data) => this.brandsSuccessCallback(data),(data) => this.brandsFailureCallback(data))
                  this.mainservice.manufactureyear(this.accestoken,(data) => this.manufactureyearSuccessCallback(data),(data) => this.manufactureyearFailureCallback(data))
                   refresher.complete()
  }
  
  doInfinite(ev)
  {
    if(this.val==null || this.val=="  الماركه")
    {
    setTimeout(() => {
    if (this.offset >= 0) {
      this.offset+=1
    
      this.mainservice.getallliscar(this.accestoken,this.offset,(data)=>{
    
        console.log(JSON.stringify(data))
        console.log(data.length)
        if (data.length > 0) {
          data.forEach(element => {
            this.alldata.push(element)
          });
         
       
       
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
else
{
  if(this.value ==null && this.value1==null)
        {
          setTimeout(() => {
    
            if (this.offset >= 0) {
              this.offset+=1
            
              this.mainservice.getliscar(this.accestoken, null,this.brandtype,null,this.offset,(data)=>{
            
                console.log(JSON.stringify(data))
                console.log(data.length)
                if (data.length > 0) {
                  data.forEach(element => {
                    this.alldata.push(element)
                  });
                 
               
               
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
        else if(this.value ==null)
        {
          setTimeout(() => {
    
            if (this.offset >= 0) {
              this.offset+=1
            
              this.mainservice.getliscar(this.accestoken, null,this.val,this.value1,this.offset,(data)=>{
            
                console.log(JSON.stringify(data))
                console.log(data.length)
                if (data.length > 0) {
                  data.forEach(element => {
                    this.alldata.push(element)
                  });
                 
               
               
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
        else if(this.value1==null)
        {
          setTimeout(() => {
    
            if (this.offset >= 0) {
              this.offset+=1
            
              this.mainservice.getliscar(this.accestoken, this.value,this.val,null,this.offset,(data)=>{
            
                console.log(JSON.stringify(data))
                console.log(data.length)
                if (data.length > 0) {
                  data.forEach(element => {
                    this.alldata.push(element)
                  });
                 
               
               
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
        else{
          setTimeout(() => {
    
            if (this.offset >= 0) {
              this.offset+=1
            
              this.mainservice.getliscar(this.accestoken, this.value,this.val,this.value1,this.offset,(data)=>{
            
                console.log(JSON.stringify(data))
                console.log(data.length)
                if (data.length > 0) {
                  data.forEach(element => {
                    this.alldata.push(element)
                  });
                 
               
               
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
  
}
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
