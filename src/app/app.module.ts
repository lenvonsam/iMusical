import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import pages from './components';

// import { MusicalHttpService } from '../services/http-service';
//视频插件
// import {BrowserModule} from '@angular/platform-browser';
// import {VgCore} from 'videogular2/core';
// import {VgControlsModule} from 'videogular2/controls';
// import {VgOverlayPlayModule} from 'videogular2/overlay-play';
// import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  declarations: pages,
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
  entryComponents: pages,
  providers: []
})
export class AppModule {}
