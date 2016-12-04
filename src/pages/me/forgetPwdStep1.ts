import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {PageForgetPwdStep2} from './forgetPwdStep2';

@Component({
  selector: 'page-forgetpwd-step-1',
  templateUrl: 'forgetPwdStep1.html'
})
export class PageForgetPwdStep1 {
  pwdPhone:string="";
  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {

  }

  nextToStep2() {
    console.log(this.pwdPhone);
    this.navCtrl.push(PageForgetPwdStep2,{
      'phone':this.pwdPhone
    })
  }
}
