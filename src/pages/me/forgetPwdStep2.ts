import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { PageForgetPwdStep3 } from './forgetPwdStep3';

import {MusicalHttpService} from '../../services/http-service';

import {ToastHelper,LoadingHelper} from '../../app/globalMethod';

@Component({
  selector: 'page-forgetpwd-step-2',
  templateUrl: 'forgetPwdStep2.html',
  providers:[MusicalHttpService,ToastHelper,LoadingHelper]
})
export class PageForgetPwdStep2 {
  authCode:string="";
  phone:string="";
  type:number=2;
  constructor(public navCtrl: NavController,private params:NavParams,private httpService:MusicalHttpService,private toastHelper:ToastHelper,private loadHelper:LoadingHelper) {
    this.phone=params.get('phone');
  }

  ngAfterViewInit() {

  }

  nextToStep3() {
    console.log(this.authCode);
    if(this.authCode.trim()!="") {
      const me = this;
      me.loadHelper.show();
      me.httpService.validateCaptchaInResetPwd(this.phone,this.authCode).then((resp)=>{
        me.loadHelper.hide();
        if(resp.returnCode==0) {
          me.navCtrl.push(PageForgetPwdStep3,{
            phone:me.phone,
            token:me.authCode
          })
        }else {
          me.toastHelper.show(resp.errorMsg);
        }

      }).catch((err)=>{
        me.loadHelper.hide();
        me.toastHelper.show('网络异常');
      });
    }else{
      this.toastHelper.show("验证码不能为空");
    }
  }
}
