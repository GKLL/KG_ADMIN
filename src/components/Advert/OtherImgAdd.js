import React from 'react';
import { Button, Icon, Form, Input, Radio, Select, Row, Col, Cascader, message, Upload,Modal } from 'antd';
import { uploadUrl, ImgUrl, residences, keWordList } from "../../services/common"
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import styles from './index.css'
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};

const Content_ImageAdd_Modal = ({
	imageUrl,
	confirmLoading,
	uploading,
	selectValue,
	dispatch,
	onCancel,
	onOk,
	visible,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {


	//上传图片按钮状态
	const uploadButton = (
		<div className={styles.imgBox}>
			<Icon type={uploading ? 'loading' : 'plus'} />

		</div>
	);
	//上传图片之前得校验
	function beforeUpload(file) {
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
	function handleImgChange(info) {
		if (info.file.status === 'uploading') {
			dispatch({
				type: 'advert/uploading',
				payload: {
					uploading: true
				}
			})
			return;
		}
		if (info.file.status === 'done') {
			//图片上传返回response
			var img_url = info.file.response;
			if (img_url.errorCode == "10000") {
				//图片上传成功
				dispatch({
					type: 'advert/imgurlChange',
					payload: {
						imageUrl: img_url.data[0].filePath,
						uploading: false
					}
				})
			} else {
				//上传失败返回错误信息
				dispatch({
					type: 'advert/uploading',
					payload: {
						uploading: false
					}
				})
				message.error(img_url.errorMsg)
			}

		}
	}

	//修改图片类型
	function ImgtypeChange(val) {
		
		dispatch({
			type: "advert/ImgtypeChange",
			payload: {
				selectValue: val
			}
		})
	}
	let merId = localStorage.getItem("userId");
	
	function afterClose(){
		resetFields()
	}
	const modalOpts = {
		title: "添加图片",
		visible,
		onOk: handleOk,
		onCancel: onCancel,
		maskClosable: false,
		width:600,
		destroyOnClose:true,
		afterClose:afterClose,
		confirmLoading:confirmLoading
	};
	function handleOk(){
		validateFields((err, fieldsValue) => {
			if (!err) {
				fieldsValue.navigatorPos =fieldsValue.residence[0];
				fieldsValue.imagePos =fieldsValue.residence[1];
				fieldsValue.imageAddress = imageUrl ==''?null:imageUrl
				if(fieldsValue.imageType ==1) {
				    fieldsValue.imageDetail = fieldsValue.imagetitle
				}else {
					fieldsValue.imageDetail = fieldsValue.imageDetail
				}
				const data = {
					createUser: merId,
					...fieldsValue
				}
				onOk(data)
			}
		})
		// onOk()
	}
	return (
		<Modal {...modalOpts}>
			<Form>
				<FormItem label="上传图片" {...formItemLayout} >
					{getFieldDecorator('imageAddress', {
						rules: [{
							required: true, message: '请上传图片'
						}
						],
					})(
						<Upload
							name="file"
							className="avatar-uploader"
							showUploadList={false}
							action={ImgUrl}
							beforeUpload={beforeUpload}
							onChange={handleImgChange}
						>
							{imageUrl ? <img src={uploadUrl + imageUrl} alt="news" className={styles.imgBox} /> : uploadButton}
						</Upload>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="类型" >
					{getFieldDecorator('imageType', {
						initialValue: '1',
						rules: [
							{ required: true, message: '请选择类型' },
						],
					})(
						<Select onChange={ImgtypeChange} style={{ width: '350px' }}>
							<Option value="1">资讯</Option>
							<Option value="3">其他</Option>
							<Option value="4">活动</Option>
						</Select>

					)}
				</FormItem>
				{selectValue == "1" ? <FormItem {...formItemLayout} label="文章ID" >
					{getFieldDecorator('imagetitle', {
						initialValue: '',
						rules: [
							{ required: true, message: "请输入文章ID" },
							{ type: "string", min: 1, message: "文章ID必须为数字", pattern: /^[0-9]*$/ }
						],
					})(
						<Input placeholder="请输入文章ID" style={{ width: '350px' }}/>
					)}
				</FormItem> : <FormItem {...formItemLayout} label="链接地址">
						{getFieldDecorator('imageDetail', {
							initialValue: '',
							rules: [
								{ required: true, message: "请输入链接地址" },
								{
									type:'url',message:'请输入http://或者https://协议'
								}
							],
						})(
							<Input placeholder="请输入链接地址"  style={{ width: '350px' }}/>
						)}
					</FormItem>}
				<FormItem
					{...formItemLayout}
					label="显示位置"
				>
					{getFieldDecorator('residence', {
						rules: [{ type: 'array', required: true, message: '请选择!' }],

					})(
						<Cascader options={residences} placeholder="请选择"  style={{ width: '350px' }}/>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="显示状态" >
					{getFieldDecorator('imageStatus', {
						initialValue: "1",
						rules: [
							{ required: true, message: '请选择显示状态' },
						],
					})(
						<RadioGroup>
							<Radio value="1">显示</Radio>
							<Radio value="0">隐藏</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="排序">
					{getFieldDecorator('imageOrder', {
						initialValue: '0',
						rules: [{
							required: false, message: '请输入0以上的正整数', pattern: /^[0-9]\d*$/
						}]
					})(
						<Input style={{ width: '100px' }} />
					)}
				</FormItem>
				
			</Form>
		</Modal>
	);
};


export default Form.create()(Content_ImageAdd_Modal);