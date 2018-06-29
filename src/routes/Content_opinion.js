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
import Content_Opinion from '../components/Content/Content_Opinion';
import { Form, Row, Col, Input, message, Button, Modal, Popconfirm, DatePicker, TimePicker, Select } from 'antd';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import { timeFormat, uploadUrl, GetRequest } from '../services/common';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
function ContentOpinion({ dispatch, content, router, location }) {
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const { FeedbackList, totalNumber, currentPage, loading } = content;
	const Content_OpinionProps = {
		data: FeedbackList,
		total: totalNumber,
		currentPage: currentPage,
		loading: loading,
		confirm(record) {
			dispatch({
				type: 'content/deleteFeedback',
				payload: {
					feedbackId: record.id,
					search: location.search
				}
			})
		},
		delFeeks(list) {
			var Ids = [];
			for (var i in list) {
				Ids.push(list[i].id)
			}
			var FeeksIds = Ids.join(',')
			//console.log(FeeksIds)
			Modal.confirm({
				"title": "是否批量删除",
				onOk() {
					dispatch({
						type: "content/deleteFeedback",
						payload: {
							feedbackId: FeeksIds,
							search: location.search
						}
					})
				}
			})

		},
		onEditor(record) {
			localStorage.setItem('kg_opinionEditor', JSON.stringify(record));
			dispatch(routerRedux.push('/content/opinion?id=' + record.id))
		},
		changepage(page) {
			const search = GetRequest(location.search);
			dispatch(routerRedux.push('/content/content_opinion?page=' + page +
				'&content=' + search.content + '&status=' + search.status + '&startDate=' + search.startDate +
				'&endDate=' + search.endDate
			))
		}
	}

	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='反馈内容'>
						{getFieldDecorator('content')(
							<Input placeholder="请输入反馈内容" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem
						{...formItemLayout}
						label="提交时间"
					>
						{getFieldDecorator('time')(
							<RangePicker />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='阅读状态'>
						{getFieldDecorator('status')(
							<Select
								placeholder="请选择"
								onChange={this.handleSelectChange}
								allowClear={true}
							>
								<Option value="true">已读</Option>
								<Option value="false">未读</Option>
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
					<FormItem {...formItemLayout} label='反馈内容'>
						{getFieldDecorator('content')(
							<Input placeholder="请输入反馈内容" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem
						{...formItemLayout}
						label="提交时间"
					>
						{getFieldDecorator('time')(
							<RangePicker />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	function handlsearch(values) {
		//console.log(values)
		if (values.content == "" || values.content == undefined) {
			values.content = undefined;
		} else {
			values.content = Base64.encode(values.content)
		}
		if (values.time != undefined) {
			if (values.status == undefined) {
				dispatch(routerRedux.push('/content/content_opinion?page=1' +
					'&content=' + values.content + '&startDate=' + timeFormat(values.time[0]) +
					'&endDate=' + timeFormat(values.time[1])
				))
			} else {
				dispatch(routerRedux.push('/content/content_opinion?page=1' +
					'&content=' + values.content + '&startDate=' + timeFormat(values.time[0]) +
					'&endDate=' + timeFormat(values.time[1]) + '&status=' + values.status
				))
			}
		} else {
			if (values.status == undefined) {
				dispatch(routerRedux.push('/content/content_opinion?page=1' +
					'&content=' + values.content
				))
			} else {
				dispatch(routerRedux.push('/content/content_opinion?page=1' +
					'&content=' + values.content + '&status=' + values.status
				))
			}
		}
	}
	return (
		<div >
			<WrappedAdvancedSearchForm getFieldsFirst={getFieldsFirst} getFields={getFields} handlsearch={handlsearch} />
			<Content_Opinion {...Content_OpinionProps} />
		</div>

	);
}

ContentOpinion.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentOpinion));