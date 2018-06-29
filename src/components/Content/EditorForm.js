import React from 'react';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';

const FormItem = Form.Item;

 class EditorForm extends React.Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.log('Received values of form: ', values);
      this.props.handlsearch(values)
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  getFields() {
    // const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 19 },
    };
    return this.props.getFields(getFieldDecorator,formItemLayout);
  }
  submit(){
  	this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }
  render() {

    return (
       <div>
	      <Form
	        onSubmit={this.handleSearch}
	      >
	        <div>{this.getFields()}</div>
          <Row>
            <Col span={24} style={{marginLeft:130+'px'}}>
              <Button type="primary" htmlType="submit" size="large">发布</Button>
              <Button style={{ marginLeft: 30+'px' }} onClick={this.handleReset} size="large" >存草稿</Button>
              <Button type="primary" style={{ marginLeft: 30+'px' }} onClick={this.handleReset} size="large" ghost>预览</Button>
            </Col>
          </Row>
	      </Form>
      </div>
    );
  }
}
const WrappedEditorForm = Form.create()(EditorForm);

export default WrappedEditorForm;