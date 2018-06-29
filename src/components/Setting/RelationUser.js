import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	message
} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const RelationModal = ({
	visible,
	item = {},
	onOk,
	onCancel,
	handleBlur,
	deskUserId,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {

	//console.log("type",item)
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				...getFieldsValue(),
			}
			//console.log(data)
			if(deskUserId.userId== ""){
				message.warn('无此前台账户')
			}else{
				onOk(item,deskUserId.userId);
			}
			
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function afterClose(){
			resetFields()
	}
	const modalOpts = {
		title: "关联前台账号",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"确定",
		cancelText:"取消",
		destroyOnClose:true,
		afterClose:afterClose
	};
	return (

		<Modal {...modalOpts}>
	        <Form>	
				<FormItem 
					label="手机号 "
					{...formItemLayout}
				>
					{getFieldDecorator('kgId', {
						initialValue: '',
						rules: [
							{required: true, message: '请输入正确手机号',pattern:/^1[3|4|5|7|8][0-9]\d{4,8}$/},
						],
					})(
						<Input type="text" onChange={handleBlur}/>
					)}
					<span>专栏名称：{deskUserId.userName}</span>
				</FormItem>	
			</Form>
		</Modal>
	);
};

RelationModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(RelationModal);