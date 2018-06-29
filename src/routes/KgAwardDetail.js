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
import stytes from './UserLoginPage.css';
import LayoutContainer from '../components/Layout';
import RewardTable from '../components/User/RewardTable';
import { timeFormat, GetRequest } from '../services/common';
import { Form, Row, Col, Input, Button,Card,DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, user, router,finance }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	
	const {AccountList,loading,currentPage,totalNumber,getSumBonus} = finance;
	const urlSelect = GetRequest(location.search);
	

	//列表
	const RewardTableProps = {
		data:AccountList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		type:'KG',
		handelchande(page){
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/user/kgaward?page='+page+'&mobile='+search.mobile+"&userName="+search.userName))
		}
	}
	return (
		<Card title={<div><h2><span style={{color:"#1DA57A"}}>{urlSelect&&Base64.decode(urlSelect.userName)}</span>的奖励明细&emsp;&emsp;&emsp;
		<Link className={stytes.btnn2} to={'/user/reward?page=1'+'&mobile='+urlSelect.mobile+'&userName='+urlSelect.userName}>钛值奖励</Link><Link className={stytes.btnnn} to={'/user/kgaward?page=1'+'&mobile='+urlSelect.mobile+'&userName='+urlSelect.userName}>氪金奖励</Link>奖励总额：{getSumBonus&&getSumBonus}</h2></div>} 
		bordered={false}>
			<RewardTable {...RewardTableProps}/>
		</Card>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user,finance
}) {
	return {
		user,finance
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));