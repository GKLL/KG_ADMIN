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

const EditoruserModal = ({
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
		resetFields
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
			
			onOk(item.id,data);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function afterClose(){
      resetFields()
    }
	const modalOpts = {
		title: '编辑账号',
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
				>
					{getFieldDecorator('username', {
						initialValue: item.username,
						rules: [
							{required: true, message: '用户名未填写'},
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
						initialValue: item.mobile,
						rules: [
							{required: true, message: '手机号未填写'},
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
						initialValue: item.realname,
						rules: [
							{required: true, message: '姓名未填写'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>
				<Form.Item 
					label="选择岗位 "
					{...formItemLayout}
				>
					{getFieldDecorator('postId', {
						initialValue: item.postId==0?"请选择":item.postId+'',
						rules: [
							{required: true, message: '姓名未填写'},
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

EditoruserModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(EditoruserModal);