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
import ShareAwardTable from '../components/User/ShareAwardTable';
import { timeFormat, GetRequest } from '../services/common';
import './font.less';
import styles from './Record.css'
import { Form, Row, Col, Input, Button, DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, award, router, }) {
	const {loading, totalNumber, currentPage,ShareBonusList,currentItem} = award;
	//console.log(loading)
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
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
						{getFieldDecorator('nickName')(
							<Input type="text" placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='手机号'>
						{getFieldDecorator('userPhone', {
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
						{getFieldDecorator('userRoleId')(
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
						{getFieldDecorator('nickName')(
							<Input type="text" placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	//搜索
	function handlsearch(data) {
		if(data.nickName==""||data.nickName==undefined){
			data.nickName = undefined;
		}else{
			data.nickName = Base64.encode(data.nickName)
		}
		dispatch(routerRedux.push('/user/shareReward?page=1' + "&userId=" + data.userId +
				"&nickName=" + data.nickName + "&userPhone=" + data.userPhone + "&userRoleId=" + data.userRoleId
		))
	}

	//奖励列表
	const ShareAwardTableProps = {
		data:ShareBonusList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		handelchande(page){
			const data = GetRequest(location.search)
			dispatch(routerRedux.push('/user/shareReward?page='+ page + "&userId=" + data.userId +
				"&userName=" + data.userName + "&mobile=" + data.mobile + "&userRole=" + data.userRole
		    ))
		},
		getUserData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))

		}
	}

	return (
		<div>
			<div className = {styles.changeAward}>
					<Link  className = {styles.activeColor} to = '/user/platformReward?page=1'>邀新奖励</Link>
					<Link  to = '/user/realnameAward?page=1'>实名认证奖励</Link>
					<Link  to = '/user/columnAward?page=1'>成为专栏作家奖励</Link>
					<Link  className = {styles.activeColor} to = '/user/writingAward?page=1'>发文奖励</Link>
					{/* <Link  className = {styles.activeColor} to = '/user/platformReward?page=1'>平台阅读奖励</Link> */}
					<Link  className = {styles.activeAward} to = '/user/shareReward?page=1'>分享奖励</Link>
				</div>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<ShareAwardTable {...ShareAwardTableProps}/>
		</div>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	award
}) {
	return {
		award
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));