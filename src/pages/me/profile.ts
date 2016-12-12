import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import {ToastHelper,LoadingHelper} from '../../app/globalMethod';

import {MusicalHttpService} from '../../services/http-service';

import {User} from '../../models/User';

import {UploaderBuilder} from 'qiniu4js';

import {PageProfileNickname} from './profileNickname';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[ToastHelper,MusicalHttpService,LoadingHelper]
})
export class PageProfile {
  currentUser:User;
  uploader:any;
  constructor(public navCtrl: NavController,private params:NavParams,private toast:ToastHelper,private httpService:MusicalHttpService,private load:LoadingHelper) {
    this.currentUser = User.shareInstance();

    const me = this;
    me.load.show();
    this.httpService.getQiniuToken().then((res)=>{
      console.log("qiniu token");
      console.log(res.data);
      me.load.hide();
      me.uploader = new UploaderBuilder()
    .debug(true)//开启debug，默认false
    .domain("http://upload.qiniu.com")//默认为http://upload.qiniu.com
    .retry(0)//设置重传次数，默认0，不重传
    .compress(0.5)//默认为1,范围0-1
    .scale([200,0])//第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
    .size(4*1024*1024)//分片大小，最多为4MB,单位为字节,默认1MB
    .chunk(true)//是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
    .auto(true)//选中文件后立即上传，默认true
    .multiple(false)//是否支持多文件选中，默认true
    .accept(['.gif','.png','.jpg'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp
    .tokenShare(true)//在一次上传队列中，是否分享token,如果为false每上传一个文件都需要请求一次Token，默认true
    .tokenFunc(function (setToken,task) {
        //token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
        setTimeout(function () {
            console.log(res.data);
            setToken(res.data);
        }, 1000);
    }).listener({
        onReady(tasks) {
            //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
            //选择上传文件确定后,该生命周期函数会被回调。
            me.load.show();

        },onStart(tasks){
            //所有内部图片任务处理后执行
            //开始上传

        },onTaskGetKey(task){
            //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
            // return "test.png";

        },onTaskProgress: function (task) {
            //每一个任务的上传进度,通过`task.progress`获取
            console.log('task progress');
            console.log(task.progress);

        },onTaskSuccess(task){
            //一个任务上传成功后回调
            console.log(task.result.key);//文件的key
            console.log(task.result.hash);//文件hash
            User.shareInstance().avatar = "http://app.imusical.cn/"+task.result.key;
            me.httpService.updateUserProfile(me.currentUser.id,"",User.shareInstance().avatar).then((response)=>{
              console.log(response);
              me.load.hide();
            }).catch((err)=>{
              me.load.hide();
              me.toast.show('头像上传失败');
            });
        },onTaskFail(task) {
            console.log(JSON.stringify(task));
            me.load.hide();
            me.toast.show('头像上传失败');
            //一个任务在经历重传后依然失败后回调此函数

        },onTaskRetry(task) {
            //开始重传

        },onFinish(tasks){
            //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。

        }
    }).build();
    }).catch((err)=>{
      console.log(JSON.stringify(err));
        me.load.hide();
        me.toast.show('网络异常');
    });
  }

  ngAfterViewInit() {

  }

  updateProfile(key:string) {
    if(key=='avatar') {
      this.uploader.chooseFile();
    }
    if(key=='nickname') {
      this.navCtrl.push(PageProfileNickname,{
        userId:this.currentUser.id,
        nickname:this.currentUser.nickname
      });
    }
  }
}
