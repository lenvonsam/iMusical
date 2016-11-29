import { Component} from '@angular/core';

import { NavController,NavParams} from 'ionic-angular';

@Component({
  selector: 'page-lastShow',
  templateUrl: 'lastShow.html'
})

export class LastShowPage {
  detailObj:Object;
  showSection = "showing";
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    console.log(navParams.data);
    this.detailObj=this.navParams.data;
  }
}
