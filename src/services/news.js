import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;


//快讯列表
export async function getNewsFlashListByCondition(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/getNewsFlashListByCondition?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}
//添加快讯
export async function addNewsFlash(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/addNewsFlash?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}

//编辑快讯
export async function updateNewsFlash(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/updateNewsFlash?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}

//删除快讯
export async function delNewsFlash(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/delNewsFlash?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}

//快讯分类
export async function getNewsFlashTopMenus(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/getNewsFlashTopMenus?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}


//快讯详情
export async function detailNewsFlash(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/detailNewsFlash?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}

//获取当日快讯推送上限以及当日快讯推送数量
export async function getPushNewsFlashInfo(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/newsFlash/getPushNewsFlashInfo?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"POST"
	}
		);
}


