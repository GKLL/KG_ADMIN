
import React, {
  PropTypes
} from 'react';
import {
  Link
} from 'dva/router';
import { Button, Modal, Form, Input, Radio, Select} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group
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
let myKey =Math.random();
const Content_ColumnAdd_Modal = ({
  visible,
  item={},
  onOk,
  type,
  onCancel,
  RoleProfile,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    resetFields,
  },
}) => {

const FormItem = Form.Item;

  //console.log(item)
  function handleOk() {
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

  function Cancel() {
    onCancel()
    
  }
  function afterClose(){
    resetFields()
  }
  const modalOpts = {
    title:"添加一级栏目",
    visible,
    onOk: handleOk,
    onCancel: Cancel,
    maskClosable: false,
    width:'670px',
    okText:"确定",
    cancelText:"取消",
    key : myKey,
    afterClose:afterClose
  };

   const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    
        
  return (
    
    <Modal {...modalOpts}>
       <Form>
          <FormItem {...formItemLayout} label="上级栏目">

            {getFieldDecorator('parentId', {
              initialValue:'0',
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select disabled>
                  <Option value="0">首页</Option>
                  <Option value={item.id+''}>{item.name}</Option>
              </Select>
              
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="栏目名称">
            {getFieldDecorator('cname', {
              initialValue:'',
              rules: [
                 { required: true, message: '请输入栏目名称!' },
                 {type:'string',min:2,max:6,message:"2-6个字符,支持中英文",pattern:/^[a-zA-Z\u4e00-\u9fa5]+$/}
              ],
            })(
              <Input autocomplete="off"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="导航栏显示">
            {getFieldDecorator('navigatorDisplay', {
              initialValue:'2',
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select >
                  <Option value="2" >顶部导航</Option>
                  <Option value="3" >首页主导航</Option>
                  <Option value="1" >都显示</Option>
                  <Option value="0" >都不显示</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="前台是否显示" className="collection-create-form_last-form-item">
            {getFieldDecorator('displayStatus', {
              initialValue: 'public',
               rules: [{ required: true, message: '请设置前台是否显示!' },
                
               ],
            })(
              <Radio.Group>
                <Radio value="public">是</Radio>
                <Radio value="private">否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="同级栏目排序">
            {getFieldDecorator('order', {
              initialValue: '',
              rules: [
                { required: false,message:'请输入0以上的正整数',pattern:/^[0-9]\d*$/},
                        ],
            })(
              <Input />
            )}
            <span>越小越靠前</span>
          </FormItem>
          
          <FormItem {...formItemLayout_radio} label="展示方式" className="collection-create-form_last-form-item">
            {getFieldDecorator('displayMode', {
              initialValue: 'public',
              rules: [{ required: true, message: '请选择展示方式!' }],
            })(
              <Radio.Group>
                <Radio value="public">按栏目列表页展示</Radio><span>注：选择这种方式，则前台按栏目列表展示该栏目下的文章</span><br />
                <Radio value="private">按频道页展示</Radio><span>注：选择这种方式，则前台按频道页展示该栏目下的所有内容</span>
              </Radio.Group>
            )}
          </FormItem>
          <h1>seo设置</h1>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              initialValue:'',
              rules: [{ required: true, message: '请输入seo标题!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="关键词">
            {getFieldDecorator('keyword', {
              rules: [{ required: false, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
            <span>多个关键词请用","隔开</span>
          </FormItem>
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </FormItem>
        </Form>
    </Modal>
  );
};

Content_ColumnAdd_Modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Content_ColumnAdd_Modal);