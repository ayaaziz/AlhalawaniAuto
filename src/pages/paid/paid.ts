import { Component, AnimationKeyframesSequenceMetadata } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, MenuController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import { ListcarsPage } from '../listcars/listcars';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { typeSourceSpan } from '@angular/compiler';
import { CarsPage } from '../cars/cars';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-paid',
  templateUrl: 'paid.html',
})
export class PaidPage {
  hide2:any=false
  paidmoney:any
  showegmaly:any=true
  showegmaly1:any=true
  show:any=true
  rest:any
  carname:any
  price:any
  data:FormGroup
  name:AbstractControl
  remarks:AbstractControl
  number:AbstractControl
  phone:AbstractControl
  limit:number
  salary:AbstractControl
  allprice:any
  ip:AbstractControl
 bank:AbstractControl
 email:AbstractControl
 monthlypaid:AbstractControl
 havepercent:any
 paid:AbstractControl // المقدم
 have:AbstractControl // نسبه التملك
 period:AbstractControl //المده
 eltzam:AbstractControl
 bankdata:any=[]
 resom:number
 mpaid:number=0
 mmonth:number=0
 hide:any=false
  id:any
  val:any
  egmaly:any
  gain:number; // الربح
  taamen:number // التامين
  finance:number // التمويل
  lastpaid:number // الدفعه الاخيره
  lastpaid1:any
  cperiod:any
  all:number //اجمالى
  rent:any //ايجار الشهرى
  financeprecent:number //نسبه الاتمويل
  taamenprecent:number// نسبه التامين
  percent:any=[]
  wanted:number
  fixedtime:any
  ownership:number
  convernumber:any
  speriod:any
  eltzamm:any
  salaryy:any
  phonee:any
  ipp:any
  periodd:any
  bankk:any
  emaill:any
  namee:any
  bankname:any
  accestoken:any
  isenabled:any=true
  constructor(public storage:Storage,public menue :MenuController,public toastCtrl:ToastController,public mainservice:MainservicesProvider,public cent:CentralProvider,public Alert:AlertController,public navCtrl: NavController,public formBuilder:FormBuilder, public navParams: NavParams,public ViewCtrl:ViewController) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.storage.get('name').then(val=>{
      if(!(val==null))
      {
        this.period.setValue("60 شهر ")
       
        this.eltzam.setValue(0)
        this.paid.setValue(0)
        this.monthlypaid.setValue(0)
        this.name.setValue(val)
      }
      else{
        this.period.setValue("60 شهر ")
       
        this.eltzam.setValue(0)
        this.paid.setValue(0)
        this.monthlypaid.setValue(0)
      }
    })

    this.storage.get('phone').then(val=>{
      if(!(val==null))
      {
        this.phone.setValue(val)
      }
    })
    this.storage.get('email').then(val=>{
      if(!(val==null))
      {
        this.email.setValue(val)
      }
    })
    this.carname=this.navParams.get("CarName")

this.price=this.navParams.get("Price")

 this.price=parseFloat(this.price)
 this.convertNumberToBeWithComma(this.price)


 this.id=this.navParams.get("Id")

    this.data = this.formBuilder.group({
      name: ['',Validators.required,],
      number: ['',Validators.required,],
      remarks: [''],
      phone: ['',Validators.required,],
      ip: ['',Validators.required,],
      salary: ['',Validators.required,],
      bank: ['',Validators.required,],
      paid: ['',],
      have: ['',Validators.required,],
      period: ['',Validators.required,],
      email: ['',Validators.required,],
      eltzam: ['',Validators.required,],
      monthlypaid: ['',],

    });
    this.name=this.data.controls['name'];
    this.number=this.data.controls['number'];
    this.remarks=this.data.controls['remarks'];
    this.phone=this.data.controls['phone'];
    this.eltzam=this.data.controls['eltzam'];

