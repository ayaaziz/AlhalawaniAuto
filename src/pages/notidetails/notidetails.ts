import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';


@Component({
  selector: 'page-notidetails',
  templateUrl: 'notidetails.html',
})
export class NotidetailsPage {
  message:any
  constructor(public cent :CentralProvider,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  this.message=this.navParams.get("Message")
  this.cent.status=0
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotidetailsPage');
  }

}
