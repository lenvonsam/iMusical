import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {MeLoginPage} from './login';

import {MusicalHttpService} from '../../services/http-service';

import {User} from '../../models/User';

import {PageProfile} from './profile';

//http://7xko7p.com1.z0.glb.clouddn.com/2.jpg

@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
  providers:[MusicalHttpService]
})
export class MePage {
  sources:Array<Object>;
  isGoLogin:boolean=true;
  isLogin:boolean = false;
  headPic:string="http://app.imusical.cn/defaultAvatar.jpg?imageView2/2/w/80/h/80";
  nickname:string="";
  constructor(public navCtrl: NavController,private httpService:MusicalHttpService) {
    this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ];
  }

  ngAfterViewInit() {

  }


  login() {
    this.navCtrl.push(MeLoginPage);
  }

  ionViewWillEnter() {
    if(User.shareInstance().isLogin()) {
      this.isGoLogin=false;
      this.isLogin=true;
      this.headPic=User.shareInstance().avatar;
      this.nickname=User.shareInstance().nickname;
    } else {
      this.isGoLogin=true;
      this.isLogin=false;
    }
  }

  loginout() {
    User.shareInstance().loginout();
    this.isGoLogin=true;
    this.isLogin=false;
  }

  goToEdit() {
    //个人中心
    this.navCtrl.push(PageProfile);
  }


}
