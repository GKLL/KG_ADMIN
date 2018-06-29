import React from 'react';
import { Form, Row, Col, Input, Button, Table,Pagination,Badge,message, Popconfirm, Divider,InputNumber} from 'antd';
import style_pagination from '../pagination.css';
import { routerRedux, Link } from 'dva/router';

function StandardTable({data,loading,total,editorItem,deleteItem,handelchande,currentPage,fixSort,PushNewsFlashInfo}){
	const columns = [
		{
		  title: '快讯标题',
			dataIndex: 'newsflashTitle',
			width:200,
			render:(text,record)=>(
				<p className={style_pagination.contentText}>{text}</p>
				)
		},
		{
		  title: '快讯内容',
			dataIndex: 'newsflashText',
			width:300,
			render:(text,record)=>(
				<p className={style_pagination.contentText}>{text}</p>
				)
		},
		{
		  title: '快讯分类',
		  dataIndex: 'newsflashType',
			render:(text,record)=>(
				<span>
						{text==0&&'区块链快讯'}
						{text==1&&'金融快讯'}
						{text==2&&'股市快讯'}
				</span>
				)
		},
		{
		  title: '快讯来源',
		  dataIndex: 'remark',
		},
		{
		  title: '是否重要',
			dataIndex: 'level',
			render:(text,record)=>(
				<span>
						{text==0&&'不重要'}
						{text==1&&'重要'}
				</span>
				)
		},
		{
			title: '是否推送',
			dataIndex: 'ifPush',
			render:(text,record)=>(
				<span>
						{text==0&&'未推送'}
						{text==1&&'已推送'}
				</span>
				)
		},
		{
			title: '来源分类',
			dataIndex: 'newsflashOrigin',
			render:(text,record)=>(
				<span>
						{text==0&&'系统抓取'}
						{text==1&&'人工添加'}
				</span>
				)
		},
		{
			title: '发布人',
			dataIndex: 'createUserName',
		},
		{
			title: '发布时间',
			dataIndex: 'createDate',
		},
		{
			title: '更新人',
			dataIndex: 'updateUserName',
		},
		{
			title: '更新时间',
			dataIndex: 'updateDate',
		},
		{
			title: '显示状态',
			dataIndex: 'displayStatus',
			render:(text,record)=>(
				<span>
						{text==0&&'隐藏'}
						{text==1&&'显示'}
				</span>
				)
		},
		{
		  title: '操作',
		  render: (text,record) => (
			<span>
			  <a onClick={() => editorItem(record)}>编辑</a>
			  <Divider type="vertical" />
			  <Popconfirm 
			   placement="topRight" 
			   title="是否删除" 
			   onConfirm={() => deleteItem(record)} 
			   okText="确定" 
			   cancelText="取消">
				 <a  disabled={record.isCanDelete==0?true:false}>删除</a>
			  </Popconfirm>
			 
			</span>
		  ),
		},
	  ];
		
		
	  const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total:total,
		onChange:handelchande,
		pageSize:25,
		current:currentPage
	  };
	return(
	  <div>
		 <p>当前共有快讯：{total}<span style={{ marginLeft: 30 }}>今日已推送快讯：{PushNewsFlashInfo&&PushNewsFlashInfo.pushNewsFlashNumber}条</span></p>
		 <Table
			rowKey={record => record.newsflashId}
			loading={loading}
			dataSource={data}
			columns={columns}
			pagination={paginationProps}
		  />
		  
	  </div>
	  )
  }
  export default StandardTable;
  