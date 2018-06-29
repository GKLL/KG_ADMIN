import React, {
	Component,
	PropTypes
} from 'react';
import {

	routerRedux,

} from 'dva/router';
import { Form, Icon, Input, Button, Badge, Checkbox, Select, Tag, Row, Col, Upload, InputNumber, Popover,Radio, Cascader, DatePicker, TimePicker, message, Modal } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import styles from './Content_Opinion_Show.css';
import Editor from '../../editor/index';
import $ from 'jquery';
import { uploadUrl, ImgUrl, formatDate, videoUrl, uploadVideoUrl } from "../../services/common"
import UploadVideo from '../Upload_Video.js';
import RelationModal from '../Setting/RelationUser';
import imgx from '../../assets/images/article1.jpg';
import imgy from '../../assets/images/article2.jpg';
import imgz from '../../assets/images/article3.jpg';
import imgw from '../../assets/images/article4.jpg';
import imga from '../../assets/images/article5.png';
import imgb from '../../assets/images/article6.png';
import imgc from '../../assets/images/article7.png';
import imgd from '../../assets/images/article8.png';
import share from '../../assets/images/share.jpg';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
let artSorce = 0;
let timeDis = true;
let sec = 0;
let titleNum = 0;
var n = 5000;
var x = 5000;
let isVideo = 0;
let icoType = "upload";
const confirm = Modal.confirm;
const formItemLayout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 18 },
};
const formLayout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 15 },
};
const submitFormLayout = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 10, offset: 7 },
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 24,
			offset: 1,
		},
	},
};

