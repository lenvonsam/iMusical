import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PageForgetPwdStep1 } from './forgetPwdStep1';

import {PageRegisterStep1} from './registerStep1';

@Component({
  selector: 'page-me-login',
  templateUrl: 'login.html'
})
export class MeLoginPage {
  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {

  }

  goToPwd() {
    this.navCtrl.push(PageForgetPwdStep1);
  }

  goToRegister() {
    this.navCtrl.push(PageRegisterStep1);
  }
}
