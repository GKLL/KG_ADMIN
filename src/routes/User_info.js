import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form, Row, Col, Input, Button, Icon,Select,Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group
const { TextArea } = Input;

function UserInfo({dispatch,user}) {
	const {SiteInfo} =user;
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	class Demo extends React.Component {
		state={
			dis:'0'
		}
	  handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err,values) => {
	      if (!err) {
	        
	        //const values ={...(this.props.getFieldsValue())}
	        //console.log(values)
	        dispatch({
	        	type:"user/userInfoSet",
	        	payload:{
	        		info:values.info,
	        		status:values.status =="0"?true:false
	        	}
	        })
	      }
	    });
	  }
	  onChange=(e) =>{
	  	 this.setState({
		      dis: e.target.value,
		    });
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    return (
	      <Form >
	
	        <FormItem
	         
	          label="个人简介默认设置"
	        >
	          {getFieldDecorator('status',{
	          	initialValue:SiteInfo.personalInfoStatus === false?"1":"0",
	          })(
	            <RadioGroup   onChange={this.onChange} value={this.state.value}>
	              <Radio value="0">启用默认值</Radio>
	              <Radio value="1">禁用默认值</Radio>
	             
	            </RadioGroup>
	          )}
	        </FormItem>
			<FormItem
	          
	          label="默认值"
	        >
	          {getFieldDecorator('info',{
	          	initialValue:SiteInfo.personalInfo,
	          })(
	            	<TextArea style={{ width:'40%',minHeight:"100px" }} disabled={this.state.dis=="0"?false:true}
	            	placeholder="请输入"
	            	/>
	            	
	          )}
	          <div>10-100个字符，支持中英文、数字、符号</div>
	        </FormItem>
	        <FormItem
	        >
	          <Button type="primary" onClick={this.handleSubmit} style={{paddingLeft:40,paddingRight:40}}>保存</Button>
	        </FormItem>
	      </Form>
	    );
	  }
	}

const WrappedDemo = Form.create()(Demo);
	return (
			<div>
				<WrappedDemo />
			</div>

	);
}

UserInfo.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserInfo));