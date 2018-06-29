import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,routerRedux,Link
} from 'dva/router';
import { Form, Radio, Input, InputNumber, Button, Table,Card,Spin,Col,DatePicker} from 'antd';
import stytes from './UserLoginPage.css';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import AwardTable from '../components/Finance/AwardTable';
import { GetRequest } from '../services/common';
const FormItem = Form.Item;
const { TextArea } = Input;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
function AddAward({ dispatch, location,reward }) {

	const {BonusDetail,loging,BonusDetailList,loading,currentPage,totalNumber} =reward;
	const formLayout = {
		labelCol: { span: 12 },
		wrapperCol: { span: 12 },
	}
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户ID'>
						{getFieldDecorator('userId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
				    <FormItem {...formItemLayout} label='昵称'>
						{getFieldDecorator('nickName')(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
				    <FormItem {...formItemLayout} label='手机号'>
						{getFieldDecorator('userMobile')(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<Col span={10} style={{ paddingLeft: 0 + "px" }}>
						<FormItem {...formLayout} label='奖励数量（TV）'>
							{getFieldDecorator('startTvBonus')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最小值" min={0}/>

							)}
						</FormItem>
					</Col>
					<Col span={2} style={{ textAlign: 'center', lineHeight: 36 + "px" }}>
						<span >——</span>
					</Col>
					<Col span={10}>
						<FormItem {...formLayout}>
							{getFieldDecorator('endTvBonus')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最大值" min={0}/>
							)}
						</FormItem>
					</Col>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<Col span={10} style={{ paddingLeft: 0 + "px" }}>
						<FormItem {...formLayout} label='奖励数量（KG）'>
							{getFieldDecorator('startKgBonus')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最小值" min={0}/>

							)}
						</FormItem>
					</Col>
					<Col span={2} style={{ textAlign: 'center', lineHeight: 36 + "px" }}>
						<span >——</span>
					</Col>
					<Col span={10}>
						<FormItem {...formLayout}>
							{getFieldDecorator('endKgBonus')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最大值" min={0}/>
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
								{ required: false, pattern: /^[0-9]*$/, message: "ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
				    <FormItem {...formItemLayout} label='昵称'>
						{getFieldDecorator('nickName')(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	function handlsearch(values) {
		const search = GetRequest(location.search);
		
		if (values.nickName == "" || values.nickName == undefined) {
			values.nickName = undefined;
		} else {
			values.nickName = Base64.encode(values.nickName)
		}

		dispatch(routerRedux.push('/finance/awardDetails?page=1' + "&id="+search.id+"&userId=" + values.userId +
			"&nickName=" + values.nickName + "&userMobile=" + values.userMobile + "&startTvBonus=" + values.startTvBonus +
			"&endTvBonus=" + values.endTvBonus + "&startKgBonus=" + values.startKgBonus +'&endKgBonus='+values.endKgBonus
		))
	}


	//列表
	const  AwardTableProps ={
		data:BonusDetailList,
		total:totalNumber,
		currentPage:currentPage,
		loading:loading,
		Examine(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))
		},
		changepage(page){
			const search = GetRequest(location.search);
			dispatch(routerRedux.push('/finance/awardDetails?page='+ page + "&id="+search.id+"&userId=" + search.userId +
				"&nickName=" + search.nickName + "&userMobile=" + search.userMobile + "&startTvBonus=" + search.startTvBonus +
				"&endTvBonus=" + search.endTvBonus + "&startKgBonus=" + search.startKgBonus +'&endKgBonus='+search.endKgBonus
			))
		}
	}
	return (
		<div>
			<Spin tip="加载中..." size="large" spinning={loging}>
			    <Card title="奖励信息" bordered={false} extra={<Link to="/finance/userAward?page=1">返回列表</Link>} >
					<table className={stytes.table}>
					    <tbody>
							<tr>
								<td>ID</td>
								<td>{BonusDetail&&BonusDetail.extraBonusId}</td>
								<td>奖励数量</td>
								<td>{BonusDetail&&BonusDetail.totalTv}TV+{BonusDetail&&BonusDetail.totalKg}KG</td>
							</tr>
							<tr>
								<td>奖励人数</td>
								<td>{BonusDetail&&BonusDetail.totalNum}</td>
								<td>奖励时间</td>
								<td>{BonusDetail&&BonusDetail.createTime}</td>
							</tr>
							<tr>
								<td>奖励人</td>
								<td>{BonusDetail&&BonusDetail.adminName}</td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<div className={stytes.course}>
						<span>
							奖励原因
						</span>
						<span>
						   {BonusDetail&&BonusDetail.bonusReason}
						</span>
					</div>
				</Card>
				<Card title="受奖励人信息" bordered={false}>
					<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch}/>
					<AwardTable {...AwardTableProps}/>
				</Card>
			</Spin>
			
		</div>
	)
}

AddAward.propTypes = {

};

function mapStateToProps({
	reward
}) {
	return {
		reward
	};
}



export default connect(mapStateToProps)(withRouter(AddAward));