import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,Device } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage" [swipeBackEnabled]="canSwipeBack"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  canSwipeBack = false;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      alert(Device.device.platform);
      Splashscreen.hide();
    });
  }
}
