import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import { Form ,Button, Upload, Icon,Input,Select,Col,Modal,message,Radio,Spin} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import System from '../components/Setting/System';
import {formatDate,tokenLogOut,GetRequest} from '../services/common'
function AccountRule({location,dispatch,setting,router,}) {
	let  userId = localStorage.getItem('userId');
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}

	const {setShow,loading,confirmLoading} =setting;

	const SystemProps = {
		dispatch:dispatch,
		item:setShow,
		confirmLoading:confirmLoading
	}

	return (
			<div>
				<Spin tip="加载中..." size="large" spinning={loading}>
						<System {...SystemProps}/>
				</Spin>
			</div>

	);
}

AccountRule.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AccountRule));