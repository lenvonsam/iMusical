import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import {MusicalHttpService} from '../../services/http-service';

import {LoadingHelper,ToastHelper} from '../../app/globalMethod';

import {User} from '../../models/User';



@Component({
  selector: 'page-profile-nickname',
  templateUrl: 'profileNickname.html',
  providers:[LoadingHelper,MusicalHttpService,ToastHelper]
})
export class PageProfileNickname {
  nickname:string="";
  userId:number=0;
  constructor(public navCtrl: NavController,private params:NavParams,private loadHelper:LoadingHelper,private httpService:MusicalHttpService,private toastHelper:ToastHelper) {
    this.nickname = params.get('nickname');
    this.userId = Number(params.get('userId'));
  }

  ngAfterViewInit() {

  }

  updateProfile() {
    const me = this
    if(this.nickname.trim()!="") {
      me.loadHelper.show();
      this.httpService.updateUserProfile(this.userId,"","",this.nickname).then((resp)=>{
        me.loadHelper.hide();
        if(resp.success=="true") {
          User.shareInstance().nickname=me.nickname;
          me.navCtrl.pop();
        } else {
          me.toastHelper.show(resp.error);
        }
      }).catch((err)=>{
        me.loadHelper.hide();
        me.toastHelper.show('保存失败');
      })
    }
  }
}
