import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';


@Component({
  selector: 'page-register-step-2',
  templateUrl: 'registerStep2.html'
})
export class PageRegisterStep2 {
  token:string="";
  phone:string="";
  authCodeContent="获取验证码";
  isSend:boolean=false;
  constructor(public navCtrl: NavController,private params:NavParams) {
  }

  ngAfterViewInit() {

  }

  regster() {
    this.navCtrl.popToRoot();
  }
}
