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
import { Modal, message, Row, Col, Tabs, Icon, Button, Form, Input, Cascader, Select,DatePicker,InputNumber} from 'antd';
import LayoutContainer from '../components/Layout';
import UserAwardTable from '../components/Finance/UserAwardTable';
import SetModal from '../components/Content/SetShow';
import ArticleModal from '../components/Content/AricleMoadl';
import { formatDate, tokenLogOut, GetRequest,timeFormat} from '../services/common';
import BonsModal from '../components/Content/BonsModal';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from "./Common.css";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
function ContentArticle({ location, dispatch, router, reward }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	//console.log("location",location)
	if (!token) {
		dispatch(routerRedux.push('/'))
	}

	const {UserBonusList,loading,totalNumber,currentPage} =reward

	//列表数据
	const UserAwardTableProps = {
		data:UserBonusList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		handelchande(page){
			const search = GetRequest(location.search)
			dispatch(routerRedux.push('/finance/userAward?page='+page+ "&extraBonusId="+search.extraBonusId+"&startTvBonus=" + search.startTvBonus +
				"&endTvBonus=" + search.endTvBonus + "&startKgBonus=" + search.startKgBonus + "&endKgBonus=" + search.endKgBonus +
				"&numStart=" + search.numStart + "&numEnd=" + search.numEnd+'&adminName='+search.adminName+
				"&startTime=" +search.startTime+
				"&endTime=" + search.endTime
			))
		}
	}
	
	
	
	const formLayout = {
		labelCol: { span: 12 },
		wrapperCol: { span: 12 },
	}
	//搜索
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='ID'>
						{getFieldDecorator('extraBonusId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "ID" }
							]
						})(
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
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='奖励时间'>
						{getFieldDecorator('time')(
							<RangePicker />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<Col span={10} style={{ paddingLeft: 0 + "px" }}>
						<FormItem {...formLayout} label='奖励人数'>
							{getFieldDecorator('numStart')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最小值" min={0}/>

							)}
						</FormItem>
					</Col>
					<Col span={2} style={{ textAlign: 'center', lineHeight: 36 + "px" }}>
						<span >——</span>
					</Col>
					<Col span={10}>
						<FormItem {...formLayout}>
							{getFieldDecorator('numEnd')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最大值" min={0}/>
							)}
						</FormItem>
					</Col>
				</Col>
			        <Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='奖励人' >
						{getFieldDecorator('adminName')(
							<Input placeholder="请输入" />
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
					<FormItem {...formItemLayout} label='ID'>
						{getFieldDecorator('extraBonusId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<Col span={10} style={{ paddingLeft: 10 + "px" }}>
						<FormItem {...formLayout} label='奖励数量（TV）'>
							{getFieldDecorator('startTvBonus')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最小值" min={0} />

							)}
						</FormItem>
					</Col>
					<Col span={2} style={{ textAlign: 'center', lineHeight: 36 + "px" }}>
						<span >——</span>
					</Col>
					<Col span={10}>
						<FormItem {...formLayout}>
							{getFieldDecorator('endTvBonus')(
								<InputNumber style={{ textAlign: 'center' }} placeholder="最大值"  min={0}/>
							)}
						</FormItem>
					</Col>
				</Col>
			</div>
		);
		return children;
	}
	function handlsearch(values) {
	
		if(values.time!=undefined){
			if(values.time.length==0){
				 values.time=undefined
			}
		}
		if (values.adminName == "" || values.adminName == undefined) {
			values.adminName = undefined;
		} else {
			values.adminName = Base64.encode(values.adminName)
		}
		if (values.time != undefined) {
			dispatch(routerRedux.push('/finance/userAward?page=1' + "&extraBonusId="+values.extraBonusId+"&startTvBonus=" + values.startTvBonus +
				"&endTvBonus=" + values.endTvBonus + "&startKgBonus=" + values.startKgBonus + "&endKgBonus=" + values.endKgBonus +
				"&numStart=" + values.numStart + "&numEnd=" + values.numEnd+'&adminName='+values.adminName+
				"&startTime=" + timeFormat(new Date(values.time[0])) +
				"&endTime=" + timeFormat(new Date(values.time[1]))
			))
		} else {
			dispatch(routerRedux.push('/finance/userAward?page=1' + "&extraBonusId="+values.extraBonusId+"&startTvBonus=" + values.startTvBonus +
				"&endTvBonus=" + values.endTvBonus + "&startKgBonus=" + values.startKgBonus + "&endKgBonus=" + values.endKgBonus +
				"&numStart=" + values.numStart + "&numEnd=" + values.numEnd+'&adminName='+values.adminName
			))
		}
	}

	//跳转发布文章
	function release() {
		dispatch(routerRedux.push('/finance/addAward'));
	}
	return (
		<div >
			<Button type="primary" size='large' onClick={release} style={{ marginBottom: "20px" }} icon="plus">新增奖励</Button>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<UserAwardTable {...UserAwardTableProps}/>
		</div>

	);
}

ContentArticle.propTypes = {

};

function mapStateToProps({
	reward
}) {
	return {
		reward
	};
}



export default connect(mapStateToProps)(withRouter(ContentArticle));