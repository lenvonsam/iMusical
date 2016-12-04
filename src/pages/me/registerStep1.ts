import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { PageRegisterStep2 } from './registerStep2';


@Component({
  selector: 'page-register-step-1',
  templateUrl: 'registerStep1.html'
})
export class PageRegisterStep1 {
  token:string="";
  phone:string="";
  authCodeContent="获取验证码";
  isSend:boolean=false;
  constructor(public navCtrl: NavController,private params:NavParams) {
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
    this.navCtrl.push(PageRegisterStep2,{
      phone:this.phone,
      token:this.token
    })
  }
}
