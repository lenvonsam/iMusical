import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { DiscoverPage } from '../pages/discover/discover';
import { MePage } from '../pages/me/me';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule,JsonpModule } from '@angular/http';
import { ConsultDetailPage } from '../pages/home/consultDetail';
import { LastShowPage } from '../pages/home/lastShow';
import {HomePagePop} from '../pages/home/homePopPage';
import {DiscoverDetailPage} from '../pages/discover/discoverDetail';
import {MeLoginPage} from '../pages/me/login';
// import { MusicalHttpService } from '../services/http-service';
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
    MeLoginPage
  ],
  imports: [
    HttpModule,
    JsonpModule,
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
    MeLoginPage
  ],
  providers: []
})
export class AppModule {}
