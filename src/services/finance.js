import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;



//获得充值列表接口
export async function getAccountRecharge(params) {
    var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getAccountRecharge?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}


//获得提币列表接口
export async function getAccountWIthdraw(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/account/getAccountWithdraw?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//审核提现接口

export async function auditAccountWithdraw(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/auditAccountWithdraw?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得交易记录列表接口
export async function getAccount(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getAccount?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得钛小白交易记录列表接口
export async function getAccountTxb(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getTxbAccount?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}


//统计钛值奖励，钛小白奖励
export async function getSumBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/account/getSumBonus?data='+data+"&sign="+sign;
	return request(url,{
		method:"POST"
	    }
    );
}
//保证金记录表

export async function getAccountDiposit(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/account/getAccountDiposit?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得业务类型列表接口
export async function getBusinessType(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/account/getBusinessType?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
