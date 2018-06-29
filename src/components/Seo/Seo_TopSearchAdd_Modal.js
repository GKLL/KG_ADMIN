import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;
const Content_ColumnAdd_Modal = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17},
    };
    const formItemLayout_radio = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17, offset: 10 },
    };
    return (
      <Modal
        visible={visible}
        title="添加热搜词"
        okText="确认"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <FormItem {...formItemLayout} label="热搜词">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入热搜词' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="显示状态" className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">显示</Radio>
                <Radio value="private">隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="排序">
            {getFieldDecorator('title11')(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
export default Content_ColumnAdd_Modal;