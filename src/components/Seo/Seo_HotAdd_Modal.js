import React from 'react';
import { Button, Modal, Form, Input, Radio,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Seo_HotAdd_Modal = Form.create()(
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
        title="添加关键词"
        okText="确认"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <FormItem {...formItemLayout} label="关键词">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="链接地址">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="显示位置">
            {getFieldDecorator('title1', {
               initialValue: '请选择',
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Select>
                <Option value = "1">首页底部</Option>
                <Option value = '2'>二级导航栏底部</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="显示状态" className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">是</Radio>
                <Radio value="private">否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="排序" className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: '',
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
export default Seo_HotAdd_Modal;