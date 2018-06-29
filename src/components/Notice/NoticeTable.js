import React from 'react';
import { Form, Row, Col, Input, Button, Table, Pagination, Badge, message, Popconfirm, Divider, InputNumber,Modal } from 'antd';
import style_pagination from '../pagination.css';
import { routerRedux, Link } from 'dva/router';
import { uploadUrl, residences } from "../../services/common"
function StandardTable({ data, loading, total, editorItem, deleteItem, handelchande, onShowSizeChange, pageSize, currentPage, fixSort }) {

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '发布人',
			dataIndex: 'addUser',
		},
		{
			title: '发布时间',
			dataIndex: 'addTime',
		},
		{
			title: '更新人',
			dataIndex: 'updateUser',
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
		},
		{
			title: '操作',
			render: (text, record) => (
				<span>
					<a onClick={() => editorItem(record)}>编辑</a>
					<Divider type="vertical" />
					<Popconfirm
						placement="topRight"
						title="是否删除"
						onConfirm={() => deleteItem(record)}
						okText="确定"
						cancelText="取消">
						<a>删除</a>
					</Popconfirm>

				</span>
			),
		},
	];

	const list = [
		{
			id: '1',
			categoryName: '新闻新闻新闻新闻新闻新闻新闻新闻...',
			userName: '人工添加'
		}
	]
	const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total: total,
		onChange: handelchande,
		onShowSizeChange: onShowSizeChange,
		pageSize: 25,
		current: currentPage
	};
	return (
		<div>
			<p>当前共有公告：{total}</p>
			<Table
				rowKey={record => record.id}
				loading={loading}
				dataSource={data}
				columns={columns}
				pagination={paginationProps}
			/>

		</div>
	)
}
export default StandardTable;
