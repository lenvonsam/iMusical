import { Component,Input } from '@angular/core';
import {MusicalHttpService} from '../services/http-service';

@Component({
  selector: 'captcha-btn',
  templateUrl: 'captcha.html',
  providers:[MusicalHttpService]
})
export class CaptchaComp {
  @Input() phone="";
  @Input() type=1;
  isSend:boolean = false;
  authCodeContent:string="获取验证码";

  constructor(private musicalHttp:MusicalHttpService) {
  }

  getCode() {
    let times:number = 60;
    let me = this;
    if(!this.isSend) {
      me.isSend=true;
      //发送短信FIXME
      this.musicalHttp.getCaptcha(this.phone,this.type).then((data)=>{
        alert('returnCode:>>'+data.returnCode);
      });

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

}
