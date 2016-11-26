import { Component,ViewChild } from '@angular/core';

import { NavController,App,Slides,Content,Events } from 'ionic-angular';

import {Http,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';

import {ConsultDetailPage} from './consultDetail';

import {LastShowPage} from './lastShow';

import {MusicalHttpService} from '../../services/http-service'

import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MusicalHttpService]
})
export class HomePage {
  // @ViewChild('mySliders') slider: Slides;
  // _options:Object;
  // sliderHeight:any;
  // sliderWidth:any;
  // navBackground:any;
  // navOpacity:any;
  // isclick:boolean;
  // navPosition:String;
  @ViewChild(Content) content:Content;
  constructor(public navCtrl: NavController,private http:Http,private jsonp:Jsonp,private app:App,public events:Events,private hs: MusicalHttpService) {
   let result = hs.getNewsTopPicsData()
   alert(JSON.stringify(result));
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // this.http.post('http://www.imusical.cn:8080/iMusical/Article/selectTopArticle.form',{},options).toPromise().then((res)=>{
    //   alert(JSON.stringify(res));
    // }).catch((err)=>{
    //   alert('error');
    // })
    // this._options={
    //   pager:true
    // };
    // console.log(window.innerWidth);
    // this.sliderWidth = window.innerWidth;
    // this.sliderHeight='scale(1,1)';
    // console.log('constructor');
    // this.navBackground = 'transparent';
    // this.navOpacity=1;
    // this.navPosition = 'fixed';
    // this.isclick=false;
    this.app.setScrollDisabled(true);
    console.log(this.content);
  }


  // getColor() {
  //   if(this.isclick) {
  //     return "white";
  //   } else {
  //     return "blue";
  //   }
  // }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     this.sliderHeight='250px';
  //     this.sliderWidth = '100%';
  //     this.navBackground = 'transparent';
  //     this.navOpacity=1;
  //     this.navPosition = 'fixed';
  //     console.log('refreshing');
  //     console.log(refresher.progress);
  //     refresher.complete();
  //   }, 2000);
  // }

  // doPull(refresher) {
  //   console.log('do pull',refresher);
  //   console.log('startY:>>'+refresher.startY);
  //   console.log('currentY:>>'+refresher.currentY);
  //   console.log('diffY:<<'+(refresher.currentY-refresher.startY));
  //   let diffY = refresher.currentY-refresher.startY;
  //   console.log('state:>>'+refresher.state);
  //   this.sliderHeight=(250+diffY)+'px';
  //   this.sliderWidth = (window.innerWidth/250)*(250+diffY)+'px';
  // }

  // doStart(refresher) {
  //   console.log('do start',refresher);
  // }

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

  // ngAfterViewInit() {
  //   // alert('view init');
  //   // this.content = this.app.getComponent('myContent');
  //   console.log(this.content);
  //   this.content.addScrollListener((event)=>{
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
//   }

//   consultDetail() {

//     this.navCtrl.push(ConsultDetailPage);
//   }

//   lastShow() {
//     this.navCtrl.push(LastShowPage);
//   }

}
