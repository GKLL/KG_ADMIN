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
import { Form, Row, Col, Input, Button,Badge,Icon,Table,Pagination,Modal,DatePicker,Popconfirm, message,Select} from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_common from '../common.css';
import {options} from "../../services/common";
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Manage = ({
	loading,
	handlsearch,
	router,
	total,
	changepage,
	currentPage,
	data,
	onEdit,
	Examine,

}) => {
	//console.log(userlist)

	function confirm(e) {
       //console.log(e);
       conOk(e)
  }
  	
	const columns = [{
		  title: '提现流水号',
		  dataIndex: 'flowId',
		  key: 'flowId',
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
		  title: '提现地址',
		  dataIndex: 'toAddress',
		  key: 'toAddress',
		  render:(text,record)=> (
		  	<span>{record.toAddress==null?"——":record.toAddress}</span>
		  	)
		}, {
		  title: '提现数(钛小白)',
		  dataIndex: 'withdrawAmount',
		  key: 'withdrawAmount',
		}, {
		  title: '实际到账数(钛小白)',
		  dataIndex: 'accountAmount',
		  key: 'accountAmount',
		}, {
		  title: '提现时间',
		  dataIndex: 'withdrawTime',
		  key: 'withdrawTime',
		}, {
		  title: '到账时间',
		  dataIndex: 'accountTime',
		  key: 'accountTime',
		  render:(text,record)=> (
		  	<span>{record.accountTime==null?"——":record.accountTime}</span>
		  	)
		}, {
		  title: '状态',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		  render:(text,record)=>(
		  	<span>
		  		{record.status==1 && <Badge status="success" text={text} />}
		  		{record.status==2 && <Badge status="error" text={text} />}
		  		{record.status==0 && <Badge status="processing" text={text} />}
		  	</span>
		  	)
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    {record.status==0?<a style={{marginRight:10+"px"}} onClick={()=>onEdit(record)}>审核</a>:
		    <a style={{marginRight:10+"px",color:"#e5e5e5"}} >审核</a>}
		    <a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>详情</a>
         	
		    </span>
		  ),
	}];
	function onChange (pageNumber){
		console.log()
	}
	
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='邮箱'>
		            {getFieldDecorator('email')(
		              <Input type="email"placeholder="请输入邮箱" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='提现时间'>
		            {getFieldDecorator('time')(
		              <RangePicker locale={options}/>
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='提现状态'>
		            {getFieldDecorator('status')(
		              <Select   placeholder="请选择">
					      <Option value="0">审核中</Option>
					      <Option value="1">已通过</Option>
					      <Option value="2">已撤销</Option>
					  </Select>
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	class TableList extends React.Component {
			  state = {
			    selectedRows: [], 
			    selectedRowKeys:[],
			    loading: false,
			  };
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
			        <Table bordered columns={columns} locale={{emptyText:"暂无数据"}} dataSource={data} pagination = {false} loading={loading} rowKey={record => record.flowId} />
	      	        <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
			          
			      </div>
			    );
			  }
			}



	return (
		<div className = {style_common.contentDiv}>
	      <WrappedAdvancedSearchForm getFields = {getFields} handlsearch={handlsearch}/>
	      <div className={style_search.search_result}>
	      	<TableList />
	      </div>
	    </div>
	);
};

Manage.propTypes = {};

export default Form.create()(Manage);
