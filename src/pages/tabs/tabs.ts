import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DiscoverPage } from '../discover/discover';
import { MePage } from '../me/me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = DiscoverPage;
  tab3Root: any = MePage;

  constructor() {

  }
}
