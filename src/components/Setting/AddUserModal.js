import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
} from 'antd';
const Option = Select.Option;


const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const AdduserModal = ({
	visible,
	item = {},
	PostList,
	onOk,
	onCancel,
	confirmLoading,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields,
	},
}) => {
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
		title: '添加账号',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"提交",
		cancelText:"取消",
		afterClose:afterClose,
		confirmLoading:confirmLoading

	};
	return (

		<Modal {...modalOpts}>
	<Form>
				<Form.Item 
					label="用户名 "
					{...formItemLayout}
					hasFeedback
				>
					{getFieldDecorator('username', {
						initialValue: '',
						rules: [
							{required: true, message: '请填写用户名'},
							{type: "string",max:100,message: '不超过100个字符'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>		
				<Form.Item 
					label="手机号 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('mobile', {
						initialValue: '',
						rules: [
							{required: true, message: '手机号未填写'},
							{type: "string",message: '请填写正确的手机号',pattern:/^1[0-9]{10}$/},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>
				<Form.Item 
					label="姓名 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('realname', {
						initialValue: "",
						rules: [
							{required: true, message: '请填写管理员姓名'},
							{type: "string",max:100,message: '不超过100个字符'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>
				<Form.Item 
					label="设置密码 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('password', {
						initialValue: "",
						rules: [
							{required: true, message: '密码未填写'},
							{type: "string",min:6,max:20,message: '登陆密码6-20,必须大写，小写字母，数字三种组合',pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/},
						],
					})(
						<Input type="password" />
					)}
				</Form.Item>
				<Form.Item 
					label="选择岗位 "
					{...formItemLayout}
				>
					{getFieldDecorator('postId', {
						
						rules: [
							{required: true, message: '未选择岗位'},
						],
					})(
						<Select style = {{marginRight:20}} size = "large"  placeholder="请选择" >
							{PostList.map((item,index)=>
								<Option key={index} value={item.postId+""}>{item.postName}</Option>
								)}
	            		</Select>
					)}
				</Form.Item>
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