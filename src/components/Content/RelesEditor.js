import React from 'react';
import { Form, Icon, Modal, Input, Button, InputNumber, Select, Checkbox, Tag, Row, Col, Upload, Radio, Cascader, DatePicker, TimePicker, message } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import style_pagination from '../pagination.css';
import Editor from '../../editor/index';
import styles from './Content_Opinion_Show.css';
import RelationModal from '../Setting/RelationUser';
import { options, uploadUrl, formatDate } from "../../services/common"
import imgx from '../../assets/images/article1.jpg';
import imgy from '../../assets/images/article2.jpg';
import imgz from '../../assets/images/article3.jpg';
import imgw from '../../assets/images/article4.jpg';
import imga from '../../assets/images/article5.png';
import imgb from '../../assets/images/article6.png';
import imgc from '../../assets/images/article7.png';
import imgd from '../../assets/images/article8.png';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
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
let sec = 0;
let titleNum = 0;
var n = 5000;
var x = 5000;
let autoSaveInterval = null;


function RelesEditor({
	dispatch,
	location,
	imgUrl,
	loading,
	ColumnList,
	UserById,
	uploadImg,
	setting,
	firstC,
	secondC,
	saveId,
	artSorce,
	SensitiveWords,
	titleWords,
	timeDis,
	PushAticleInfo,
	ifPushValue,
	imgSize,
	flag,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		getFieldValue
	},
}) {
	let merId = localStorage.getItem("userId");
	console.log(flag)
	const options = ColumnList;
	const imgArr = [imgx, imgy, imgz, imgw, imga, imgb, imgc, imgd];  //默认背景图；
	const { RelationVisible, getRelUserList } = setting;
	//发布
	function handleSubmit(e) {
		e.preventDefault();
		validateFields((errors, ) => {
			if (errors) {
				return;
			} else {
				const data = { ...getFieldsValue() };

				if (data.time != undefined) {
					data.time = data.time.format('YYYY-MM-DD HH:mm')
				}
				if (imgUrl == "") {
					message.error('请上传封面图')
					return true
				}
				// if (UserById.kgUserId == null || UserById.kgUserId == "") {
				//   message.error('请先关联前台用户');
				//   return true
				// }
				var dd = (data.text.txt.text()).replace(/<\/?.+?>/g, "");
				var dds = dd.replace(/ /g, "");//dds为得到后的内容
				//console.log(dds.lengthgvfdg)
				let CX = dds.split('&nbsp;')
				var lg = CX.join('');
				lg = lg.replace(/^@font.*Section0;}$/g, '')
				lg = lg.replace(/{[^{]*(?=})/g, "");
				lg = lg.replace(/{[^@]*(?=})/g, "");
				lg = lg.replace(/\s+/g, "")
				lg = lg.replace(/<\/?.+?>/g, "");
				lg = lg.replace(/[\r\n]/g, "");
				//console.log("文章字数", lg.length)
				if (lg.length > 30000) {
					message.error('文章内容不能超过30000字');
					return
				}
				// console.log(lg.length)
				// console.log("234",UserById.kgUserId)
				var tagsName = "";
				if (data.tag4 == undefined && data.tag5 == undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
				} else if (data.tag4 != undefined && data.tag5 == undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
				} else if (data.tag4 != undefined && data.tag5 != undefined) {
					tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
				}

				dispatch({
					type: 'content/publishArticle',
					payload: {
						articleId: saveId,
						articleTitle: data.articleTitle,
						articleText: data.text.txt.html(),
						tagnames: tagsName,
						description: (data.artic == undefined || data.artic == "") ? lg.substring(0, 100) : data.artic,
						image: imgUrl,
						type: parseInt(data.type),
						columnId: parseInt(data.column[0]),
						secondColumn: data.column[1] == undefined ? null : parseInt(data.column[1]),
						displayStatus: parseInt(data.radioT),
						displayOrder: parseInt(data.sort),
						articleSource: data.articleSource,
						articleLink: data.articleLink,
						commentSet: data.commentSet == "true" ? true : false,
						publishSet: parseInt(data.radioG),
						createUser: data.createUser,
						sysUser: merId,
						bonusStatus: parseInt(data.bonusStatus),
						textnum: data.text.txt.text().split('&nbsp;').join('').length,
						publishTime: data.time != undefined ? data.time : null,
						publishStatus: 1,
						browseNum: data.browseNum,
						thumbupNum: data.thumbupNum,
						collectNum: data.collectNum,
						ifPlatformPublishAward: data.ifPlatformPublishAward,
						ifPush: ifPushValue,
						auditUser: merId,
						articleImgSize: data.articleImgSize
					}
				})
			}
		})
	}
	//存草稿
	function publishStatus() {
		validateFields(['articleTitle'], (errors) => {
			if (errors) {
				return
			}
			const data = { ...getFieldsValue() };

			var textnum = 0;
			var text = ""
			if (data.text == undefined) {
				text = ""
				textnum = 0;
			} else {
				text = data.text.txt.html();
				textnum = data.text.txt.text().split('&nbsp;').join('').length
			}
			if (data.time != undefined) {
				data.time = data.time.format('YYYY-MM-DD HH:mm')

			}
			let columnId = null;
			let secondColumn = null;
			if (data.column == undefined) {
				columnId = null;
				secondColumn = null;
			} else {
				if (data.column[1] == undefined) {
					secondColumn == null;
					columnId = data.column[0]
				} else {
					columnId = data.column[0]
					secondColumn = data.column[1]
				}
			}
			var tagsName = "";
			if (data.tag1 == undefined) {
				tagsName = "";
			} else if (data.tag1 !== undefined && data.tag2 == undefined && data.tag3 == undefined) {
				tagsName = data.tag1;
			} else if (data.tag1 != undefined && data.tag2 != undefined && data.tag3 == undefined) {
				tagsName = data.tag1 + ',' + data.tag2
			}
			else if (data.tag4 == undefined && data.tag5 == undefined && data.tag1 != undefined && data.tag2 != undefined && data.tag3 != undefined) {
				tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
			} else if (data.tag4 != undefined && data.tag5 == undefined && data.tag1 != undefined && data.tag2 != undefined && data.tag3 != undefined) {
				tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
			} else if (data.tag4 != undefined && data.tag5 != undefined && data.tag1 != undefined && data.tag2 != undefined && data.tag3 != undefined) {
				tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
			}
			//console.log(data)
			dispatch({
				type: 'content/publishArticle',
				payload: {
					articleId: saveId,
					articleTitle: data.articleTitle,
					articleText: text,
					tagnames: tagsName,
					description: (data.artic == undefined || data.artic == "") ? data.text.txt.text().substring(0, 100) : data.artic,
					image: imgUrl,
					type: parseInt(data.type),
					columnId: columnId,
					secondColumn: secondColumn,
					displayStatus: parseInt(data.radioT),
					displayOrder: parseInt(data.sort),
					articleSource: data.articleSource,
					articleLink: data.articleLink,
					commentSet: data.commentSet != undefined ? (data.commentSet == "true" ? true : false) : null,
					publishSet: parseInt(data.radioG),
					publishTime: data.time != undefined ? data.time : null,
					sysUser: merId,
					bonusStatus: parseInt(data.bonusStatus),
					publishStatus: 0,
					textnum: textnum,
					browseNum: data.browseNum,
					thumbupNum: data.thumbupNum,
					collectNum: data.collectNum,
					ifPlatformPublishAward: data.ifPlatformPublishAward,
					ifPush: ifPushValue,
					articleImgSize: data.articleImgSize

				}
			})

		})


	}

	//显示裁剪框
	function showModal() {
		dispatch({
			type: 'content/showBgModal'
		})
	}
	function createUserValue(e) {
		return UserById.kgUserName
	}
	function edtiorContent(editor) {

		return editor
	}
	function handleChange(imgUrl) {
		//console.log(imgUrl)
		return imgUrl
	}

	function handleProvinceChange(value) {
		//console.log(value)
		sec = parseInt(value)
		secondCity = parseInt(value)
	}
	function showUser() {
		const data = { ...getFieldsValue(['createUser']) };
		//console.log(data)
		dispatch({
			type: "setting/showRelationModal"
		})
	}
	function typeChange(e) {
		//console.log(e.target.value)
		//artSorce = parseInt(e.target.value)
		dispatch({
			type: "content/typeChange",
			payload: {
				artSorce: parseInt(e.target.value)
			}
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

	function range(start, end) {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
		return result;
	}
	function disabledDate(current, cx) {
		// Can not select days before today and today
		var date = Date.parse(new Date())
		//console.log(date)
		var time = date - (24 * 60 * 60 * 1000);
		var severTime = date + (7 * 24 * 60 * 60 * 1000);
		//console.log("2",cx)
		return severTime < current && current > time
	}

	function disabledDateTime() {
		var date = new Date(Date.parse(new Date()))

		var h = date.getHours()
		var m = date.getMinutes()
		return {
			disabledHours: () => range(0, 24).splice(0, h),

		};
	}

	//文章内容校验
	function onChange(rule, value, callback) {
		//console.log(value)

		if (value == undefined) {
			callback()
		} else {
			var arr = [];
			//arr.push(value.txt.html(),value.txt.text())
			//let CX = arr[1].split('&nbsp;')

			//var lg = CX.join('');
			var html = value.txt.html();
			html.replace(/<style(([\s\S])*?)<\/style>/g, '')
			//console.log(html)
			if (html == "" || html == '<p class="MsoNormal"><br></p>') {
				callback('请输入正文')
			} else {
				callback()
			}
		}
	}

	//定时发布
	function handleTime(e) {

		dispatch({
			type: "content/handleTimeChane",
			payload: {
				timeDis: parseInt(e.target.value)
			}
		})
	}
	function edtiorContentText(t) {

	}
	//预览
	function previewPage() {

		const data = { ...getFieldsValue() };
		var tagsName = "";
		if (data.tag1 == undefined) {
			tagsName = "";
		} else if (data.tag1 !== undefined && data.tag2 == undefined && data.tag3 == undefined) {
			tagsName = data.tag1;
		} else if (data.tag1 != undefined && data.tag2 != undefined && data.tag3 == undefined) {
			tagsName = data.tag1 + ',' + data.tag2
		}
		else if (data.tag4 == undefined && data.tag5 == undefined && data.tag1 != undefined && data.tag2 != undefined && data.tag3 != undefined) {
			tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
		} else if (data.tag4 != undefined && data.tag5 == undefined && data.tag1 != undefined && data.tag2 != undefined && data.tag3 != undefined) {
			tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
		} else if (data.tag4 != undefined && data.tag5 != undefined && data.tag1 != undefined && data.tag2 != undefined && data.tag3 != undefined) {
			tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
		}

		if (data.type == "2") {
			localStorage.setItem("previewType", data.articleLink);
			localStorage.setItem("previewLink", data.articleLink);
			localStorage.setItem("previewSource", data.articleSource);
		}
		if (data.text == undefined) {
			localStorage.setItem("previewTitle", data.articleTitle);
			localStorage.setItem("previewText", "");
			localStorage.setItem("previewartic", "");
			localStorage.setItem("previewdec", "");
			localStorage.setItem("previewdec", "");
			localStorage.setItem("previewType", data.type);
			localStorage.setItem("previewTag", tagsName);
		} else {
			localStorage.setItem("previewTitle", data.articleTitle);
			localStorage.setItem("previewText", data.text.txt.html());
			localStorage.setItem("previewartic", data.artic);
			localStorage.setItem("previewType", data.type);
			localStorage.setItem("previewdec", data.text.txt.text().substring(0, 30));
			localStorage.setItem("previewTag", tagsName);
		}
		window.open('/#/preview')
	}
	//console.log(secondC[sec])
	var Item = ['1', '2', '3', '4', '5']
	//标签校验
	function tagValue1(rule, value, callback) {
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
		// console.log(value)
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
					//console.log(value,arr[i])
					callback("标签不能重复")
				}
			}
			callback()
		}
	}
	function tagValue3(rule, value, callback) {
		var arr = [];
		var len = 0;

		const data = { ...getFieldsValue(['tag1', 'tag2', 'tag4', 'tag5']) }
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
	function tagValue4(rule, value, callback) {

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
		var arr = [];
		var len = 0;
		const data = { ...getFieldsValue(['tag1', 'tag3', 'tag4', 'tag2']) }
		arr.push(data.tag1, data.tag2, data.tag4, data.tag3, )
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


	//验证标题
	//console.log("SensitiveWords", titleWords)

	function titleChage(rule, value, callback) {
		if (titleWords != null && value != '') {
			var titleWords = titleWords.split(',')
			for (var i in titleWords) {
				if (value.indexof(titleWords[i]) != '-1') {
					callback('检测到标题的敏感词：' + titleWords[i])
				} else {
					callback()
				}
			}
		} else {
			callback();
		}

	}
	function handleNumberChange(e) {
		const { value } = e.target;

		const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			//console.log(value)
			return
		}
	}
	// var time1 = setInterval(publish(),60000)
	//var time2 =setInterval(publish(),10000)
	function handleFocus() {

		if (saveId != undefined && saveId != 0) {
			return
		} else {
			aoSave()
		}

		// time1()
	}

	//存草稿
	function publish(list) {

		dispatch({
			type: "content/publishSave",
			payload: {
				list: list,
				autoSaveInterval: autoSaveInterval,
				aoSave: aoSave
			}
		})
	}
	if (saveId != undefined && saveId != 0) {
		//console.log(autoSaveInterval)
		window.clearInterval(autoSaveInterval);
		//console.log(autoSaveInterval)
		autoSaveInterval = window.setInterval(function () {

			aoSave();
		}, 10000);
	}
	function aoSave(id) {

		window.clearInterval(autoSaveInterval);
		const data = { ...getFieldsValue() };
		if (data.articleTitle == "" || data.articleTitle == undefined) {
			return
		}
		let columnId = null;
		let secondColumn = null;
		if (data.column == undefined) {
			columnId = null;
			secondColumn = null;
		} else {
			if (data.column[1] == undefined) {
				secondColumn == null;
				columnId = data.column[0]
			} else {
				columnId = data.column[0]
				secondColumn = data.column[1]
			}
		}
		var tagsName = "";
		if (data.tag1 == undefined) {
			tagsName = "";
		} else if (data.tag1 == !undefined && data.tag2 == undefined) {
			tagsName = data.tag1;
		} else if (data.tag1 == !undefined && data.tag2 !== undefined && data.tag3 == undefined) {
			tagsName = data.tag1 + ',' + data.tag2
		}
		else if (data.tag4 == undefined && data.tag5 == undefined) {
			tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
		} else if (data.tag4 != undefined && data.tag5 == undefined) {
			tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
		} else if (data.tag4 != undefined && data.tag5 != undefined) {
			tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
		}
		let list = {
			"articleTitle": data.articleTitle,
			"articleText": data.text != undefined ? data.text.txt.html() : '',
			"articleId": (saveId != undefined || saveId != "") ? saveId : "",
			"tagnames": tagsName,
			description: data.artic,
			image: imgUrl,
			type: parseInt(data.type),
			columnId: columnId,
			secondColumn: secondColumn,
			displayStatus: parseInt(data.radioT),
			displayOrder: parseInt(data.sort),
			articleSource: data.articleSource,
			articleLink: data.articleLink,
			commentSet: data.commentSet != undefined ? (data.commentSet == "true" ? true : false) : null,
			publishSet: '0',
			sysUser: merId,
			bonusStatus: parseInt(data.bonusStatus),
			publishStatus: 0,
			textnum: data.text != undefined ? data.text.txt.text().split('&nbsp;').join('').length : '',
			browseNum: data.browseNum,
			thumbupNum: data.thumbupNum,
			collectNum: data.collectNum,
			ifPlatformPublishAward: data.ifPlatformPublishAward,
			ifPush: ifPushValue,
			articleImgSize: data.articleImgSize

		}
		publish(list, autoSaveInterval)
	}
	function checkout() {

	}
	function titleValue(e) {
		//console.log((e.target.value).length);

		titleNum = (e.target.value).length
		// /console.log(titleValue)
	}

	//是否推送
	const ifPushChange = (e) => {
		//console.log(e.target.value)

		//获取今日推送的条数
		dispatch({
			type: "content/getPushAticleInfo"
		})
		let val = e.target.value;
		//比较今天推送的条数和限制的条数
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
	//图片大小
	function imgSizeChange(e) {
		var val = e.target.value;  //1是小图；2是大图

		dispatch({
			type: 'content/imgSizeChange',
			payload: {
				imgSize: val
			}
		})
	}

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
				if (imgWidth < 365 ) {
					message.warning('上传图片最小尺寸为365*200px')
				} else if(imgHeight < 200){
					message.warning('上传图片最小尺寸为365*200px')
				} else {
					docobj.setAttribute('type','text');
					dispatch({
						type: 'content/hideBgModal',
						payload: {
							activeImg: coverImg,
							imgtype:'image'
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
	function imgupload2(e) {
		var docobj = document.getElementById("uploadInput2");
		var fileList = docobj.files[0];
		//现在图片文件大小
		var imgSize = fileList.size;
		console.log(imgSize);
		if (imgSize > 2 * 1024 * 1024) {
			message.error('上传的图片的大于2M,请重新选择');
			docobj.val('')
			return false;
		}
		//将图片文件转换为base64
		var coverImg = "";
		var reader = new FileReader();
		reader.onload = function () {
			coverImg = reader.result;
			dispatch({
				type: 'content/hideBgModal',
				payload: {
					activeImg: coverImg
				}
			})
		}
		reader.readAsDataURL(fileList)
		dispatch({
			type: 'content/hideBgModal',
			payload: {
				activeImg: coverImg
			}
		})
		dispatch({
			type: 'content/showfpModal',
			payload: {

			}
		})
	}
	return (
		<Form>
			<FormItem label="文章标题" {...formItemLayout}>
				{getFieldDecorator('articleTitle', {
					rules: [{
						type: 'string',
						message: '文章标题1-64个字符,支持中英文及特殊符号，空格，不区分大小写',
						min: 1,
						max: 64,

					}, {
						required: true, message: '请输入标题!',
					}, {
						validator: titleChage
					}
					],
				})(
					<Input type="text" placeholder="输入标题" style={{ width: '50%' }} onBlur={handleFocus} />
				)}

				<span style={{ marginLeft: 20 }} className={styles.pre}>1-64个字符,支持中英文及特殊符号，空格，不区分大小写</span>
			</FormItem>
			{(saveId != undefined && saveId != 0) ? <span className={styles.zidong}>自动保存中<Icon type="clock-circle-o" /></span> : null
			}
			<FormItem
				{...formItemLayout} label="正文"
				className={styles.editorText}
			>
				{getFieldDecorator('text', {
					rules: [
						{ required: true, message: '请输入正文!' },
						{ type: "object", validator: onChange }
					],
					trigger: 'edtiorContent'
				})(
					<Editor edtiorContent={edtiorContent} edtiorContentText={edtiorContentText} style={{ textAlign: 'left' }} checkout={checkout} SensitiveWords={SensitiveWords} />
				)}

			</FormItem>
			<Row key='2' type="flex" justify="start"  >
				<Col style={{ marginLeft: '130px' }} >
					<span className={styles.tagLabel}><span style={{ color: '#f5222d' }}>*</span>TAG标签：</span>
				</Col>
				<Col style={{ marginRight: '15px' }}>

					<FormItem
						extra="至少输入3个tag"
					>
						{getFieldDecorator('tag1', {
							rules: [
								{
									required: true,
									message: '请输入标签!',

								}, {
									validator: tagValue1
								}],
						})(
							<Input style={{ width: '140px', marginRight: '20px' }} />
						)}

					</FormItem>
				</Col>
				<Col style={{ marginRight: '55px' }}>
					<FormItem  >
						{getFieldDecorator('tag2', {

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
					<FormItem  >
						{getFieldDecorator('tag3', {

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
					<FormItem  >
						{getFieldDecorator('tag4', {

							rules: [{
								required: false
							}, {
								validator: tagValue4
							}],
						})(
							<Input style={{ width: '140px', }} />
						)}

					</FormItem>
				</Col>
				<Col style={{ marginRight: '55px' }}>
					<FormItem >
						{getFieldDecorator('tag5', {

							rules: [{
								required: false,

							}, {
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
					initialValue: '',
					rules: [{ required: false, min: 10, max: 100, message: '摘要10-100字,支持中英文,数字，符号，不区分大小写!' }],
				})(
					<TextArea style={{ minHeight: "200px", width: "80%" }} placeholder="选填，若未填写会默认抓取正文前100字"></TextArea>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label={<span>封面图</span>}

			>
				{getFieldDecorator('articleImgSize', {
					initialValue: '1',
					rules: [{ required: true, message: '请选择封面图!' },
					]
				})(
					<RadioGroup onChange={imgSizeChange}>
						<Radio value="1">小图资讯</Radio>
						<Radio value="2" disabled={flag}>大图资讯</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{imgSize == "1" ? <FormItem
				{...formItemLayout}
				label="&emsp;"
				colon={false}
				extra="找不到合适的图片？您可以用以下任一张图作为封面图"
			>
				<div className={styles.smallBox}>
					{imgUrl == "" ? <div className={styles.ImgNoneBox}><Icon type="plus" /></div> : <img src={uploadUrl + imgUrl} className={styles.smallImg} />
					}
					<input id='uploadInput1' className={styles.uploadCoverImg} type='file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
						onChange={imgupload} />
				</div>
			</FormItem> : <FormItem
				{...formItemLayout}
				label="&emsp;"
				colon={false}
			>
					<div className={styles.bgImgBox}>
						{imgUrl == "" ? <div className={styles.bgImg}> <Icon type="plus" /></div> : <img src={uploadUrl + imgUrl} className={styles.bgImg} />}
					</div>
				</FormItem>}
			{imgSize == "1" ? <FormItem
				{...formLayout}
				label="&emsp;"
				colon={false}
			>
				<div >
					{imgArr.map((item, index) =>
						<img key={index} onClick={() => uploadImg(item)} src={item} className={styles.Imgx} />
					)}

				</div>
			</FormItem> : null}
			<FormItem
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
			</FormItem>
			{artSorce == 2 ? <FormItem
				{...formItemLayout}
				label="文章来源"
			>
				{getFieldDecorator('articleSource', {
					initialValue: "",
					rules: [{ required: true, message: '请填写转载文章来源!' },
					{ min: 1, max: 500, message: "不超过500字符" }
					],
				})(
					<Input style={{ width: "60%" }} />
				)}

			</FormItem> : null}
			{artSorce == 2 ? <FormItem
				{...formItemLayout}
				label="原文链接"
			>
				{getFieldDecorator('articleLink', {
					initialValue: "",
					rules: [{ required: true, message: '请填写转载文章来源链接地址!', },
					{ min: 1, max: 500, message: "不超过500字符" }
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
					rules: [
						{ required: true, message: '请选择文章栏目!' },
					],
				})(
					<Cascader options={options} placeholder="请选择文章栏目" style={{ width: "20%" }} changeOnSelect />
				)}


			</FormItem>
			<FormItem
				{...formItemLayout}
				label="显示设置"
				colon={true}
			>
				{getFieldDecorator('radioT', {
					initialValue: '1',
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
					initialValue: '0',
					rules: [
						{ required: false, message: '请输入0以上的正整数', pattern: /^[0-9]\d*$/ },
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
					initialValue: 0,
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
					initialValue: 0,
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
					initialValue: 0,
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
					initialValue: 'true',
					rules: [{ required: true, }],
				})(
					<RadioGroup >
						<Radio value="true">开启</Radio>
						<Radio value="false">不开启</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="定时发布"
			>
				{getFieldDecorator('radioG', {
					initialValue: '0',
					rules: [{ required: true, }],
				})(
					<RadioGroup onChange={handleTime}>
						<Radio value="1">开启定时发布</Radio>
						<Radio value="0">不开启</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{timeDis == 1 && <FormItem
				{...formItemLayout}
				label=" " colon={false}
				extra="定时范围：从当前时间点开始至未来7天内，按自然日计算"
			>
				{getFieldDecorator('time', {
					rules: [
						{ required: true, message: "请选择时间", },
					],
				})(
					<DatePicker
						format="YYYY-MM-DD HH:mm"
						disabledDate={disabledDate}
						// disabledTime={disabledDateTime}
						showTime={{ defaultValue: moment('00:00', 'HH:mm'), format: "HH:mm" }}
						size="large"
					/*disabled={timeDis}*/
					/>
				)}
			</FormItem>}

			<FormItem
				{...formItemLayout}
				label="发布人"
				extra='注：若该文章为用户发布，则此处不可更改;若无关联前台发布人，请前往系统账户管理设置中关联。'
			>
				{getFieldDecorator('createUser', {
					rules: [
						{ required: true, message: "请选择关联账户", },
					],
				})(
					<Select placeholder="请选择前台账号" style={{ width: "20%" }}>
						{getRelUserList && getRelUserList.map((item, index) =>
							<Option value={item.kgUserId + ""} key={index}>{item.kgUsername}</Option>
						)}
					</Select>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="文章打赏"
				extra="提示：若您想设置阅读奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
			>
				{getFieldDecorator('bonusStatus', {
					initialValue: '1',
					rules: [
						{ required: true, message: '请选择' },
					],
				})(
					<RadioGroup>
						<Radio value='1'>开启</Radio>
						<Radio value='0'>不开启</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label={<span><span style={{ color: "#f00" }}>*</span>是否推送</span>}
				extra="提示：选择需要推送，此篇资讯将推送至用户APP通知栏，推送不可撤回，请注意控制每日推送数量。"
			>
				{/* {getFieldDecorator('ifPush', {
					initialValue: ifPushValue&&ifPushValue,
					rules: [
						{ required: true, message: '请选择' },
					],
				})( */}
				<RadioGroup onChange={ifPushChange} defaultValue={ifPushValue && ifPushValue} value={ifPushValue && ifPushValue}>
					<Radio value='0'>暂时不推送</Radio>
					<Radio value='1'>需要推送</Radio>
				</RadioGroup>
				{/* )} */}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="是否发送基础发文奖励"
			>
				{getFieldDecorator('ifPlatformPublishAward', {
					initialValue: '1',
					rules: [
						{ required: true, message: '请选择' },
					],
				})(
					<RadioGroup>
						<Radio value='1'>发送</Radio>
						<Radio value='0'>不发送</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem  {...formItemLayout} label="&nbsp;" colon={false}>
				<Button type="primary" onClick={handleSubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20 }} disabled={loading}>发布</Button>
				<Button type="primary" style={{ marginLeft: 30 }} size="large" onClick={publishStatus} className={timeDis == 0 ? styles.draft : ''} disabled={(timeDis == 1 ? true : false) || loading}>存草稿</Button>
				<Button type="primary" style={{ marginLeft: 30 }} size="large" onClick={() => previewPage()} className={styles.preview}>预览</Button>
				<Button style={{ marginLeft: 30 }} size="large" onClick={() => history.back()} >返回</Button>
				<RelationModal {...RelationModalProps} />
			</FormItem>
		</Form>
	)
}

export default Form.create()(RelesEditor);
