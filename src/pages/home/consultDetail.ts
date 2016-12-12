import { Component,ViewChild} from '@angular/core';

import { NavController,NavParams,Content,ModalController} from 'ionic-angular';

import {User} from '../../models/User';

import {MusicalHttpService} from '../../services/http-service';

import {AlertHelper,LoadingHelper} from '../../app/globalMethod';

import {MeLoginPage} from '../me/login';

import {CommentCreatePage} from './commentCreate';

import {CommentListPage} from './commentList';

@Component({
  selector: 'page-consult',
  templateUrl: 'consultDetail.html',
  providers:[MusicalHttpService,AlertHelper,LoadingHelper]
})

export class ConsultDetailPage {
	detailObj:any;
	@ViewChild(Content) content: Content;
	navOpacity:number=1;
	navBackground:string='transparent';
	title:string="";
  isLogin:boolean=false;
  isZan:boolean = false;
  commentsCount=0;
  classFont:string="";
  zanId:number=0;
  constructor(public navCtrl: NavController,private params:NavParams,private httpService:MusicalHttpService,private alertHelper:AlertHelper,private loadHelper:LoadingHelper,private modalCtrl:ModalController) {
  	this.detailObj = this.params.data;
  }

  ngAfterViewInit() {
  	this.content.addScrollListener((event)=>{
     let scrollHeight = event.target.scrollTop;
    if(scrollHeight>5 && scrollHeight<200) {
      this.navOpacity = scrollHeight/200;
      this.title=this.detailObj.tags+"详情";
      console.log('navOpacity:>>>'+this.navOpacity);
      this.navBackground = 'black';
    } else if(scrollHeight<=5) {
    	this.title="";
      this.navBackground = 'transparent';
      this.navOpacity=1;
    } else {
    	this.title=this.detailObj.tags+"详情";
      this.navOpacity=1;
    }
    });
  }

  ionViewWillEnter() {
    this.isLogin = User.shareInstance().isLogin();
    // this.isLogin=true;
    if(this.isLogin) {
      //查询是否点赞
      let zanPromise=this.httpService.userIsZanByDomain("article",this.detailObj.id,User.shareInstance().id);
      let operatorCountPromise = this.httpService.selectOperationsCount("comments","article",this.detailObj.id);
      const me = this;
      Promise.all([zanPromise,operatorCountPromise]).then((res)=>{
        console.log(res);
        if(res[0].data=="false") {
          me.isZan = false;
          me.classFont="";
        } else {
          me.isZan = true;
          me.zanId = Number(res[0].data);
          me.classFont="ft-red";
        }
        console.log(typeof me.isZan);
        me.commentsCount = Number(res[1].data);
      },(err)=>{
        alert('error');
        console.log(err);
      });

    }




  }

  zan() {
    if(this.isLogin){
      //点赞操作
      const me = this;
      me.loadHelper.show();
      if(this.isZan) {
        this.httpService.deleteOperationByID(this.zanId).then((resp)=>{
          if(resp.returnCode==0) {
            me.isZan = false;
            me.classFont="";
            me.zanId=0;
          }
          me.loadHelper.hide();
        }).catch((err)=>{
          me.loadHelper.hide();
        });

      } else {
        this.httpService.insertToOperation("likes","article",this.detailObj.id,User.shareInstance().id,"").then((res)=>{
           console.log(res);
          me.isZan = true;
          me.classFont="ft-red";
          me.zanId = Number(res.data);
          me.loadHelper.hide();
        },(err)=>{
          console.log(err);
          me.loadHelper.hide();
        });
      }
    } else {
       this.gotoLogin();
    }
  }

  gotoLogin() {
    const me = this;
    this.alertHelper.showConfirm("友情提示","你还未登录","去登录",function(){
      console.log('confirm');
      me.navCtrl.push(MeLoginPage);
    },function(){
      console.log('cancel');
    });
  }

  goToComments() {
    if(this.commentsCount>0) {
      this.navCtrl.push(CommentListPage,{domain:'article',domainId:this.detailObj.id});
    }
  }

  goToComment() {
    // this.isLogin = true;
    if(this.isLogin) {
    //去评论
    const me = this;
    let commentCreateModal = this.modalCtrl.create(CommentCreatePage, { userId: User.shareInstance().id,domain:'article',domainId:this.detailObj.id});
    commentCreateModal.onDidDismiss(function(resp){
      console.log('back to detail page');
      console.log(resp);
      if(resp.success=="true") {
        me.commentsCount+=1;
      }
    });
    commentCreateModal.present();
    } else {
      this.gotoLogin();
    }

  }
}
