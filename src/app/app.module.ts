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

@NgModule({
  declarations: [
    MyApp,
    DiscoverPage,
    MePage,
    HomePage,
    TabsPage,
    ConsultDetailPage,
    LastShowPage
  ],
  imports: [
    HttpModule,
    JsonpModule,
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
    LastShowPage
  ],
  providers: []
})
export class AppModule {}
