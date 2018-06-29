import React from 'react';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination} from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js'
import style_common from '../common.css'
const FormItem = Form.Item;
const Log_Admin = (props) => {
	const data = [{
	  key: '1',
	  name: 'John Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  name: 'Jim Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  name: 'Joe Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	}];
	const columns = [{
		  title: '管理员',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <span>{text}</span>,
		},{
		  title: '操作时间',
		  dataIndex: 'time',
		  key: 'time',
		},{
		  title: '动作描述',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      {record.name}
		    </span>
		  ),
	}];
	function onChange (pageNumber){
		console.log()
	}
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='管理员账号'>
		            {getFieldDecorator('phone')(
		              <Input placeholder="placeholder" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='关键词'>
		            {getFieldDecorator('email')(
		              <Input placeholder="placeholder" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='时间'>
		            {getFieldDecorator('word')(
		              <Input placeholder="placeholder" />
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
  return (
    <div className = {style_common.contentDiv}>
      <WrappedAdvancedSearchForm getFields = {getFields}/>
      <div className={style_search.search_result}>
      	<Table bordered columns={columns} dataSource={data} pagination = {false} />
      	<Pagination className = {style_pagination.pagination} showQuickJumper showSizeChanger  total={500} onChange={onChange} />
      </div>
    </div>
  );
};

Log_Admin.propTypes = {
};

export default Log_Admin;