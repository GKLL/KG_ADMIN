import React, {
	Component,
	PropTypes
} from 'react';
import {

	routerRedux,

} from 'dva/router';
import { Form, Icon, Input, Button, Badge, Checkbox, Select, Tag, Row, Col, Upload, InputNumber, Radio, Cascader, DatePicker, TimePicker, message, Modal } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import styles from './Content_Opinion_Show.css';
import Editor from '../../editor/index';
import { options, uploadUrl, ImgUrl, formatDate } from "../../services/common"
import E from 'wangeditor';
import $ from 'jquery';
import RelationModal from '../Setting/RelationUser';
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
const confirm = Modal.confirm;
const Option = Select.Option;
let artSorce = 0;
let timeDis = true;
let sec = 0;
let titleNum = 0;
var n = 5000;
var x = 5000;
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
	uploadImg,
	getBonusList,
	status_Article,
	ifPushValue,
	PushAticleInfo,
	loading,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) {
	let merId = localStorage.getItem("userId");
	let articleList = JSON.parse(localStorage.getItem("articleList"));
	const imgArr = [imgx, imgy, imgz, imgw,imga,imgb,imgc,imgd];  //默认背景图；
	const options = ColumnList;
	//console.log(status_Article)
	const { RelationVisible, getRelUserList } = setting;
	let AllTotal = 0;

	function handleSubmit() {
		validateFields((errors, fieldsValue) => {
			if (errors) {
				return;
			} else {
			
				const data = { ...getFieldsValue() };
				//console.log(data.text);
				var dd = (data.text).replace(/<\/?.+?>/g, "");
				var dds = dd.replace(/ /g, "");//dds为得到后的内容
				let CX = dds.split('&nbsp;');

				var lg = CX.join('');
				lg = lg.replace(/^@font.*Section0;}$/g, '')
				lg = lg.replace(/{[^{]*(?=})/g, "");
				lg = lg.replace(/{[^@]*(?=})/g, "");
				lg = lg.replace(/\s+/g, "")
				lg = lg.replace(/<\/?.+?>/g, "");
				lg = lg.replace(/[\r\n]/g, "");
				//console.log(lg)
				//console.log("文章字数", lg.length)
				if (lg.length > 30000) {
					message.error('文章内容不能超过30000字');
					return true
				}
				// if(imgUrl == ""||data.image==""){
				//   message.error('请上传封面图')
				//   return true
				// }
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
				dispatch({
					type: 'content/publishHomeArticle',
					payload: {
						articleId: ArticleList.articleId,
						articleTitle: data.articleTitle,
						articleText: data.text,
						tagnames: tagsName,
						description: (data.artic == undefined || data.artic == "") ? lg.substring(0, 100) : data.artic,
						image: imgUrl == '' ? data.image : imgUrl,
						type: parseInt(data.type),
						columnId: data.publishStatus == 1?parseInt(data.column[0]):null,
						secondColumn: data.publishStatus == 1?parseInt(data.column[1]):null,
						displayStatus: parseInt(data.radioT),
						displayOrder: parseInt(data.sort),
						commentSet: data.commentSet == "true" ? true : false,
						publishSet: parseInt(data.radioG),
						createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
						bonusStatus: parseInt(data.bonusStatus),
						articleSource: data.articleSource,
						articleLink: data.articleLink,
						publishStatus: parseInt(data.publishStatus),
						textnum: lg.length,
						browseNum: data.browseNum,
						thumbupNum: data.thumbupNum,
						collectNum: data.collectNum,
						editArticle: editArticle,
						ifPush:ifPushValue,
						ifPlatformPublishAward:data.ifPlatformPublishAward,
						auditUser:merId,
						refuseReason:data.publishStatus == 1?null:data.refuseReason
					}
				})
				

			}
		})
	}
	if (imgUrl != "") {
		ArticleList.articleImage = imgUrl
	}

	function pubsubmit() {
		validateFields((errors) => {
			if (errors) {
				return;
			} else {
				const data = { ...getFieldsValue() };
				//console.log(data.text);
				var dd = (data.text).replace(/<\/?.+?>/g, "");
				var dds = dd.replace(/ /g, "");//dds为得到后的内容
				//console.log(dds.lengthgvfdg)
				let CX = dds.split('&nbsp;')

				var lg = CX.join('');

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
				let editArticle = 0;
				const title = data.articleTitle;
				if (title != ArticleList.articleTitle) {
					editArticle = 1
				} else {
					editArticle = 0
				}
				dispatch({
					type: 'content/publishHomeArticle',
					payload: {
						articleId: ArticleList.articleId,
						articleTitle: data.articleTitle,
						articleText: data.text,
						tagnames: tagsName,
						description: (data.artic == undefined || data.artic == "") ? lg.substring(0, 100) : data.artic,
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
						textnum: lg.length,
						browseNum: data.browseNum,
						thumbupNum: data.thumbupNum,
						collectNum: data.collectNum,
						editArticle: editArticle
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
	function edtiorContent(html) {
		return html
	}
	function edtiorContentText(html) {

		return html
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
		//value = e.target.value;
		dispatch({
			type:'content/statusChange',
			payload:{
				status_Article:parseInt(e.target.value)
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
	function ImgHandle(src) {
		//console.log("src",src)
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

	//是否推送
	const ifPushChange = (e) => {
		//获取今日推送的条数
		dispatch({
			type:"content/getPushAticleInfo"
		})
		let val = e.target.value;
		if(PushAticleInfo.pushArticleNumber >= PushAticleInfo.pushArticleLimit){
			if(val == 1){
				confirm({
					title:'确定推送吗?',
					content:(<div>
						今日已推送<span style={{color:'#f00'}}>{PushAticleInfo.pushArticleNumber}</span>篇文章给用户，再推送比较影响用户体验，是否继续推送?
					</div>),
					okText: '是',
					cancelText:'否',
					onOk() {
						//console.log(values,record)
						dispatch({
							type:'content/ifPushValue',
							payload:{
								ifPushValue:'1'
							}
						})
					},
					onCancel() {
						// ifPushValue = "0"
						dispatch({
							type:'content/ifPushValue',
							payload:{
								ifPushValue:'0'
							}
						})
					},
				})
			}else{
				dispatch({
					type:'content/ifPushValue',
					payload:{
						ifPushValue:'0'
					}
				})
			}
		}else{
			dispatch({
				type:'content/ifPushValue',
				payload:{
					ifPushValue:val
				}
			})
		}	
		
	}
	//预览文章
	const previewPage =()=>{
		const data = { ...getFieldsValue() };
		// console.log(data)
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

		if(data.type=="2"){
			localStorage.setItem("previewType", data.articleLink);
			localStorage.setItem("previewLink", data.articleLink);
			localStorage.setItem("previewSource", data.articleSource);
		}
		    localStorage.setItem("previewTitle", data.articleTitle);
			localStorage.setItem("previewText", data.text);
			localStorage.setItem("previewartic", "");
			localStorage.setItem("previewdec", data.artic);
			localStorage.setItem("previewType", data.type);
			localStorage.setItem("previewTag", tagsName);
		
		window.open('/#/preview')
	}
	return (
		<Form >
			<FormItem label="文章标题" {...formItemLayout}>
				{getFieldDecorator('articleTitle', {
					initialValue: ArticleList.articleTitle,
					rules: [{
						type: 'string',
						message: '文章标题1-64个字符,支持中英文及特殊符号，空格，不区分大小写',
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
			<FormItem {...formItemLayout} label="正文">
				{getFieldDecorator('text', {
					initialValue: ArticleList.articleText,
					rules: [
						{ required: true, message: '请输入正文!' },
					],
					trigger: 'edtiorContentText'
				})(
					<Editor edtiorContent={edtiorContent} edtiorContentText={edtiorContentText} checkout={checkout} />
				)}

			</FormItem>
			<Row key='2' type="flex" justify="start" >
				<Col  style={{ marginLeft: '130px' }} >
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
					rules: [{ required: false, min: 10, max: 100, message: '摘要10-100字,支持中英文,数字，符号，不区分大小写!' }],
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
					<div>
						{ArticleList.articleImage == "" ? <div className={styles.bgImg} onClick={showModal}> <Icon type="plus" /></div> :
							<img onClick={showModal} src={imgUrl == "" ? uploadUrl + ArticleList.articleImage : uploadUrl + imgUrl} className={styles.bgImg} onChange={ImgHandle} />
						}
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
					initialValue: ArticleList.columnId != null ? [ArticleList.columnId, ArticleList.secondColumn] : [],
					rules: [
						{ required: status_Article==1?true:false, message: '请选择文章栏目!' },
						{ type: 'array' }
					],
				})(
					<Cascader options={options} placeholder="请选择文章栏目" style={{ width: '20%' }} />
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
						{ required: false, message:'请输入0以上的正整数',pattern:/^[0-9]\d*$/},
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
			<FormItem
				{...formItemLayout}
				label="定时发布"
			>
				{getFieldDecorator('radioG', {
					initialValue: ArticleList.publishSet + '',
					rules: [{ required: true, }],
				})(
					<RadioGroup onChange={handleTime} disabled={(ArticleList.publishStatus != undefined && ArticleList.publishStatus == 0) ? false : true}>
						<Radio value="1">开启定时发布</Radio>
						<Radio value="0">不开启</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{(ArticleList && ArticleList.publishSet == 1) && <FormItem
				{...formItemLayout}
				label=" " colon={false}
				extra="定时范围：从当前时间点开始至未来7天内，按自然日计算"
			>
				{getFieldDecorator('time', {
					initialValue: ArticleList.publishTime == null ? "" : moment(formatDate(ArticleList.publishTime), "YYYY-MM-DD HH:mm:ss"),
					rules: [
						{ required: true, message: "请选择时间", },
					],
				})(
					<DatePicker
						format="YYYY-MM-DD HH:mm"
						disabledDate={disabledDate}
						/*disabledTime={disabledDateTime}*/
						showTime={{ defaultValue: moment('00:00', 'HH:mm'), format: 'HH:mm' }}
						size="large"
					/*disabled={timeDis}*/
					/>
				)}
			</FormItem>}
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
				label="文章打赏"
				extra="提示：若您想设置阅读奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
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
			{ArticleList.sysUser == null ? (getBonusList != undefined && getBonusList.length != 0) ? <FormItem label="阅读奖励" {...formItemLayout}>
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
								最大奖励{item.max}人,{item.kind == 1 && <span>合计发放:{(item.total).toFixed(3)}钛值</span>}
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
						总计发放：{AllTotal && AllTotal.toFixed(3)}个
                      </Col>
				</Row>
			</FormItem> : <FormItem {...formItemLayout} label="阅读奖励">该文章暂无设置阅读奖励</FormItem> : null}
			<FormItem
				{...formItemLayout}
				label={<span><span style={{color:"#f00"}}>*</span>是否推送</span>}
				extra="提示：选择需要推送，此篇资讯将推送至用户APP通知栏，推送不可撤回，请注意控制每日推送数量。"
			    >
					<RadioGroup onChange={ifPushChange} defaultValue={ifPushValue&&ifPushValue} value={ifPushValue&&ifPushValue}>
						<Radio value='0'>暂时不推送</Radio>
						<Radio value='1'>需要推送</Radio>
					</RadioGroup>
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
					<RadioGroup >
						<Radio value="1">发送</Radio>
						<Radio value="0">不发送</Radio>

					</RadioGroup>
				)}
			</FormItem>

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
					<TextArea style={{ width: "100%", minHeight: "100px" }} placeholder="不通过原因(选填)" disabled={status_Article == 3 ? false : true
					} />
				)}
			</FormItem> : null}

			<FormItem {...formItemLayout} label="&nbsp;" colon={false}>
				<Button type="primary" onClick={handleSubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20 }} loading={loading}>保存</Button>
				{(ArticleList && ArticleList.publishStatus == 0) &&
					<Button type="primary" onClick={pubsubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20, marginLeft: 30 }}>发布</Button>
				}
				<Button  type="primary"   onClick={()=>previewPage()}  size="large"  className={styles.preview} style={{ paddingLeft: 20, paddingRight: 20,marginLeft: 30 }}>预览</Button>
				<Button  style={{ marginLeft: 30 }} size="large" onClick={() => history.back()} >返回</Button>
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