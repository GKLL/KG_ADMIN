import React, { PureComponent } from 'react';
import {
	connect
} from 'dva';

import { Form, Row, Col, Input, Button, Badge, Divider, Icon, Table, Pagination, Modal, DatePicker, Popconfirm, message, Select } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
import {previewUrl} from '../../services/common';
import style_pagination from '../pagination.css';
import style_search from '../search.css';
import style_common from '../common.css';
function StandardTable({ data, loading, pageSize, totalPrice,getAdditionalModal,handelchande,Thaw,getFrozenData,canelMarkArticle, currentPage, total, MarkArticle, getDeitlData, showModal,sorterUserList }) {
	// console.log(data)
	const columns = [
		{
			title: '文章ID',
			dataIndex: 'articleId',
			width:100,
		},
		{
			title: '标题',
			dataIndex: 'articleTitle',
			width:150,
		},
		{
			title: '所属分类',
			dataIndex: 'clounm',
			align: 'left',
		}, {
			title: '发布人',
			dataIndex: 'publisher',
			align: 'left',
		}, , {
			title: '发布时间',
			dataIndex: 'publishTime',
			render: val => <span>{val == null ? "——" : moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		}, , {
			title: '审核时间',
			dataIndex: 'auditTime',
			render: val => <span>{val == null ? "——" : moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		}, {
			title: '显示状态',
			dataIndex: 'displayStatus',
			render: val =>  <span>
								{val == 1&&"正常显示"}
								{val == 2&&"首页置顶"}
								{val == 3&&"首页推荐"}
								{val == 4&&"前台隐藏"}
							</span>,
		}, {
			title: '访问量',
			dataIndex: 'bowseNum',
			align: 'left',
			sorter:true,
			width:80,
		}, {
			title: '分享量',
			dataIndex: 'shareNum',
			align: 'left',
			sorter:true,
			width:80,
		}, {
			title: '发文奖励',
			dataIndex: 'amount',
			align: 'left',
			width:80,
			render: val => <span>{val == null ? "——" : val + 'TV'}</span>,
		}, {
			title: '进贡师傅',
			dataIndex: 'tributeAmount',
		}, {
			title: '额外奖励',
			dataIndex: 'addedBonus',
			render: (text, record) => (
				<span>
					{record.tvAmount !=null && record.tvAmount + 'TV'}
					{record.txbAmount !=null && record.txbAmount + "KG"}
					{(record.tvAmount == null && record.txbAmount==null )&&"无"}
				</span>
			)
		}, {
			title: '标识',
			dataIndex: 'isMarkArticle',
			width:70,
			render: val => <span>{val == 1 ? "优质原创文章" : "无"}</span>,
		}, {
			title: '额外奖励发放人',
			dataIndex: 'checkMan',
			width:80,
		}, {
			title: '奖励状态',
			dataIndex: 'publishBonusStatus',
			width:100,
			render: val => <span>{val == 0 && <Badge status="error"text="冻结"/>}{val == 1 && <Badge status="success" text="正常发放" />}{val == 2 &&<Badge status="success" text="正常发放" />}</span>,
		},
		{
			title: '操作',
			dataIndex: 'action',
			render: (text, record) => (
				<span>
				    {record.publishBonusStatus ==2&&<span><a onClick={() => getFrozenData(record)}>冻结</a><Divider type="vertical" /></span>}
					{record.publishBonusStatus ==0&&<Popconfirm
					placement="topRight" 
					title="确定解冻吗?" 
					onConfirm={() => Thaw(record)} 
					okText="确定" 
					cancelText="取消" 
					><a>解冻</a>
					<Divider type="vertical" />
					</Popconfirm>
					}
					<a href={previewUrl+'?id='+Base64.encode(record.articleId)+'_'} target="view_window">查看文章详情</a>
					
					{record.isAddBonus ==0&&<span><Divider type="vertical" /><a onClick={() => getAdditionalModal(record)}>额外奖励</a></span>}
					{record.publishBonusStatus != 0?<span><Divider type="vertical" />{record.isMarkArticle == 0 ?<Popconfirm
					placement="topRight" 
					title="确定标为优质原创文章吗?" 
					onConfirm={() => MarkArticle(record)} 
					okText="确定" 
					cancelText="取消" 
					><a>标为优质原创文章</a>
					</Popconfirm>:<Popconfirm
					placement="topRight" 
					title="确定取消优质原创文章标识吗?" 
					onConfirm={() => canelMarkArticle(record)} 
					okText="确定" 
					cancelText="取消" 
					><a>取消优质原创标识</a>
					</Popconfirm>
					}</span>:null}
					
				</span>
			),
		},
	];
	const list = [{
		"no": 1,
		"description": "这是一段描述",
		"callNo": "杨XX"
	}]
	const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total: total,
		onChange: handelchande,
		current: currentPage,
		pageSize: 25

	};

	class App extends React.Component {
		state = {
			selectedRowKeys: [], // Check here to configure the default column

		};

		onSelectChange = (selectedRowKeys, selectedRows) => {
			// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			this.setState({
				selectedRowKeys: selectedRowKeys,
				selectedRows: selectedRows
			});
		}
		onShowSizeChange = (page, pageSize) => {
			//console.log(page)
			handelchande(page, pageSize)
		}
		onChange = (page, pageSize) => {
			handelchande(page, pageSize)
		}
		handleTableChange= (pagination, filters, sorter)=>{
			// /console.log(filters,sorter)
			sorterUserList(sorter)
		}
		render() {
			const { selectedRowKeys, selectedRows } = this.state;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
			};

			return (
				<div>
					<div>当前发出奖励：{totalPrice&&totalPrice}</div>
					<Table columns={columns} dataSource={data} rowKey={record => record.articleId} loading={loading} pagination={false} onChange={this.handleTableChange}/>
					<Pagination className={style_pagination.pagination} showQuickJumper current={currentPage} onShowSizeChange={this.onShowSizeChange} total={total} onChange={this.onChange} pageSize={25} />
				</div>
			);
		}
	}
	return (
		<div className={style_common.contentDiv}>

			<div className={style_search.search_result}>
			
				<App />
			</div>
		</div>
	);
};

export default StandardTable;