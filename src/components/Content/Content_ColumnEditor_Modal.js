
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
const Content_ColumnEditor_Modal = ({
  visible,
  item = {},
  onOk,
  onCancel,
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
        id: item.id,
        ...getFieldsValue(),
        key: item.key
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
    title:item.columnLevel==1?"编辑一级栏目":"编辑二级栏目",
    visible,
    onOk: handleOk,
    onCancel: Cancel,
    maskClosable: false,
    width:'670px',
    okText:"确定",
    cancelText:"取消",
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
              initialValue:item.columnLevel==1?'0':item.partentId+'',
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select disabled>
                  <Option value="0">首页</Option>
                  <Option value={item.partentId+''}>{item.partentName}</Option>
              </Select>
              
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="栏目名称">
            {getFieldDecorator('cname', {
              id:item.id,
              initialValue:item&&item.name,
              rules: [
                 { required: true, message: '请输入栏目名称!' },
                 {type:'string',min:2,max:6,message:"2-6个字符,支持中英文",pattern:/^[a-zA-Z\u4e00-\u9fa5]+$/}
              ],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          {item&&item.columnLevel==1&&
             <FormItem {...formItemLayout} label="导航栏显示">

            {getFieldDecorator('navigatorDisplay', {
              initialValue:item!={}?String(item.navigatorDisplay):'',
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select disabled>
                  <Option value="2" >顶部导航</Option>
                  <Option value="3" >首页主导航</Option>
                  <Option value="1" >都显示</Option>
                  <Option value="0" >都不显示</Option>
              </Select>
            )}
          </FormItem>
          }
          {item&&item.columnLevel==2&&
             <FormItem {...formItemLayout} label="导航栏显示">

            {getFieldDecorator('navigatorDisplay', {
              initialValue:item!={}?String(item.navigatorDisplay):'',
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select disabled>
                  {item&&item.partantNavigator==1&&<Option value="1" >都显示</Option>}
                  {item&&item.partantNavigator==3&&<Option value="3" >首页主导航</Option>}
                  {item&&item.partantNavigator==2&&<Option value="2" >顶部导航</Option>}
                  {item&&item.partentDisplayMode == 2?<Option value="4" >频道页主导航</Option>:null}
                  <Option value="0">都不显示</Option>
              </Select>
            )}
          </FormItem>
          }
          <FormItem {...formItemLayout_radio} label="前台是否显示" className="collection-create-form_last-form-item">
            {getFieldDecorator('displayStatus', {
              initialValue: 'public',
               rules: [{ required: true, message: '请设置前台是否显示!' }],
            })(
              <Radio.Group>
                <Radio value="public">是</Radio>
                <Radio value="private">否</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="同级栏目排序">
            {getFieldDecorator('order', {
              initialValue: item&&item.columnOrder,
              rules: [{ required: false, message: '请输入排序' }],
            })(
              <Input />
            )}
            <span>越小越靠前</span>
          </FormItem>
          
          <FormItem {...formItemLayout_radio} label="展示方式" className="collection-create-form_last-form-item">
            {getFieldDecorator('displayMode', {
              initialValue: (item&&item.displayMode==1)?"public":"private",
              rules: [{ required: true, message: '请选择展示方式!' }],
            })(
              <Radio.Group>
                <Radio value="public">按栏目列表页展示</Radio><span>注：选择这种方式，则前台按栏目列表展示该栏目下的文章</span><br />
                <Radio value="private" disabled={(item&&item.columnLevel==1)?false:true}>按频道页展示</Radio><span>注：选择这种方式，则前台按频道页展示该栏目下的所有内容</span>
              </Radio.Group>
            )}
          </FormItem>
          <h1>seo设置</h1>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              initialValue:item&&item.title,
              rules: [{ required: true, message: '请输入seo标题!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="关键词">
            {getFieldDecorator('keyword', {
              initialValue:item&&item.keyword,
              rules: [{ required: false, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
            <span>多个关键词请用","隔开</span>
          </FormItem>
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('description',{
              initialValue:item&&item.description,
            })(<Input type="textarea" />)}
          </FormItem>
        </Form>
    </Modal>
  );
};

Content_ColumnEditor_Modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(Content_ColumnEditor_Modal);