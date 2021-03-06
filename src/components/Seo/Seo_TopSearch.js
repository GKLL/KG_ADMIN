import React from 'react';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination} from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import Seo_TopSearchAdd_Modal from './Seo_TopSearchAdd_Modal.js';
import style_common from '../common.css'
const FormItem = Form.Item;
class Seo_TopSearch extends React.Component{
	constructor(){
		super();
		this.state = {
			visible:false
		};
		this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
	}
	showModal(){
		this.setState({
			visible:true
		})
	}
	handleCancel(){
		this.setState({
			visible:false
		})
	}
	handleCreate(){
		this.setState({
			visible:true
		})
	}
	render(){
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
		  title: '热搜词',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <span>{text}</span>,
		},{
		  title: '发布人',
		  dataIndex: '5time',
		  key: '5time',
		},{
		  title: '发布时间',
		  dataIndex: '4time',
		  key: '4time',
		},{
		  title: '显示状态',
		  dataIndex: '3time',
		  key: '3time',
		},{
		  title: '排序',
		  dataIndex: '1time',
		  key: '1time',
		},{
		  title: '操作',
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
		          <FormItem {...formItemLayout} label='热搜词'>
		            {getFieldDecorator('phone')(
		              <Input placeholder="placeholder" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='显示状态'>
		            {getFieldDecorator('email')(
		              <Input placeholder="placeholder" />
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
		const rowSelection = {
	  onChange: (selectedRowKeys, selectedRows) => {
	    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  },
	  onSelect: (record, selected, selectedRows) => {
	    console.log(record, selected, selectedRows);
	  },
	  onSelectAll: (selected, selectedRows, changeRows) => {
	    console.log(selected, selectedRows, changeRows);
	  },
	};
  return (
    <div className = {style_common.contentDiv}>
      <Button type="primary" size = 'large' onClick = {this.showModal}>添加热搜词</Button>
      <WrappedAdvancedSearchForm getFields = {getFields}/>
      <Table bordered columns={columns} rowSelection={rowSelection} dataSource={data} pagination = {false} />
      <Pagination className = {style_pagination.pagination} showQuickJumper showSizeChanger  total={500} onChange={onChange} />
      <Button type="primary" size = 'large'>删除</Button>
      <Seo_TopSearchAdd_Modal 
	     visible={this.state.visible}
	     onCancel={this.handleCancel}
	     onCreate={this.handleCreate}
      />
    </div>
  );
};
}
Seo_TopSearch.propTypes = {
};

export default Seo_TopSearch;