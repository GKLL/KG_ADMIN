
import React, {
  PropTypes
} from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Content_Opinion_Show_Modal = ({
  visible,
  item = {},
  type,
  onOk,
  onCancel,
  selectList,
  mail,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  //console.log(ColumnList)
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
  function handleOk() {
    
      validateFields((errors) => {
      if (errors) {
        return;
      }else{
        const data = {...getFieldsValue()};
        onOk(mail,data);
      }
    })
  }

  function Cancel() {
    onCancel()
   
  }
  const modalOpts = {
    title: "",
    visible,
    onOk: handleOk,
    onCancel: Cancel,
    maskClosable: false,
    okText:"确定",
    cancelText:"取消"
  };
  function onChange(value) {
  console.log(value);
}

  return (
    <Modal {...modalOpts} width='30%'>
      
       <Form>
            <FormItem {...formItemLayout}  label = "收件人" className="collection-create-form_last-form-item">
                    {getFieldDecorator('name',{

                    })(
                      <span>{mail}</span>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout}  label = "主题" className="collection-create-form_last-form-item">
                    {getFieldDecorator('title',{
                      rules:[{required: true, message: "请输入主题!"}],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout}  label = "内容" className="collection-create-form_last-form-item">
                    {getFieldDecorator('content',{
                      rules:[{required: true, message: "请输入内容!"}],
                    })(
                      <TextArea  style={{minHeight:"120px"}}/>
                    )}
                  </FormItem>
        </Form>
    </Modal>
  );
};

Content_Opinion_Show_Modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Content_Opinion_Show_Modal);