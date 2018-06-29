import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;


//获取版本分页列表
export async function appvmList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/appvm/list?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//删除列表
export async function deleteAppvm(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/appvm/delete?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//查看版本详情
export async function AppDetail(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/appvm/detail?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	});
}

//创建版本
export async function createApp(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/appvm/create?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	});
}
