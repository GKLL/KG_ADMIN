import React from 'react';
import {Link} from 'react-router'
import { Form, Row, Col, Input,message, Button,Table,Pagination,Popconfirm,DatePicker, TimePicker,Select,Divider} from 'antd';

import style_pagination from '../pagination.css';
import {options} from "../../services/common";

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
function Content_Opinion({data,total,confirm,handlsearch,currentPage,delFeeks,onEditor,loading,changepage}) {
	const columns = [{
	  title: 'ID',
	  dataIndex: 'id',
	  key: 'id',
	}, {
	  title: '反馈内容',
	  dataIndex: 'content',
	  key: 'content',
	  width:500,
	  className:"conten",
	  render:(text,record)=>(
	  	<p className={style_pagination.contentText}>{text}</p>
	  	)
	}, {
	  title: '邮箱',
	  dataIndex: 'email',
	  key: 'email',
	},{
	  title: '手机号',
	  dataIndex: 'phone',
	  key: 'phone',
	},{
	  title: '提交时间',
	  dataIndex: 'createDate',
	  key: 'createDate',
	},{
	  title: '阅读状态',
	  dataIndex: 'statusDisplay',
	  key: 'statusDisplay',
	},{
		 	title: '来源',
		 	dataIndex: 'fromType',
		 	key: 'fromType',
		 	render: val => <span>{val==1&&"WEB"}{val==2&&"APP"}</span>,	
		},{
	  title: '操作',
	  dataIndex: '3address',
	  key: '3address',
	  render: (text, record) => (
	    <span>
	      <a onClick={()=>onEditor(record)} className = "action_font">查看</a>
				<Divider type="vertical" />
	      <Popconfirm title="确定删除吗？" placement="topRight" onConfirm={()=>confirm(record)}  okText="是" cancelText="否">
		    <a className = "action_font" >删除</a>
		  </Popconfirm>
	    </span>
	  )
	}];

	const rowSelection = {
	  onChange: (selectedRowKeys, selectedRows) => {
	   // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  },
	  onSelect: (record, selected, selectedRows) => {
	   // console.log(record, selected, selectedRows);
	  },
	  onSelectAll: (selected, selectedRows, changeRows) => {
	   // console.log(selected, selectedRows, changeRows);
	  },
	};

	
	function onChange(){

	}
	class Content extends React.Component{
		state = {
		    selectedRows: [], 
		    selectedRowKeys:[],
		   
	    }
	    onSelectChange = (selectedRowKeys,selectedRows) => {
			    console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			    this.setState({ 
			    	selectedRowKeys:selectedRowKeys,
			    	selectedRows:selectedRows
			    	 });
	    }
	    onChange =(page) => {
	    //	console.log("2",page)
	    	changepage(page)
	    }
	    onShowSizeChange =(page) => {
	    //	console.log("1",page)
	    }
		render(){
			const {  selectedRowKeys,selectedRows} = this.state;
			const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			    };
			const hasSelected = selectedRowKeys.length > 0;
			return (
			    <div>
			      <div>
			      	<p >当前共有反馈数：{total}</p>
			      </div>
			      <Table style ={{marginTop:20, tableLayout: 'fixed'}} bordered columns={columns} rowKey={record => record.id+''} rowSelection={rowSelection} dataSource={data} pagination = {false} locale={{emptyText:"暂无数据"}} loading={loading}/>
			      <Pagination className = {style_pagination.pagination} current={currentPage} showQuickJumper onShowSizeChange={this.onShowSizeChange}  pageSize={25} total={total} onChange={this.onChange} />
			      <Button type="primary" size = 'large' disabled={!hasSelected} onClick={()=>delFeeks(selectedRows)} style ={{marginTop:20}} >删除</Button>
			    </div>
			  );
			};
	}


   return (
   		 <Content />
   	)


}



Content_Opinion.propTypes = {
};

export default Content_Opinion;

