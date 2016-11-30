import { Component,ViewChild} from '@angular/core';

import { NavController,NavParams,Content} from 'ionic-angular';

@Component({
  selector: 'page-consult',
  templateUrl: 'consultDetail.html'
})

export class ConsultDetailPage {
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
}
