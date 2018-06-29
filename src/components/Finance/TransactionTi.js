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
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_common from '../common.css';
import {options} from "../../services/common"

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const InputGroup = Input.Group;
const Transaction = ({
	loading,
	handlsearch,
	Examine,
	router,
	total,
	data,
	changepage,
	currentPage,
	BusinessType,
}) => {
	// console.log(currentPage)
	const columns = [{
		  title: '流水号',
		  dataIndex: 'flowId',
		  key: 'flowId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '类型',
		  dataIndex: 'businessTypeName',
		  key: 'businessTypeName',
		  render: text => <span>{text}</span>,
		}, {
		  title: '交易数额',
		  dataIndex: 'amount',
		  key: 'amount',
		}, {
		  title: '实际数额',
		  dataIndex: 'accountAmount',
		  key: 'accountAmount',
		}, {
		  title: '创建时间',
		  dataIndex: 'flowDate',
		  key: 'flowDate',
		}, {
		  title: '交易人手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		}, {
		  title: '昵称',
		  dataIndex: 'userName',
		  key: 'userName',
		  render:(text,record)=> (
		  	<span>{record.userName==null?"——":record.userName}</span>
		  	)
		}, {
		  title: '交易状态',
		  dataIndex: 'status',
		  key: 'status',
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    	<a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>详情</a>
		    </span>
		  ),
	}];
	
	
	
	class TableList extends React.Component {
			  
			   onShowSizeChange =(page) =>{
			      	console.log(page)
			      	changepage(page)
			      }
			   onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			    return (
			      <div>
			        <Table bordered size="default" columns={columns} locale={{emptyText:"暂无数据"}} dataSource={data} pagination = {false}  loading={loading} rowKey={record => record.flowId} />
	      	  
	      	        <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
			          
			      </div>
			    );
			  }
			}



	return (
		<div className = {style_common.contentDiv}>
	      <div className={style_search.search_result}>
	      	<TableList />
	      </div>
	    </div>
	);
};

Transaction.propTypes = {};

export default Form.create()(Transaction);
