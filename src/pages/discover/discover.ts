import { Component} from '@angular/core';

import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html'
})

export class DiscoverPage {
  _options:Object;
  constructor(public navCtrl: NavController) {
     this._options={
       slidesPerView:2
     };
  }
}
