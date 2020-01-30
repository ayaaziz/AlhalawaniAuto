import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { PaidPage } from '../paid/paid';
import { CarsPage } from '../cars/cars';
import { NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  color:any;
  tab1Root =HomePage;
  tab2Root = CarsPage;
  tab3Root = ChatPage;
  tab4Root =PaidPage;
  tabIndex: Number = 0;
  constructor(public params: NavParams) {
let tabIndex = this.params.get('tabIndex');
    if (tabIndex) {
      this.tabIndex = tabIndex;
    }
  }
  selectContact(){
    this.color = "primary";
  }
}
