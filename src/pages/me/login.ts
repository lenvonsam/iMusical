import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PageForgetPwdStep1 } from './forgetPwdStep1';

import {PageRegisterStep} from './registerStep';

import {MusicalHttpService} from '../../services/http-service';

import {ToastHelper,LoadingHelper} from '../../app/globalMethod';

import sha1 from 'sha1';

import {User} from '../../models/User';

@Component({
  selector: 'page-me-login',
  templateUrl: 'login.html',
  providers:[ToastHelper,MusicalHttpService,LoadingHelper]
})
export class MeLoginPage {
  user:string="";
  token:string="";
  constructor(public navCtrl: NavController,private toast:ToastHelper,private httpService:MusicalHttpService,private loadHelper:LoadingHelper) {

  }

  ngAfterViewInit() {

  }

  goToPwd() {
    this.navCtrl.push(PageForgetPwdStep1);
  }

  goToRegister() {
    this.navCtrl.push(PageRegisterStep);
  }

  login() {
    const me = this;
    if(this.user.trim()=="" || this.token.trim()=="") {
      this.toast.show('字段不能为空');
    } else {
      this.loadHelper.show();
     let pwdEncrypt=sha1(this.token);
     this.httpService.login(this.user,pwdEncrypt,0).then((data)=>{
       me.loadHelper.hide();
       if(data.returnCode==0) {
         //登录成功
        User.shareInstance().setConfig(data.user);
        me.navCtrl.pop();
       } else {
         me.toast.show(data.errorMsg);
       }
     }).catch((err)=>{
       me.loadHelper.hide();
       if(err.returnCode) {
         me.toast.show(err.errorMsg);
       } else {
         me.toast.show(err);
       }
     })
    }
  }
}
