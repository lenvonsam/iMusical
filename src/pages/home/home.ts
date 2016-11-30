import { Component,ViewChild } from '@angular/core';

import { NavController,App,Slides,Content,Events,PopoverController } from 'ionic-angular';

import {ConsultDetailPage} from './consultDetail';

import {LastShowPage} from './lastShow';

import {MusicalHttpService} from '../../services/http-service';

import {NewsTopSlide} from '../../models/NewTopSlide';

import 'rxjs/add/operator/toPromise';

import {ArticleType,LoadingHelper,WIDTH} from '../../app/globalMethod';

import {HomePagePop} from './homePopPage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MusicalHttpService,LoadingHelper]
})
export class HomePage {
  @ViewChild(Content) content: Content;
  _options:Object;
  _scrollOptions:Object;
  topSlides:any[] = [];
  listData:any[] =[];
  // sliderHeight:any;
  // sliderWidth:any;
  // navBackground:any;
  // navOpacity:any;
  // isclick:boolean;
  // navPosition:String;
  currentPage:number = 0;
  showPage:boolean = false;
  artsType:ArticleType = ArticleType.all;
  constructor(public navCtrl: NavController,private app:App,public events:Events,private musicalHttp:MusicalHttpService,public load:LoadingHelper,public popCtrl:PopoverController) {
    this.load.show();
    let me = this;
    let topDataPromise = this.musicalHttp.getNewsTopPicsData();

    let listDataPromise = this.musicalHttp.getNewsListData(this.currentPage,this.artsType);
    this._options={
      pager:true
    };
    this._scrollOptions={
      slidesPerView:3
    };

    Promise.all([topDataPromise,listDataPromise]).then((result)=>{
      console.log(result);
      me.topSlides=result[0];
      me.listData=result[1];
      me.showPage = true;
      me.load.hide();
    }).catch((err)=>{
      alert('error');
    });
    this.app.setScrollDisabled(true);
  }

  tapDoubleToTop(e) {
    console.log(e.tapCount);
    if(e.tapCount==2) {
      this.content.scrollToTop();
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.currentPage = 0;
    this.musicalHttp.getNewsListData(this.currentPage,this.artsType).then((res)=>{
      this.listData = res; 
      refresher.complete();
    }).catch((err)=>{
      alert('error');
    });
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);
  }

  showFilter(e) {
    const me = this;
    let popover = this.popCtrl.create(HomePagePop,{
      cb:function(data){
        if(data!=me.artsType) {
          me.artsType = me.getFitArticleType(data);
          me.refreshNewData();
        } 
      },
      artsType:this.artsType
    },{
      cssClass:'menu-select'
    });
    popover.present({
      ev: {
        target:{
          getBoundingClientRect:function(){
            return {
              top:60,
              left:(WIDTH-40)

            }
          }
        }
      }
    });
  }

  refreshNewData() {
    this.currentPage = 0;
    this.load.show();
    this.content.scrollToTop();
    this.musicalHttp.getNewsListData(this.currentPage,this.artsType).then((res)=>{
      this.listData = res; 
      this.load.hide();
    }).catch((err)=>{
      alert('error');
    });
  }

  getFitArticleType(type:number):ArticleType{
    if(ArticleType.all==type) {
      return ArticleType.all
    }
    if(ArticleType.critial==type) {
      return ArticleType.critial
    }

    if(ArticleType.news==type) {
      return ArticleType.news
    }
  }

  // tapEvent() {
  //   alert('tap me');
  // }

  // panEvent(e) {
  //   console.log(e);
  //   if(e.isFinal) {
  //     this.sliderHeight="scale(1)";
  //   } else {
  //     if(e.additionalEvent=="pandown" || e.additionalEvent=="panup") {
  //     let tempScale = (e.overallVelocity+1).toFixed(2);
  //     console.log('tempScale:>>>'+tempScale);
  //     this.sliderHeight="scale("+tempScale+")";
  //     }
  //   }
  // }

  tapNewsDetail(item) {
    console.log(item);
    let id = item.id;
    console.log(id);
    const me = this;
    this.load.show();
    this.musicalHttp.getNewsDetailInfo(id).then((data)=>{
      console.log(data);
      item.webbody = data[0].body;
      me.load.hide();
      me.navCtrl.push(ConsultDetailPage,item);
    }).catch((err)=>{
      alert('error');
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
  //   // this.content = this.app.getComponent('myContent');
  //   console.log(this.content);
    // this.content.addScrollListener((event)=>{
  //    let scrollHeight = event.target.scrollTop;
  //   if(scrollHeight>0 && scrollHeight<248) {
  //     this.navOpacity = scrollHeight/248;
  //     console.log('navOpacity:>>>'+this.navOpacity);
  //     this.navBackground = 'white';
  //     console.log('scroll isclick:>>'+this.isclick);
  //   } else if(scrollHeight==0) {
  //     this.navBackground = 'transparent';
  //     this.navOpacity=1;
  //   } else {
  //     this.navOpacity=1;
  //   }
  //   });
  // }

//   onPageScroll(event) {

//     console.log(event.target.scrollTop);
//     console.log(event);
//     console.log(this.events);
//     let scrollHeight = event.target.scrollTop;
//     if(scrollHeight>0 && scrollHeight<248) {
//       this.navOpacity = scrollHeight/248;
//       console.log('navOpacity:>>>'+this.navOpacity);
//       this.navBackground = 'white';
//       this.isclick=!this.isclick;
//       console.log('scroll isclick:>>'+this.isclick);
//       // this.events.publish('user:xxx',{});
//     } else if(scrollHeight==0) {
//       this.navBackground = 'transparent';
//       this.navOpacity=1;
//     } else {
//       this.navOpacity=1;
//     }
// console.log('They see me scrolling...');
  }

  consultDetail() {

    this.navCtrl.push(ConsultDetailPage);
  }

  

  lastShow(e) {
    this.navCtrl.push(LastShowPage);
  }

  doInfinite(infiniteScroll) {
    this.currentPage++;
    const me = this;
    console.log(">>>>>infiniteScroll>>>...");
    this.musicalHttp.getNewsListData(this.currentPage,this.artsType).then((res)=>{
      if(res.length>0) {
        for(var k in res) {
          var it = res[k];
          me.listData.push(it);
        }
      } else {
        me.currentPage--;
      }
      infiniteScroll.complete();
    }).catch((err)=>{
      alert(err);
    });
    // setTimeout(function(){
    // },2000);
  }

}
