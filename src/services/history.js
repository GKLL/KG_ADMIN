import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;
/*let userId = localStorage.getItem('userId')
let token = localStorage.getItem('Kgtoken')*/
//login
export async function login(params) {
	//console.log(params)

    var data = Base64.encode(JSON.stringify(params));
    var sign = md5(data+"")
	let url = '/admin/login/login?data='+encodeURIComponent(data)+"&sign="+sign;
	     
	return request(url,{
		method:"post",
	    }
	);
	
}
//用户列表
export async function getUserList(params) {
	
	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/user/getUserList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//用户信息
export async function getUserInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getUserInfo?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	}
		);
}
//批量审核
export async function auditUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/auditUser?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	}
		);
}
//推荐设置
export async function setHotUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/setHotUser?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	}
		);
}
//批量锁定
export async function lockUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/lockUser?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	    }
		);
}

//用户登陆设置
export async function loginSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/loginSet?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//用户角色列表
export async function getRoleList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/role/getRoleList?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	    }
		);
}

//角色启用禁用
export async function roleSetStatus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/role/setStatus?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	    }
		);
}
//获取角色资料列表
export async function getRoleProfile(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/role/getRoleProfile?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//用户信息默认设置

export async function userInfoSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/userInfoSet?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//获得用户拥有的菜单接口
export async function getSysMenu(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/login/getSysMenu?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}
//实名认证
export async function getUserCert(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getUserCert?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//审核  

export async function auditUserCert(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/auditUserCert?data='+data+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}