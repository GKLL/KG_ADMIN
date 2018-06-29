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
	loging,
	onCancel,
	selectList,
	currentItem,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {


	function handleOk(data) {
			
			//console.log(value,text)
			onOk(data);
		
	}

	function Cancel() {
		onCancel()
	}
	const modalOpts = {
		title: "额外奖励",
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
				const number = e.target.value;
				//console.log(number)
			
			
		    if (isNaN(number)) {
		      return;
				}
				// if(!reg.test(number)){
				// 	console.log(1)
				// 	return;
				// }
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
			          <Option value="0">TV</Option>
			          <Option value="1">KG</Option>
			          
			        </Select>
				); 
		    return (
		      <span>
		        <Input
		          type="text"
		          size={size}
		          value={state.number}
		          onChange={this.handleNumberChange}
							style={{ width: '100%'}}
							addonAfter="TV"
							placeholder="奖励数量"
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
							console.log('Received values of form: ', values);
							const data = {
								articleId:currentItem.articleId,
								values:values
							}
			        handleOk(data)
			      }
			    });
			  }
			  checkPrice = (rule, value, callback) => {
					var number = value.number;
					if(number !=''&& number.substr(0,1) == '.'){  
            number=0;  
					}
					  
					number = number.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
					number = number.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
					if(number.indexOf(".")< 0 &&number !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
            if(number.substr(0,1) == '0'){  
							callback('奖励数量必须大于0!');
            }  
          }  
					var reg = /^\d+(\.\d{1,3})?$/;
					if(number == 0){
						
						callback('奖励数量必须大于0!');
					}else if(!reg.test(number)){
						callback('最多三位小数!');
					}else{
						callback()
					}
			 
			  }
			  render() {
			    const { getFieldDecorator } = this.props.form;
			    return (
			      <Form  onSubmit={this.handleSubmit}>
			        <FormItem>
			          {getFieldDecorator('tmie', {
			            initialValue: { number: 0, currency: 'TV' },
			            rules: [{ validator: this.checkPrice }],
			          })(<PriceInput />)}
			        </FormItem>
							{/* <FormItem>
			          {getFieldDecorator('bonusReason', {
									rules: [{ min:1,max:200,message:'最多200个字符' }],
			          })(<TextArea rows={4}  placeholder="奖励原因(选填)"/>)}
			        </FormItem> */}
			        <FormItem style={{marginLeft:0+'px',textAlign:"right"}} >
			          <Button onClick={onCancel}  style={{marginLeft:10}} style={{paddingLeft:20+"px",paddingRight:20+"px",marginLeft:10}}>取消</Button>
								<Button type="primary" htmlType="submit" style={{paddingLeft:20+"px",paddingRight:20+"px",marginLeft:10}} loading={loging}>确定发放</Button>
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