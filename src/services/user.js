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
   
	let url = '/admin/user/getUserList?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//用户信息
export async function getUserInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getUserInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	}
		);
}
//批量审核
export async function auditUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/auditUser?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	}
		);
}
//推荐设置
export async function setHotUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/setHotUser?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	}
		);
}
//批量锁定
export async function lockUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/lockUser?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	    }
		);
}

//用户登陆设置
export async function loginSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/loginSet?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//用户角色列表
export async function getRoleList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/role/getRoleList?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	    }
		);
}

//角色启用禁用
export async function roleSetStatus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/role/setStatus?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	    }
		);
}
//获取角色资料列表
export async function getRoleProfile(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/role/getRoleProfile?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//用户信息默认设置

export async function userInfoSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/userInfoSet?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//获得用户拥有的菜单接口
export async function getSysMenu(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/login/getSysMenu?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}
//实名认证
export async function getUserCert(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getUserCert?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//审核  

export async function auditUserCert(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/auditUserCert?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//就获取用户默认信息

export async function getSiteInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getSiteInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//退出登录

export async function logOut(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/login/logOut?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//邀新奖励
export async function getInviteBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/getInviteBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//冻结、解冻用户接口
export async function freezeUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/freezeUser?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//邀新记录列表
export async function getInviteUserList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getInviteUserList?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}
//确认审查接口
export async function checkUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/checkUser?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//查看师傅详情信息
export async function getParentUserInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getParentUserInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//查询徒弟记录列表
export async function getSubUserList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getSubUserList?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//用户解绑接口
export async function unBindUser(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/unBindUser?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//实名认证奖励列表
export async function realnameBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/realnameBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//成为专栏作家奖励
export async function userColumnBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/userColumnBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//发文奖励列表
export async function publishArticleBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/publishArticleBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//解冻/冻结发文奖励
export async function freezePublishBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/freezePublishBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	
	return request(url,{
		method:"post"
	     }
	);
}

//优质文章标记
export async function markHighQualityArticles(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/markHighQualityArticles?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}

//额外奖励
export async function addedBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/addedBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}

//后台管理用户列表
export async function getSysUsers(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/getSysUsers?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}


//分享奖励列表

export async function shareArticleBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/bonus/shareArticleBonus?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}

//获取专栏身份
export async function getColumnIdentity(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getColumnIdentity?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}

//认证专栏
export async function certificationColumn(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/certificationColumn?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}

//取消专栏认证
export async function cancelCertification(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/cancelCertification?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	     }
	);
}


