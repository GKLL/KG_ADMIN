import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './BaseInfo.css'
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form ,Button, Upload, Icon,Input} from 'antd';
import Upload_Image from '../components/Upload_Image';
const FormItem = Form.Item;
/*
function UrlSearch() {
	var name, value;
	var str = location.href; //取得整个地址栏
	var num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

	var arr = str.split("&"); //各个参数放到数组里
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			this[name] = value;
		}
	}
}*/

function BaseInfo() {

	/*var Request = new UrlSearch()
	var token = Request.token;
	var merchat_id = Request.merchat_id
	var scmAddress = Request.scmAddress
		// console.log('token', token)
	if (token != null) {
		localStorage.setItem("scmtoken", token);
		localStorage.setItem("merchant_id", merchat_id);
		localStorage.setItem("scmAddress", scmAddress);
	}
	console.log('token', token)
	console.log('merchat_id', merchat_id)
	console.log('scmAddress', scmAddress)*/
	
	class InfoForm extends React.Component {
	  handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	  }
	  normFile = (e) => {
	    console.log('Upload event:', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    return e && e.fileList;
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 2 },
	      wrapperCol: { span: 8 },
	    };
	    return (
	      <Form onSubmit={this.handleSubmit}>
	        <FormItem
	          {...formItemLayout}
	          label="网站LOGO"
	          extra="建议尺寸***，大小不超过2MB"
	        >
	          {getFieldDecorator('upload', {
	            valuePropName: 'fileList',
	            getValueFromEvent: this.normFile,
	          })(
	            <Upload_Image />
	          )}
	        </FormItem>
			<FormItem
	          {...formItemLayout}
	          label="地址栏图标"
	          extra="建议32*32大小,大小不超过2MB，文件格式为.icon"
	        >
	          {getFieldDecorator('upload', {
	            valuePropName: 'fileList',
	            getValueFromEvent: this.normFile,
	          })(
	            <Upload_Image />
	          )}
	        </FormItem>
	        <FormItem
	          label="版权信息"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('note', {
	            rules: [{ required: true, message: '请输入...' }],
	          })(
	            <Input />
	          )}
            </FormItem>
			 <FormItem
	          label="备案信息"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('note', {
	            rules: [{ required: true, message: '请输入...' }],
	          })(
	            <Input />
	          )}
            </FormItem>
             <FormItem
	          label="举报电话"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('note', {
	            rules: [{ required: true, message: '请输入...' }],
	          })(
	            <Input />
	          )}
            </FormItem>
             <FormItem
	          label="举报邮箱"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('email', {
	            rules: [{
	              type: 'email', message: 'The input is not valid E-mail!',
	            }, {
	              required: true, message: 'Please input your E-mail!',
	            }],
	          })(
	            <Input />
	          )}
            </FormItem>
	        <FormItem
	          wrapperCol={{ span: 6, offset: 2 }}
	        >
	          <Button type="primary" htmlType="submit" size='large'>保存</Button>
	        </FormItem>
	      </Form>
	    );
	  }
	}

	
	
	
	const BaseInfoForm = Form.create()(InfoForm);
	return (
			<div className={styles.Indexbox}>
				<h2>网站基本信息</h2>
				<BaseInfoForm />
			</div>

	);
}

BaseInfo.propTypes = {

};

function mapStateToProps({
	AboutUs
}) {
	return {
		AboutUs
	};
}



export default connect(mapStateToProps)(withRouter(BaseInfo));