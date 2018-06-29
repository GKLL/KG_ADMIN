import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;


//关于我们列表
export async function getBaseinfoList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/about/getBaseinfoList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//删除列表
export async function deleteBaseinfo(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/about/deleteBaseinfo?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//设置显示状态


//添加关于我们信息接口
export async function addBaseinfo(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/about/addBaseinfo?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//系统账号列表
export async function getSysUserList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/sysuser/getSysUserList?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获取岗位列表

export async function getPostList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/getPostList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}

//重置密码
export async function resetPassword(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/resetPassword?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//启用/禁用账户接口
export async function sysuserSetStatus(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/setStatus?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}
//关联前台用户接口
export async function setKgUser(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/setKgUser?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//查看关联前台用户
export async function getRelUser(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/getRelUser?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//解绑前台用户
export async function unsetKgUser(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/unsetKgUser?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}
//添加账号
export async function addSysUser(params) {
    var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/addSysUser?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}
//根据ID获得账户详情接口
export async function getSysUserById(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/getSysUserById?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//获取岗位管理列表

export async function getPost(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/post/getPostList?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//添加编辑岗位

export async function addPost(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/post/addPost?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//获取权限树
export async function getAuthTree(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
    let url = '/admin/post/getAuthTree?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//启用禁用岗位

export async function postSetStatus(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/post/setStatus?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//设置显示状态
export async function setInfoStatus(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/about/setInfoStatus?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//根据手机号获取用户Id

export async function getUserId(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/user/getUserId?data='+data+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//获取收益排行设置
export async function getRevenueSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
    let url = '/admin/author/revenue/getSet?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}

//获取收益排行设置
export async function revenueSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
    let url = '/admin/author/revenue/set?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
		);
}