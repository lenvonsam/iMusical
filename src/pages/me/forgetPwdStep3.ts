import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import {MusicalHttpService} from '../../services/http-service';

import {ToastHelper,LoadingHelper,AlertHelper} from '../../app/globalMethod';

import {User} from '../../models/User';

import sha1 from 'sha1';


@Component({
  selector: 'page-forgetpwd-step-3',
  templateUrl: 'forgetPwdStep3.html',
  providers:[MusicalHttpService,ToastHelper,LoadingHelper,AlertHelper]
})
export class PageForgetPwdStep3 {
  pwdPhone:string="";
  token:string="";
  newPwd:string="";
  constructor(public navCtrl: NavController,private params:NavParams,private httpService:MusicalHttpService,private toastHelper:ToastHelper,private loadHelper:LoadingHelper,private alertHelper:AlertHelper) {
    this.pwdPhone=params.get('phone');
    this.token = params.get('token');
    console.log('phone:>>>'+this.pwdPhone+";token:>>"+this.token);
  }

  ngAfterViewInit() {

  }

  restPwd() {
    if(this.newPwd.trim()!="") {
      let encryptPwd = sha1(this.newPwd.trim());
      const me = this;
      me.loadHelper.show();
      me.httpService.resetPwd(this.pwdPhone,this.token,encryptPwd).then((resp)=>{
        me.loadHelper.hide();
        if(resp.returnCode==0){
          me.alertHelper.basicConfirm("友情提示","密码重置成功","去登录",()=>{
            if(User.shareInstance().isLogin()){
              User.shareInstance().loginout();
            }
            me.navCtrl.popToRoot();
          });
        } else {
          me.toastHelper.show(resp.errorMsg);
        }
      }).catch((err)=>{
        me.loadHelper.hide();
        me.toastHelper.show("网络异常");
      })
    } else {
      this.toastHelper.show('密码不能为空');
    }
  }
}
