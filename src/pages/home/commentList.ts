import { Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {MusicalHttpService} from '../../services/http-service';

import {LoadingHelper,ToastHelper} from '../../app/globalMethod';


@Component({
  selector: 'page-comment-list',
  templateUrl: 'commentList.html',
  providers:[MusicalHttpService,LoadingHelper,ToastHelper]
})

export class CommentListPage {
  domainId:number=0;
  domain:string="";
  userId:number=0;
  currentPage=0;
  listData:any[]=[];
  showList=false;
  constructor(private params:NavParams,private navCtrl:NavController,private httpService:MusicalHttpService,private loadHelp:LoadingHelper,private toastHelper:ToastHelper){
    console.log(params);
    this.domainId = Number(params.get('domainId'));
    this.domain = params.get('domain');
    const me = this;
    me.listData = [];
    me.loadHelp.show();
    this.httpService.selectOperations(this.currentPage,'comments',this.domain,this.domainId).then((resp)=>{
      me.listData = resp;
      me.showList = true;
      me.loadHelp.hide();
    }).catch((err)=>{
      me.loadHelp.hide();
      me.toastHelper.show('数据加载失败');
    });
    this.initData();
  }

  initData() {

  }

  doRefresh(ev) {
    const me = this;
    me.listData = [];
    this.httpService.selectOperations(this.currentPage,'comments',this.domain,this.domainId).then((resp)=>{
      me.listData = resp;
      ev.complete();
    }).catch((err)=>{
      me.toastHelper.show('数据加载失败');
    });
  }

  doInfinite(ev) {
    this.currentPage++;
    const me = this;
    console.log(">>>>>infiniteScroll>>>...");
    this.httpService.selectOperations(this.currentPage,'comments',this.domain,this.domainId).then((res)=>{
      if(res.length>0) {
        for(var k in res) {
          var it = res[k];
          me.listData.push(it);
        }
      } else {
        me.currentPage--;
      }
      ev.complete();
    }).catch((err)=>{
      me.toastHelper.show('数据加载失败');
    });
  }

}