import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-pop',
  templateUrl: 'homePopPage.html'
})


export class HomePagePop {
	callBack:any;
	artsType:number;
	constructor(private viewCtrl:ViewController,private params:NavParams) {
		this.callBack = this.params.get('cb');
		this.artsType=this.params.get('artsType');

	}

	selectType(type) {
		console.log(type);
		this.callBack(type);
		this.viewCtrl.dismiss(type);
	}
}