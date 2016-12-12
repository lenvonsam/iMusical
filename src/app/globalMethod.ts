import {LoadingController,Loading,ToastController,AlertController,NavController} from 'ionic-angular';
import { Injectable } from '@angular/core';
// import {MeLoginPage} from '../pages/me/login';

enum ArticleType {
  // 评剧
  critial,
  news,
  all
}

function getArtType(artsType:ArticleType):string {
  var result = "";
  switch(artsType) {
    case ArticleType.critial:
    result="jp";
    break
    case ArticleType.news:
    result="xw"
    break
    case ArticleType.all:
    result="all"
    break
    default:
    result=""
    break
  }
  return result
}

export const WIDTH=window.screen.width;
export const HEIGHT=window.screen.height;

export {ArticleType};
export {getArtType};


@Injectable()
export class LoadingHelper {
  loader:Loading;
  constructor(public loadingCtrl:LoadingController) {
  }

  show(){
    this.loader = this.loadingCtrl.create({
      content:'loading'
    });

    this.loader.present();
  }

  hide() {
    this.loader.dismiss();
  }
}

@Injectable()
export class ToastHelper {
  constructor(private toastCtrl:ToastController) {

  }

  show(msg:string,position='middle') {
    let toast = this.toastCtrl.create({
      message:msg,
      duration:3000,
      position:position,
      cssClass:'text-center'
    });
    toast.present();
  }
}


@Injectable()
export class AlertHelper {

  constructor(private alertCtrl:AlertController) {

  }

  showConfirm(title:string,message:string,confirmTxt:string,confirmFunc:Function,cancelFunc:Function) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: '取消',
          handler: cancelFunc
        },
        {
          text: confirmTxt,
          handler: confirmFunc
        }
      ]
    });
    confirm.present();
  }
}

// function gotoLogin(nav:NavController,alertHelper:AlertHelper,loginCtrl:MeLoginPage) {
//   alertHelper.showConfirm("友情提示","你还未登录","去登录",function(){
//       console.log('confirm');
//       nav.push(loginCtrl);
//   },function(){
//       console.log('cancel');
//   });
// }

// export {gotoLogin};



