import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';


@Component({
  selector: 'page-forgetpwd-step-3',
  templateUrl: 'forgetPwdStep3.html'
})
export class PageForgetPwdStep3 {
  pwdPhone:string="";
  token:string="";
  newPwd:string="";
  constructor(public navCtrl: NavController,private params:NavParams) {
    this.pwdPhone=params.get('phone');
    this.token = params.get('token');
    console.log('phone:>>>'+this.pwdPhone+";token:>>"+this.token);
  }

  ngAfterViewInit() {

  }

  restPwd() {
    console.log(this.pwdPhone);
    // this.navCtrl.push(PageForgetPwdStep2,{
    //   'phone':this.pwdPhone
    // })
    this.navCtrl.popToRoot();
  }
}
