import { Component,ViewChild} from '@angular/core';

import { NavController,NavParams,Content} from 'ionic-angular';

@Component({
  selector: 'page-discover-detail',
  templateUrl: 'discoverDetail.html'
})

export class DiscoverDetailPage {
	detailObj:any;
	@ViewChild(Content) content: Content;
	navOpacity:number=1;
	navBackground:string='transparent';
  title:string="";
  constructor(public navCtrl: NavController,private params:NavParams) {
  	this.detailObj = this.params.data;
  }

  ngAfterViewInit() {
  	this.content.addScrollListener((event)=>{
     let scrollHeight = event.target.scrollTop;
    if(scrollHeight>5 && scrollHeight<200) {
      this.navOpacity = scrollHeight/200;
      console.log('navOpacity:>>>'+this.navOpacity);
      this.navBackground = 'black';
      this.title="活动详情";
    } else if(scrollHeight<=5) {
      this.navBackground = 'transparent';
      this.navOpacity=1;
      this.title="";
    } else {
      this.navOpacity=1;
      this.title="活动详情";
    }
    });
  }
}
