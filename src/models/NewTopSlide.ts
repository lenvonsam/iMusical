interface NewsTopSlideI {
  id:number;
  title:string;
  posttime:string;
  logoPic:string;
  readnum:any;
  author:string;
  tags:string;
  authorID:number;
  musicalID:number;
  featurePic:string;
}

export class NewsTopSlide {
  id:number;
  title:string;
  posttime:string;
  logoPic:string;
  readnum:any;
  author:string;
  tags:string;
  authorID:number;
  musicalID:number;
  featurePic:string;
  // newsTopSlideI:NewsTopSlideI;
  // constructor(newsTopSlideI:NewsTopSlideI) {
  //   this.newsTopSlideI=newsTopSlideI;
  // }
}