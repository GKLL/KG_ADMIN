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
import NoticeTable from '../components/Notice/NoticeTable';
import { formatDate, tokenLogOut, GetRequest } from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
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

	const options = [];
	const { loading, NotciceList, totalNumber, currentPage } = notice

	//搜索
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='创建人'>
						{getFieldDecorator('addUser', {
							rules: [
								{ required: false, }
							]
						})(
							<Input placeholder="请输入创建人" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='更新人'>
						{getFieldDecorator('updateUser')(
							<Input placeholder="请输入更新人" />
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
					<FormItem {...formItemLayout} label='创建人'>
						{getFieldDecorator('addUser', {
							rules: [
								{ required: false, }
							]
						})(
							<Input placeholder="请输入创建人" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='更新人'>
						{getFieldDecorator('updateUser')(
							<Input placeholder="请输入更新人" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	function handlsearch(values) {
		if (values.addUser == "" || values.addUser == undefined) {
			values.addUser = undefined;
		} else {
			values.addUser = Base64.encode(values.addUser)
		}
		if (values.updateUser == "" || values.updateUser == undefined) {
			values.updateUser = undefined;
		} else {
			values.updateUser = Base64.encode(values.updateUser)
		}
		dispatch(
			routerRedux.push(
				'/content/notice?page=1' + "&addUser=" + values.addUser +"&updateUser=" + values.updateUser 
		    )
	    )

	}

	//跳转发布公告
	function release() {
		localStorage.removeItem("articleText");
		dispatch(routerRedux.push('/content/notice_publish'));
	}

	//列表传值
	const NoticeTableProps = {
		data:NotciceList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		editorItem(item){
			dispatch({
				type:"notice/getNoticeById",
				payload:{
					id:item.id
				}
			})
			//dispatch(routerRedux.push('/content/notice_editor'))
		},
		deleteItem(record){
			dispatch({
				type:"notice/delNotice",
				payload:{
					id:record.id,
					search:location.search
				}
			})
		},
		handelchande(page){
			const values = location.search
			dispatch(
				routerRedux.push(
					'/content/notice?page=' +page+ "&addUser=" + values.addUser +"&updateUser=" + values.updateUser 
				)
			)
		}
	}
	return (
		<div >
			<Button type="primary" size='large' onClick={release} style={{ marginBottom: "20px" }} icon="plus">发布公告</Button>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<NoticeTable {...NoticeTableProps}/>
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