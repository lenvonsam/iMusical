import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { PageForgetPwdStep3 } from './forgetPwdStep3';

@Component({
  selector: 'page-forgetpwd-step-2',
  templateUrl: 'forgetPwdStep2.html'
})
export class PageForgetPwdStep2 {
  authCode:string="";
  phone:string="";
  authCodeContent="获取验证码";
  isSend:boolean=false;
  constructor(public navCtrl: NavController,private params:NavParams) {
    this.phone=params.get('phone');
  }

  ngAfterViewInit() {

  }

  getCode() {
    let times:number = 60;
    let me = this;
    if(!this.isSend) {
      me.isSend=true;
      //发送短信FIXME

      //倒计时
      var t = setInterval(function(){
        times--;
        me.authCodeContent=times+"s后可重发";
        if(times<0) {
          clearInterval(t);
          me.authCodeContent="重发验证码";
          me.isSend=false;
        }
      },1000);
    }
  }

  nextToStep3() {
    console.log(this.authCode);
    this.navCtrl.push(PageForgetPwdStep3,{
      phone:this.phone,
      token:this.authCode
    })
  }
}
