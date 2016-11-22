import { Component} from '@angular/core';

import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-lastShow',
  templateUrl: 'lastShow.html'
})

export class LastShowPage {
  showSection = "showing";
  constructor(public navCtrl: NavController) {
  }
}
