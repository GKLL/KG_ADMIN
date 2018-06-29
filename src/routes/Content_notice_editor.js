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
import { Modal, message, Row, Col, Tabs, Icon, Button, Form, Input, Cascader, Select,Spin } from 'antd';
import NoticeEditor from '../components/Notice/NoticeEditor';
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
	const {NoticeItem,confirmLoading,loading} = notice;
	//父子组件传值
	const NoticeAddProps = {
		dispatch:dispatch,
		item:NoticeItem,
		confirmLoading:confirmLoading,
	}
	return (
		<div >
			<Spin tip="加载中" size="large" spinning={loading}>
			<NoticeEditor {...NoticeAddProps}/>
			</Spin>
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