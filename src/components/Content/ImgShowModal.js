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

const ImgShowModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	fatherType,
	showfpModal,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
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
	const modalOpts = {
		title: "批量设置显示状态",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"确定",
		cancelText:"取消"
	};

	return (
			
		<Modal {...modalOpts} width='30%'>
			<Form>
               		<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup>
				              <Radio value="1">显示</Radio>
				              <Radio value="2">隐藏</Radio>
				              
				            </RadioGroup>
				  		)}
				  	</FormItem>
				  	
               	</Form>
		</Modal>
	);
};

ImgShowModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(ImgShowModal);