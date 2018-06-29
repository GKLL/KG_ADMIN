import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;

//图片显示列表
export async function siteimagelist(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/list?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//图片批量设置显示
export async function setimagiservice(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/seimagi/setimagiservice?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//添加编辑图片
export async function addImage(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/addImage?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//删除图片
export async function deleteImage(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/deleteImage?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//设置图片显示状态
export async function ImageSetStatus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/setStatus?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"POST"
	}
	);
}


//添加编辑广告
export async function addAdvertise(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/addAdvertise?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"POST"
	}
	);
}

//获取广告详情接口

export async function getAdvertise(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/getAdvertise?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"POST"
	}
	);
}

