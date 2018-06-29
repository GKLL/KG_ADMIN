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
import Useradmin from '../components/User/UserAdmin';
import ColumnModal from '../components/User/ColumnModal';
import ExamineModal from '../components/User/ExamineModal';
import SetHotuser from '../components/User/SetHotuser';
import LockModal from '../components/User/LockModal';
import { timeFormat, GetRequest } from '../services/common';
import { Form, Row, Col, Input, Button, DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, user, router, }) {
	const { ColumnIdentity,currentItem,ExmianVisible,columnVisible,userlist, userInfo, selectList,confirmLoading, HotVisible, LockVisible, loading, totalNumber, currentPage } = user;
	//console.log(loading)
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const UseradminProps = {
		userlist: userlist,
		loading: loading,
		total: totalNumber,
		currentPage,
		openModal: function (selectList) {
			dispatch({
				type: 'user/showHotModal',
				payload: {
					selectList: selectList
				}

			})
		},
		columnAuthen(record){
		
			dispatch({
				type:"user/showColumnModal",
				payload:{
					currentItem:record
				}
			})
		},
		canelColumn(record){
			confirm({
				title: "取消专栏认证",
				content: (
					<div>确认取消<span style={{ color: '#f0f' }}>{record.userName}</span>的专栏认证吗？</div>
				),
				onOk() {
					console.log('OK');
					dispatch({
						type: "user/cancelCertification",
						payload: {
							userId: record.userId,
							search:location.search
						}
					})
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		},
		ExamineModal: function (selectList) {
			//console.log(selectList)
			var Ids = ""
			for (var i in selectList) {
				if (selectList[i].auditStatus == 0 && selectList[i].applyRole != 1) {
					//console.log(selectList[i].userId)
					Ids += selectList[i].userId + ","
				}
			}
			if (Ids == "") {
				message.warn('无需审核的用户')

			} else {
				dispatch({
					type: 'user/showExmianModal',
					payload: {
						selectList: Ids,
					}
				});
			}

		},
		Examine(Id) {
			dispatch({
				type: 'user/showExmianModal',
				payload: {
					selectList: Id,
				}
			});
		},
		LocksModal(selectList) {
			//console.log(selectList)
			var Ids = ""
			for (var i in selectList) {
				if (selectList[i].lockStatus == 1) {
					//console.log(selectList[i].userId)
					Ids += selectList[i].userId + ","
				}
			}
			console.log(Ids)
			if (Ids == "") {
				message.warn('无需锁定的用户')

			} else {
				dispatch({
					type: 'user/showLockModal',
					payload: {
						selectList: Ids,
					}
				});
			}

		},
		LockModal(list) {

			dispatch({
				type: 'user/showLockModal',
				payload: {
					selectList: list.userId
				}
			});
		},
		deblocking(selectList) {
			var Ids = ""
			for (var i in selectList) {
				if (selectList[i].lockStatus != 1) {
					//console.log(selectList[i].userId)
					Ids += selectList[i].userId + ","
				}
			}
			console.log(Ids)
			if (Ids == "") {
				message.warn('无需解锁的用户')

			} else {
				Modal.confirm({
					title: '是否解锁这些用户?',
					okText: '确定',
					onOk() {
						dispatch({
							type: 'user/lockUser',
							payload: {
								userId: Ids,
								lockUserId: merId,
								search:location.search
							}
						});
					},
					onCancel() {
						console.log('Cancel');
					},
				});

			}
		},
		conOk(user) {
			//console.log(user)
			dispatch({
				type: 'user/lockUser',
				payload: {
					userId: user.userId,
					lockUserId: merId,
					search:location.search
				}
			});

		},
		changepage(page) {
			const search = GetRequest(location.search);
			dispatch(routerRedux.push('/user/user_admin?page=' + page +
				"&userId=" + search.userId + "&userName=" + search.userName + "&userMobile=" + search.userMobile +
				"&userRole=" + search.userRole + "&auditStatus=" + search.auditStatus + "&lockStatus=" + search.lockStatus +
				"&createDateStart=" + search.createDateStart + "&createDateEnd=" + search.createDateEnd+'&platform='+search.platform
			))

		},
		userData(record) {
			dispatch(routerRedux.push('/user/user_data?userId=' + record.userId))
		},
		sorterUserList(sorter){
			console.log(sorter)
			const search = GetRequest(location.search);
			let orderByClause = ""
			if(sorter.field=="articleNum"){
				if(sorter.order=="descend"){
					orderByClause = "article_num desc"
				}else{
					orderByClause = "article_num asc"
				}
				
			}
			if(sorter.field=="commentNum"){
				if(sorter.order=="descend"){
					orderByClause = "comment_num desc"
				}else{
					orderByClause = "comment_num asc"
				}
			}
			if(sorter.field=="collectNum"){
				if(sorter.order=="descend"){
					orderByClause = "collect_num desc"
				}else{
					orderByClause = "collect_num asc"
				}
			}
			if(sorter.field=="shareNum"){
				if(sorter.order=="descend"){
					orderByClause = "share_num desc"
				}else{
					orderByClause = "share_num asc"
				}
			}

			dispatch(routerRedux.push('/user/user_admin?page=1' +
						"&userId=" + search.userId + "&userName=" + search.userName + "&userMobile=" + search.userMobile +
						"&userRole=" + search.userRole + "&auditStatus=" + search.auditStatus + "&lockStatus=" + search.lockStatus +
						"&createDateStart=" + search.createDateStart + "&createDateEnd=" + search.createDateEnd+'&orderByClause='+orderByClause
						+'&platform='+search.platform
			))	
			

			// if(sorter.field=="commentNum"&&sorter.){
			// 	dispatch({
			// 		type:"user/getUserList",
			// 		payload:{
			// 			currentPage:1,

			// 		}
			// 	})
			// }
			
		}
	}
	const ExamineModalProps = {
		visible: ExmianVisible,
		selectList: selectList,
		confirmLoading:confirmLoading,
		onCancel: function () {
			dispatch({
				type: 'user/hideExmianModal',
			})
		},
		onOk(data, list) {
			//console.log(data,list)
			if (data.radio == "1") {
				dispatch({
					type: 'user/auditUser',
					payload: {
						userId: list,
						auditStatus: parseInt(data.radio),
						auditUserId: merId,
						search:location.search
					}
				})
			} else {
				dispatch({
					type: 'user/auditUser',
					payload: {
						userId: list,
						auditStatus: parseInt(data.radio),
						auditUserId: merId,
						refuseReason: data.text,
						search:location.search
					}
				})
			}

		}
	}
	const SetHotuserModalProps = {
		visible: HotVisible,
		selectList,
		onCancel() {
			dispatch({
				type: 'user/hideHotModal',

			})
		},
		onOk(b, user) {
			console.log(user)
			dispatch({
				type: 'user/setHotUser',
				payload: {
					userId: user.userId,
					hotUser: parseInt(b.radio) == 2 ? false : true,
					search:location.search
				}

			})
		}
	}

	const LockModalProps = {
		visible: LockVisible,
		selectList,
		onCancel() {
			dispatch({
				type: 'user/hideLockModal',
				payload: {

				}
			});
		},
		onOk(valus, list) {


			if (valus.tmie.currency == "小时") {
				Modal.confirm({
					title: '是否锁定这些用户?',
					content:(<div>确定对这些用户锁定<span style={{color:'#F00'}}>{valus.tmie.number}小时</span>吗？</div>),
					okText: '确定',
					onOk() {
						dispatch({
							type: 'user/lockUser',
							payload: {
								userId: list,
								lockUserId: merId,
								lockUnit: parseInt("5"),
								lockTime: parseInt(valus.tmie.number),
								search:location.search
							}
						});
					},
					onCancel() {
						console.log('Cancel');
					},
				});

			} else {
				var time = '';

				if (valus.tmie.currency == "2") {
					time = "月"
				} else if (valus.tmie.currency == "4") {
					time = "天"
				} else {
					time = "小时"
				}

				Modal.confirm({
					title: '是否锁定这些用户?',
					content: (<div>确定对这些用户锁定<span style={{color:'#F00'}}>{valus.tmie.number + time}</span>吗？</div>),
					okText: '确定',
					onOk() {
						dispatch({
							type: 'user/lockUser',
							payload: {
								userId: list,
								lockUserId: merId,
								lockUnit: parseInt(valus.tmie.currency),
								lockTime: parseInt(valus.tmie.number),
								search:location.search
							}
						});
					},
					onCancel() {
						console.log('Cancel');
					},
				});


			}

		}
	}


	//专栏认证
	const ColumnModalProps = {
		visible:columnVisible,
		ColumnIdentity:ColumnIdentity,
		confirmLoading:confirmLoading,
		Item:currentItem,
		onOk(data){
			let list = "";
			//console.log(data)
			if(data.name ==undefined){
				list = data.select
			}else{
				list = data.name+data.select
			}
			console.log(list)
			dispatch({
				type:'user/certificationColumn',
				payload:{
					userId:data.userId,
					columnIdentity:list,
					search:location.search
			}
			})
		},
		onCancel(){
			dispatch({
				type:"user/hideColumnModal",
				payload:{
					
				}
			})
		}
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
							<Input type="text" placeholder="请输入昵称" />
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
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='审核状态'>
						{getFieldDecorator('auditStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">审核中</Option>
								<Option value="1">通过</Option>
								<Option value="2">不通过</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='锁定状态'>
						{getFieldDecorator('lockStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">未锁定</Option>
								<Option value="2">已锁定</Option>

							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='来源'>
						{getFieldDecorator('platform')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">iOS</Option>
								<Option value="2">Android</Option>
								<Option value="3">WEB</Option>
							</Select>
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
							<Input type="text" placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	//搜索
	function handlsearch(values) {
		if(values.time!=undefined){
			if(values.time.length==0){
				 values.time=undefined
			}
		}
	
		if (values.userName == "" || values.userName == undefined) {
			values.userName = undefined;
		} else {
			values.userName = Base64.encode(values.userName)
		}
		if (values.time != undefined) {
			dispatch(routerRedux.push('/user/user_admin?page=1' + "&userId=" + values.Id +
				"&userName=" + values.userName + "&userMobile=" + values.phone + "&userRole=" + values.role +
				"&auditStatus=" + values.auditStatus + "&lockStatus=" + values.lockStatus +
				"&createDateStart=" + timeFormat(new Date(values.time[0])) +
				"&createDateEnd=" + timeFormat(new Date(values.time[1]))+'&platform='+values.platform
			))
		} else {
			dispatch(routerRedux.push('/user/user_admin?page=1' + "&userId=" + values.Id +
				"&userName=" + values.userName + "&userMobile=" + values.phone + "&userRole=" + values.role +
				"&auditStatus=" + values.auditStatus + "&lockStatus=" + values.lockStatus+'&platform='+values.platform
			))
		}
	}
	return (
		<div>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<Useradmin {...UseradminProps} />
			<ExamineModal {...ExamineModalProps} />
			<SetHotuser {...SetHotuserModalProps} />
			<LockModal {...LockModalProps} />
			<ColumnModal {...ColumnModalProps}/>
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