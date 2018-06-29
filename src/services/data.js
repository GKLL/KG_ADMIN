import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;


//获取图表
export async function getDataStatChart(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/datastat/getDataStatChart?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得专栏列表数据
export async function getColumnUserList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/datastat/getColumnUserList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//获得用户列表数据
export async function getNormalUserList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/datastat/getNormalUserList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}


export  function getDay(day){    
       var today = new Date();    
           
       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;            
    
       today.setTime(targetday_milliseconds); //注意，这行是关键代码  
           
       var tYear = today.getFullYear();    
       var tMonth = today.getMonth();    
       var tDate = today.getDate();    
       tMonth = doHandleMonth(tMonth + 1);    
       tDate = doHandleMonth(tDate);    
       return tYear+"-"+tMonth+"-"+tDate;    
}    
function doHandleMonth(month){    
       var m = month;    
       if(month.toString().length == 1){    
          m = "0" + month;    
       }    
       return m;    
}  