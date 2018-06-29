import React from 'react';
import { Form, Row, Col, Input, Button,Table,Tabs,Pagination,Popconfirm,Select,Cascader,Divider,InputNumber } from 'antd';

import style_pagination from '../pagination.css';
import { routerRedux,Link} from 'dva/router';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import {message,Badge} from 'antd';
const Content_Article = ({dispatch,currentPage,fixSort,PushAticleInfo,delArticle,router,total,ArticleList,confirm,setShowModal,article,onShowMOdal,handlsearch,editorItem,changepage,loading,ColumnList,getBonusList,sorterUserList}) => {
	let userId =localStorage.getItem("userId");

	const columns = [{
	  title: 'ID',
	  dataIndex: 'articleId',
	  key: 'articleId',
		width:95,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	}, {
	  title: '标题',
	  dataIndex: 'articleTitle',
	  key: 'articleTitle',
		width:180,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	}, {
	  title: '所属栏目',
	  dataIndex: 'clounm',
		key: 'clounm',
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '发布人',
	  dataIndex: 'createUser',
		key: 'createUser',
		width:90,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '发布时间',
	  dataIndex: 'createDate',
		key: 'createDate',
		width:100,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '是否设有奖励',
	  dataIndex: 'ifPlatformPublishAward',
		key: 'ifPlatformPublishAward',
		width:70,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text==1&&'是'}{text==0&&'否'}</span>:<span>{text==1&&'是'}{text==0&&'否'}</span>}</span>
			)
		}
	},{
	  title: '更新人',
	  dataIndex: 'updateUser',
		key: 'updateUser',
		width:90,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '更新时间',
	  dataIndex: 'updateDate',
		key: 'updateDate',
		width:100,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '状态',
	  dataIndex: 'publishStatus',
	  key: 'publishStatus',
	  width:90,
	  render(text,record){
	  	return(
	  		<span>
				{record.ifPush==1?<span >
						{text==0 && <Badge status="warning" text="草稿" style={{color:'#1890ff'}}/>}
		        {text==1 && <Badge status="success" text="通过" style={{color:'#1890ff'}}/>}
		        {text==2 && <Badge status="processing" text="审核中" style={{color:'#1890ff'}}/>}
		        {text==3 && <Badge status="error" text="未通过" style={{color:'#1890ff'}}/>}
						</span>
				   :<span>
						{text==0 && <Badge status="warning" text="草稿" />}
						{text==1 && <Badge status="success" text="通过" />}
						{text==2 && <Badge status="processing" text="审核中" />}
						{text==3 && <Badge status="error" text="未通过" />}
					 	</span>
				}
	  	
	  		</span>
	  		)
	  }
	},{
	  title: '审核人',
	  dataIndex: 'auditUser',
		key: 'auditUser',
		width:70,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '审核时间',
	  dataIndex: 'auditDate',
	  key: 'auditDate',
		width:100,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '显示状态',
	  dataIndex: 'displayStatusDisplay',
	  key: 'displayStatusDisplay',
	  width:60,
	  render(text,record){
	  	return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
		  		)
	  }
	},{
	  title: '访问量',
	  dataIndex: 'bowseNum',
	  key: 'bowseNum',
		sorter: true,
		render:(text,record)=>{
			return(
				<span>{record.ifPush==1?<span style={{color:'#1890ff'}}>{text}</span>:text}</span>
			)
		}
	},{
	  title: '排序',
	  dataIndex: 'displayOrder',
	  key: 'displayOrder',
	  render(text,record){
		  	return(
		  		<InputNumber min={0} defaultValue={text} onPressEnter={(text)=>fixSort(record,text)}style={{width:50}} onBlur={(text)=>fixSort(record,text)}/>
		  		)
		  }
	},{
	  title: '操作',
	  dataIndex: 'addrss',
	  key: 'addrss',
	  render: (text, record) => (
	    <span>
	      <a onClick={()=>editorItem(record)} >编辑</a>
	      <Divider type="vertical" />
	      <a onClick={()=>setShowModal(record)} disabled={record.publishStatus==1?false:true}>显示设置</a>
	      <Divider type="vertical" />
	      <a onClick={()=>delArticle(record,getBonusList)}  >查看阅读奖励</a>
	    </span>
	  )
	}];

	const hasSelected = ArticleList.length > 0;
	
	function onChange (key){
		
		if(key=="1"){
			console.log(key)
			dispatch(routerRedux.push('/content/content_article?page=1'))
		}else if(key == "2"){
			console.log(key)
			dispatch(routerRedux.push('/content/videoList?page=1'))
		}
	}
	class App extends React.Component {
		  state = {
		    selectedRowKeys: [], // Check here to configure the default column
		 
		  };
		 
		  onSelectChange = (selectedRowKeys,selectedRows) => {
			   // console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
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
	      handleTableChange= (pagination, filters, sorter)=>{
			    	// /console.log(filters,sorter)
			    	sorterUserList(sorter)
			    }
		  render() {
		    const { selectedRowKeys,selectedRows } = this.state;
		    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			};
		    const hasSelected = selectedRowKeys.length > 0;
		    return (
		    	<div>
		             <Table rowSelection={rowSelection} columns={columns} dataSource={ArticleList} pagination = {false}  rowKey={record => record.articleId} loading={loading} onChange={this.handleTableChange}/>
                     <Button type="primary" onClick={()=>onShowMOdal(selectedRows)} disabled={!hasSelected} size = 'large' style={{marginTop:"20px"}}>批量设置显示状态</Button>
                     <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage}onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
		        </div>
		    );
		  }
		}
  return (
    <div>
      
      <p>当前共有视频：{total}<span style={{marginLeft:30}}>今日已推送文章和视频：{PushAticleInfo&&PushAticleInfo.pushArticleNumber}条</span></p>
      <Tabs defaultActiveKey="2" onChange={onChange}>
	    <TabPane tab={<span>文章</span>} key="1">
      	    
      	</TabPane>
      	<TabPane tab={<span>视频</span>} key="2">
				     <App />
	    </TabPane>
	  </Tabs>
    </div>
  );
};

Content_Article.propTypes = {
};

export default Content_Article;

/*{
	  title: '奖励规则状态',
	  dataIndex: 'bonusStatus',
	  key: 'bonusStatus',
	  render:(text,record)=>(
	  	<span>{record.sysUser==null?<span>
	  		{record.bonusStatus ==0&&'未生效'}{record.bonusStatus ==1&&'已生效'}
	  	</span>:<span>——</span>}</span>
	  	)
	},*/