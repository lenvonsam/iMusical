import { Injectable } from '@angular/core';
import {Http,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NewsTopSlide} from '../models/NewTopSlide';
import {ArticleType,getArtType} from '../app/globalMethod';



@Injectable()
export class MusicalHttpService {
	BASICURL:string;
	constructor(private http:Http) {
		//正式库
		// this.BASICURL = "http://www.imusical.cn:8080/iMusical/";
		//测试库
		//192.168.31.180
		this.BASICURL = "http://192.168.31.180:8080/iMusical/";
	}

	private commonGetMethod(reqUrl:string):Promise<any> {
		return this.http.get(this.BASICURL+reqUrl).toPromise().then((resp)=>{
			console.log(resp);
			if(resp.status==200) {
				return Promise.resolve(resp.json());
			} else {
				return Promise.reject('error');
			}
		}).catch((err)=>{
			return Promise.reject(err);
		})
	}

	private commonPostMethod(reqUrl:string,reqParams:Object): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})	;
	  let options = new RequestOptions({ headers: headers,withCredentials: true });
	  let body = this.serializeformQuery(reqParams);
		return this.http.post(this.BASICURL+reqUrl,body,options).toPromise().then((resp)=>{
			console.log(resp);

			if(resp.status==200) {
				return Promise.resolve(resp.json());
			} else {
				return Promise.reject('error');
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
	 return this.commonPostMethod("Article/selectTopArticle.form",{});
	}

	// //获取咨询列表信息
	getNewsListData(currentPage:number,artsType:ArticleType):Promise<any> {
		let type = getArtType(artsType);
		console.log(type);
		return this.commonPostMethod("Article/selectTypeWithoutTopByPageNum.form",{pageNum:currentPage,type:type});
	}

	//根据id获取资讯详情
	getNewsDetailInfo(id:number):Promise<any> {
		return this.commonPostMethod("Article/selectArtsBodyWithID.form",{'id':id});
	}

	//获得活动数据
	getActivityData(currentPage:number):Promise<any> {
		return this.commonPostMethod("Activity/selectByPageNum.form",{pageNum:currentPage});
	}

	//根据id获取活动详情
	getActivityDetailInfo(id:number):Promise<any> {
		return this.commonPostMethod("Activity/selectBodyByID.form",{'id':id}).then((result)=>{
			return Promise.resolve(result[0]);
		}).catch((err)=>{
			return Promise.reject(err);
		});
	}

	//获取七牛token
	getQiniuToken():Promise<any> {
		return this.commonPostMethod("User/getUploadToken.form",{});
	}

	//获取验证码
	getCaptcha(phone:string,type:number):Promise<any> {
		return this.commonGetMethod("User/getCaptcha.form?phone="+phone+"&type="+type);
	}

	//用户登录
	login(user:string,token:string,platform:number):Promise<any> {
		return this.commonPostMethod("User/loginWithCrossPlatform.form",{'platform':platform,'user':user,'token':token});
	}

	//用户注册
	register(user:string,token:string,platform:number,captcha:string):Promise<any> {
		return this.commonPostMethod("User/registerWithCrossPlatform.form",{'platform':platform,'user':user,'token':token,'captcha':captcha});
	}

	//对于操作表进行新增操作
	insertToOperation(operatorType:string,domain:string,domainId:number,userId:number,content:string):Promise<any> {
		return this.commonPostMethod("Operation/insertOperation.form",{'type':operatorType,'domain':domain,'domainID':domainId,'userID':userId,'content':content});
	}
}