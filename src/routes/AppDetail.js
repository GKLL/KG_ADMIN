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
import {timeFormat,GetRequest} from '../services/common';
import styles from './Common.css';
import { Form, Row, Col, Input,Tabs,DatePicker,Button, Icon,Table,Pagination,Modal,Radio,Select,message,Spin,Card} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function Withdrawals({location,dispatch,app,router,}) {
	
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const formItemLayout_radio = {
		labelCol: { span: 2},
		wrapperCol: { span: 17 },
	};
	const {AppDetailItem,loading} = app;
	return (
			<div className={styles.appDetail}>
			    <Spin spinning={loading} size="large" delay={500}>
		        <FormItem label="版本号" {...formItemLayout_radio}><span>{AppDetailItem&&'v'+AppDetailItem.versionNum}</span></FormItem>
				<FormItem label="更新提示语" {...formItemLayout_radio}><span>{AppDetailItem&&AppDetailItem.prompt}</span></FormItem>
				<FormItem label="强制更新" {...formItemLayout_radio}><span>{AppDetailItem&&(AppDetailItem.forced==1?"是":"否")}</span></FormItem>
				<FormItem label="操作系统" {...formItemLayout_radio}><span>{AppDetailItem&&(AppDetailItem.systemType==1?"Android":"ios")    }</span></FormItem>
				<FormItem label="地址" {...formItemLayout_radio}><span>{AppDetailItem&&AppDetailItem.downloadUrl}</span></FormItem>
				</Spin>
			</div>

	);
}

Withdrawals.propTypes = {

};

function mapStateToProps({
	app
}) {
	return {
		app
	};
}



export default connect(mapStateToProps)(withRouter(Withdrawals));