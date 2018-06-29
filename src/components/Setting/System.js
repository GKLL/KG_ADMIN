import React from 'react';
import { Button, Icon, Form, Input, Radio, Select, Row, Col, Cascader, message, Upload,Modal } from 'antd';
import { uploadUrl, ImgUrl, residences, keWordList } from "../../services/common"
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};

const Content_ImageAdd_Modal = ({
	confirmLoading,
	dispatch,
	item,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {


	function handleOk(){
		validateFields((err, fieldsValue) => {
			if (!err) {
				const data = {
					...fieldsValue
				}
				dispatch({
					type:'setting/revenueSet',
					payload:{
						...data
					}
				})
			}
		})
		// onOk()
	}
	return (
			<Form>
				<FormItem label="是否展示作者收益排行" {...formItemLayout} extra="选择不展示时，作者端将屏蔽收益排行入口">
						{getFieldDecorator('show', {
						initialValue:item&&item.show+'',
						rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<RadioGroup size="large">
								<Radio value="1">展示</Radio>
								<Radio value="0">不展示</Radio>
							</RadioGroup>
						)}
					</FormItem>
					<FormItem label="&emsp;" {...formItemLayout} colon={false}>
					<Button type="primary" size="large" style={{ paddingLeft: 20, paddingRight: 20 }} onClick={()=>handleOk()} loading={confirmLoading}>保存</Button>
				</FormItem>
			</Form>
	);
};


export default Form.create()(Content_ImageAdd_Modal);