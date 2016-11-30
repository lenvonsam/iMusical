import { Component} from '@angular/core';

import { NavController} from 'ionic-angular';

import {MusicalHttpService} from '../../services/http-service';

import {LoadingHelper} from '../../app/globalMethod';

import {DiscoverDetailPage} from './discoverDetail';

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
  providers:[MusicalHttpService,LoadingHelper]
})

export class DiscoverPage {
  _options:Object;
  activityData=[];
  currentPage:number=0;
  constructor(public navCtrl: NavController,private load:LoadingHelper,private httpService:MusicalHttpService) {
     this._options={
       slidesPerView:2
     };
     this.load.show();
     const me = this;
     this.httpService.getActivityData(this.currentPage).then((res)=>{
     	console.log(res);
     	me.activityData = res;
     	me.load.hide();
     }).catch((err)=>{
     	alert('err');
     });
  }

  activeTap(item){
  	let id = item.id;
    console.log(id);
    const me = this;
    this.load.show();
    this.httpService.getActivityDetailInfo(id).then((data)=>{
      console.log(data);
      item.webbody = data.body;
      me.load.hide();
      me.navCtrl.push(DiscoverDetailPage,item);
    }).catch((err)=>{
      alert('error');
    });
  }
}
