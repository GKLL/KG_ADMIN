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
const Option = Select.Option
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
	Item = {},
	type,
	onOk,
	onCancel,
	selectList,
	confirmLoading,
	ColumnIdentity,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {

	//console.log(Item)
	function handleOk(value,text) {
			validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				userId:Item.userId,
				...getFieldsValue()

			};
			
			onOk(data);
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
		title: "专栏认证",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"提交",
		afterClose:afterClose,
		confirmLoading:confirmLoading
	};
	
	//验证不超过10个汉字 == 20个字符
	function valueData(rule, value, callback){
		var len = 0; //字符长度
		if(value==undefined||value == ""){
			callback()
		}else{
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				}
				else {
					len += 1;
				}
			}
			if(len>20&& value != ""){
				callback('最多输入10个汉字或者20个字符')
			}
			callback()
		}
		
	}
	return (
			
		<Modal {...modalOpts} width='400px'>
		<Form>
		        <FormItem>
		          {getFieldDecorator('name',{
		          	 rules: [{
			              required: false, message: '请输入!'
			            },{
							validator: valueData
						}], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:'100px'}} placeholder="请填写前缀（选填，如：千氪财经；最多10个汉字)"/> 
		          )}
		        </FormItem>
				<FormItem>
		          {getFieldDecorator('select',{
		          	 rules: [{
			              required: true, message: '请选择身份!',
			            }], 
		          })(
		            <Select   placeholder="请选择身份">
						{ColumnIdentity&&ColumnIdentity.map((item,i)=>
							<Option value={item.identity} key={item.id+''}>{item.identity}</Option>
						)}
						
					</Select>
		          )}
		        </FormItem>
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