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
	onEditItem,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {

	function handleOk() {
		
	}

	function Cancel() {
		onCancel()
		
	}
	function afterClose(){
			resetFields()
	}
	const modalOpts = {
		title: '管理岗位',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:1000,
		afterClose:afterClose

	};
	
	const Columns = [{
		title: '岗位名称',
		dataIndex: 'name',
		key: 'name',
		width:120
	}, {
		title: '包含权限',
		dataIndex: 'auth',
		key: 'auth',
		width:120
	}, {
		title: '状态',
		dataIndex: 'statusDisplay',
		key: 'statusDisplay',
		width:120,
	}, {
		title: '操作',
		key: 'action',
		width:120,
		render: (text, record, i) => {
			return (
				<div>
	              <a data-key={i} onClick={() => onEditItem(record)} style = {{marginRight:10}}>编辑</a>
	              <Popconfirm title={record.status==true?'确认禁用吗？':"确认启用吗？"} onConfirm={() => handleDel(record)}>
	                <a>{record.status==true?'禁用':"启用"}</a>
	              </Popconfirm>
                </div>
			)
		}
	}];
	return (

		<Modal {...modalOpts}>
			<div style ={{marginBottom:20+'px'}}><Button size='large' onClick={showModal}>添加岗位</Button></div>
			<Table columns={Columns} dataSource={data} rowKey={record => record.postId+''} pagination={false}/>
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