import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Link,
	browserHistory
} from 'dva/router';
import { Form, Row, Col, Input, Button, Badge, Divider, Icon, Table, Pagination, Modal, DatePicker, Popconfirm, message, Select } from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_common from '../common.css';
import styles from './LoginForm.css';
import { options } from "../../services/common";
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const UserAdmin = ({
	loading,
	onSubmit,
	openModal,
	ExamineModal,
	deblocking,
	LockModal,
	userlist,
	handlsearch,
	Examine,
	conOk,
	LocksModal,
	router,
	total,
	changepage,
	currentPage,
	userData,
	sorterUserList,
	columnAuthen,
	canelColumn,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
	},
	forget
}) => {
	//console.log(userlist)

	function confirm(e) {
		//console.log(e);
		conOk(e)
	}

	const columns = [{
		title: '用户ID',
		dataIndex: 'userId',
		key: 'userId',
		width: 95,
		render: text => <span>{text}</span>,
	}, {
		title: '用户名',
		dataIndex: 'userName',
		key: 'userName',
		width: 100,
		render: text => <span>{text}</span>,
	}, {
		title: '手机号',
		dataIndex: 'userMobile',
		key: 'userMobile',
		width: 108,
	}, {
		title: '注册时间',
		dataIndex: 'createDate',
		key: 'createDate',
		width: 100,
	}, {
		title: '注册来源',
		dataIndex: 'registerOrigin',
		key: 'registerOrigin',
		width: 100,
		render: val => <span>{val==1&&"iOS"}{val==2&&"Android"}{val==3&&"千氪财经(WEB)"}{val==32&&"BTC123"}{val==33&&"钛值APP"}</span>,
	},{
		title: "师傅",
		dataIndex: 'parentUser',
		width: 100,
		render: (text, record) => (
			<span>{text != null ? text : "无"}</span>
		)
	}, {
		title: "邀新状态",
		dataIndex: 'inviteStatus',
		width: 100,
		render: (text, record) => (
			<span>
				{text == 0 && "无需审查"}
				{text == 1 && <span style={{ color: "#f5222d" }}>需审查</span>}
			</span>
		)
	}, {
		title: '角色',
		dataIndex: 'userRoleDisplay',
		key: 'userRoleDisplay',
		width: 100,
	},{
		title:'专栏认证',
		dataIndex: 'columnAuthed',
		width: 100,
		render:(text,record)=>(
			<span>
				{text == 0&&"未认证"}
				{text == 1&&"已认证"}
			</span>
		)
	},{
		title: '级别',
		dataIndex: 'userLevelDisplay',
		key: 'userLevelDisplay',
		width:100,
	}, {
		title: '最后活动时间',
		dataIndex: 'lastActiveTime',
		key: 'lastActiveTime',
		width: 100,
	}, {
		title: '发文量',
		dataIndex: 'articleNum',
		key: 'articleNum',
		sorter: true,
		width:100
	}, {
		title: '评论量',
		dataIndex: 'commentNum',
		key: 'commentNum',
		sorter: true,
		width: 100
	}, {
		title: '收藏量',
		dataIndex: 'collectNum',
		key: 'collectNum',
		sorter: true,
		width: 100
	}, {
		title: '分享量',
		dataIndex: 'shareNum',
		key: 'shareNum',
		sorter: true,
		width: 100
	}, {
		title: '审核状态',
		dataIndex: 'auditStatus',
		key: 'auditStatus',
		width: 100,
		render: (text, record) => {
			//console.log(text,record)
			return (
				<span>
					{text == 0 && <Badge status="processing" text="审核中" />}
					{text == 1 && <Badge status="success" text="通过" />}
					{(text == 2 || text == 3) && <Badge status="error" text="未通过" />}
				</span>
			)
		}
	}, {
		title: '审核人',
		dataIndex: 'auditor',
		key: 'auditor',
		width: 100,
	}, {
		title: '审核时间',
		dataIndex: 'auditDate',
		key: 'auditDate',
		width: 100,
	}, {
		title: '锁定状态',
		dataIndex: 'lockStatusDisplay',
		key: 'lockStatusDisplay',
		width: 90
	}, {
		title: '是否推荐',
		dataIndex: 'hotUser',
		key: 'hotUser',
		width: 60,
		render: text => <span>{text == true ? "是" : '否'}</span>,
	}, {
		title: '操作',
		key: 'action',
		widfth: 130,
		fixed: 'right',
		render: (text, record) => (
			<span>
				<a onClick={() => userData(record)}>查看</a>
				<Divider type="vertical" />
				{(record.auditStatus == 0 && record.applyRole != 1) ? <a onClick={() => Examine(record.userId)}>审核</a> :
					<a className={styles.audit}>审核</a>}
				<Divider type="vertical" />
				{record.lockStatus == 2 ? <Popconfirm title="是否确认解锁?" onConfirm={() => confirm(record)} okText="确认" cancelText="取消">
					<a>解锁</a>
				</Popconfirm> :
					<a onClick={() => LockModal(record)}>锁定</a>}
				<Divider type="vertical" />
				{record.userRole == 1 ? <a className={styles.audit}>推荐设置</a> : <a onClick={() => openModal(record)}>推荐设置</a>}
				<Divider type="vertical" />
				{record.columnAuthed ==0?<a disabled ={(record.userRole!=1&&record.auditStatus==1)?false:true} onClick={()=>columnAuthen(record)}>专栏认证</a> :
				<a disabled ={(record.userRole!=1&&record.auditStatus==1)?false:true} onClick={()=>canelColumn(record)}>取消专栏认证</a> 
				}
				
			</span>
		),
	}];
	function onChange(pageNumber) {

	}


	const hasSelected = userlist.length > 0


	class TableList extends React.Component {
		state = {
			selectedRows: [],
			selectedRowKeys: [],
		};
		onSelectChange = (selectedRowKeys, selectedRows) => {
			console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
			this.setState({
				selectedRowKeys: selectedRowKeys,
				selectedRows: selectedRows
			});
		}
		onShowSizeChange = (page) => {
			console.log(page)
			changepage(page)
		}
		onChange = (page) => {
			changepage(page)
		}
		handleTableChange = (pagination, filters, sorter) => {
			// /console.log(filters,sorter)
			sorterUserList(sorter)
		}
		render() {
			const { selectedRowKeys, selectedRows } = this.state;
			const rowSelection = {
				selectedRowKeys,
				fixed: true,
				onChange: this.onSelectChange,
			};
			const hasSelected = selectedRowKeys.length > 0;
			return (
				<div>
					<Table columns={columns} dataSource={userlist} pagination={false} rowSelection={rowSelection} loading={loading} rowKey={record => record.userId}
						onChange={this.handleTableChange}
						scroll={{ x: 2300 }}
					/>
					<div className="table-operations" >
						<Button type="primary" size='large' disabled={!hasSelected} onClick={() => ExamineModal(selectedRows)}>批量审核</Button>
						<Button type="primary" size='large' style={{ marginLeft: 20, marginTop: 20 }} disabled={!hasSelected} onClick={() => LocksModal(selectedRows)}>批量锁定</Button>
						<Button type="primary" size='large' style={{ marginLeft: 20, marginTop: 20 }} disabled={!hasSelected} onClick={() => deblocking(selectedRows)}>批量解锁</Button>
						<Pagination className={style_pagination.pagination} showQuickJumper current={currentPage} onShowSizeChange={this.onShowSizeChange} total={total} onChange={this.onChange} pageSize={25} />
					</div>
				</div>
			);
		}
	}



	return (
		<div className={style_common.contentDiv}>

			<div className={style_search.search_result}>
				<p>当前共有用户：{total}</p>
				<TableList />
			</div>
		</div>
	);
};

UserAdmin.propTypes = {};

export default Form.create()(UserAdmin);
