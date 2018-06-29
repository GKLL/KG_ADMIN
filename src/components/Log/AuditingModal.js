import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	Cascader
} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;

const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};
let value =0;
const AuditingModal = ({
	visible,
	item = {},
	type,
	onOk,
	selectList,
	ColumnList,
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
			onOk(data,selectList);
		});
	}

	function Cancel() {
		onCancel()
		setFieldsValue({
			father: "0",
			name: ''
		});
	}
	function afterClose() {
		resetFields()
	}
	const modalOpts = {
		title: '审核处理',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		confirmLoading:confirmLoading,
		afterClose: afterClose,

	};
	
	function onChange(e) {
        value =e.target.value;
    }
	class App extends React.Component {
		  state = {
		    value: 1,
		  }
		  onChange = (e) => {
		    console.log('radio checked', e.target.value);
		    this.setState({
		      value: e.target.value,
		    });
		  }
		  render() {
		    const radioStyle = {
		      display: 'block',
		      height: '30px',
		      lineHeight: '30px',
		    };
		    return (
		      <RadioGroup onChange={this.onChange} value={this.state.value}>
		        
		        <Radio style={radioStyle} value={3}>通过</Radio>
		        <Radio style={radioStyle} value={4}>
		          不通过
		          <br />
		           <Input style={{ width: "100%", minHeight: 100 }} disabled={this.state.value === 4 ?false:true} placeholder='请输入不通过原因（选填）'/>
		        </Radio>
		      </RadioGroup>
		    );
		  }
		}
	return (

		<Modal {...modalOpts}>
	       <Form>
			<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup onChange ={onChange} >
				              <Radio value="1">通过</Radio>
				              
				            </RadioGroup>
				  		)}
				</FormItem>
				<FormItem label="选择栏目">
				  	    {getFieldDecorator('column', {
				  			rules:[{required: value==1?true:false, message: "请选择!"}],
				  		})(
				  		    <Cascader options={ColumnList}  placeholder="请选择" style={{width:300+'px'}}/>
				  		)}
				</FormItem>
				<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup onChange ={onChange} >
				             
				              <Radio value="3">不通过</Radio> 
				            </RadioGroup>
				  		)}
				</FormItem>
		        <FormItem>
		          {getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:"100px"}} placeholder="不通过原因(选填)" disabled={value==3?false:true}/> 
		          )}
		        </FormItem>
			</Form>
		</Modal>
	);
};

AuditingModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(AuditingModal);