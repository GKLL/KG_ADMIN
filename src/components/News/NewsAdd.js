/*
 * @Author: guokang 
 * @Date: 2018-05-21 16:53:49 
 * @Last Modified by: guokang
 * @Last Modified time: 2018-06-20 14:06:06
 */


import React, {Component,PropTypes} from 'react';
import {routerRedux,} from 'dva/router';
import { Form, Icon, Input, Button, Upload, InputNumber, Radio, message, Modal,Select } from 'antd';
import {uploadUrl,ImgUrl} from "../../services/common"
const FormItem = Form.Item;
const { TextArea } = Input;
import styles from './index.css'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const confirm = Modal.confirm;
function NewsAdd({
	dispatch,
	uploading,
	imageUrl,
	loading,
	NewsFlashTopMenus,
	PushNewsFlashInfo,
	ifPushValue,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) {
	let merId = localStorage.getItem("userId");
	
	const formItemLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 16 },
	};

	//是否推送
	const ifPushChange = (e) => {
		//获取今日推送的条数
		dispatch({
			type:"news/getPushNewsFlashInfo",
			payload:{}
		})
		
		let val = e.target.value;
	
		if(PushNewsFlashInfo.pushNewsFlashNumber >= PushNewsFlashInfo.pushNewsFlashLimit){
			if(val == 1){
				confirm({
					title:'确定推送吗?',
					content:(<div>
						今日已推送<span style={{color:'#f00'}}>{PushNewsFlashInfo.pushNewsFlashNumber}</span>篇快讯给用户，再推送比较影响用户体验，是否继续推送?
					</div>),
					okText: '确定',
					cancelText:'取消',
					onOk() {
					
						dispatch({
							type:'news/ifPushValue',
							payload:{
								ifPushValue:'1'
							}
						})
					},
					onCancel() {
						
						dispatch({
							type:'news/ifPushValue',
							payload:{
								ifPushValue:'0'
							}
						})
					},
				})
			}else{
				dispatch({
					type:'news/ifPushValue',
					payload:{
						ifPushValue:'0'
					}
				})
			}
		}else{
			dispatch({
				type:'news/ifPushValue',
				payload:{
					ifPushValue:val
				}
			})
		}	
		
	}	


	//上传图片按钮状态
	const uploadButton = (
		<div className={styles.imgBox}>
		  <Icon type={uploading ? 'loading' : 'plus'} />
		 
		</div>
	);

	//上传图片之前得校验
	function beforeUpload (file) {
		var isTrue = false;
		if (file.type === 'image/jpeg') {
		  isTrue = true
		} else if (file.type === 'image/png') {
		  isTrue = true
		} else {
		  message.error('图片仅支持jpg、png、jpeg')
		  isTrue = false
		  return false
		}
		const is2M = file.size / 1024 / 1024 < 2;
		// console.log('is2M', is2M)
		if (!is2M) {
			message.error('图片大小不超过2M');
		}
		return isTrue && is2M
	}
	//上传图片时候得回调
	function handleChange(info) {
		if (info.file.status === 'uploading') {
			dispatch({
				type:'news/uploading',
				payload:{
					uploading:true
				}
			})
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			var img_url = info.file.response;
			// dispatch({
			// 	type:'news/uploading',
			// 	payload:{
			// 		uploading:false
			// 	}
			// })
			dispatch({
				type:'news/imgurlChange',
				payload:{
					imageUrl:img_url.data[0].filePath,
					uploading:false
				}
			})
			
		}
	}

	//发布快讯
	function publishNews(){
		validateFields((err, fieldsValue) => {
			if(!err){
				
				fieldsValue.newsflashBottomImg = imageUrl
				const data = {
					createUser:merId,
					ifPush:ifPushValue,
					...fieldsValue
				}
				dispatch({
					type:"news/addNewsFlash",
					payload:{
						...data
					}
				})
			}
		})
	}

	const normFile = (e) => {
		//console.log('Upload event:', e);
		if (Array.isArray(e)) {
		  return e;
		}
		return e && e.fileList;
	  }
	return (
		<Form>
			<FormItem label="快讯标题" {...formItemLayout}>
				{getFieldDecorator('newsflashTitle', {
					rules: [{
						type: 'string',
						message: '请精简内容，更多内容可通过快讯内容呈现',
						min:1,
						max:40,
					}, {
						required: true, message: '请输入快讯标题!',
					}
					],
				})(
					<Input type="text" placeholder="请输入快讯标题" style={{ width: '70%' }} />
				)}
			</FormItem>
			<FormItem label="快讯内容" {...formItemLayout}>
				{getFieldDecorator('newsflashText', {
					rules: [{
						type: 'string',
						message: '请精简内容，更多内容可通过原文链接呈现',
						min: 1,
						max: 600,
					}, {
						required: true, message: '请输入快讯内容!',
					}
					],
				})(
					<TextArea  autosize placeholder="请输入快讯内容" style={{ width: '70%',minHeight:'200px'}} />
				)}
			</FormItem>
			<FormItem label="重要级别" {...formItemLayout} extra="标记为重要的快讯将在前端以红色字体展示">
				{getFieldDecorator('level', {
					initialValue:'0',
					rules: [{
						required: true, message: '请选择重要级别!',
					    }
					],
				})(
					<RadioGroup >
						<Radio value="1">重要</Radio>
						<Radio value="0">不重要</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem label="快讯分类" {...formItemLayout}>
				{getFieldDecorator('newsflashType', {
					rules: [{
						required: true, message: '请选择快讯分类!',
					}
					],
				})(
					<Select  style={{ width: 200 }} placeholder="请选择快讯分类">
						{NewsFlashTopMenus&&NewsFlashTopMenus.map(item=>{
							if(item.newsflashType==-1){
							}else{
								return(
								<Option key={item.newsflashType+''} value={item.newsflashType+''}>{item.remark}</Option>
							)
							}		
						}
						)}
						
					</Select>
				)}
			</FormItem>
			<FormItem label="原文链接" {...formItemLayout}>
				{getFieldDecorator('newsflashLink', {
					rules: [{
						required: false,
					}
					],
				})(
					<Input type="text" placeholder="请输入原文链接" style={{ width: '70%' }} />
				)}
			</FormItem>
			<FormItem label="快讯底图" {...formItemLayout} extra="上传快讯底图时，将替换快讯分享的底部图片,只能上传648*180尺寸的图片。">
				{getFieldDecorator('newsflashBottomImg', {
					valuePropName: 'fileList',
                    getValueFromEvent: normFile,
					rules: [{
						required: false,
					}
					],
				})(
					<Upload
						name="file"
					
						className="avatar-uploader"
						showUploadList={false}
						action={ImgUrl}
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{imageUrl ? <img src={uploadUrl+imageUrl} alt="news" className={styles.imgBox}/> : uploadButton}
					</Upload>
				)}
			</FormItem>
			<FormItem label="是否推送" {...formItemLayout}>
				
					<RadioGroup onChange={ifPushChange} defaultValue={ifPushValue&&ifPushValue} value={ifPushValue&&ifPushValue}>
						<Radio value="0">暂时不推送</Radio>
						<Radio value="1">需要推送</Radio>
					</RadioGroup>
			</FormItem>
			<FormItem label="显示状态" {...formItemLayout}>
				{getFieldDecorator('displayStatus', {
					initialValue:'1',
					rules: [ {
						required: true, message: '请选择!',
					}
					],
				})(
					<RadioGroup >
						<Radio value="1">显示</Radio>
						<Radio value="0">隐藏</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem label="&emsp;" {...formItemLayout} colon={false}>
			    <Button type="primary" size="large" style={{ paddingLeft: 20, paddingRight: 20 }} onClick={()=>publishNews()} loading={loading}>发布</Button>
				<Button size="large" style={{ paddingLeft: 20, paddingRight: 20,marginLeft: 30 }} onClick={()=>history.back()}>返回</Button>
			</FormItem>
		</Form>
	)
}

export default Form.create()(NewsAdd);
