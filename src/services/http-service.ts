import { Injectable } from '@angular/core';
import {Http,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NewsTopSlide} from '../models/NewTopSlide';



@Injectable()
export class MusicalHttpService {
	BASICURL:string;
	constructor(private http:Http) {
		this.BASICURL = "http://www.imusical.cn:8080/iMusical/";
	}

	private commonPostMethod(reqUrl:string,reqParams:Object): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' })	;
	  let options = new RequestOptions({ headers: headers });
		return this.http.post(this.BASICURL+reqUrl,reqParams,options).toPromise().then((resp)=>{
			console.log(resp);
			if(resp.status==200) {
				return Promise.resolve(resp.json());
			} else {

			}
		}).catch((err)=>{
			return Promise.reject(err);
		});

	}

	//获取资讯顶部图片
	getNewsTopPicsData():Promise<NewsTopSlide[]>{
	 return this.commonPostMethod("Article/selectTopArticle.form",{}).then((result)=>{
	 	// alert(JSON.stringify(result));
	 	return Promise.resolve(result as NewsTopSlide[]);
	 }).catch((err)=>{
	 	// alert('error');
	 	return Promise.reject(err);
	 });
	}
}