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
import { Modal, message, Row, Col, Tabs, Icon, Button, Form, Input, Cascader, Select } from 'antd';
import NoticeAdd from '../components/Notice/NoticeAdd';
import { formatDate, tokenLogOut, GetRequest } from '../services/common';
import BonsModal from '../components/Content/BonsModal';
import styles from "./Common.css";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
function ContentArticle({ location, dispatch, router, notice }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	//console.log("location",location)
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const {confirmLoading} = notice;
	//父子组件传值
	const NoticeAddProps = {
		dispatch:dispatch,
		confirmLoading:confirmLoading,
	}
	return (
		<div >
			<NoticeAdd {...NoticeAddProps}/>
		</div>

	);
}

ContentArticle.propTypes = {

};

function mapStateToProps({
	notice
}) {
	return {
		notice
	};
}



export default connect(mapStateToProps)(withRouter(ContentArticle));