import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'test.html',
  styles:['.xx {border:0;}']
})
export class Test{
  constructor(public navCtrl: NavController) {
    // code...
  }

  ngAfterViewInit() {
    alert('view init');
  }
}