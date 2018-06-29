


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
  Button,
  Tabs,
  Steps,
  Col,
  Row
} from 'antd';
import styles from './Content_Opinion_Show.css'
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Content_CommentSet_Modal = ({
  visible,
  item = {},
  type,
  onOk,
  onCancel,
  selectList,
  isCommentAutid,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    resetFields
  },
}) => {

  function handleOk(value,text) {
      validateFields((errors) => {
      if (errors) {
        return;
      }

      const data = {
      
        ...getFieldsValue(),
        
      }
      
      onOk(data);
    });
    
    
  }
  function afterClose(){
    resetFields()
  }
  const modalOpts = {
    title: "评论管理设置",
    visible,
    onOk: handleOk,
    onCancel: onCancel,
    okText:"确定",
    cancelText:"取消",
    afterClose:afterClose
    };
  
  
  
  return (
      
    <Modal {...modalOpts} width='40%'>
          <Form>
          <FormItem  label="新评论是否需要审核" className="collection-create-form_last-form-item">
            {getFieldDecorator('set', {
              initialValue: isCommentAutid&&isCommentAutid+'',
            })(
              <RadioGroup>
                <Radio value="1">需要审核</Radio><span>注：设置为需要审核后，所有新评论需通过审核才能在前台显示</span><br />
                <Radio value="0">不需要审核</Radio><span>注：该选项为默认项，新评论只要提交成功，即可在前台显示</span>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
    </Modal>
  );
};

Content_CommentSet_Modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Content_CommentSet_Modal);