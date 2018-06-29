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

var value = 0
const ExamineModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	fatherType,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {


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
	function afterClose(){
			resetFields()
	}
	const modalOpts = {
		title: '审核处理',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"确定",
		cancelText:"取消",
		afterClose:afterClose
	};
	function onChange(e){
		value = e.target.value
	}
	
	return (
			
		<Modal {...modalOpts} width='400px'>
	    <Form>
			<FormItem  label="审核处理" >
		          {getFieldDecorator('radio',{
		          	 rules: [{
			              required: true, message: '请选择栏目!',
			            }], 
		          })(
		            <RadioGroup onChange={onChange} >
		                <Radio  value='1'>通过</Radio>
		                <br />
				        <Radio  value='2'>
				          不通过
				          
				        </Radio>
		            </RadioGroup>
		          )}
		        </FormItem>
		        {value == "2"? <FormItem>
		          {getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:"100px"}} placeholder="不通过原因(选填)"/> 
		          )}
		        </FormItem>:null}
			</Form>
		</Modal>
	);
};

ExamineModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(ExamineModal);