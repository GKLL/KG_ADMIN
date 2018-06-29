import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';

import { Form, Row, Col, Input, Button, Icon,Select,Radio,message} from 'antd';

import ArticleList from '../components/Setting/ArticleList';

import Editor from '../editor/index.js';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function AboutUs({dispatch,setting,router}) {
	let userId =localStorage.getItem("userId");
	 const formItemLayout = {
	      labelCol: { span: 2 },
	      wrapperCol: { span: 4},
	    };
	class FormInfo extends React.Component {
		state={
			html:'',
			text:"",
		}
	  handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values)
	        var v = values.info;
	        var type = v.split(',');
	    
	        	dispatch({
	        		type:'setting/addBaseinfo',
	        		payload:{
	        			infoDetail:values.text,
	        			infoOrder:parseInt(values.infoOrder),
	        			infoType:type[1]+'',
	        			createUser:parseInt(userId),
	        			infoName:type[0]+'',
	        			infoStatus:values.setshow == "a"?true:false,
	        		}
	        	})
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
	  edtiorContent=(value) =>{
	  //	console.log(editor)
	  	/*var html  = editor.txt.html()
        var text  = editor.txt.text();
        console.log(typeof(text))*/
        console.log(value)

         return value
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	   
	    return (
	      <Form >
	
	        <FormItem
	         {...formItemLayout}
	          label="选择信息类别"
	          className={styles.infotype}
	        >
	          {getFieldDecorator('info',{
	          	rules: [
					{required: true, message: '请选择'},
				],
	          })(
	            <Select size="large"  placeholder="请选择" >
	              <Option value="关于我们,about">关于我们(about)</Option>
	              <Option value="加入我们,add">加入我们(add)</Option>
	              <Option value="联系我们,contact">联系我们(contact)</Option>
	              <Option value="版权声明,copy">版权声明(copy)</Option>
	              <Option value="用户注册协议,concert">用户注册协议(concert)</Option>
	              <Option value="专栏申请协议,agreement">专栏申请协议(agreement)</Option>
	            </Select>
	          )}
	        </FormItem>
	        <FormItem>
	             {getFieldDecorator('text', {
                      rules: [
                      { required: true, message: '请输入正文!' },
                      {type:'string',min:1,max:5000,message:'请输入1-5000个字符'}
                      ],
                      trigger:'edtiorContent'
                    })(
                         <Editor edtiorContent={this.edtiorContent} />
                    )}
	        </FormItem>
			<FormItem
	         {...formItemLayout}
	          label="显示状态"
	        >
	          {getFieldDecorator('setshow',{
	          	initialValue: "a",
	          	rules: [
					{required: true, message: '请选择'},
				],
	          })(
	            <RadioGroup>
	              <Radio value="a">显示</Radio>
	              <Radio value="b">隐藏</Radio>
	            </RadioGroup>
	          )}
	        </FormItem>
	        <FormItem
	         {...formItemLayout}
	          label="排序"

	        >
	          {getFieldDecorator('infoOrder',{
	          	rules: [
					{required: false, message: '请输入'},
				],
	          })(
	            	<Input />
	          )}
	          <span className={styles.txt}>同一显示位置，排序越小越靠前</span>
	        </FormItem>
	        <FormItem
	           style={{marginLeft:"100px"}}
	        >
	          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
	        </FormItem>
	      </Form>
	    );
	  }
	}

const WrappedDemo = Form.create()(FormInfo);
	return (
			<div className={styles.Indexbox}>
					
				<WrappedDemo />
				
			</div>

	);
}

AboutUs.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AboutUs));