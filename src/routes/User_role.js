import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Popconfirm,message,Modal} from 'antd';
import SetUserModal from '../components/User/SetUserModal';
import stytes from './UserLoginPage.css';


function UserRole({location,dispatch,user,router,}) {
	
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {UserVisible,userRoleList,RoleProfile,currentItem} =user;
	const data =[{
		'Id':1,
		'name':'xx',
		
	}]
	
	
	
	function showModal(record){
		dispatch({
			type: 'user/getRoleProfile',
			payload:{
				id:record.id,
			}
		});
		dispatch({
			type: 'user/showUserModal',
			payload:{
				currentItem:record,
			}
		});
		
	}
	
	
	const SetUserModalProps ={
		visible:UserVisible,
		RoleProfile,
		item:currentItem,
		onCancel:function(){
			dispatch({
			type: 'user/hideUserModal',
		});
		}
		
	}
	
	function confirm(e) {
	  console.log(e);
	  message.success('Click on Yes');
	}
	
	function cancel(e) {
	  console.log(e);
	  message.error('Click on No');
	}
	
	function info(data){
		
		Modal.info({
	    title: '查看用户角色信息',
	    width:'600',
	    content: (
	      <div>
	        <table className={stytes.table}>
						<tr><td>角色ID</td><td>{data.id}</td><td>角色名称</td><td>{data.name}</td></tr>
						<tr><td>包含级别</td><td>{data.levels}</td><td>包含用户数</td><td>{data.userCount}</td></tr>
						<tr><td>当前状态</td><td>{data.statusDisplay}</td></tr>
			</table>
	      </div>
	    ),
	    onOk() {},
	  });
		
	}


	function setStatus(record) {
		Modal.confirm({
		    title: record.status==true?"确认是否禁用？":"确认是否启用？",  
		    onOk() {
		      dispatch({
		      	type:"user/roleSetStatus",
		      	payload:{
		      		id:record.id
		      	}
		      })
		    },
		    onCancel() {
		      console.log('Cancel');
		    },
		  });
	}
	const columns =[{
		  title: '角色ID',
		  dataIndex: 'id',
		  key: 'id',
		  render: text => <span>{text}</span>,
		},{
		  title: '角色名称',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <span>{text}</span>,
		},{
		  title: '包含用户数',
		  dataIndex: 'userCount',
		  key: 'userCount',
		  render: text => <span>{text}</span>,
		},{
		  title: '包含级别',
		  dataIndex: 'levels',
		  key: 'levels',
		  render: text => <span>{text}</span>,
		},{
		  title: '启/禁用',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		  render: text => <span>{text}</span>,
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      	<a style={{marginRight:20+"px"}} onClick={()=>setStatus(record)}>{record.status ==true?"禁用":"启用"}</a>
		      	<a style={{marginRight:20+"px"}} onClick={()=>showModal(record)}>设置资料参数</a>
		      	<a style={{marginRight:20+"px"}} onClick={()=>info(record)}>查看</a>
		    </span>
		  ),
		},]
	
	
	return (

			<div>
				<Table bordered columns={columns} pagination = {false} dataSource={userRoleList} rowKey={record => record.id+''}/>
				<SetUserModal {...SetUserModalProps}/>
			</div>

	);
}

UserRole.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserRole));