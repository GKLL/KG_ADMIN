import React from 'react';
import { Form, Row, Col, Badge,Input, Button,Table,Pagination,Popconfirm,Select,Cascader,Divider,	Modal} from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';

import style_pagination from '../pagination.css';
const FormItem = Form.Item;
const Option = Select.Option;
import {uploadUrl,residences} from "../../services/common"
let X = 0; //出事选中父选择器的
function Content_Image({data,total,currentPage,showModal,deleteItem,handlsearch,loading,editorItem,setStatus,changepage}) {

	//显示原图

	function showImg(imageAddress){
		Modal.info({
			title:'查看原图',
			width:'1000px',
			content:(
				<div style={{textAlign:'center',width:'800px'}} >
					<img src={uploadUrl+imageAddress} style={{maxWidth:'100%'}}/>
				</div>
			)
		})
	}
	//console.log('loading',loading)
	const columns = [{
	  title: '类型',
	  dataIndex: 'imageType',
	  key: 'imageType',
	  render:(text,record)=> (
	  	    <span>
	  	        {record.imageType === 1 && '资讯'}
	  	        {record.imageType === 2 && '广告'}
	  	        {record.imageType === 3 && '其他'}
							{record.imageType === 4 && '活动'}
	  	    </span>
	  	)
	}, {
	  title: '图片链接',
	  dataIndex: 'imageDetail',
	  key: 'imageDetail',
	}, {
	  title: '图片',
	  dataIndex: 'imageAddress',
	  key: 'imageAddress',
	  render:(text,record)=> (
	  	    <span ><img src ={record.imageAddress!=""?uploadUrl+record.imageAddress:''}  style={{width:'50px',height:"50px",display:'inlineBlock',cursor:'pointer'}} onClick={()=>showImg(text)}/></span>
	  	)
	},{
	  title: '发布人',
	  dataIndex: 'user',
	  key: 'user',
	},{
	  title: '发布时间',
	  dataIndex: 'createDate',
	  key: 'createDate',
	},{
	  title: '显示状态',
	  dataIndex: 'imageStatus',
	  key: 'imageStatus',
	  render:(text,record)=> (
	  	    <span>
						{record.imageStatus ==1&&<Badge status="success" text="显示" />}
						{record.imageStatus ==0&&<Badge status="default" text="隐藏" />
				}
					</span>
	  	)
	},{
	  title: '显示位置',
	  dataIndex: 'imagePos',
	  key: 'imagePos',
	  render:(text,record) => {
			var cloumn  = "";
			var subClounm = "";
			for(var i in residences){
				if(record.navigatorPos == residences[i].value){
					cloumn = residences[i].label
					for(var k in residences[i].children){
						if( residences[i].children[k].value == record.imagePos){
							subClounm = residences[i].children[k].label
						}
					}
				}
				
			}
			return(
				<span>
				   	{cloumn + '--'+subClounm}
				</span>
			)
		}
	},{
	  title: '排序',
	  dataIndex: 'imageOrder',
	  key: 'imageOrder',
	},{
	  title: '操作',
	  dataIndex: '3address',
	  key: '3address',
	  render: (text, record) => (
	    <span>
	      <a onClick={()=>editorItem(record)}>编辑</a>
	      <Divider type="vertical" />
	      <Popconfirm title="确定删除吗？"  placement="topRight"  onConfirm={()=>deleteItem(record)}  okText="确定" cancelText="取消">
		    <a href="#">删除</a>
		  </Popconfirm>
	    </span>
	  )
	}];
	
	const rowSelection = {
	  onChange: (selectedRowKeys, selectedRows) => {
	    //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  },
	  onSelect: (record, selected, selectedRows) => {
	   // console.log(record, selected, selectedRows);
	  },
	  onSelectAll: (selected, selectedRows, changeRows) => {
	   // console.log(selected, selectedRows, changeRows);
	  },
	};
	//const hasSelected = data.length > 0
	class TableList extends React.Component {
			  state = {
			    selectedRows: [], 
			    selectedRowKeys:[],
			  };
			  onSelectChange = (selectedRowKeys,selectedRows) => {
			   // console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			    this.setState({ 
			    	selectedRowKeys:selectedRowKeys,
			    	selectedRows:selectedRows
			    	 });
			  }
			  onShowSizeChange =(page) =>{
			      //	console.log(page)
			      	changepage(page)
			      }
			      onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			    const { selectedRowKeys,selectedRows} = this.state;
			    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			    };
			    const hasSelected = selectedRowKeys.length > 0;
			    return (
			      	<div style={{paddingBottom:50}}>
					      
					      <p >当前共有图片：{total}</p>
					      <Table style ={{marginTop:20}} columns={columns} rowSelection={rowSelection} dataSource={data} pagination = {false} rowKey={record => record.imageId+''} loading={loading}/>
					      <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage}onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>    
					    </div>
			    );
			  }
			}
	return (
			<TableList />
		)
}

Content_Image.propTypes = {
};
export default Content_Image;


{/*<Button type="primary" size = 'large' disabled={!hasSelected} onClick={()=>setStatus(selectedRows)}>批量设置显示状态</Button>*/}