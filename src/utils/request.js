import "babel-polyfill";
import fetch from 'dva/fetch';
import pathToRegexp from 'path-to-regexp';
import {urlprefix} from '../services/common';
import fetchJsonp from 'fetch-jsonp';
import { routerRedux } from 'dva/router';
import {
  message,notification
} from 'antd';
import {
  hashHistory,
} from 'react-router';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
  
};
//window.Promise = Promise;
//let urlprefix = "kgapi";
function parseJSON(response) {
    
    return response.json().then(res=>{
		if(!res){
			throw "服务器返回参数错误"
		}else{
			//console.log('res',res)
			return res
		}
		return res
	});
}

function checkStatus(response) {
  //console.log("checkStatus:", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description:errortext,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function logError(err) {
  console.log("error occurred:", err);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let fullUrl = urlprefix + url;
  var match = url.substring(0,18);
  if (match != '/admin/login/login') {
    //alert(match)
    
    let  userId = localStorage.getItem('userId')
    let  token = localStorage.getItem('Kgtoken')
    let headers = {
      'token': userId+'_'+token
    }
    
    let option = {
      ...options,
      'Accept': 'application/json',
      'headers': headers,
      'Content-Type': 'application/json; charset=utf-8',
      };
    //console.log("options",options)
    
    return fetch(fullUrl, option)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }));
  }else{


    let option= {
      ...options,
    }
    return fetch(fullUrl, option)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }));
  }

 // console.log("request:", fullUrl, options);

 /* return fetch(fullUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }));*/
  // .catch(logError);
}