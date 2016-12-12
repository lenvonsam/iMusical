import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {PageForgetPwdStep2} from './forgetPwdStep2';

import {MusicalHttpService} from '../../services/http-service';

import {ToastHelper,LoadingHelper} from '../../app/globalMethod';

@Component({
  selector: 'page-forgetpwd-step-1',
  templateUrl: 'forgetPwdStep1.html',
  providers:[ToastHelper,LoadingHelper,MusicalHttpService]
})
export class PageForgetPwdStep1 {
  pwdPhone:string="";
  constructor(public navCtrl: NavController,private httpService:MusicalHttpService,private toastHelper:ToastHelper,private loadHelper:LoadingHelper) {

  }

  ngAfterViewInit() {

  }

  nextToStep2() {
    console.log(this.pwdPhone);
    if(this.pwdPhone.trim()!="") {
      const me = this;
      me.loadHelper.show();
      this.httpService.isMobileExists(this.pwdPhone).then((resp)=>{
        me.loadHelper.hide();
        if(resp.returnCode==0) {
          me.navCtrl.push(PageForgetPwdStep2,{
            'phone':me.pwdPhone
          })
        }else {
          me.toastHelper.show("手机号不存在");
        }
      }).catch((err)=>{
        me.loadHelper.hide();
        me.toastHelper.show("网络异常");
      });

    } else {
      this.toastHelper.show("手机号不能为空");
    }
  }
}
