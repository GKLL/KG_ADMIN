import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	Upload,
	Button,
	Icon
} from 'antd';
import {apkUrl} from '../../services/common';
import $ from 'jquery';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};
const confirm =Modal.confirm;
const AdduserModal = ({
	visible,
	item = {},
	PostList,
	onOk,
	onCancel,
	isSys,
	checkSysteme,
	loging,
	forcedChange,
	forcedVal,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields,
	},
}) => {
	//console.log("isSys",isSys)
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				...getFieldsValue(),
			}
			
			onOk(data);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function afterClose(){
		resetFields()
	}
	const modalOpts = {
		title: '新建版本',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"提交",
		cancelText:"取消",
		afterClose:afterClose,
		width:"50%",
		confirmLoading:loging

	};
	function onRemove(file){
		var title = "确认删除" + file.name + "吗？"
		const myConfirm = ({ title, content }) => new Promise((resolve, reject) =>
		  confirm({
			title: "确认删除" + file.name + "吗？",
			onOk() {
			var BTN = document.getElementById("BTN");
			BTN.innerText = '上传';	
			  resolve()
			},
			onCancel() {
			  reject()
			}
		  }))
		return myConfirm(title)
	}
	const props = {
		action: apkUrl,
		multiple: true,
		name: "file",
		accept: '.apk',
		onRemove: onRemove
	  };
	// function checkSysteme(e){
	// 	var value =e.target.value;
	// 	isSys = parseInt(value)
	// }
	function normFile(info){
		console.log('Upload event:', info);
			let fileList = info.fileList;
			// 1. Limit the number of uploaded files
			//    Only to show two recent uploaded files, and old ones will be replaced by the new
			fileList = fileList.slice(-1);
			// dispatch({
			// type: "content/fixdisabeld",
			// })
			if (info.file.status == "done") {
			if (info.file.response.errorCode == 10000) {
				fileList = fileList.map((file) => {
				if (file.response) {
					// Component will show file.url as link
					file.url = file.response.data[0].filePath
				}
				var BTN = document.getElementById("BTN");
				BTN.innerText = '重新上传';
				//icoType = "upload";
				// dispatch({
				// 	type: "content/falsedisabeld",
				// })
				return file;
				});
			}
			} else if (info.file.status == undefined) {
				var BTN = document.getElementById("BTN");
				BTN.innerText = '上传';
			// dispatch({
			// 	type: "content/falsedisabeld",
			// })
			return false
			}
        return fileList;
	};
	function checkSysteme(e) {
		var value = e.target.value;
		isSys = parseInt(value)
	}
	return (
		<Modal {...modalOpts}>
	        <Form>
				<FormItem
					label="版本号 "
					{...formItemLayout}
				>
					{getFieldDecorator('versionNum', {
						initialValue: '',
						rules: [
							{required: true, message: '请填写版本号'},
							{type: "string",max:20,min:1,message: '最多20个字符,仅数字、字母、标点'},
						],
					})(
						<Input type="text" prefix={<span>v</span> }/>
					)}
				</FormItem>
				<FormItem
					label="是否强制更新"
					{...formItemLayout}
				>
					{getFieldDecorator('forced', {
						initialValue: '1',
						rules: [
							{required: true, message: '请选择'}
						],
					})(
						<RadioGroup onChange={forcedChange}>
						    <Radio value="1">强制更新</Radio>
							<Radio value="0">非强制更新强提示</Radio>
						    <Radio value="-1">非强制更新弱提示</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem
					label="更新提示语(内容) "
					{...formItemLayout}
				>
					{getFieldDecorator('prompt', {
						initialValue: '',
						rules: [
							{required: forcedVal=='-1'?false:true, message: '请填写更新提示语'},
							{type: "string",max:1000,min:1,message: '1-1000个文字，格式不限'},
						],
					})(
						<TextArea style={{minHeight:150}} disabled={forcedVal == '-1'?true:false}/>
					)}
				</FormItem>
				
				<FormItem
					label="操作系统"
					{...formItemLayout}
					
				>
					{getFieldDecorator('systemType', {
						initialValue: '1',
						rules: [
							{required: true, message: '请选择'}
						],
					})(
						<RadioGroup onChange={checkSysteme}>
							<Radio value="1">Android</Radio>
							<Radio value="2">ios</Radio>
						</RadioGroup>
					)}
				</FormItem>
				{isSys == 1?<FormItem
					label="上传APK"

					{...formItemLayout}
				>
					{getFieldDecorator('upload', {
						valuePropName: 'fileList',
                        getValueFromEvent: normFile,
						rules: [
							{required: true, message: '请上传APK',type: "array"}
						],
					})(
						<Upload {...props} listType="text" style={{ width: '50%' }}>
						    <Button type="primary" size="large"  icon="upload">
							    <span id="BTN">上传</span>
							</Button>
						</Upload>
					)}
				</FormItem>:<FormItem
					label="下载地址"
					{...formItemLayout}
					hasFeedback
				>
					{getFieldDecorator('downloadUrl', {
						initialValue: '',
						rules: [
							{required: true, message: '请输入下载地址'}
						],
					})(
						<Input placeholder="请输入下载地址"/>
					)}
				</FormItem>}

			</Form>
		</Modal>
	);
};

AdduserModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(AdduserModal);