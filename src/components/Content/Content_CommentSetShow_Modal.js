
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

const Content_CommentSetShow_Modal = ({
  visible,
  item = {},
  type,
  onOk,
  onCancel,
  selectList,
  fatherType,
  showfpModal,
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
      
      onOk(data,selectList.commentId);
    });
    
    
  }
  function afterClose() {
		resetFields()
	}
  const modalOpts = {
    title: "显示设置",
    visible,
    onOk: handleOk,
    onCancel: onCancel,
    okText:"确定",
    cancelText:"取消",
    afterClose: afterClose,
  };
  
  
  
  return (
      
    <Modal {...modalOpts} width='40%'>
         <Form>
          <FormItem  {...formItemLayout} className="collection-create-form_last-form-item">
            {getFieldDecorator('set', {
              initialValue: selectList.displayStatus==true?'public':"private",
            })(
              <Radio.Group>
                <Radio value="public">前台显示</Radio>
                <Radio value="private">前台隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
    </Modal>
  );
};

Content_CommentSetShow_Modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Content_CommentSetShow_Modal);