import { Component} from '@angular/core';

import { NavParams,ViewController} from 'ionic-angular';

import {MusicalHttpService} from '../../services/http-service';

import {LoadingHelper,ToastHelper} from '../../app/globalMethod';


@Component({
  selector: 'page-comment-create',
  templateUrl: 'commentCreate.html',
  providers:[MusicalHttpService,LoadingHelper,ToastHelper]
})

export class CommentCreatePage {
  commentContent="";
  domainId:number=0;
  domain:string="";
  userId:number=0;
  constructor(private params:NavParams,private viewCtrl:ViewController,private httpService:MusicalHttpService,private loadHelp:LoadingHelper,private toastHelper:ToastHelper){
    console.log(params);
    this.userId = Number(params.get('userId'));
    this.domainId = Number(params.get('domainId'));
    this.domain = params.get('domain');
  }

  sendComment() {
    if(this.commentContent.trim()!="") {
      this.loadHelp.show();
      const me = this;
      this.httpService.insertToOperation("comments",this.domain,this.domainId,this.userId,this.commentContent).then((resp)=>{
        console.log(resp);
        me.loadHelp.hide();
        if(resp.success == "true") {
          me.viewCtrl.dismiss(resp);
        } else {
          me.toastHelper.show('发表评论失败');
        }
      }).catch((err)=>{
        console.log(err);
        me.loadHelp.hide();
        me.toastHelper.show('网络异常');
      });
    }
  }

  close() {
    this.viewCtrl.dismiss({success:'fail'});
  }

}