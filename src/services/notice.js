import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;

//公告列表
export async function getBkgNoticeInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/getBkgNoticeInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//添加公告
export async function addNoticeInfo(params) {
	var data = Base64Url(params)
	var sign = SignUrl(data)
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = '/admin/notice/addNoticeInfo';
	let formData = new FormData();
   	formData.append('data', data);
   	formData.append('sign', sign);
	return request(url,{
		method:"post",
		body:formData,
		headers:myHeaders,
	}
	);
}

//编辑公告
export async function updateNotice(params) {
	var data = Base64Url(params)
	var sign = SignUrl(data)
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = '/admin/notice/updateNotice';
	let formData = new FormData();
   	formData.append('data', data);
   	formData.append('sign', sign);
	return request(url,{
		method:"post",
		body:formData,
		headers:myHeaders,
	}
	);
}
//删除公告
export async function deleteNotice(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/deleteNotice?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//根据公告ID获取详情
export async function getNoticeById(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/getNoticeById?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}


