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
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const LockModal = ({
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
	},
}) => {


	function handleOk(value,text) {
			
			//console.log(value,text)
			onOk(value,text,selectList);
		
	}

	function Cancel() {
		onCancel()
		setFieldsValue({
			father: "0",
			name: ''
		});
	}
	const modalOpts = {
		title: "设置锁定时长",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		footer:null
	};
	
	class PriceInput extends React.Component {
		  constructor(props) {
		    super(props);

		    const value = this.props.value || {};
		    this.state = {
		      number: value.number || "",
		      currency: value.currency || '5',
		    };
		  }
		  componentWillReceiveProps(nextProps) {
		    // Should be a controlled component.
		    if ('value' in nextProps) {
		      const value = nextProps.value;
		      this.setState(value);
		    }
		  }
		  handleNumberChange = (e) => {
		    const number = parseInt(e.target.value || 0, 10);
		    if (isNaN(number)) {
		      return;
		    }
		    if (!('value' in this.props)) {
		      this.setState({ number });
		    }
		    this.triggerChange({ number });
		  }
		  handleCurrencyChange = (currency) => {
		    if (!('value' in this.props)) {
		      this.setState({ currency });
		    }
		    this.triggerChange({ currency });
		  }
		  triggerChange = (changedValue) => {
		    // Should provide an event to pass value to Form.
		    const onChange = this.props.onChange;
		    if (onChange) {
		      onChange(Object.assign({}, this.state, changedValue));
		    }
		  }
		  render() {
		    const { size } = this.props;
				const state = this.state;
				const selectAfter = (
				  <Select
			          value={state.currency}
			          size={size}
			          
			          onChange={this.handleCurrencyChange}
			        >
			          <Option value="5">小时</Option>
			          <Option value="4">天</Option>
			          
			        </Select>
				); 
		    return (
		      <span>
		        <Input
		          type="text"
		          size={size}
		          value={state.number}
		          onChange={this.handleNumberChange}
						
							addonAfter={selectAfter}
		        />
		        
		      </span>
		    );
		  }
		}

	class Demo extends React.Component {
			  handleSubmit = (e) => {
			    e.preventDefault();
			    this.props.form.validateFields((err, values) => {
			      if (!err) {
			        //console.log('Received values of form: ', values);
			        handleOk(values,selectList)
			      }
			    });
			  }
			  checkPrice = (rule, value, callback) => {
			    if (value.number > 0) {
			      callback();
			      return;
			    }
			    callback('锁定时长必须大于0!');
			  }
			  render() {
			    const { getFieldDecorator } = this.props.form;
			    return (
			      <Form  onSubmit={this.handleSubmit}>
			        <FormItem>
			          {getFieldDecorator('tmie', {
			            initialValue: { number: 0, currency: '小时' },
			            rules: [{ validator: this.checkPrice }],
			          })(<PriceInput />)}
			        </FormItem>
							<FormItem style={{marginLeft:0+'px',textAlign:"right"}} >
			          <Button onClick={onCancel}  style={{marginLeft:10}} style={{paddingLeft:20+"px",paddingRight:20+"px",marginLeft:30}}>取消</Button>
								<Button type="primary" htmlType="submit" style={{paddingLeft:20+"px",paddingRight:20+"px",marginLeft:10}}>确定</Button>
			        </FormItem>
			      </Form>
			    );
			  }
       }

      const WrappedDemo = Form.create()(Demo);
	return (
			
		<Modal {...modalOpts} width='400px'>
		<WrappedDemo />
				
		</Modal>
	);
};

LockModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(LockModal);