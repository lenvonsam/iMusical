import { Component} from '@angular/core';

import { NavController,NavParams} from 'ionic-angular';

import {ArticleType,LoadingHelper} from '../../app/globalMethod';

@Component({
  selector: 'page-lastShow',
  templateUrl: 'lastShow.html',
  providers:[LoadingHelper]
})

export class LastShowPage {
  detailObj:Object;
  showSection = "showing";
  constructor(public navCtrl: NavController,public navParams:NavParams,public load:LoadingHelper) {
    console.log(navParams.data);
    this.detailObj=this.navParams.data;
  }
}
