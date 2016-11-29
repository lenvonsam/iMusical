import { Injectable } from '@angular/core';
import {Http,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NewsTopSlide} from '../models/NewTopSlide';
import {ArticleType,getArtType} from '../app/globalMethod';



@Injectable()
export class MusicalHttpService {
	BASICURL:string;
	constructor(private http:Http) {
		this.BASICURL = "http://www.imusical.cn:8080/iMusical/";
	}

	private commonPostMethod(reqUrl:string,reqParams:Object): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })	;
	  let options = new RequestOptions({ headers: headers });
	  let body = this.serializeformQuery(reqParams);
		return this.http.post(this.BASICURL+reqUrl,body,options).toPromise().then((resp)=>{
			console.log(resp);
			if(resp.status==200) {
				return Promise.resolve(resp.json());
			} else {

			}
		}).catch((err)=>{
			return Promise.reject(err);
		});

	}

	private serializeformQuery(requestParams:Object):string {
		var query = "";
		for(let param in requestParams) {
			if(param!= undefined && param != "") {
				query+=param+"="+requestParams[param]+"&";
			}
		}
		if(query!=""){
			query=query.substring(0,query.length-1);
		}
		console.log('query:>>'+query);
		let encodeQuery = encodeURIComponent(query);
		console.log('encode query:>>'+encodeQuery);
		// return encodeQuery;
		return query;
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

	// //获取咨询列表信息
	getNewsListData(currentPage:number,artsType:ArticleType):Promise<any> {
		let type = getArtType(artsType);
		console.log(type);
		return this.commonPostMethod("Article/selectTypeWithoutTopByPageNum.form",{pageNum:currentPage,type:type}).then((result)=>{
			return Promise.resolve(result);
		}).catch((err)=>{
			return Promise.reject(err);
		})
	}

	//根据id获取资讯详情
	getNewsDetailInfo(id:number):Promise<any> {
		return this.commonPostMethod("Article/selectArtsBodyWithID.form",{'id':id}).then((result)=>{
			return Promise.resolve(result);
		}).catch((err)=>{
			return Promise.reject(err);
		});
	}
}