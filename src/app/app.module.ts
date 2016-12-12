//内置模块
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
//页面
import { MyApp } from './app.component';
import { DiscoverPage } from '../pages/discover/discover';
import { MePage } from '../pages/me/me';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ConsultDetailPage } from '../pages/home/consultDetail';
import { LastShowPage } from '../pages/home/lastShow';
import {HomePagePop} from '../pages/home/homePopPage';
import {DiscoverDetailPage} from '../pages/discover/discoverDetail';
import {MeLoginPage} from '../pages/me/login';
import {PageForgetPwdStep1} from '../pages/me/forgetPwdStep1';
import {PageForgetPwdStep2} from '../pages/me/forgetPwdStep2';
import {PageForgetPwdStep3} from '../pages/me/forgetPwdStep3';
import {CaptchaComp} from '../directives/captcha';
import {PageRegisterStep1} from '../pages/me/registerStep1';
import {PageRegisterStep2} from '../pages/me/registerStep2';
import {CommentCreatePage} from '../pages/home/commentCreate';
import {CommentListPage} from '../pages/home/commentList';
import {PageProfile} from '../pages/me/profile';

//视频插件
// import {BrowserModule} from '@angular/platform-browser';
// import {VgCore} from 'videogular2/core';
// import {VgControlsModule} from 'videogular2/controls';
// import {VgOverlayPlayModule} from 'videogular2/overlay-play';
// import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  declarations: [
  MyApp,
  DiscoverPage,
  MePage,
  HomePage,
  TabsPage,
  ConsultDetailPage,
  LastShowPage,
  HomePagePop,
  DiscoverDetailPage,
  MeLoginPage,
  PageForgetPwdStep1,
  PageForgetPwdStep2,
  PageForgetPwdStep3,
  CaptchaComp,
  PageRegisterStep1,
  PageRegisterStep2,
  CommentCreatePage,
  CommentListPage,
  PageProfile
  ],
  imports: [
    HttpModule,
    // BrowserModule,
    // VgCore,
    // VgControlsModule,
    // VgOverlayPlayModule,
    // VgBufferingModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      swipeBackEnabled:false,
      tabsHideOnSubPages:true,
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  DiscoverPage,
  MePage,
  HomePage,
  TabsPage,
  ConsultDetailPage,
  LastShowPage,
  HomePagePop,
  DiscoverDetailPage,
  MeLoginPage,
  PageForgetPwdStep1,
  PageForgetPwdStep2,
  PageForgetPwdStep3,
  CaptchaComp,
  PageRegisterStep1,
  PageRegisterStep2,
  CommentCreatePage,
  CommentListPage,
  PageProfile
  ],
  providers: []
})
export class AppModule {}
