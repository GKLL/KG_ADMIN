import React, {
  PropTypes
} from 'react';
import {
  Form,
  Select,
  Input,
  Modal,
  Button,
  Table,
  Popconfirm 
} from 'antd';
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ManageModal = ({
  visible,
  item = {},
  data,
  type,
  onOk,
  onCancel,
  showModal,
  handleDel,
  addGetUser,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    resetFields
  },
}) => {
  //console.log(data)
  function handleOk() {
    
  }

  function Cancel() {
    onCancel()
    
  }
  function afterClose(){
      resetFields()
  }
  const modalOpts = {
    title: '已关联前台用户',
    visible,
    onOk: handleOk,
    onCancel: Cancel,
    maskClosable: false,
    afterClose:afterClose,
    footer:null
  };
  
  const Columns = [{
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '专栏名',
    dataIndex: 'kgUsername',
    key: 'kgUsername',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, i) => {
      return (
        <div>
            <Popconfirm 
            placement="topRight"  
            title="确认解绑吗？" 
            onConfirm={() => handleDel(record,item)}>
              <a>解绑</a>
            </Popconfirm>
        </div>
      )
    }
  }];
  return (

    <Modal {...modalOpts}>
      <Table columns={Columns} dataSource={data} rowKey={record => record.relId+''} pagination={false}/>
       <Button type="primary" icon="plus" style={{marginTop:20}} onClick={()=>addGetUser(item)}>新增</Button>
    </Modal>
  );
};

ManageModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(ManageModal);