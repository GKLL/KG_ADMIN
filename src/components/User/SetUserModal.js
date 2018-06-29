import React, {
	PropTypes
} from 'react';
import {
	Link
} from 'dva/router';
import {
	Form,
	Select,
	Input,
	Modal,
	Button,
	Table,
	Tabs,
	Checkbox,
	Row,
	Col,
	Radio
} from 'antd';

import stytes from './LoginForm.css';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const SetUserModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	RoleProfile,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {



//console.log(item);
console.log(RoleProfile);
const FormItem = Form.Item;
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				id: item.Id,
				...getFieldsValue(),
				key: item.key
			}
			setFieldsValue({
				father: "0",
				name: ''
			});
			onOk(data);
		});
	}

	function Cancel() {
		onCancel()
		setFieldsValue({
			father: "0",
			name: ''
		});
	}
	const modalOpts = {
		title: '设置资料参数——'+item.name,
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:'670px'

	};

	 const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    
   			
	return (

		<Modal {...modalOpts}>
		    <div><span style={{fontSize:18+'px',color:'#000',paddingRight:20+'px'}}>初始化字段</span>(初始化字段只能在后台操作，是否需要在前台显示，但不能更改其中的规则)</div>
			<Form>
				{RoleProfile!=undefined?RoleProfile.map((role,index)=>
						<FormItem >
							<Row>
								<Col span={4} className={stytes.leftcol}>
									{getFieldDecorator('username', {
							          rules: [{ required: true, message: 'Username is required!' }],
							        })(<Checkbox>{role.profileName}</Checkbox>)}
									<p>不可取消</p>
								</Col>
								<Col span={20}>
									<p>默认规则:{role.defaultValue}</p>
									<p>字段规范:{role.displayStatus}</p>
								
									 {getFieldDecorator('username', {
							          rules: [{ required: true, message: 'Username is required!' }],
							        })(<RadioGroup>
							              <Radio value="a">必填</Radio>
							              <Radio value="b">选填</Radio>
							            </RadioGroup>)}
								</Col>
							</Row>
			            </FormItem>

					):''}
			</Form>
		</Modal>
	);
};

SetUserModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(SetUserModal);