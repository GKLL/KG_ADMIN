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
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,DatePicker,Popconfirm, message,Select} from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import style_common from '../common.css';
import {options} from "../../services/common"
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Recharge = ({
	loading,
	data,
	total,
	router,
	changepage,
	currentPage,
	handlsearch,
	Examine,
}) => {
  	console.log("loading",loading)
	const columns = [{
		  title: '充值流水号',
		  dataIndex: 'flowId',
		  key: 'flowId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '用户ID',
		  dataIndex: 'userId',
		  key: 'userId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '邮箱',
		  dataIndex: 'email',
		  key: 'email',
		  render:(text,record)=> (
		  	<span>{record.email==null?"——":record.email}</span>
		  	)
		}, {
		  title: '手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		  render:(text,record)=> (
		  	<span>{record.mobile==null?"——":record.mobile}</span>
		  	)
		}, {
		  title: '充值数(TV)',
		  dataIndex: 'amount',
		  key: 'amount',
		}, {
		  title: '充值时间',
		  dataIndex: 'rechargeTime',
		  key: 'rechargeTime',
		}, {
		  title: '到账时间',
		  dataIndex: 'accountTime',
		  key: 'accountTime',
		}, {
		  title: '备注信息',
		  dataIndex: 'remark',
		  key: 'remark',
		  render:(text,record)=> (
		  	<span>{record.remark==null?"——":record.remark}</span>
		  	)
		}, {
		  title: '状态',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    <a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>详情</a>
         	
		    </span>
		  ),
	}];
	function onChange (pageNumber){
		console.log()
	}
	
	

	class TableList extends React.Component {
			  state = {
			    selectedRows: [], 
			    selectedRowKeys:[],
			  };
			  onShowSizeChange =(page) =>{
			      
			      	changepage(page)
			      }
			   onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			   
			    return (
			      <div>
			        <Table bordered columns={columns} locale={{emptyText:"暂无数据"}} dataSource={data} pagination = {false} loading={loading} rowKey={record => record.flowId} />
	      	        <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
			          
			      </div>
			    );
			  }
			}
	return (
		<div className = {style_common.contentDiv}>
				<div>当前用户充值总数：{total}</div>
	      <div className={style_search.search_result}>
	      	<TableList />
	      </div>
	    </div>
	);
};
Recharge.propTypes = {};
export default Form.create()(Recharge);
