import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {MiniLoginEmbedder} from 'https://login-openaccount.taobao.com/assets/js/mini-login-embedderV3.js?v=579228';

@Component({
  selector: 'page-me-login',
  templateUrl: 'login.html'
})
export class MeLoginPage {
  sources:Array<Object>;
  constructor(public navCtrl: NavController) {
    
  }

  ngAfterViewInit() {

    var miniLoginEmbedder = MiniLoginEmbedder();
 
    //监听登录完成后的消息，resize已被监听
    miniLoginEmbedder.addEvent('onMessage', function(args) {
             if(args.action && args.action == "loginResult"){
                if(args.resultCode=='100'){
                     location.href = "https://lntcbc/login/loginSuccess.htm";//应用回跳地址 
                }
          }
    });
 
    miniLoginEmbedder.init({
        targetId: 'alibaba-login-iframe',
        appKey  : '57a9c21b67e58e0a7400155c',//业务方在淘宝开放平台申请的appKey
        iframeUrl   :'https://login-openaccount.taobao.com/login/mini_login.htm' , 
        lang:'zh_cn',
        notKeepLogin:'true',
        notLoadSsoView:'true',
        isMobile:'true'
       // 更多样式指定 可以参见https://login-openaccount.taobao.com/assets/js/mini-login-embedderV3.js?v=579228 里面的参数 如iframeWidth iframeHeight等等
    });

  }
}
