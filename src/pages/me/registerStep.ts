import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import {ToastHelper} from '../../app/globalMethod';

import {MusicalHttpService} from '../../services/http-service';

import sha1 from 'sha1';


@Component({
  selector: 'page-register-step',
  templateUrl: 'registerStep.html',
  providers:[ToastHelper,MusicalHttpService]
})
export class PageRegisterStep {
  token:string="";
  phone:string="";
  type:number=1;
  pwd:string="";
  confirmPwd:string="";
  // authCodeContent="获取验证码";
  // isSend:boolean=false;
  constructor(public navCtrl: NavController,private params:NavParams,private toast:ToastHelper,private httpService:MusicalHttpService) {
  }

  ngAfterViewInit() {

  }


  regiser() {
    const me = this;
    if(this.token.trim() == "" || this.phone.trim() == "" || this.pwd.trim() == "" || this.confirmPwd.trim() =="") {
      this.toast.show('字段不能为空');
    } else if(this.confirmPwd.trim() != this.pwd.trim()) {
      this.toast.show('两次密码输的不一致');
    } else {
      //注册用户
      const pwdEncrypt=sha1(this.pwd);
      this.httpService.register(this.phone,pwdEncrypt,0,this.token).then((result)=>{
        if(result.returnCode==0) {
          me.navCtrl.pop();
        } else {
          me.toast.show(result.errorMsg);
        }
      }).catch((err)=>{
        if(err.returnCode) {
          me.toast.show(err.errorMsg);
        } else {
          me.toast.show(err);
        }
      });

    }
    // this.navCtrl.push(PageRegisterStep2,{
    //   phone:this.phone,
    //   token:this.token
    // })
  }
}