    this.salary=this.data.controls['salary'];
    this.bank=this.data.controls['bank'];
    this.paid=this.data.controls['paid'];
    this.have=this.data.controls['have'];
    this.period=this.data.controls['period'];
    this.ip=this.data.controls['ip'];
    this.email=this.data.controls['email'];
    this.monthlypaid=this.data.controls['monthlypaid'];
  }

  confirmorder()
  {
     if(this.monthlypaid.value==0)

     {
       this.monthlypaid.setValue(this.rent)

     }
 
     this.mainservice.financeorder(this.accestoken,this.cent.DeviceId,1,this.id,this.name.value,this.phone.value,this.salary.value,this.bank.value,this.paidmoney,this.ownership,this.cperiod,this.remarks.value,"",this.email.value,this.monthlypaid.value,this.eltzam.value,(data)=>this.success(data),(data)=>this.fail(data))

  }
  changerabic()
  {
    console.log(this.salary.value)
    this.salary.setValue(this.parseArabic(String(this.salary.value)))
    console.log(this.salary.value)
    console.log(typeof(this.salary.value))
  }
  changerabicmonth()
  {
    console.log(this.monthlypaid.value)
    this.monthlypaid.setValue(this.parseArabic(String(this.monthlypaid.value)))
    console.log(this.monthlypaid.value)
  }
  changerabicpaid()
  {
    console.log(this.paid.value)
    this.paid.setValue(this.parseArabic(String(this.paid.value)))
    console.log(this.paid.value)
  }
  changerabiceltzam()
  {
    console.log(this.eltzam.value)
    this.eltzam.setValue(this.parseArabic(String(this.eltzam.value)))
    console.log(this.eltzam.value)
  }
  delpaid()
  {
    this.monthlypaid.setValue("")
     if( this.paid.value>=0 )
     {
      

       this.paid.setValue(0);
     }
  }
  deleltzam()

