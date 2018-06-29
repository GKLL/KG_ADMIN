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
	Button
} from 'antd';
var value ='1'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const RealsModal = ({
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
	function handleOk(value,text) {
		
			validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {...getFieldsValue()

			};
			
			onOk(data,selectList);
		   })
	}

	function Cancel() {
		onCancel()
		
	}
	function onChange(e) {
		//console.log(e.target.value)
		value =e.target.value;
		
	}
	function afterClose(){
		resetFields()
	}
	const modalOpts = {
		title: selectList.status!=1?'审核处理':"取消通过",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:600,
		afterClose:afterClose,
		confirmLoading:confirmLoading,
	};
	
	return (
			
		<Modal {...modalOpts} width='400px'>
		<Form>
		   	    <FormItem label="审核处理">
		          {getFieldDecorator('radio',{
		          	 rules: [{
			              required: true, message: '请选择!',
			            }], 
		          })(
		            <RadioGroup onChange={onChange} >
		                <Radio  value='1'>通过</Radio>
		                <br />
				        <Radio  value='0'>
				          不通过
				          
				        </Radio>
		            </RadioGroup>
		          )}
		        </FormItem>
		        {value == "0"? <FormItem>
		          {getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:'100px'}} placeholder="不通过原因(选填)"/> 
		          )}
		        </FormItem>:null}
			</Form>
				
		</Modal>
	);
};

RealsModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(RealsModal);