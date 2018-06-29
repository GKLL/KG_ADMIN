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
import InviteNewTable from '../components/User/InviteNewTable';
import FrozenModal from '../components/User/FrozenModal';
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
function UserAdmin({ location, dispatch, user, router, }) {
	const { FrozenVisible,loading, totalNumber, currentPage,InviteBonusList,currentItem,confirmLoading} = user;
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
						{getFieldDecorator('userName')(
							<Input type="text" placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='手机号'>
						{getFieldDecorator('mobile', {
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
					<FormItem {...formItemLayout} label='奖励状态'>
						{getFieldDecorator('bonusStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">冻结</Option>
								<Option value="1">可用</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='邀新状态'>
						{getFieldDecorator('inviteStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">不需要</Option>
								<Option value="1">需审查</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				 <Col span={8} style = {{display:'block'}}>
				  <Col span={5} className={styles.rewNum}>
				  	邀新数量:
				  </Col>
		          <Col span={8}>
		          	<FormItem>
		            {getFieldDecorator('minValue')(
		              		<Input style={{ textAlign: 'center' }} placeholder="最小值" />
		              	
		            )}
		          </FormItem>
		          </Col>
		          <Col span={2} style={{ textAlign: 'center',lineHeight:30+"px"}}>
		          	<span >~</span>
		          </Col>
		          <Col span={8}>
		          		<FormItem {...formItemLayout}>
				            {getFieldDecorator('maxValue')(
				              	<Input style={{ textAlign: 'center'}} placeholder="最大值" />
				            )}
				          </FormItem>
		         </Col>
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
		if(data.userName==""||data.userName==undefined){
			data.userName = undefined;
		}else{
			data.userName = Base64.encode(data.userName)
		}
		dispatch(routerRedux.push('/user/platformReward?page=1' + "&userId=" + data.userId +
				"&userName=" + data.userName + "&mobile=" + data.mobile + "&userRole=" + data.userRole + "&bonusStatus=" + data.bonusStatus +
				"&inviteStatus=" + data.inviteStatus +
				"&minValue=" + data.minValue +
				"&maxValue=" + data.maxValue 
		))
	}

	//奖励列表
	const InviteNewTableProps = {
		data:InviteBonusList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		showModal(record){
			dispatch({
				type:"user/showFrozenModal",
				payload:{
					currentItem:record
				}
			})
		},
		handelchande(page){
			const data = GetRequest(location.search)
			dispatch(routerRedux.push('/user/platformReward?page='+ page + "&userId=" + data.userId +
				"&userName=" + data.userName + "&mobile=" + data.mobile + "&userRole=" + data.userRole +
			    "&bonusStatus=" + data.bonusStatus +
				"&inviteStatus=" + data.inviteStatus +
				"&minValue=" + data.minValue +
				"&maxValue=" + data.maxValue 
		    ))
		},
		getUserData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))

		},
		InviteUserListData(record){
			dispatch(routerRedux.push('/user/invite?page=1'+"&inviteUserId="+record.userId))
		},
		confirm(data){
			dispatch({
				type:"user/freezeUser",
				payload:{
					auditUserId:merId,
					userId:data.userId,
					bonusStatus:1,
					search:location.search
				}	
			})
		}
	}

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
				type:"user/freezeUser",
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
	//奖励说明
	function RweInfo(){
		Modal.info({
			title:"奖励说明",
			width:"600",
			content: (
		      <div>
		        <h2>规则：</h2>
		        <h4>1.奖励兑换</h4>
		        <p>有效邀请数>=10即可领取2TV </p>
		        <p>有效邀请数>=30即可领取10TV</p>
		        <p>有效邀请数>=50即可领取30TV </p>
		        <p>有效邀请数>=80即可领取50TV</p>
		        <p>2.领取奖励后，将扣除相应的邀请数值，如：成功邀请12人，选择领取奖励将获得10人对应的2TV,奖励并扣除10人成功邀请数，剩余2人。</p>
		        <p>3.发起提取后即时到账，获得的奖励5日内无法提现。</p>
		        <p>4.什么是有效邀请：好友通过您的邀请链接或者邀请码注册并登录，算为一次有效邀请。</p>
				<p>5.成功邀请的新用户将自动成为您的徒弟。</p>
		        <p>6.邀请好友仅对于邀请新用户，老用户无效。</p>
		        <p>7.邀请真实用户才会增加有效次数。</p>
				<p>8.若通过但不限于技术手段等方式，恶意邀请徒弟，赚取平台奖励者，一经平台发现，将冻结所有奖励。冻结后五日未处理，相应奖励将退回处理。</p>
		        <p>9.活动最终解释权归千氪财经所有。</p>
		      </div>
		    ),
		})
	}
	return (
		<div>
			<div className = {styles.changeAward}>
					<Link  className = {styles.activeAward} to = '/user/platformReward?page=1'>邀新奖励</Link>
					<Link   to = '/user/realnameAward?page=1'>实名认证奖励</Link>
					<Link   to = '/user/columnAward?page=1'>成为专栏作家奖励</Link>
					<Link   to = '/user/writingAward?page=1'>发文奖励</Link>
					{/* <Link   to = '/user/platformReward?page=1'>平台阅读奖励</Link> */}
					{/* <Link   to = '/user/shareReward?page=1'>分享奖励</Link> */}
				</div>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<Button  className = {styles.activeBtn} onClick={RweInfo} size="large" icon="question-circle-o">奖励说明</Button>
			<InviteNewTable {...InviteNewTableProps}/>
			<FrozenModal {...FrozenModalProps}/>
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