{
  this.eltzam.setValue("")
} 
 delmonthly()
  {    
    this.paid.setValue("")
    if( this.monthlypaid.value>=0 )
    {
     

      this.monthlypaid.setValue(0)
    }

  }
  convertNumberToBeWithComma(x) {
    if (x == null )
    {
         this.convernumber=null
    }
    else if (x>=0){
    this.convernumber= String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return this.convernumber;
    }
  }
  presentConfirm5() {
    let alert = this.toastCtrl.create({
      message: 'رقم الجوال غير صحيح. يجب إدخال ١٠ أرقام',
      duration: 3000,
      position: 'bottom'
    });
    alert.present();
  }
  presentConfirm6() {
    let alert = this.toastCtrl.create({
      message: 'رقم الهويه غير صحيح',
      duration: 3000,
      position: 'bottom'
    });
    alert.present();
  }
  presentConfirm3() {
    let alert = this.toastCtrl.create({
      message: 'من فضلك ادخل البيانات كامله',
      duration: 3000,
        position: 'bottom'
    });
    alert.present();
  }
  showdetails()
  {
    
    
    let eltzamat=(parseFloat(this.salary.value)*45)/100

    this.rest=(eltzamat-this.eltzam.value)


    this.isenabled=false
    this.speriod=this.period.value
    
    let num=this.phone.value + ""
   
  
    if(this.carname==null || this.price==null || this.carname==="" || this.price=="")
    {
  
     this.presentConfirm()

    }
    else if ( this.phone.value==""   ||  this.bank.value==""  ){
       
     
      
      if(this.phone.value=="")
      {
        this.phonee='true'
      }
     
      // if (this.salary.value==0|| this.salary.value=="")
      // {
      //   this.salaryy='true'
      // }
      if(this.period.value=="")
      {
        this.periodd='true'
      }
      if(this.bank.value=="")
      {
        this.bankk='true'
      }
      this.presentConfirm3()
        }
        else if(this.paid.value>=this.price)
        {
          this.presentToast8()
    
        }
        else if (this.ownership> 100)
          {
            this.presentToast6()
    
          }
          else if (this.salary.value==0|| this.salary.value=="")
          {
            let toast = this.toastCtrl.create({
              message: ' من فضلك ادخل الراتب الشهري ',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
    
            this.salaryy='true'
          }
         
      
        else if (!(num.length ==10)  )
        {
    this.presentConfirm5()
        }
       
  
 else if (!((this.email.value==null) ||(this.email.value=="") ))
 {
  
   if (!((this.email.value.includes("@")) && (this.email.value.includes(".com")||this.email.value.includes(".net"))))
    {  
 
    this.presentToast7()
      
    
   
    }
    else
    {
      let per = this.period.value.replace("شهر" , "")
    this.cperiod = parseInt(per)
    
    this.calc(this.cperiod);
    }
  }
  
    else{
      
      let per = this.period.value.replace("شهر" , "")
      this.cperiod = parseInt(per)
      
      this.calc(this.cperiod);


    }
  
  }
 
 
  parseArabic(str) {
    return ( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d)=> {
        return d.charCodeAt(0) - 1632; // Convert Arabic numbers
    }));
}
  delphone()
  {
    this.phonee='false'
  }
  delsalary()
  {
    this.salaryy='false'
  }
  openmenu()
  {
    this.menue.open()
  }
  financefail(data)
  {
this.presentToast1()
  }
  calc(val)
  {

    this.havepercent=this.ownership
    this.paidmoney=this.paid.value
   
    val=parseFloat(val)
    if(this.paid.value>0)
    {
   
        let carprice=this.price-parseFloat(this.paid.value);
      
        //ثابته
        let rsom=(carprice*this.resom)/100
        // الارباح
       this.gain=((carprice*this.financeprecent*val)/12)/100
      
       // التامين
       this.taamen=((this.price*this.taamenprecent)*val/12)/100
      

       //التمويل
       this.finance=this.taamen+this.gain
      
       // الدفعه الاخيره
       this.lastpaid=(this.price*(this.havepercent)/100)
       this.lastpaid1=this.lastpaid.toFixed()
      
       let f=(((carprice)*this.financeprecent*val)/12)/100
       let l =(((this.price)*this.taamenprecent*val)/12)/100
       let nrent=(carprice+f+l-this.lastpaid)/val
            this.rent=nrent.toFixed()
            
            //new
            if(this.bankname.includes("عبداللطيف جميل"))
            {
              this.showegmaly=false
            this.egmaly=parseFloat(this.rent)+parseFloat(this.paid.value)+rsom
            }
            else{
              this.showegmaly1=false

              this.egmaly=parseFloat(this.paid.value)+rsom
            }
         let all=(nrent*val+parseFloat(this.paid.value)+this.lastpaid).toFixed()
        this.allprice=all

       if(parseFloat(this.rent)>this.rest)
       {
         this.presentConfirm7()
         
       }
       else{
        this.show=false
        this.hide=true
       }
      
      
      }
      if(this.paid.value==0 && this.monthlypaid.value==0)
    {
      
      this.paid.setValue(0)
      this.monthlypaid.setValue(0)
      this.paidmoney=0
        let carprice=this.price-parseFloat(this.paid.value);
        let rsom=(carprice*this.resom)/100
       
         // الارباح
       this.gain=((carprice*this.financeprecent*val)/12)/100
    
       // التامين
       this.taamen=((this.price*this.taamenprecent)*val/12)/100
     
       //التمويل
       this.finance=this.taamen+this.gain
      
       // الدفعه الاخيره
       this.lastpaid=this.price*(this.havepercent)/100
       this.lastpaid1=this.lastpaid.toFixed()
      
       let f=(((carprice)*this.financeprecent*val)/12)/100
       let l =(((this.price)*this.taamenprecent*val)/12)/100
       let nrent=(carprice+f+l-this.lastpaid)/val
            this.rent=nrent.toFixed()
             //new
             if(this.bankname.includes("عبداللطيف جميل"))
             {
              this.showegmaly=false
             this.egmaly=parseFloat(this.rent)+parseFloat(this.paidmoney)+rsom
             }
             else{
              this.showegmaly1=false

               this.egmaly=parseFloat(this.paidmoney)+rsom
             }
             
           
       let all=(nrent*val+parseFloat(this.paid.value)+parseFloat(this.paidmoney)).toFixed()
        this.allprice=all
        if(this.rent>this.rest)
        {
          this.presentConfirm7()
          
        }
       
       else{
        this.show=false
        this.hide=true
       }
      
      }
      else if (this.monthlypaid.value>0 )
      {
       
        this.rent=this.monthlypaid.value; 
     
        let carprice=this.price-parseFloat(this.paid.value);
        let rsom=(carprice*this.resom)/100
        // الارباح
      this.gain=((carprice*this.financeprecent*val)/12)/100
      
      // التامين
      this.taamen=((this.price*this.taamenprecent)*val/12)/100
      
 
      //التمويل
      this.finance=this.taamen+this.gain
   
       this.lastpaid=this.price*(this.havepercent)/100
       this.lastpaid1=this.lastpaid.toFixed()
     
       let data=parseFloat(this.lastpaid1)+(parseFloat(this.rent)*val)
      
        if((parseFloat(this.rent)*val < carprice) && ((parseFloat(this.lastpaid1)+(parseFloat(this.rent)*val)) < carprice ))
        {
      
        
        let rest=carprice-this.lastpaid
       
        let payment=this.monthlypaid.value*val
        
         this.paidmoney=(rest-payment).toFixed()
          //new
          if(this.bankname.includes("عبداللطيف جميل"))
          {
            this.showegmaly=false
           
          this.egmaly=parseFloat(this.rent)+parseFloat(this.paidmoney)+rsom
          }
          else{
            this.showegmaly1=false

            this.egmaly=parseFloat(this.paidmoney)+rsom
          }
         let all=(parseFloat(this.rent)*val+parseFloat(this.paidmoney)+this.lastpaid).toFixed()
         this.allprice=all
         if(this.rent>this.rest)
       {
         this.presentConfirm7()
         
       }
         else{
          this.show=false
          this.hide=true
         }
      }
      else
      {
      this.paid.setValue(0)
      this.monthlypaid.setValue(0)
      this.paidmoney=0
        
       let f=(((carprice)*this.financeprecent*val)/12)/100
       let l =(((this.price)*this.taamenprecent*val)/12)/100
       let nrent=(carprice+f+l-this.lastpaid)/val
            this.rent=nrent.toFixed()
             //new
             if(this.bankname.includes("عبداللطيف جميل"))
             {
              this.showegmaly=false
             this.egmaly=parseFloat(this.rent)+parseFloat(this.paid.value)+rsom
             }
             else{
              this.showegmaly1=false

               this.egmaly=parseFloat(this.paid.value)+rsom
             }
             
           
       let all=(nrent*val+parseFloat(this.paid.value)+this.lastpaid).toFixed()
        this.allprice=all
        if(this.rent>this.rest)
        {
          this.presentConfirm7()
          
        }
       
       else{
        this.show=false
        this.hide=true
       }
      }
    }
  }
  success(data)
  {
    this.storage.set('name',this.name.value)
    this.storage.set('phone',this.phone.value)
    this.storage.set('email',this.email.value)
this.presentToast()
this.hide=false
this.show=true
this.data.reset()
this.carname=null
this.convernumber=null
this.paid.setValue(0)
this.eltzam.setValue(0)
this.monthlypaid.setValue(0)
this.hide2=true
this.isenabled=true

  }
  presentToast(){
    let toast = this.toastCtrl.create({
        message: 'تم ارسال طلبك ',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
    banksuccess(data)
    {
      this.bankdata=data
      
      console.log(JSON.stringify(this.bankdata))
      
    this.storage.get('limit').then((val) => {
      this.limit=val
      
    });
    }
    getpercent()
    {
      this.bankk='false'
      for(var i=0;i<this.bankdata.length;i++)
      {
        if (this.bankdata[i].id==this.bank.value)
        {
          this.bankname=this.bankdata[i].name
          this.financeprecent=this.bankdata[i].finance_rate
          this.taamenprecent=this.bankdata[i].insurance_rate
          this.ownership=this.bankdata[i].ownership_rate      
          this.resom=this.bankdata[i].administrative_fees
        }
      }
    }
    bankfail(data)
    {

    
    }
  fail(data)
  {

  }
  modal()
  {

  }
  cancelorder()
  {
    if(this.monthlypaid.value==0)

    {
      this.monthlypaid.setValue(this.rent)

    }

    this.mainservice.financeorder(this.accestoken,this.cent.DeviceId,3,this.id,this.name.value,this.phone.value,this.salary.value,this.bank.value,this.paidmoney,this.ownership,this.cperiod,this.remarks.value,"",this.email.value,this.monthlypaid.value,this.eltzam.value,(data)=>this.success(data),(data)=>this.fail(data))

    this.show=true;
    this.hide=false
    
  }

 
  ionViewDidEnter()
  {
    this.mainservice.choosebank(this.accestoken,(data)=>this. banksuccess(data),(data)=>this .bankfail(data))

    if(this.carname==null || this.price==null)
    {      

     this.presentConfirm()
    }
  }
  presentConfirm() {
    let alert = this.Alert.create({
      title: 'طلب تمويل',
      message: 'عليك باختيار سياره اولا ',
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
            this.navCtrl.push(ListcarsPage)
          }
        }
      ]
    });
    alert.present();
  }
  
  // presentConfirm1() {
  //   let alert = this.Alert.create({
  //     title: 'حاسبه تمويل',
  //     message: 'المبلغ الشهري ' + this.rent,
  //     buttons: [
  //       {
  //         text: 'الغاء',
  //         role: 'cancel',
  //         handler: () => {
  //           this.mainservice.financeorder(this.accestoken,this.cent.DeviceId,this.id,this.name.value,this.phone.value,this.salary.value,this.bank.value,this.paid.value,this.ownership,this.period.value,this.remarks.value,"",this.email.value,this.monthlypaid.value,this.eltzam.value,(data)=>this.success(data),(data)=>this.fail(data))

  //         }
  //       },
  //       {
  //         text: 'موافق',
  //         handler: () => {
  //           this.presentToast()
  //           this.data.reset()

  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
  presentConfirm2() {
    let alert = this.Alert.create({
      title: 'حاسبه تمويل',
      message: ' الدفعه الشهريه يجب الا تتعدى ٤٥% من الدخل الشهري',
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
          }
        }
      ]
    });
    alert.present();
  }
  presentConfirm4() {
    let alert = this.Alert.create({
      title: 'حاسبه تمويل',
      message: '  اجمالي الالتزامات لا يمكن ان يزيد عن ٤٥٪ من الدخل الشهري',
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
          }
        }
      ]
    });
    alert.present();
  }
  presentConfirm7()
  {
    let alert = this.Alert.create({
      title: 'حاسبه تمويل',
      message: 'يجب ألا يزيد مجموع القسط الشهري مع الالتزامات عن نسبه 45% من الراتب الأساسي . يرجي إعادة البيانات المدخلة أو الاتصال على قسم المبيعات 0127493210',
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
          }
        }
      ]
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
  presentToast6() {
    let toast = this.toastCtrl.create({
      message: 'نسبه التملك لا يمكن ان تتعدى 100 %',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  presentToast8()
  {
    let toast = this.toastCtrl.create({
      message: 'الدفعة المقدمة لا يمكن ان تزيد عن سعر السياره',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();

  }
  presentToast7() {
    let toast = this.toastCtrl.create({
      message: 'االبريد الالكتروني غير صحيح',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  authSuccessCallback(data) {

   
    this.cent.appAccess=data.access_token;
    this.mainservice.choosebank(this.accestoken,(data)=>this. banksuccess(data),(data)=>this .bankfail(data))

  }
  authFailureCallback(data)
  {
    this.presentToast1()
  }
 
  ionViewDidLoad()
      {
    
             }
}
