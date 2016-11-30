import {LoadingController,Loading} from 'ionic-angular';
import { Injectable } from '@angular/core';

enum ArticleType {
  // 评剧
  critial,
  news,
  all
}

function getArtType(artsType:ArticleType):string {
  var result = "";
  switch(artsType) {
    case ArticleType.critial:
    result="jp";
    break
    case ArticleType.news:
    result="xw"
    break
    case ArticleType.all:
    result="all"
    break
    default:
    result=""
    break
  }
  return result
}

export {ArticleType};
export {getArtType};


@Injectable()
export class LoadingHelper {
  loader:Loading;
  constructor(public loadingCtrl:LoadingController) {
  }

  show(){
    this.loader = this.loadingCtrl.create({
      content:'loading'
    });

    this.loader.present();
  }

  hide() {
    this.loader.dismiss();
  }
}

