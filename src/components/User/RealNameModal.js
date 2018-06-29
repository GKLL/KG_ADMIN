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
var value ='0';
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

const RealNameModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	confirmLoading,
	currentValue,
	dispatch,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields,
	},
}) => {

//	console.log(selectList)
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
		dispatch({
			type:'user/currentValeChange',
			payload:{
				currentValue:e.target.value,
			}
		})
		
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
		okText:"确定",
		cancelText:"取消",
		destroyOnClose:true,
		confirmLoading:confirmLoading
	};
	
	return (
			
		<Modal {...modalOpts} width='400px'>
		<Form>
		   {selectList.status  != 1?
		   		<div>
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
		        {currentValue == "0"? <FormItem>
		          {getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:'100px'}} placeholder="不通过原因(选填)"/> 
		          )}
		        </FormItem>:null}</div>:
		        <div>
		        <FormItem label="审核处理" style={{display:"none"}}>
		          {getFieldDecorator('radio',{
		          	 rules: [{
			              required: false, message: '请选择!',
			            }], 
		          })(
		            <RadioGroup onChange={onChange} >
		                <Radio  value='0'>不通过</Radio>
		                
		            </RadioGroup>
		          )}
		        </FormItem>
		        <FormItem >
		        	{getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:'100px'}} placeholder="不通过原因(选填)"/> 
		          )}
		        </FormItem>
		        </div>
		    }
			
			</Form>
				
		</Modal>
	);
};

RealNameModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(RealNameModal);