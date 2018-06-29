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
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import LayoutContainer from '../components/Layout';
import MasterTable from '../components/User/MasterTable';
import stytes from './UserLoginPage.css';
import { timeFormat, GetRequest } from '../services/common';
import { Form, Row, Col, Input, Button,Card,DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, user, router, }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const { 
		ParentUserInfo,
		SubUserList,
		totalNumber,
		currentPage,
		loading
	} =user;
	const urlSelect = GetRequest(location.search); 
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户ID'>
						{getFieldDecorator('userId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "用户ID只能输入数字" }
							]
						})(

							<Input placeholder="请输入用户Id" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='昵称'>
						{getFieldDecorator('userName')(
							<Input placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='手机号'>
						{getFieldDecorator('userMobile', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "手机号只能为数字" }
							]
						})(
							<Input type="phone" placeholder="请输入手机号" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户角色'>
						{getFieldDecorator('userRole')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">普通用户</Option>
								<Option value="2">个人</Option>
								<Option value="3">媒体</Option>
								<Option value="4">企业</Option>
								<Option value="5">组织</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='师徒关系建立时间'>
						{getFieldDecorator('time')(
							<RangePicker />
						)}
					</FormItem>
				</Col>
				
			</div>
		);
		return children;
	}

	function getFieldsFirst(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户ID'>
						{getFieldDecorator('userId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "用户ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入用户Id" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='昵称'>
						{getFieldDecorator('userName')(
							<Input placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	//搜索
	function handlsearch(values) {
		if (values.time != undefined) {

			dispatch(routerRedux.push('/user/master?page=1' +'&inviteUserId='+urlSelect.inviteUserId+'&name='+urlSelect.name+ "&userId=" + values.userId +
				"&userName=" + values.userName + "&userMobile=" + values.userMobile + "&userRole=" + values.userRole +
				"&createDateStart=" + timeFormat(new Date(values.time[0])) +
				"&createDateEnd=" + timeFormat(new Date(values.time[1]))
			))
		} else {
			dispatch(routerRedux.push('/user/master?page=1' +'&inviteUserId='+urlSelect.inviteUserId+'&name='+urlSelect.name+ "&userId=" + values.userId +
				"&userName=" + values.userName + "&userMobile=" + values.userMobile + "&userRole=" + values.userRole 
			))
		}
	}
	const userInfo ={}

	const MasterTableProps = {
		data:SubUserList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		handelchande(page){

			const values = GetRequest(location.search)
			dispatch(routerRedux.push('/user/master?page='+page+'&inviteUserId='+urlSelect.inviteUserId+'&name='+urlSelect.name+ "&userId=" + values.userId +
				"&userName=" + values.userName + "&userMobile=" + values.userMobile + "&userRole=" + values.userRole +
				"&createDateStart=" +values.createDateStart +
				"&createDateEnd=" + values.createDateEnd
			))
		},
		userData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))
		}
	}


	

	//解除师徒关系
    function unBindUser(data){
    	//console.log(data)
    	confirm({
    		title:"确认解除师徒关系吗?",
    		onOk(){
    			dispatch({
    				type:"user/unBindUser",
    				payload:{
    					inviteUserId:data.userId,
    					userId:urlSelect.inviteUserId
    				}
    			})
    		}
    	})
    }

    //查看师傅详细信息
    function userDataInfo(data){
    	dispatch(routerRedux.push('/user/user_data?userId='+data.userId))
    }
	return (
		<div>
		{ParentUserInfo!=null?
		<Card title={
			<div>
			    <span><span style={{color:"#1DA57A"}}>{urlSelect&&Base64.decode(urlSelect.name)}</span>的师傅&emsp;&emsp;&emsp;</span>
			    &emsp;
			    <Button type="primary" onClick={()=>unBindUser(ParentUserInfo)}>解除师徒关系</Button>
			    &emsp;
			    <Button type="primary" onClick={()=>userDataInfo(ParentUserInfo)}>查看详细信息</Button>
			</div>} 
			bordered={false}
			loading = {loading}
		><table className={stytes.table}>
						<tbody>
						<tr>
						    <td>用户ID</td><td>{ParentUserInfo.userId!=null?ParentUserInfo.userId:"——"}</td>
						    <td>昵称</td><td>{ParentUserInfo.userName&&ParentUserInfo.userName!=null?ParentUserInfo.userName:"——"}</td>
						</tr>
						<tr>
						    <td>手机号</td><td>{ParentUserInfo.userMobile?ParentUserInfo.userMobile:"——"}</td>
						    <td>邮箱</td><td>{ParentUserInfo.userEmail?ParentUserInfo.userEmail:"——"}</td>
		
						</tr>
						<tr>
						    <td>用户级别</td><td>初级</td>
						    <td>注册时间</td><td>{ParentUserInfo.createDate!=null?ParentUserInfo.createDate:"——"}</td>
						</tr>
						<tr>
						    <td>用户角色</td><td>{ParentUserInfo.userRole?ParentUserInfo.userRoleDisplay:"——"}</td>
						    <td>专栏名称</td><td>{ParentUserInfo&&ParentUserInfo.userRole!=1?ParentUserInfo.userName:"——"}</td>
						</tr>
						<tr>
						    <td>师徒关系建立时间</td><td>{ParentUserInfo.relTime!=null?ParentUserInfo.relTime:"——"}</td>
						    <td>最后活动时间</td><td>{ParentUserInfo.lastActiveTime!=null?ParentUserInfo.lastActiveTime:"——"}</td>
						</tr>
						{/*<tr>
						    <td>锁定状态</td><td>{userInfo.lockStatusDisplay!=null?userInfo.lockStatusDisplay:"——"}</td>
						    <td></td><td>——</td>
						</tr>*/}
						</tbody>
					</table>
		</Card>:<div className={stytes.noPartant}><Icon type="frown-o" />暂无师傅</div>}
		<Card 
		title={<span><span 
		style={{color:"#1DA57A"}}>
		{urlSelect&&Base64.decode(urlSelect.name)}</span>的徒弟&emsp;&emsp;
		{totalNumber&&totalNumber}人</span>} 
		bordered={false}
		
		>
			<WrappedAdvancedSearchForm getFields={getFields} handlsearch={handlsearch} getFieldsFirst={getFieldsFirst}/>
			<MasterTable {...MasterTableProps}/>
		</Card>
		</div>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));