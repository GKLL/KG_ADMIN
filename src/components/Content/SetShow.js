import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	message,
	Button,
	Tabs,
	Steps,
	Col,
	Row
} from 'antd';
import styles from './Content_Opinion_Show.css'
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const Step = Steps.Step;
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const SetModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	confirmLoading,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {

	//console.log(selectList)
	function handleOk() {
			validateFields((errors) => {
			if (errors) {
				return;
			}else{
				const data = {...getFieldsValue()};
				onOk(selectList,data);
			}
			
			
		});
		
	}

	function Cancel() {
		onCancel()
	}
	function afterClose() {
		resetFields()
	}
	const modalOpts = {
		title: "显示设置",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:'确定',
		cancelText:"取消",
		afterClose: afterClose,
		destroyOnClose:true,
		confirmLoading:confirmLoading
	};

	return (
			
		<Modal {...modalOpts} width='30%'>
			<Form>
               		<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup>
				              <Radio value="1">正常显示</Radio>
				              <Radio value="2">首页置顶</Radio>
				              <Radio value="3">首页推荐</Radio>
				              <Radio value="4">前台隐藏</Radio>
				            </RadioGroup>
				  		)}
				  	</FormItem>
				  	
               	</Form>
		</Modal>
	);
};

SetModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(SetModal);