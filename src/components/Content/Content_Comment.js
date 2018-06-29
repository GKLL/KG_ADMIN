import React from 'react';
import { Form, Row, Card, Col, Input, Button, Table, Pagination, Popconfirm, Badge, Select, DatePicker,Divider } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import { options } from "../../services/common";
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
function Content_Comment({ data, opinionSetModal, changepage, showSet, confirm, showSets, audit, handlsearch, currentPage, loading, total }) {
	//	console.log("loading",loading)
	const columns = [{
		title: '评论内容',
		dataIndex: 'content',
		key: 'content',
		width: 600,
		render: (text, record) => (
			<span>
				<p>{text}</p>
				<p>来自文章《<a>{record.articleTitle}</a>》</p>
			</span>
		)
	}, {
		title: '评论人',
		dataIndex: 'user',
		key: 'user',
	}, {
		title: '评论时间',
		dataIndex: 'createDate',
		key: 'createDate',
	}, {
		title: '状态',
		dataIndex: 'statusDisplay',
		key: 'statusDisplay',
		render: (text, record) => (
			<span>
				{record.status == 0 && <Badge status="processing" text={text} />}
				{record.status == 1 && <Badge status="success" text={text} />}
				{record.status == 2 && <Badge status="error" text={text} />}
			</span>
		)
	}, {
		title: '显示状态',
		dataIndex: 'displayStatusDisplay',
		key: 'displayStatusDisplay',
	}, {
		title: '评论人',
		dataIndex: 'userName',
		key: 'userName',
	}, {
		title: '操作',
		dataIndex: '3address',
		key: '3address',
		render: (text, record) => (
			<span>
				{record.status == 1 ? <span className="action_font" style={{ color: '#e5e5e5' }}>审核</span> :
					<a className="action_font" onClick={() => audit(record)} >审核</a>
				}
				<Divider type="vertical" />
				<a className="action_font" onClick={() => showSet(record)}>显示设置</a>
				<Divider type="vertical" />
				<Popconfirm title="确定删除吗？" placement="topRight" onConfirm={() => confirm(record)} okText="是" cancelText="否">
					<a href="#" className="action_font">删除</a>
				</Popconfirm>
			</span>
		)
	}];

	function onChange() {

	}
	const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total:total,
		onChange:changepage,
		onShowSizeChange:changepage,
		pageSize:25,
		current:currentPage
	  };
	class Content extends React.Component {
		constructor() {
			super();
			this.state = {
				collapsed: false,
				selectedRowKeys: [], // Check here to configure the default column
				visible: false,
				showVisible: false,
			};

		}
		opinionSetModal() {
			this.setState({
				visible: true
			})
		}
		showOpinionSetModal() {
			this.setState({
				showVisible: true
			})
		}
		handleCancel() {
			this.setState({
				visible: false,
				showVisible: false
			})
		}
		handleCreate() {
			this.setState({
				visible: true,
				showVisible: true
			})
		}
		onShowSizeChange = (page) => {
			console.log(page)
			changepage(page)
		}
		onChange = (page) => {
			changepage(page)
		}
		onSelectChange = (selectedRowKeys, selectedRows) => {
			// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			this.setState({
				selectedRowKeys: selectedRowKeys,
				selectedRows: selectedRows
			});
		}
		render() {
			const { selectedRowKeys, selectedRows } = this.state;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
			};
			const hasSelected = selectedRowKeys.length > 0;
			return (
				<div>
					<Card title={"当前共有评论：" + total} extra={<Button type="primary" size='large' onClick={opinionSetModal}>评论审核设置</Button>} bordered={false}>

					</Card>
					<Table bordered columns={columns} rowSelection={rowSelection} dataSource={data} pagination={paginationProps} loading={loading} rowKey={record => record.commentId} />
				</div>
			);
		};
	}
	return (

		<Content />
	)
}



Content_Comment.propTypes = {
};

export default Content_Comment;

{/*<Button type="primary" size = 'large' disabled={!hasSelected} onClick={()=>showSets(selectedRows)}>批量设置显示状态</Button>*/ }