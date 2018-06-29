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
import styles from './LoginForm.css';
import {uploadUrl,options} from '../../services/common'
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RealName = ({
	loading,
	data,
	openModal,
	ExamineModal,
	deblocking,
	LockModal,
	userlist,
	handlsearch,
	Examine,
	conOk,
	showIdCard,
	router,
	total,
	changepage,
	currentPage,
	
}) => {
//	console.log('loading',loading)

	const columns = [{
		  title: '用户ID',
		  dataIndex: 'userId',
		  key: 'userId',
		  render: text => <span>{text}</span>,
		}, /*{
		  title: '昵称',
		  dataIndex: 'auditUserName',
		  key: 'auditUserName',
		  render: text => <span>{text}</span>,
		}, {
		  title: '邮箱',
		  dataIndex: 'emailemail',
		  key: 'email',
		},*/ {
		  title: '手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		}, {
		  title: '身份证',
		  dataIndex: 'IdCard',
		  key: 'IdCard',
		  render: (text, record) => (
		    <div>
		    	<p onClick={()=>showIdCard(record)}><img src={uploadUrl+record.idcardFront} style={{width:50,height:50}}/></p>
		    </div>
		    )
		}, {
		  title: '认证信息',
		  dataIndex: 'info',
		  key: 'info',
		  render: (text, record) => (
		    <div>
		    	{record.realname}
		    	<br />
         		{record.idcardNo}
		    </div>
		  ),
		}, {
		  title: '所属地区',
		  dataIndex: 'userArea',
		  key: 'userArea',
		},{
		  title: '年龄',
		  dataIndex: 'userAge',
		  key: 'userAge',
		  render: (text, record) => (
		    <div>
		    	<p>{text}</p>
		    </div>
		  ),

		},{
		  title: '提交时间',
		  dataIndex: 'createDate',
		  key: 'createDate',
		}, {
		  title: '审核状态',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		}, {
		  title: '审核人',
		  dataIndex: 'auditUser',
		  key: 'auditUser',
		}, {
		  title: '审核时间',
		  dataIndex: 'auditDate',
		  key: 'auditDate',
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    <a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>{record.status==1?"取消通过":"审核"}</a>
         	
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
			  onSelectChange = (selectedRowKeys,selectedRows) => {
			    console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			    this.setState({ 
			    	selectedRowKeys:selectedRowKeys,
			    	selectedRows:selectedRows
			    	 });
			  }
			   onShowSizeChange =(page) =>{
			      	console.log(page)
			      	changepage(page)
			      }
			   onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			    const {selectedRowKeys,selectedRows} = this.state;
			    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			    };
			    const hasSelected = selectedRowKeys.length > 0;
			    return (
			      <div>
			        <Table bordered columns={columns} dataSource={data} pagination = {false} rowSelection={rowSelection} loading={loading} rowKey={record => record.userId} locale={{emptyText:"暂无数据"}}/>
	      	        <div className="table-operations" >
		            {/* <Button type="primary" size='large' disabled={!hasSelected} onClick={()=>ExamineModal(selectedRows)} style={{marginTop:20}}>批量审核</Button> */}
				    <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
		           </div>
	      	
			          
			      </div>
			    );
			  }
			}



	return (
		<div className = {style_common.contentDiv}>
	      <div className={style_search.search_result}>
	        <p>当前共有实名认证用户：{total}</p>
	      	<TableList />
	      </div>
	    </div>
	);
};

RealName.propTypes = {};

export default Form.create()(RealName);
