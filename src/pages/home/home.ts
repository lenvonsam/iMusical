import { Component,ViewChild } from '@angular/core';

import { NavController,App,Slides,Content,Events } from 'ionic-angular';

import {Http,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';

import {ConsultDetailPage} from './consultDetail';

import {LastShowPage} from './lastShow';

import {MusicalHttpService} from '../../services/http-service';

import {NewsTopSlide} from '../../models/NewTopSlide';

import 'rxjs/add/operator/toPromise';

import {ArticleType,LoadingHelper} from '../../app/globalMethod';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MusicalHttpService,LoadingHelper]
})
export class HomePage {
  // @ViewChild('mySliders') slider: Slides;
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
  constructor(public navCtrl: NavController,private http:Http,private jsonp:Jsonp,private app:App,public events:Events,private musicalHttp:MusicalHttpService,public load:LoadingHelper) {
    this.load.show();
    let me = this;
    let topDataPromise = this.musicalHttp.getNewsTopPicsData();
    // .then((res)=>{
    //   alert('xxx>'+JSON.stringify(res));
    //   me.topSlides=res;
    //   console.log(me.topSlides.length);
    //   console.log(me.topSlides);
    //   console.log(me.topSlides[0].featurePic);
    // },(err)=>{
    //   alert('error');
    // });

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
    // console.log(window.innerWidth);
    // this.sliderWidth = window.innerWidth;
    // this.sliderHeight='scale(1,1)';
    // console.log('constructor');
    // this.navBackground = 'transparent';
    // this.navOpacity=1;
    // this.navPosition = 'fixed';
    // this.isclick=false;
    this.app.setScrollDisabled(true);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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
      me.navCtrl.push(LastShowPage,item);
    }).catch((err)=>{
      alert('error');
    });
  }

  ngOnInit() {
    // let actionUrl = "https://samhp.leanapp.cn/manage/test";
    // this.http.get(actionUrl).toPromise().then((response)=>{
    //   let body = response.json();
    //   alert(body.abc);
    // }).catch((err)=>{
    //   alert('error')
    // });
    // let params = new URLSearchParams();
    // params.set('search',"123");
    // params.set('action','opensearch');
    // params.set('format','json');
    // params.set('callback','JSONP_CALLBACK');
    // this.jsonp.get(actionUrl,{search:params}).map((response)=>{
    //   console.log(JSON.stringify(response.json()));
    // });
   }

  // ngDoCheck() {
  //   alert('do check');
  // }

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
