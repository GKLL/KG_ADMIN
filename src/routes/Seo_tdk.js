import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter
}from 'dva/router';
import {Form,Radio,Input} from 'antd';
const FormItem = Form.Item;
import LayoutContainer from '../components/Layout';
class Seo_TdkForm extends React.Component{
	constructor(){
		super();
	}
	render(){
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout_radio = {
      labelCol: { span: 2},
      wrapperCol: { span: 17 },
    };
    return (
        <Form>
          <h1>首页TDK设置</h1>
          <FormItem {...formItemLayout_radio} label="首页title" className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier')(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="描述" className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier')(
              <Input.TextArea />
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="关键字" className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier')(
              <Input />
            )}
          </FormItem>
        </Form>
    );
  }
}
const WrappedSeo_TdkForm = Form.create()(Seo_TdkForm);
const SeoTdk = (props) => {
	return (
		<div>
			<WrappedSeo_TdkForm />
		</div>

	);
}

SeoTdk.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(SeoTdk));