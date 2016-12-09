import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PageForgetPwdStep1 } from './forgetPwdStep1';

import {PageRegisterStep1} from './registerStep1';

import {MusicalHttpService} from '../../services/http-service';

import {ToastHelper} from '../../app/globalMethod';

import sha1 from 'sha1';

import {User} from '../../models/User';

@Component({
  selector: 'page-me-login',
  templateUrl: 'login.html',
  providers:[ToastHelper,MusicalHttpService]
})
export class MeLoginPage {
  user:string="";
  token:string="";
  constructor(public navCtrl: NavController,private toast:ToastHelper,private httpService:MusicalHttpService) {

  }

  ngAfterViewInit() {

  }

  goToPwd() {
    this.navCtrl.push(PageForgetPwdStep1);
  }

  goToRegister() {
    this.navCtrl.push(PageRegisterStep1);
  }

  login() {
    const me = this;
    if(this.user.trim()=="" || this.token.trim()=="") {
      this.toast.show('字段不能为空');
    } else {
     let pwdEncrypt=sha1(this.token);
     this.httpService.login(this.user,pwdEncrypt,0).then((data)=>{
       alert(JSON.stringify(data));
       if(data.returnCode==0) {
         //登录成功
        User.shareInstance().setConfig(data.user);
        alert(User.shareInstance().id);
        me.navCtrl.pop();
       } else {
         me.toast.show(data.errorMsg);
       }
     }).catch((err)=>{
       if(err.returnCode) {
         me.toast.show(err.errorMsg);
       } else {
         me.toast.show(err);
       }
     })
    }
  }
}
