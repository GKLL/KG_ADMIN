import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;
/*let userId = localStorage.getItem('userId')
let token = localStorage.getItem('Kgtoken')*/
//login

//用户奖励列表
export async function getUserBonusList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getUserBonusList?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"POST"
	    }
	);
}
//发放奖励
export async function confirmBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/confirmBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"POST"
	    }
	);
}

//检索用户
export async function checkInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/checkInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	    }
	);
}

//受奖人信息
export async function getUserBonusDetailList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getUserBonusDetailList?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//奖励详情

export async function getUserBonusDetail(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getUserBonusDetail?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

