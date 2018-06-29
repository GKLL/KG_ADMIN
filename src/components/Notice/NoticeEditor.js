/*
 * @Author: guokang 
 * @Date: 2018-05-21 16:53:49 
 * @Last Modified by: guokang
 * @Last Modified time: 2018-06-05 14:18:04
 */


import React, {Component,PropTypes} from 'react';
import {routerRedux,} from 'dva/router';
import { Form, Icon, Input, Button, Upload, InputNumber, Radio, message, Modal,Select,Cascader,Tag } from 'antd';
import Editor from '../../editor/index';
const FormItem = Form.Item;
const { TextArea } = Input;
// import styles from './index.css'
const RadioGroup = Radio.Group;
const { CheckableTag } = Tag;
const Option = Select.Option;
function NewsAdd({
	dispatch,
	item,
	confirmLoading:confirmLoading,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) {
	
	let merId = localStorage.getItem("userId");
	//是否推送
	const formItemLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 16 },
	};

	function edtiorContent(html){
		return html
	}

	//编辑器内容
	function edtiorContentText(html){
		return html
	}

	//编辑器内容验证

	function onChange(rule, value, callback) {

		if (value == undefined) {
			callback()
		} else {
			var arr = [];

			var dd = value.replace(/<\/?.+?>/g, "");
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
			//console.log(html)

			console.log(lg.length)
			if (value == "") {
				callback('请输入正文')
			}else if(value == '<p><br></p>'){
				callback('请输入正文')
			} else if(lg.length>5000){
				callback('字数限制在5000')
			}else {
				callback()
			}
		}
	}
	//点击编辑公告
	function onSubmit(){
		validateFields((err, fieldsValue) => {
			if (!err) {
				const data = {
					id:item.id,
					userId:merId,
					...fieldsValue
				}
				console.log(data)
				dispatch({
					type:'notice/updateNotice',
					payload:{
						...data
					}
				})
			}
		})
	}
	return (
		<Form>
			<FormItem label="公告标题" {...formItemLayout}>
				{getFieldDecorator('title', {
					initialValue:item&&item.title,
					rules: [{
						required: true,message:'请输入公告标题',
					},{
						type: 'string',
						message: '公告标题1-64个字符,支持中英文及特殊符号，空格，不区分大小写',
						min: 1,
						max: 64,
					}
					],
				})(
					<Input type="text" placeholder="请输入公告标题" style={{ width: '70%' }} />
				)}
				<span style={{ color: "#aaa", marginLeft: 20 }}>1-64个字符</span>
			</FormItem>
			<FormItem {...formItemLayout} label="公告正文">
				{getFieldDecorator('info', {
					initialValue:item&&item.info,
					rules: [
						{ required: true, message: '请输入公告正文!' },
						{ type: "object", validator: onChange }
					],
					trigger: 'edtiorContentText'
				})(
					<Editor edtiorContent={edtiorContent} edtiorContentText={edtiorContentText} />
				)}
			</FormItem>
			<FormItem label="&emsp;" {...formItemLayout} colon={false}>
			    <Button type="primary" size="large" style={{ paddingLeft: 20, paddingRight: 20 }} onClick={()=>onSubmit()} loading={confirmLoading}>保存</Button>
				<Button size="large" style={{ paddingLeft: 20, paddingRight: 20,marginLeft: 30 }} onClick={()=>history.back()}>返回</Button>
			</FormItem>
		</Form>
	)
}

export default Form.create()(NewsAdd);

// extra="注：默认样式为信息流"
