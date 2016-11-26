import { Injectable } from '@angular/core';
import {Http,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
			if(resp.status==200) {
				return Promise.resolve(resp["_body"]);
			} else {

			}
		}).catch((err)=>{
			return Promise.reject(err);
		});

	}

	//获取资讯顶部图片
	getNewsTopPicsData():any {
	 this.commonPostMethod("Article/selectTopArticle.form",{}).then((result)=>{
	 	// alert(JSON.stringify(result));
	 	return result
	 }).catch((err)=>{
	 	alert('error');
	 	return []
	 });
	}
}