//编辑器
var value = '1';
function ArticleEditor({
	dispatch,
	imgUrl,
	ArticleList,
	ColumnList,
	UserById,
	setting,
	dis,
	uploadImg,
	getBonusList,
	PushAticleInfo,
	ifPushValue,
	pubStatus,
	loading,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) {
	let merId = localStorage.getItem("userId");
	const imgArr = [imgx, imgy, imgz, imgw, imga, imgb, imgc, imgd];  //默认背景图；

	const options = ColumnList;
	// console.log("setting",ArticleList)
	const { RelationVisible, getRelUserList } = setting;
	let AllTotal = 0;  //发放奖励总量；
	function handleSubmit() {
		validateFields((errors, fieldsValue) => {
			if (errors) {
				return;
			} else {
				
				const data = { ...getFieldsValue() };
				var tagsName = "";
				if (data.tag4 == undefined && data.tag5 == undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
				} else if (data.tag4 != undefined && data.tag5 == undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
				} else if (data.tag4 != undefined && data.tag5 != undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
				}
				if (data.publishStatus == undefined) {
					data.publishStatus = ArticleList.publishStatus
				}
				let editArticle = 0;
				const title = data.articleTitle;
				if (title != ArticleList.articleTitle) {
					editArticle = 1
				} else {
					editArticle = 0
				}
				let videoAddress = "";
				let videoFilename = "";
				if (data.upload == "1") {
					videoAddress = data.videoURL[0].url;
					videoFilename = data.videoURL[0].name;
				} else {
					videoAddress = data.videoUrl;
					videoFilename = "";
				}
				if (ArticleList.sysUser == null) {
					if(ArticleList.publishStatus == '2'){
						dispatch({
							type: 'content/publishVideo',
							payload: {
								articleId: ArticleList.articleId,
								articleTitle: data.articleTitle,
								tagnames: tagsName,
								articleText: "视频文件",
								description: data.artic,
								image: imgUrl == '' ? data.image : imgUrl,
								type: parseInt(data.type),
								columnId: data.publishStatus==1?parseInt(data.column[0]):null,
								secondColumn: data.publishStatus==1?parseInt(data.column[1]):null,
								displayStatus: parseInt(data.radioT),
								displayOrder: parseInt(data.sort),
								commentSet: data.commentSet == "true" ? true : false,
								publishSet: 0,
								createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
								bonusStatus: parseInt(data.bonusStatus),
								articleSource: data.articleSource,
								articleLink: data.articleLink,
								publishStatus: parseInt(data.publishStatus),
								browseNum: data.browseNum,
								thumbupNum: data.thumbupNum,
								collectNum: data.collectNum,
								editArticle: editArticle,
								publishKind: 2,
								videoUrl: videoAddress,
								videoFilename: videoFilename,
								textnum: 0,
								ifPush:ifPushValue,
								ifPlatformPublishAward:data.ifPlatformPublishAward,
								auditUser:merId,
								refuseReason:data.publishStatus == 1?null:data.refuseReason,
								articleImgSize: 2
							}
						})
						
					}else{
						if (data.publishStatus == "1") {
							if(ArticleList.ifPush == '1'){
								dispatch({
									type: 'content/publishVideo',
									payload: {
										articleId: ArticleList.articleId,
										articleTitle: data.articleTitle,
										tagnames: tagsName,
										articleText: "视频文件",
										description: data.artic,
										image: imgUrl == '' ? data.image : imgUrl,
										type: parseInt(data.type),
										columnId: parseInt(data.column[0]),
										secondColumn: parseInt(data.column[1]),
										displayStatus: parseInt(data.radioT),
										displayOrder: parseInt(data.sort),
										commentSet: data.commentSet == "true" ? true : false,
										publishSet: 0,
										createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
										bonusStatus: parseInt(data.bonusStatus),
										articleSource: data.articleSource,
										articleLink: data.articleLink,
										publishStatus: parseInt(data.publishStatus),
										browseNum: data.browseNum,
										thumbupNum: data.thumbupNum,
										collectNum: data.collectNum,
										editArticle: editArticle,
										publishKind: 2,
										videoUrl: videoAddress,
										videoFilename: videoFilename,
										textnum: 0,
										articleImgSize: 2
									}
								})
							}else{
								dispatch({
									type: 'content/publishVideo',
									payload: {
										articleId: ArticleList.articleId,
										articleTitle: data.articleTitle,
										tagnames: tagsName,
										articleText: "视频文件",
										description: data.artic,
										image: imgUrl == '' ? data.image : imgUrl,
										type: parseInt(data.type),
										columnId: parseInt(data.column[0]),
										secondColumn: parseInt(data.column[1]),
										displayStatus: parseInt(data.radioT),
										displayOrder: parseInt(data.sort),
										commentSet: data.commentSet == "true" ? true : false,
										publishSet: 0,
										createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
										bonusStatus: parseInt(data.bonusStatus),
										articleSource: data.articleSource,
										articleLink: data.articleLink,
										publishStatus: parseInt(data.publishStatus),
										browseNum: data.browseNum,
										thumbupNum: data.thumbupNum,
										collectNum: data.collectNum,
										editArticle: editArticle,
										publishKind: 2,
										videoUrl: videoAddress,
										videoFilename: videoFilename,
										textnum: 0,
										ifPush:ifPushValue,
										articleImgSize: 2
									}
								})
							}
						} else {
							dispatch({
								type: 'content/publishVideo',
								payload: {
									articleId: ArticleList.articleId,
									articleTitle: data.articleTitle,
									articleText: "视频文件",
									tagnames: tagsName,
									description: data.artic,
									image: imgUrl == '' ? data.image : imgUrl,
									type: parseInt(data.type),
									columnId: parseInt(data.column[0]),
									secondColumn: parseInt(data.column[1]),
									displayStatus: parseInt(data.radioT),
									displayOrder: parseInt(data.sort),
									commentSet: data.commentSet == "true" ? true : false,
									publishSet: 0,
									createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
									bonusStatus: parseInt(data.bonusStatus),
									articleSource: data.articleSource,
									articleLink: data.articleLink,
									publishStatus: parseInt(data.publishStatus),
									refuseReason: data.refuseReason,
									browseNum: data.browseNum,
									thumbupNum: data.thumbupNum,
									collectNum: data.collectNum,
									editArticle: editArticle,
									publishKind: 2,
									videoUrl: videoAddress,
									videoFilename: videoFilename,
									textnum: 0,
									articleImgSize: 2
								}
							})
						}
					}

				} 


			}
		})
	}
	// if (imgUrl != "") {
	//   articleList.articleImage = imgUrl
	// }

	function pubsubmit() {
		validateFields((errors) => {
			if (errors) {
				return;
			} else {
				const data = { ...getFieldsValue() };
				//console.log(data.text);


				var tagsName = "";
				if (data.tag4 == undefined && data.tag5 == undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
				} else if (data.tag4 != undefined && data.tag5 == undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
				} else if (data.tag4 != undefined && data.tag5 != undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
				}
				console.log(imgUrl, data.image)
				if (imgUrl == "" && data.image == "") {
					message.error('请上传封面图')
					return
				}
				/*if(data.publishStatus==undefined){
				  data.publishStatus=ArticleList.publishStatus
				}*/
				let videoAddress = "";
				let videoFilename = "";
				if (data.upload == "1") {
					videoAddress = data.videoURL[0].url;
					videoFilename = data.videoURL[0].name;
				} else {
					videoAddress = data.videoUrl;
					videoFilename = "";
				}
				let editArticle = 0;
				const title = data.articleTitle;
				if (title != ArticleList.articleTitle) {
					editArticle = 1
				} else {
					editArticle = 0
				}
				dispatch({
					type: 'content/publishVideo',
					payload: {
						articleId: ArticleList.articleId,
						articleTitle: data.articleTitle,
						tagnames: tagsName,
						articleText: "视频文件",
						description: data.artic,
						image: imgUrl == '' ? data.image : imgUrl,
						type: parseInt(data.type),
						columnId: parseInt(data.column[0]),
						secondColumn: parseInt(data.column[1]),
						displayStatus: parseInt(data.radioT),
						displayOrder: parseInt(data.sort),
						commentSet: data.commentSet == "true" ? true : false,
						publishSet: parseInt(data.radioG),
						createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
						sysUser: merId,
						bonusStatus: parseInt(data.bonusStatus),
						articleSource: data.articleSource,
						articleLink: data.articleLink,
						publishStatus: 1,
						browseNum: data.browseNum,
						thumbupNum: data.thumbupNum,
						collectNum: data.collectNum,
						editArticle: editArticle,
						publishKind: 2,
						videoUrl: videoAddress,
						videoFilename: videoFilename,
						textnum: 0,
						articleImgSize: 2
					}
				})
			}
		})
	}
	function typeChange(e) {
		//console.log(e.target.value)
		ArticleList.articleType = parseInt(e.target.value)
	}
	function range(start, end) {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
		return result;
	}
	function disabledDate(current) {
		// Can not select days before today and today
		return current && current <= moment()
	}
	function disabledDateTime() {
		return {
			disabledHours: () => range(0, 24).splice(4, 20),
			disabledMinutes: () => range(30, 60),
			disabledSeconds: () => [55, 56],
		};
	}
	function goBack() {
		//dispatch(routerRedux.push("/content/content_article?page=1"))
	}
	function showModal() {
		dispatch({
			type: 'content/showBgModal'
		})
	}
	function handleTime(e) {
		//console.log(e.target.value)
		if (e.target.value == "0") {
			ArticleList.publishSet = 0;
		} else {
			ArticleList.publishSet = 1;
		}

	}
	function handleChange(imgUrl) {
		//console.log(imgUrl)
		return imgUrl
	}

	function StatusonChange(e) {
		//console.log(e.target.value)
		value = e.target.value;
		dispatch({
			type:"content/publishStatusChange",
			payload:{
				pubStatus : e.target.value
			}
		})
	}
	function showUser() {
		dispatch({
			type: "setting/showRelationModal"
		})

	}
	const RelationModalProps = {
		visible: RelationVisible,
		deskUserId: setting.deskUserId,
		onCancel() {
			dispatch({
				type: "setting/hideRelationModal"
			})
		},
		onOk(record, deskUserId) {
			//console.log(record,values)
			Modal.confirm({
				title: "确认关联前台用户吗？",
				okText: '确定',
				onOk() {
					//console.log(values,record)
					dispatch({
						type: "setting/setKgUser",
						payload: {
							userId: merId,
							kgUserId: deskUserId
						}
					})
				},
				onCancel() {
					console.log('Cancel');
				},
			})

		},
		handleBlur(e) {
			if (e.target.value.length == 11) {
				dispatch({
					type: "setting/getUserId",
					payload: {
						userMobile: e.target.value
					}
				})
			}
		}
	}

	
	function handlevaild(rule, value, callback) {
		var dd = value.replace(/<\/?.+?>/g, "");
		var dds = dd.replace(/ /g, "");//dds为得到后的内容
		//console.log(dds)
		let CX = dds.split('&nbsp;')
		var lg = CX.join('');
		//console.log(lg.length)
		if (lg.length == 0) {
			callback("请输入正文")
		}/*else if(lg.length>5000){
        callback("正文内容不能超过5000个字符")
      }*/else {
			callback()
		}
	}
	function checkout() {

	}
	function handleVideoChange(info) {

	}
	function beforeUpload(file) {
		var isTrue = false;
		if (file.type == 'video/mp4') {
			isTrue = true
		} else {
			message.error('视频仅支持mp4格式')
			isTrue = false
			return false
		}
		const is200M = file.size / 1024 / 1024 < 200;
		//console.log('is200M', is200M)
		if (!is200M) {
			message.error('视频大小不超过200M');
		}
		return isTrue && is200M
	}

	//移除视频
	function onRemove(file) {
		//console.log(file)
		var title = "确认删除" + file.name + "吗？"
		const myConfirm = ({ title, content }) => new Promise((resolve, reject) =>
			confirm({
				title: "确认删除" + file.name + "吗？",
				onOk() {
					resolve()
				},
				onCancel() {
					reject()
				}
			}))
		return myConfirm(title)
	}


	//
	function imgupload(e) {
		var docobj = document.getElementById("uploadInput1");
		var fileList = docobj.files[0];
		//现在图片文件大小
		var imgSize = fileList.size;
		console.log(fileList);
		if (imgSize > 2 * 1024 * 1024) {
			message.error('上传的图片的大于2M,请重新选择');
			docobj.val('');
			var domObj = docobj[0];
			domObj.outerHTML = domObj.outerHTML;
			var newJqObj = docobj.clone();
			docobj.before(newJqObj);
			docobj.remove();
			docobj.unbind().change(function (e) {
				console.log(e)
			});
			return;
		}

		//将图片文件转换为base64
		var coverImg = "";
		var reader = new FileReader();
		var imgWidth = 0;
		var imgHeight = 0;
		reader.onload = function (e) {
			//加载图片获取图片真实宽度和高度

			coverImg = reader.result;
			var img = new Image();
			img.src = coverImg;
			img.onload = function (argument) {
				imgWidth = this.width;
				imgHeight = this.height;
				console.log(imgWidth, imgHeight)  //这里就是上传图片的宽和高了
				console.log(imgWidth)
				if (imgWidth < 750 ) {
					message.warning('上传图片最小尺寸为750*422px')
				} else if(imgHeight < 421){
					message.warning('上传图片最小尺寸为750*422px')
				} else {
					dispatch({
						type: 'content/hideBgModal',
						payload: {
							activeImg: coverImg,
							imgtype:'video'
						}
					})
					dispatch({
						type: 'content/showfpModal',
						payload: {

						}
					})
				}
			}
		}
		reader.readAsDataURL(fileList)
	}


	const props = {
		action: uploadVideoUrl,
		onChange: handleVideoChange,
		multiple: true,
		name: "file",
		accept: '.mp4',
		beforeUpload: beforeUpload,
		onRemove: onRemove
	};
	//选择本地视频或视频链接
	function fixVideo(e) {
		// console.log(e)
		ArticleList.videoType = parseInt(e.target.value)
	}

	//失去焦点视频链接地址
	function handleInputBlur(e) {
	
		var value = e.target.value;
		if (value.indexOf('src') != '-1') {
			value = value.replace(new RegExp("'", "gm"), '"');
			value = 'https://' + value.match(/:\/\/(\S*)"/)[1];
		} else if (value.indexOf('http') != '-1' && value.indexOf('src') == '-1') {
			value = 'https://' + value.match(/:\/\/(\S*)/)[1];
		}
		console.log(value)
		ArticleList.videoUrl = value;
	}

	//验证是否是iframe链接
	function videoiframeUrl(rule, value, callback){
	
		if(value.indexOf('iframe') != '-1'){
			callback()
		}else{
			callback('为了更好的视频浏览体验，请粘贴外部视频网站的视频通用代码，代码示例：<iframe frameborder="0"width="640"height="498"src="...……"allowfullscreen></iframe>若视频网站不支持这种通用代码，请尝试更换视频网站或直接本地上传视频。支持的网站：优酷、腾讯视频、爱奇艺等。不支持的网站：搜狐视频、乐视视频等')
		}

	}

	//是否推送
	const ifPushChange = (e) => {
		//获取今日推送的条数
		dispatch({
			type:"content/getPushAticleInfo"
		})
		let val = e.target.value;
		if (PushAticleInfo.pushArticleNumber >= PushAticleInfo.pushArticleLimit) {
			if (val == 1) {
				confirm({
					title: '确定推送吗?',
					content: (<div>
						今日已推送<span style={{ color: '#f00' }}>{PushAticleInfo.pushArticleNumber}</span>篇文章给用户，再推送比较影响用户体验，是否继续推送?
					</div>),
					okText: '是',
					cancelText: '否',
					onOk() {
						//console.log(values,record)
						dispatch({
							type: 'content/ifPushValue',
							payload: {
								ifPushValue: '1'
							}
						})
					},
					onCancel() {
						// ifPushValue = "0"
						dispatch({
							type: 'content/ifPushValue',
							payload: {
								ifPushValue: '0'
							}
						})
					},
				})
			} else {
				dispatch({
					type: 'content/ifPushValue',
					payload: {
						ifPushValue: '0'
					}
				})
			}
		} else {
			dispatch({
				type: 'content/ifPushValue',
				payload: {
					ifPushValue: val
				}
			})
		}

	}
	function tagValue1(rule, value, callback) {
		//console.log(value)
		var arr = [];
		var len = 0;
		const data = { ...getFieldsValue(['tag2', 'tag3', 'tag4', 'tag5']) }
		arr.push(data.tag2, data.tag3, data.tag4, data.tag5)
		if (value == undefined || value == "") {
			callback()
		} else {
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				}
				else {
					len += 1;
				}
			}
			if ((len > 16 || len < 2) && value != "") {
				callback("请输入2-16个字符！")
			}
			for (var i in arr) {
				if (value == arr[i]) {
					//console.log(value,arr[i])
					callback("标签不能重复")
				}
			}
			callback()
		}
	}
	function tagValue2(rule, value, callback) {
		//console.log(value)
		var arr = [];
		var len = 0;

		const data = { ...getFieldsValue(['tag1', 'tag3', 'tag4', 'tag5']) }
		arr.push(data.tag1, data.tag3, data.tag4, data.tag5)
		if (value == undefined || value == "") {
			callback()
		} else {
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				}
				else {
					len += 1;
				}
			}
			if ((len > 16 || len < 2) && value != "") {
				callback("请输入2-16个字符！")
			}
			for (var i in arr) {
				if (value == arr[i]) {
					callback("标签不能重复")
				}
			}
			callback()
		}
	}
	function tagValue3(rule, value, callback) {
		//console.log(value)
		var arr = [];
		var len = 0;
		const data = { ...getFieldsValue(['tag1', 'tag2', 'tag4', 'tag5']) }
		arr.push(data.tag1, data.tag3, data.tag4, data.tag5)
		if (value == undefined || value == "") {
			callback()
		} else {
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				}
				else {
					len += 1;
				}
			}
			if ((len > 16 || len < 2) && value != "") {
				callback("请输入2-16个字符！")
			}
			for (var i in arr) {
				if (value == arr[i]) {
					//console.log(value,arr[i])
					callback("标签不能重复")
				}
			}
			callback()
		}
	}
	function tagValue4(rule, value, callback) {
		//console.log(value)
		var arr = [];
		var len = 0;

		const data = { ...getFieldsValue(['tag1', 'tag3', 'tag2', 'tag5']) }
		arr.push(data.tag1, data.tag2, data.tag3, data.tag5)
		if (value == undefined || value == "") {
			callback()
		} else {
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				}
				else {
					len += 1;
				}
			}
			if ((len > 16 || len < 2) && value != "") {
				callback("请输入2-16个字符！")
			}
			for (var i in arr) {
				if (value == arr[i]) {
					//console.log(value,arr[i])
					callback("标签不能重复")
				}
			}
			callback()
		}
	}
	function tagValue5(rule, value, callback) {
		//console.log(value)
		var arr = [];
		var len = 0;

		const data = { ...getFieldsValue(['tag1', 'tag3', 'tag4', 'tag2']) }
		arr.push(data.tag1, data.tag2, data.tag4, data.tag5)
		if (value == undefined || value == "") {
			callback()
		} else {
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				}
				else {
					len += 1;
				}
			}
			if ((len > 16 || len < 2) && value != "") {
				callback("请输入2-16个字符！")
			}
			for (var i in arr) {
				if (value == arr[i]) {
					//console.log(value,arr[i])
					callback("标签不能重复")
				}
			}
			callback()
		}
	}
	function ModalCirm(title) {
		confirm({
			title: title,

		})
	}
	function normFile(info) {
		console.log('Upload event:', info);
		let fileList = info.fileList;
		// 1. Limit the number of uploaded files
		//    Only to show two recent uploaded files, and old ones will be replaced by the new
		fileList = fileList.slice(-1);
		dispatch({
			type: "content/fixdisabeld",
		})
		if (info.file.status == "done") {
			if (info.file.response.errorCode == 10000) {
				fileList = fileList.map((file) => {
					if (file.response) {
						// Component will show file.url as link
						file.url = videoUrl + file.response.data[0].filePath
					}
					var BTN = document.getElementById("BTN");
					BTN.innerText = '重新上传';
					//icoType = "upload";
					dispatch({
						type: "content/falsedisabeld",
					})
					return file;
				});
			}
		} else if (info.file.status == undefined) {

			dispatch({
				type: "content/falsedisabeld",
			})
			return false
		} else if (info.file.status == "removed") {
			dispatch({
				type: "content/falsedisabeld",
			})


		}
		return fileList;
	}

	//验证视频链接是否为MP4格式;

	function videoUrlChange(rule, value, callback) {
		console.log(value)
		var reg = RegExp(/src/);
		if (!reg.exec(value)) {
			callback('请输入有效的视频链接')

		}
		callback();
	}
	//验证视频
	function fileVideo(fileList) {
		//console.log(fileList)
		return fileList
	}
	//跳转预览页
	function previewPage() {
		const data = { ...getFieldsValue() };
		let videoAddress = "";
		let videoFilename = "";
		if (data.upload == "1") {
			videoAddress = data.videoURL[0].url;
			videoFilename = data.videoURL[0].name;
		} else {
			// if (data.videoUrl.indexOf('src') != '-1') {
			// 	data.videoUrl = data.videoUrl.replace(new RegExp("'", "gm"), '"');
			// 	data.videoUrl = 'https://' + data.videoUrl.match(/:\/\/(\S*)"/)[1];
			// } else if (data.videoUrl.indexOf('http') != '-1' && data.videoUrl.indexOf('src') == '-1') {
			// 	data.videoUrl = 'https://' + data.videoUrl.match(/:\/\/(\S*)/)[1];
			// }

			videoAddress = data.videoUrl;
			videoFilename = null;
		}
		localStorage.setItem('videoFilename', videoFilename);
		localStorage.setItem('videoUrl', videoAddress);
		window.open('/#/previewVideo?articleId=' + ArticleList.articleId)
	}
	return (
		<Form onSubmit={handleSubmit}>
			<FormItem label="标题" {...formItemLayout}>
				{getFieldDecorator('articleTitle', {
					initialValue: ArticleList.articleTitle,
					rules: [{
						type: 'string',
						message: '标题1-64个字符,支持中英文及特殊符号，空格，不区分大小写',
						min: 1,
						max: 64,

					}, {
						required: true, message: '请输入标题!',
					}
					],
				})(
					<Input type="text" placeholder="输入标题" style={{ width: '60%' }} />
				)}
				<span style={{ color: "#aaa", marginLeft: 20 }}>1-64个字符</span>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="视频"
			>
				{getFieldDecorator('upload', {
					initialValue: ArticleList.videoType + "",
					rules: [{
						required: true, 'message': "请选择"
					}]
				})(
					<RadioGroup onChange={fixVideo}>
						<Radio value="1">本地上传</Radio>
						<Radio value="2">视频链接</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{ArticleList && ArticleList.videoType == 2 ?
				<FormItem
					{...formItemLayout}
					label={(
						<span>
						视频链接&nbsp;
						<Popover content={<div><img src={share} /></div>} placement="bottom">
							<Icon type="question-circle-o" />
						</Popover>
						</span>
					)}
				>
					{getFieldDecorator('videoUrl', {
						initialValue: (ArticleList.videoFilename == null || ArticleList.videoFilename == "") ? ArticleList.videoUrl : "",
						rules: [{
							required: true, 'message': "请输入视频链接",
						},{
							validator:videoiframeUrl
						}]
					})(
						<Input
							placeholder='请粘贴外部视频网站的视频通用代码，代码示例：<iframe frameborder="0" width="640" height="498" src="……" allowfullscreen></iframe>'
							style={{ width: "100%" }}
							// onBlur={handleInputBlur}
						/>
					)}
				</FormItem> : null}
			{ArticleList && ArticleList.videoType == 1 ?
				<FormItem
					{...formItemLayout}
					label="本地上传"
				>
					{getFieldDecorator('videoURL', {
						initialValue: ArticleList.videoList,
						valuePropName: 'fileList',
						getValueFromEvent: normFile,
						rules: [{
							required: true, 'message': "请上传视频",
							type: "array"
						}]
					})(
						<Upload {...props} listType="text" style={{ width: '50%' }}>
							<Button type="primary" size="large" id="BTN" disabled={dis} >
								<Icon type={icoType} />重新上传
                </Button>
						</Upload>
					)}
					<span>限200m以内mp4格式视频</span>
				</FormItem> : null}

			<Row key='2' type="flex" justify="start" >
				<Col  style={{ marginLeft: '130px' }}>
					<span className={styles.tagLabel}><span style={{ color: '#f5222d' }}>*</span>TAG标签：</span>
				</Col>
				<Col style={{ marginRight: '15px' }}>
					<FormItem extra="至少输入3个tag">
						{getFieldDecorator('tag1', {
							initialValue: ArticleList.tags != undefined ? ArticleList.tags[0] : '',
							rules: [
								{
									required: true,
									message: '请输入标签!',
								}, {
									validator: tagValue1
								}],
						})(
							<Input style={{ width: '140px', marginRight: '50px' }} />
						)}

					</FormItem>
				</Col>
				<Col style={{ marginRight: '55px' }}>
					<FormItem  >
						{getFieldDecorator('tag2', {
							initialValue: ArticleList.tags != undefined ? ArticleList.tags[1] : '',
							rules: [
								{
									required: true,
									message: '请输入标签!',
								}, {
									validator: tagValue2
								}],
						})(
							<Input style={{ width: '140px', }} />
						)}

					</FormItem>
				</Col>
				<Col style={{ marginRight: '55px' }}>
					<FormItem>
						{getFieldDecorator('tag3', {
							initialValue: ArticleList.tags != undefined ? ArticleList.tags[2] : '',
							rules: [
								{
									required: true,
									message: '请输入标签!',
								}, {
									validator: tagValue3
								}],
						})(
							<Input style={{ width: '140px', }} />
						)}

					</FormItem>
				</Col>
				<Col style={{ marginRight: '55px' }}>
					<FormItem>
						{getFieldDecorator('tag4', {
							initialValue: ArticleList.tags != undefined ? ArticleList.tags[3] : '',
							rules: [{ required: false }, {
								validator: tagValue4
							}],
						})(
							<Input style={{ width: '140px', }} />
						)}

					</FormItem>
				</Col>
				<Col style={{ marginRight: '55px' }}>
					<FormItem  >
						{getFieldDecorator('tag5', {
							initialValue: ArticleList.tags != undefined ? ArticleList.tags[4] : '',
							rules: [{ required: false }, {
								validator: tagValue5
							}],
						})(
							<Input style={{ width: '140px', }} />
						)}

					</FormItem>
				</Col>
			</Row>

			<FormItem label="摘要" {...formItemLayout}>
				{getFieldDecorator('artic', {
					initialValue: ArticleList.articleDescription,
					rules: [{ required: true, min: 10, max: 100, message: '摘要10-100字,支持中英文,数字，符号，不区分大小写!' }],
				})(
					<TextArea style={{ minHeight: "100px" }}></TextArea>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label={<span><span style={{ color: '#f5222d' }}>*</span>封面图</span>}
				extra="找不到合适的图片？您可以用以下任一张图作为封面图"
			>
				{getFieldDecorator('image', {
					initialValue: ArticleList.articleImage,
					rules: [{ required: false, message: '请选择图片!' },
					{ type: "string", }

					],

				})(
					<div className={styles.imgxbox}>
						{ArticleList.articleImage == "" ? <div className={styles.bgImg}> <Icon type="plus" /></div> :
							<img  src={imgUrl == "" ? uploadUrl + ArticleList.articleImage : uploadUrl + imgUrl} className={styles.bgImg} />
						}
						<input id='uploadInput1' className={styles.uploadCoverImg} type='file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
						onChange={imgupload} />
					</div>
				)}
			</FormItem>
			<FormItem
				{...formLayout}
				label="&emsp;"
				colon={false}
			>
				<div>
					{imgArr.map((item, index) =>
						<img key={index} onClick={() => uploadImg(item)} src={item} className={styles.Imgx} />
					)}

				</div>
			</FormItem>
			{ArticleList && ArticleList.articleType == null ? <FormItem
				{...formItemLayout}
				label="类别"
			>
				{getFieldDecorator('type', {
					rules: [{ required: true, message: '请选择类别!' },
					],
				})(
					<RadioGroup onChange={typeChange}>
						<Radio value="1">原创</Radio>
						<Radio value="2">转载</Radio>
					</RadioGroup>
				)}
			</FormItem> :
				<FormItem
					{...formItemLayout}
					label="类别"
				>
					{getFieldDecorator('type', {
						initialValue: ArticleList.articleType + '',
						rules: [{ required: true, message: '请选择类别!' },
						],
					})(
						<RadioGroup onChange={typeChange}>
							<Radio value="1">原创</Radio>
							<Radio value="2">转载</Radio>
						</RadioGroup>
					)}
				</FormItem>
			}

			{ArticleList && ArticleList.articleType == 2 ? <FormItem
				{...formItemLayout}
				label="文章来源"
			>
				{getFieldDecorator('articleSource', {
					initialValue: ArticleList.articleSource,
					rules: [{ required: true, message: '请填写转载文章来源!' },
					],
				})(
					<Input style={{ width: "60%" }} />
				)}

			</FormItem> : null}
			{ArticleList && ArticleList.articleType == 2 ? <FormItem
				{...formItemLayout}
				label="原文链接"
			>
				{getFieldDecorator('articleLink', {
					initialValue: ArticleList.articleLink,
					rules: [{ required: true, message: '请填写转载文章来源链接地址!' },
					],
				})(
					<Input style={{ width: "60%" }} />
				)}
			</FormItem> : null}

			<FormItem
				{...formItemLayout}
				label="选择栏目"

			>
				{getFieldDecorator('column', {
					initialValue: [360],
					rules: [
						{ required: (pubStatus == 1||pubStatus==2)?true:false, message: '请选择文章栏目!' },
						{ type: 'array' }
					],
				})(
					<Cascader options={options} disabled placeholder="请选择文章栏目" style={{ width: '20%' }} />
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="显示设置"
			>
				{getFieldDecorator('radioT', {
					initialValue: ArticleList.displayStatus + '',
					rules: [
						{ required: true, message: '请选择显示位置' },
					],
				})(
					<RadioGroup>
						<Radio value="1">正常显示</Radio>
						<Radio value="2">首页置顶</Radio>
						<Radio value="3">首页推荐</Radio>
						<Radio value="4">前台隐藏</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="排序"
			>
				{getFieldDecorator('sort', {
					initialValue: ArticleList.displayOrder,
					rules: [
						{ required: false,message:'请输入0以上的正整数',pattern:/^[0-9]\d*$/ },
					],
				})(
					<Input style={{ width: '10%' }} />

				)}
				<span style={{ marginLeft: 20 }} className={styles.pre}>越小越靠前</span>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="浏览量"
			>
				{getFieldDecorator('browseNum', {
					initialValue: ArticleList.browseNum || 0,
					rules: [{ required: false, message: '请输入浏览量!', },

					],
				})(
					<InputNumber style={{ width: "20%" }} min={0}
						max={5000000} />
				)}
				<span className={styles.pre}>输入限制:0-500万</span>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="点赞量"
			>
				{getFieldDecorator('thumbupNum', {
					initialValue: ArticleList.thumbupNum || 0,
					rules: [{ required: false, message: '请输入点赞量!', },

					],
				})(
					<InputNumber style={{ width: "20%" }} min={0}
						max={500000} />
				)}
				<span className={styles.pre}>输入限制:0-50万</span>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="收藏量"
			>
				{getFieldDecorator('collectNum', {
					initialValue: ArticleList.collectNum || 0,
					rules: [{ required: false, message: '请输入收藏量!', },

					],
				})(
					<InputNumber style={{ width: "20%" }} min={0}
						max={500000} />
				)}
				<span className={styles.pre}>输入限制:0-50万</span>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="评论设置"
			>
				{getFieldDecorator('commentSet', {
					initialValue: ArticleList.commentSet == true ? "true" : 'false',
				})(
					<RadioGroup >
						<Radio value="true">开启评论</Radio>
						<Radio value="false">关闭评论</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{(ArticleList.sysUser != null && ArticleList.createUser != null) && <FormItem
				{...formItemLayout}
				label="发布人"
				extra='注：若该文章为用户发布，则此处不可更改'
			>
				{getFieldDecorator('createUser', {
					initialValue: ArticleList.username,
					rules: [
						{ required: true, message: "请选择关联账户", },
					],
				})(
					<Input style={{ width: '20%', marginRight: 20 + 'px' }} disabled={true} />
				)}
			</FormItem>}
			{(ArticleList.sysUser == null && ArticleList.createUser != null) && <FormItem
				{...formItemLayout}
				label="发布人"
				extra='注：若该文章为用户发布，则此处不可更改,如没有关联的账户,请进入系统账号管理关联'
			>
				{getFieldDecorator('createUser', {
					initialValue: ArticleList.username,
					rules: [
						{ required: true, message: "请选择关联账户", },
					],
				})(
					<Input style={{ width: '20%', marginRight: 20 + 'px' }} disabled={true} />
				)}
			</FormItem>}
			{(ArticleList.sysUser != null && ArticleList.createUser == null) && <FormItem
				{...formItemLayout}
				label="发布人"
				extra='注：若该文章为用户发布，则此处不可更改,如没有关联的账户,请进入系统账号管理关联'
			>
				{getFieldDecorator('createUser', {
					rules: [
						{ required: true, message: "请选择关联账户", },
					],
				})(
					<Select placeholder="请选择前台账号" style={{ width: "20%" }} disabled={ArticleList.publishStatus == 0 ? false : true}>
						{getRelUserList && getRelUserList.map((item, index) =>
							<Option value={item.kgUserId + ""} key={index}>{item.kgUsername}</Option>
						)}
					</Select>
				)}
			</FormItem>}

			<FormItem
				{...formItemLayout}
				label="视频打赏"
				extra="提示：若您想设置视频奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
			>
				{getFieldDecorator('bonusStatus', {
					initialValue: ArticleList.bonusStatus != null ? ArticleList.bonusStatus + '' : '',
					rules: [
						{ required: true, message: '请选择' },
					],
				})(
					<RadioGroup>
						<Radio value='1'>开启</Radio>
						<br />
						<Radio value='0'>不开启</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{(getBonusList != undefined && getBonusList.length != 0) ? <FormItem label="浏览奖励" {...formItemLayout}>
				{getBonusList.map((item, index) => {
					if (item.kind == 1) {
						AllTotal += parseFloat(item.total);
					} else {
						AllTotal += parseFloat(item.value);
					}
					return (
						<Row key={index}>
							<Col span="5">
								{item.name}
							</Col>
							<Col span="5">
								{item.kind == 2 && <span>总奖励钛值{(item.value).toFixed(3)}</span>}
								{item.kind == 1 && <span>奖励钛值{item.value}个/人</span>}

							</Col>
							<Col span="9">
								最大奖励{item.max}人{item.kind == 1 && <span>,合计发放:{(item.total).toFixed(3)}钛值</span>}
							</Col>
							<Col span="5">
								{item.status == 0 && <Badge status="Default" text="未生效" />}
								{item.status == 1 && <Badge status="success" text="已生效" />}
								{item.status == 2 && <Badge status="processing" text="暂停中" />}
								{item.status == 3 && <Badge status="warning" text="已终止" />}
								{item.status == 4 && <Badge status="warning" text="已结束" />}
							</Col>
						</Row>
					)
				})}
				<Row className={styles.alltotal}>
					<Col>
						总计发放：{AllTotal && AllTotal.toFixed(3) + '个'}
					</Col>
				</Row>
			</FormItem> : <FormItem {...formItemLayout} label="阅读奖励">该文章暂无设置阅读奖励</FormItem>}
			{(ArticleList && ArticleList.publishStatus == 2) ?
				<FormItem
					{...formItemLayout}
					label={<span><span style={{ color: "#f00" }}>*</span>是否推送</span>}
				>
					<RadioGroup onChange={ifPushChange} defaultValue={ifPushValue && ifPushValue} value={ifPushValue && ifPushValue}>
						<Radio value='0'>暂时不推送</Radio>
						<Radio value='1'>需要推送</Radio>
					</RadioGroup>
				</FormItem> : null
			}
			{(ArticleList && ArticleList.publishStatus == 1) ?
				<FormItem
					{...formItemLayout}
					label={<span><span style={{ color: "#f00" }}>*</span>是否推送</span>}
				>
					<RadioGroup onChange={ifPushChange} defaultValue={ifPushValue && ifPushValue} value={ifPushValue && ifPushValue} disabled={(ArticleList.ifPush != undefined && ArticleList.ifPush == 0) ? false : true} >
						<Radio value='0'>暂时不推送</Radio>
						<Radio value='1'>需要推送</Radio>
					</RadioGroup>
				</FormItem> : null
			}
			{(ArticleList && ArticleList.publishStatus == 3) ?
				<FormItem
					{...formItemLayout}
					label="是否推送"
				>
					{getFieldDecorator('ifPush', {
						initialValue: ArticleList.ifPush + '',
						rules: [{ required: true, }],
					})(
						<RadioGroup disabled>
							<Radio value="0">暂时不推送</Radio>
							<Radio value="1">需要推送</Radio>
						</RadioGroup>
					)}
				</FormItem> : null
			}
			{(ArticleList.sysUser == null && ArticleList.publishStatus == 2) ? <FormItem
				{...formItemLayout}
				label="是否发送基础发文奖励"
			>
				{getFieldDecorator('ifPlatformPublishAward', {
					initialValue: '1',
					rules: [
						{ required: true, message: '请选择' },
					],
				})(
					<RadioGroup onChange={StatusonChange}>
						<Radio value="1">发送</Radio>
						<Radio value="0">不发送</Radio>

					</RadioGroup>
				)}
			</FormItem> : null}
			{(ArticleList.sysUser == null && ArticleList.publishStatus == 2) ? <FormItem
				{...formItemLayout}
				label="审核处理"
			>
				{getFieldDecorator('publishStatus', {
					initialValue: (ArticleList.publishStatus != undefined && ArticleList.publishStatus == 0) ? ArticleList.publishStatus + "" : '1',
					rules: [
						{ required: true, message: '请选择' },
					],
				})(
					<RadioGroup onChange={StatusonChange}>
						<Radio value="1">通过</Radio>
						<Radio value="3">不通过</Radio>

					</RadioGroup>
				)}
			</FormItem> : null}
			{(ArticleList.sysUser == null && ArticleList.publishStatus == 2) ? <FormItem {...formItemLayout} label="&nbsp;" colon={false}>
				{getFieldDecorator('refuseReason', {
					initialValue: ArticleList.refuseReason != undefined ? ArticleList.refuseReason : '',
					rules: [{
						required: false, message: '请输入!',
					}],
				})(
					<TextArea style={{ width: "100%", minHeight: "100px" }} placeholder="不通过原因(选填)" disabled={pubStatus == 3 ? false : true
					} />
				)}
			</FormItem> : null}

			<FormItem {...formItemLayout} label="&nbsp;" colon={false}>
				<Button type="primary" onClick={handleSubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20 }} disabled={dis} disabled={loading}>保存</Button>
				{(ArticleList && ArticleList.publishStatus == 0) &&
					<Button type="primary" onClick={pubsubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20, marginLeft: 30 }} disabled={loading}>发布</Button>
				}
				<Button type="primary" onClick={handleSubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20, marginLeft: 30, backgroundColor: 'orange' }} className={styles.preview} disabled={dis} onClick={previewPage}>预览视频</Button>
				<Button style={{ marginLeft: 30 }} size="large" onClick={() => history.back()} >返回</Button>
				<RelationModal {...RelationModalProps} />
			</FormItem>


		</Form>
	)
}

export default Form.create()(ArticleEditor);

{/*<FormItem
                      {...formItemLayout}
                       label="发布人"
                       extra='注：若该文章为用户发布，则此处不可更改'
                    >
                      {getFieldDecorator('createUser',{
                        initialValue:(UserById.kgUserId!=null&&UserById.kgUserId!="")?UserById.kgUserId:'',
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}} disabled={(UserById.kgUserId!=null&&UserById.kgUserId!="")?true:false}/>

                      )}
                      {(UserById.kgUserId!=null&&UserById.kgUserId!="")?<a style={{maginLeft:30+'px'}} onClick={showUser} >关联前台用户</a>:null}
              </FormItem>
*/}