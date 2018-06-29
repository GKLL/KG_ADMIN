import React from 'react';
import { Form, Row, Col, Input, Button, Table, Pagination, Badge, message, Popconfirm, Divider, InputNumber,Modal } from 'antd';
import style_pagination from '../pagination.css';
import { routerRedux, Link } from 'dva/router';
import { uploadUrl, residences } from "../../services/common"
function StandardTable({ data, loading, total, editorItem, deleteItem, handelchande, onShowSizeChange, pageSize, currentPage, fixSort }) {
	function showImg(imageAddress){
		Modal.info({
			title:'查看原图',
			width:'1000px',
			content:(
				<div style={{textAlign:'center',width:'800px'}} >
					<img src={uploadUrl+imageAddress} style={{maxWidth:'100%'}}/>
				</div>
			)
		})
	}
	const columns = [
		{
			title: '广告主名称',
			dataIndex: 'adverOwner',
		},
		{
			title: '广告标题',
			dataIndex: 'adverTitle',
		},
		{
			title: '广告样式',
			dataIndex: 'adverStyle',
			render: (text, record) => (
				<span>
					{text == 1 && "信息流"}
					{text == 2 && "图片广告"}
				</span>
			)
		},
		{
			title: '图片',
			dataIndex: 'imageAddress',
			render: (text, record) => (
				<span ><img src={record.imageAddress != "" ? uploadUrl + record.imageAddress : ''} style={{ width: '50px', height: "50px", display: 'inlineBlock', cursor: 'pointer' }} onClick={() => showImg(text)} /></span>
			)
		},
		{
			title: '显示端口',
			dataIndex: 'displayPort',
			render: (text, record) => (
				<span>
					{text == 1 && "千氪WEB"}
					{text == 2 && "千氪APP"}
					{text == 3 && "千氪专栏WEB"}
				</span>
			)
		},
		{
			title: '发布人',
			dataIndex: 'user',
		},
		{
			title: '发布时间',
			dataIndex: 'createDate',
		},
		{
			title: '显示状态',
			dataIndex: 'imageStatus',
			render: (text, record) => (
				<span>
					{text == 0 && "隐藏"}
					{text == 1 && "显示"}
				</span>
			)
		},
		{
			title: '显示位置',
			dataIndex: 'imagePos',
			render: (text, record) => {
				var cloumn = "";
				var subClounm = "";
				for (var i in residences) {
					if (record.navigatorPos == residences[i].value) {
						cloumn = residences[i].label
						for (var k in residences[i].children) {
							if (residences[i].children[k].value == record.imagePos) {
								subClounm = residences[i].children[k].label
							}
						}
					}

				}
				return (
					<span>
						{cloumn + '--' + subClounm}
					</span>
				)
			}
		},
		{
			title: '排序',
			dataIndex: 'imageOrder',
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
			sortOrder: '1',
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
			<p>当前共有广告：{total}</p>
			<Table
				rowKey={record => record.imageId}
				loading={loading}
				dataSource={data}
				columns={columns}
				pagination={paginationProps}
			/>

		</div>
	)
}
export default StandardTable;
