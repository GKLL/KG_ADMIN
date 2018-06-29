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
import InviteTable from '../components/User/InviteTable';
import { timeFormat, GetRequest } from '../services/common';
import FrozenModal from '../components/User/FrozenModal';
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

	const { InviteBonusList,InviteUserList,currentPage,loading,total,userInfo,FrozenVisible,currentItem,confirmLoading } =user;
	let userData = {};
	if(InviteBonusList.length>0){
		userData=InviteBonusList[0]
	}
	const urlSelect = GetRequest(location.search);
	//冻结模态框
	const FrozenModalProps = {
		visible:FrozenVisible,
		item:currentItem,
		confirmLoading:confirmLoading,
		onCancel(){
			dispatch({
				type:"user/hideFrozenModal",
				payload:{
					currentItem:{}
				}
			})
		},
		onOk(data){
			dispatch({
				type:"user/freezeUserData",
				payload:{
					auditUserId:merId,
					userId:data.userId,
					bonusStatus:0,
					bonusFreezeReason:data.bonusFreezeReason,
					search:location.search
				}	
			})
		}
	}
	const frozenModal = (data) => {
		Modal.confirm({
			title:"确认解冻吗?",
			onOk(){
				dispatch({
					type:"user/freezeUserData",
					payload:{
						auditUserId:merId,
						userId:data.userId,
						bonusStatus:1,
						search:location.search
					}	
				})
			}
		})
	}
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户ID'>
						{getFieldDecorator('Id', {
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
						{getFieldDecorator('phone', {
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
						{getFieldDecorator('role')(
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
					<FormItem {...formItemLayout} label='注册时间'>
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
						{getFieldDecorator('Id', {
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
		if(values.userName==""||values.userName==undefined){
			values.userName = undefined;
		}else{
			values.userName = Base64.encode(values.userName)
		}
		if (values.time != undefined) {
			dispatch(routerRedux.push('/user/invite?page=1' +'&inviteUserId='+urlSelect.inviteUserId+ "&userId=" + values.Id +
				"&userName=" + values.userName + "&userMobile=" + values.phone + "&userRole=" + values.role +
				"&createDateStart=" + timeFormat(new Date(values.time[0])) +
				"&createDateEnd=" + timeFormat(new Date(values.time[1]))
			))
		} else {
			dispatch(routerRedux.push('/user/invite?page=1'  +'&inviteUserId='+urlSelect.inviteUserId+ "&userId=" + values.Id +
				"&userName=" + values.userName + "&userMobile=" + values.phone + "&userRole=" + values.role
			))
		}
	}

	//邀新记录列表

	const InviteTableProps = {
		data:InviteUserList,
		loading:loading,
		currentPage:currentPage,
		total:total,
		handelchande(page){
			const values =GetRequest(location.search);
			dispatch(routerRedux.push('/user/invite?page='+page+'&inviteUserId='+values.inviteUserId+ "&userId=" + values.userId +
				"&userName=" + values.userName + "&userMobile=" + values.userMobile + "&userRole=" + values.userRole +
				"&createDateStart=" + values.createDateStart+
				"&createDateEnd=" + values.createDateEnd
			))
		},
		userData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))
		}
	}

	//审查
	function inviteStatus(userData){
		confirm({
			title:"确认审查吗?",
			onOk(){
				dispatch({
					type:"user/checkUser",
					payload:{
						userId:userData.userId,
						auditUserId:merId
					}
				})
			}
		})
	}
	//冻结
	function frozen(data){
		dispatch({
			type:"user/showFrozenModal",
			payload:{
				currentItem:data
			}
		})
		// confirm({
		// 	title:"确认冻结吗？",
		// 	onOk(){
		// 		dispatch({
		// 			type:"user/freezeUserData",
		// 			payload:{
		// 				auditUserId:merId,
		// 				userId:data.userId,
		// 				bonusStatus:0,
		// 				bonusFreezeReason:data.bonusFreezeReason,
		// 				search:location.search
		// 			}	
		// 		})
		// 	}
	    // })
		
	}
	return (
		<Card title={
			<div>
				
			    <span>{userInfo&&userInfo.userName}的邀新记录&emsp;&emsp;{total&&total}人&emsp;
			        <span >{userInfo&&(userInfo.inviteStatus==0?"无需审查":<span style={{color:"#f00"}}>需审查</span>)}</span>
			    </span>
			    &emsp;
			    {userInfo&&(userInfo.inviteStatus==1)&&<Button type="primary" onClick={()=>inviteStatus(userInfo)}>确认审查</Button>}
			    
			    &emsp;
			    {userInfo&&(userInfo.bonusStatus==1)&&<Button type="primary" onClick={()=>frozen(userInfo)}>冻结</Button>}
			    {userInfo&&(userInfo.bonusStatus==0)&&<Button type="primary" onClick={()=>frozenModal(userInfo)}>解冻</Button>}
			</div>} 
			bordered={false}
		>
			<WrappedAdvancedSearchForm getFields={getFields} handlsearch={handlsearch} getFieldsFirst={getFieldsFirst}/>
			<InviteTable {...InviteTableProps}/>
			<FrozenModal {...FrozenModalProps}/>
		</Card>

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