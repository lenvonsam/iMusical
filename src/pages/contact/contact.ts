import { Component,ViewChild } from '@angular/core';

import { NavController,List } from 'ionic-angular';
import { Test} from '../about/test';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  styles:['.xx {border:0px;}','.xx.segment-activated {background-color: transparent !important;color:#f53d3d !important;border-bottom: 1px solid #f53d3d !important;}']
})

export class ContactPage {
  constructor(public navCtrl: NavController) {
  }
  test(){
    this.navCtrl.push(Test);
  }

}
