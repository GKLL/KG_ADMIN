import "babel-polyfill";
import {
  message
} from 'antd';
import {
  withRouter,
  routerRedux,
  BrowserRouter,
  Link,
} from 'dva/router';
import $ from 'jquery';
import dva from 'dva';
import md5 from 'js-md5';
let Base64 = require('js-base64').Base64;


function p(s) {
  return s < 10 ? '0' + s : s;
}
//获取年份

export function formatDate(now) {
  var now = new Date(now)
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + p(month) + "-" + p(date) + "   " + p(hour) + ":" + p(minute) + ":" + p(second);
}


//转换时间
export function timeFormat(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


//token失效
export function tokenLogOut(data, dispatch) {
  if (data.code == 10004) {
    message.error(data.message, 5);
    dispatch(routerRedux.push("/#/user/user_admin"))
    //history.go('/#/')


  } else {
    message.error(data.message);
  }

}

export function GetRequest(url) {
  // /var url = location.search; //获取url中"?"符后的字串   
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;

}

export function Base64Url(params) {
  var data = Base64.encode(JSON.stringify(params));
  return data
}

export function SignUrl(data) {
  let userId = localStorage.getItem('userId')
  let token = localStorage.getItem('Kgtoken')
  var sign = md5(data + userId + '_' + token)
  return sign
}

let options = {
  "lang": {
    "placeholder": "选择时间",
    "rangePlaceholder": [
      "开始日期",
      "结束日期"
    ],
    "today": "今天",
    "now": "当前时间",
    "backToToday": "Back to today",
    "ok": "确定",
    "clear": "Clear",
    "month": "Month",
    "year": "Year",
    "timeSelect": "选择时间",
    "dateSelect": "选择日期",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    "dateTimeFormat": "M/D/YYYY HH:mm:ss",
    "monthFormat": "MMMM",
    "monthBeforeYear": true,
    "previousMonth": "Previous month (PageUp)",
    "nextMonth": "Next month (PageDown)",
    "previousYear": "Last year (Control + left)",
    "nextYear": "Next year (Control + right)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
  },
  "timePickerLocale": {
    "placeholder": "选择时间"
  }
}

//图片显示位置
let residences = [{
  value: '1',
  label: '首页',
  children: [{
    "value": '11',
    "label": "banner"
  }, {
    "value": '12',
    "label": "通栏横幅"
  }, {
    "value": '13',
    "label": "热门视频下方矩形广告"
  }, {
    "value": '14',
    "label": "最新资讯列表横幅"
  }, {
    "value": '15',
    "label": "热门专栏下方小横幅"
  },
  {
    "value": '16',
    "label": "热门关键词下方小横幅"
  }
  ],
}, {
  value: '2',
  label: '栏目/TAG列表页',
  children: [{
    "value": '21',
    "label": "热门文章下方矩形广告"
  }]
}, {
  value: '3',
  label: '搜索浮层',
  children: [{
    "value": '31',
    "label": "小横幅"
  }]
}, {
  value: '4',
  label: '资讯详情页',
  children: [{
    "value": '41',
    "label": "顶部通栏横幅",
  },
  {
    "value": '42',
    "label": "作者信息下方矩形广告",
  },
  {
    "value": '43',
    "label": "正文底部横幅",
  },]
}, {
  value: '5',
  label: '视频详情页',
  children: [
  {
    "value": '51',
    "label": "为你推荐上方横幅",
  },
  {
    "value": '52',
    "label": "热门视频上方横幅",
  },]
}];


//广告行业关键词
const keWordList = ['区块链', '比特币', 'btc', '以太坊', 'eth', '挖矿', '数字货币', '数字钱包', '区块链底层技术', '区块链数据服务', '区块链信息安全', '区块链工具', '金融', '医疗', '房产', '社交', '游戏', '物流']

//Blob
export function dataURLtoBlob(dataurl) {  //将base64格式图片转换为文件形式
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
//去HTML标签正则
export function delHtmlTag(str) {
  //去掉所有的html标记
  return str.replace(/<[^>]+>/g, "");
}

//转化base64
export function getBase64(img) {
  function getBase64Image(img, width, height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    var canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
  }
  var image = new Image();
  image.crossOrigin = '';
  image.src = img;
  var deferred = $.Deferred();
  if (img) {
    image.onload = function () {
      deferred.resolve(getBase64Image(image));//将base64传给done上传处理
    }
    return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
  }
}

//预览前台地址
let previewUrl = "https://dev.kg.com/dist/views/detail/list.html"; //开发
//let previewUrl = "https://test.kg.com/detail/list.html"; //测试
//let previewUrl = "https://www.kg.com/detail/list.html"; //正式

let ImgUrl = "https://dev.kg.com/image/upload"; //开发
//let ImgUrl = "https://testwebapi.kg.com/image/upload"; //测试
//let ImgUrl = "https://webapi.kg.com/image/upload"; //生产
//
//下载图片
let uploadUrl = "https://kgcom.oss-cn-shenzhen.aliyuncs.com/";//开发
//let uploadUrl = "https://kgtest01.oss-cn-beijing.aliyuncs.com/"; //测试
//let uploadUrl = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/"; //生产


//上传视频地址
let uploadVideoUrl = "https://dev.kg.com/image/uploadVideo"; //开发环境地址
//let uploadVideoUrl = "https://testwebapi.kg.com/image/uploadVideo"; //测试环境地址
//let uploadVideoUrl = "https://webapi.kg.com/image/uploadVideo"; //正式环境地址
//下载视频地址
let videoUrl = "https://kgvideo.oss-cn-shenzhen.aliyuncs.com/"; //开发环境视频服务器地址
//let videoUrl = "https://pro-kg-video-oss.oss-cn-beijing.aliyuncs.com/"; //正式环境视频服务器地址

//apk上传
let apkUrl = "http://172.16.0.243:8080/kgapi/admin/appvm/uploadFile"; //开发环境视频服务器地址
//let apkUrl = "https://testwebapi.kg.com/admin/appvm/uploadFile/"; //测试环境视频服务器地址
//let apkUrl = "https://webapi.kg.com/admin/appvm/uploadFile/"; //正式环境视频服务器地址
//服务器
//let urlprefix = "http://172.16.1.108:8081/kgapi";  //李熠
//let urlprefix = "http://172.16.1.97:8080/kgapi";  //文全
//let urlprefix = "http://172.16.0.243:8080/kgapi";  //王洋
let urlprefix = "https://dev.kg.com";//开发
//let urlprefix = "https://testwebapi.kg.com"; //生产&&测试
//let urlprefix = "https://webapi.kg.com"; //生产

export {
  ImgUrl,
  uploadUrl,
  options,
  urlprefix,
  residences,
  videoUrl,
  uploadVideoUrl,
  previewUrl,
  apkUrl,
  keWordList
}