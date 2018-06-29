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
import { Form, Row, Col, Input, Button, Modal, message, Select, DatePicker } from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Comment from '../components/Content/Content_Comment';
import Content_CommentSet_Modal from '../components/Content/Content_CommentSet_Modal';
import Content_CommentSetShow_Modal from '../components/Content/Content_CommentSetShow_Modal';
import ExamineModal from '../components/Content/ExamineModal';
import { timeFormat, GetRequest } from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
function ContentComment({ location, dispatch, router, content }) {

	const { CommentList, CommentSetVisible, showSetVisible,isCommentAutid, selectList, ExamineVisible, loading, totalNumber, currentPage } = content;

	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}

	const Content_CommentProps = {
		data: CommentList,
		loading,
		currentPage,
		total: totalNumber,
		opinionSetModal() {
			dispatch({
				type: "content/showCommentSet"
			})
		},
		showSet(record) {
			dispatch({
				type: "content/showSetModal",
				payload: {
					selectList: record
				}
			})
		},
		confirm(record) {
			dispatch({
				type: "content/deleteComment",
				payload: {
					commentId: record.commentId,
					search: location.search
				}
			})
		},
		showSets(selectList) {
			console.log(selectList)
			var Ids = ""
			for (var i in selectList) {
				Ids += selectList[i].commentId + ","
			}

			dispatch({
				type: "content/showSetModal",
				payload: {
					selectList: Ids
				}
			})
		},
		audit(record) {
			dispatch({
				type: "content/showExamineModal",
				payload: {
					selectList: record.commentId
				}

			})
		},
		changepage(page) {
			const search = GetRequest(location.search);
			dispatch(routerRedux.push('/content/content_comment?page=' + page +
				"&content=" + search.content + "&status=" + search.status + "&startDate=" + search.startDate +
				"&endDate=" + search.endDate + "&displayStatus=" + search.displayStatus+ "&commentUser=" + search.commentUser
				+ "&userMobile=" + search.userMobile+ '&articleTitle='+search.articleTitle
			))
		}
	}

	//评论设置
	const Content_CommentSet_ModalProps = {
		visible: CommentSetVisible,
		isCommentAutid:isCommentAutid,
		onCancel() {
			dispatch({
				type: "content/hideCommentSet"
			})
		},
		onOk(values) {
			//console.log(values)
			dispatch({
				type: "content/commentSet",
				payload: {
					commentSet: values.set == "1" ? true : false,
				}
			})
		}

	}

	//显示设置
	const Content_CommentSetShow_ModalProps = {
		visible: showSetVisible,
		selectList,
		onOk(values, selectList) {
			console.log(selectList)
			dispatch({
				type: "content/setcommentStatus",
				payload: {
					commentIds: String(selectList),
					displayStatus: values.set == "public" ? true : false,
					search: location.search,
				}
			})
		},
		onCancel() {
			dispatch({
				type: "content/hideSetModal"
			})
		},

	}

	//审核
	const ExamineModalProps = {
		visible: ExamineVisible,
		selectList,
		onCancel() {
			dispatch({
				type: "content/hideExamineModal",
			})
		},
		onOk(data, record) {
			console.log(record)
			if (data.radio == "1") {
				dispatch({
					type: 'content/auditComment',
					payload: {
						commentId: record,
						status: parseInt(data.radio),
						search: location.search
					}
				})
			} else {

				dispatch({
					type: 'content/auditComment',
					payload: {
						commentId: record,
						status: parseInt(data.radio),
						refuseReason: data.text,
						search: location.search
					}
				})


			}
		}
	}

	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='评论内容'>
						{getFieldDecorator('content')(
							<Input placeholder="请输入评论内容" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='评论时间'>
						{getFieldDecorator('time')(
							<RangePicker />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='状态'>
						{getFieldDecorator('status')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0" >审核中</Option>
								<Option value="1">已通过</Option>
								<Option value="2">未通过</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='显示状态'>
						{getFieldDecorator('displayStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">显示</Option>
								<Option value="2">隐藏</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='文章标题'>
						{getFieldDecorator('articleTitle')(
							<Input placeholder="请输入文章标题" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='评论人'>
			            {getFieldDecorator('commentUser')(
			              <Input placeholder="请输入评论人" />
			            )}
			          </FormItem>
			    </Col>
				<Col span={8} style = {{display:'block'}}>
			        <FormItem {...formItemLayout} label='手机号'>
			            {getFieldDecorator('userMobile')(
			              <Input placeholder="请输入手机号" />
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
					<FormItem {...formItemLayout} label='评论内容'>
						{getFieldDecorator('content')(
							<Input placeholder="请输入评论内容" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='评论时间'>
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
		if(values.content==""||values.content==undefined){
			values.content = undefined
		}else{
			values.content = Base64.encode(values.content)  
		}
		if(values.articleTitle==''||values.articleTitle==undefined){
			values.articleTitle = undefined
		}else{
			values.articleTitle = Base64.encode(values.articleTitle)  
		}
		if(values.commentUser == ""||values.commentUser==undefined){
			values.commentUser = undefined
		}else{
			values.commentUser = Base64.encode(values.commentUser)
		}
		if (values.time != undefined) {

			dispatch(routerRedux.push('/content/content_comment?page=1' +
				"&content=" + values.content + "&status=" + values.status + '&articleTitle='+values.articleTitle+"&startDate=" + timeFormat(values.time[0]) +
				"&endDate=" + timeFormat(values.time[1]) + "&displayStatus=" + values.displayStatus+ "&commentUser=" + values.commentUser
				+ "&userMobile=" + values.userMobile
			))
		} else {
			dispatch(routerRedux.push('/content/content_comment?page=1' +
				"&content=" + values.content + "&status=" + values.status + "&displayStatus=" + values.displayStatus+ "&commentUser=" + values.commentUser
				+ "&userMobile=" + values.userMobile+ '&articleTitle='+values.articleTitle
			))


		}
	}
	return (
		<div >
			<WrappedAdvancedSearchForm getFieldsFirst={getFieldsFirst} getFields={getFields} handlsearch={handlsearch} />
			<Content_Comment {...Content_CommentProps} />
			<Content_CommentSet_Modal {...Content_CommentSet_ModalProps} />
			<Content_CommentSetShow_Modal {...Content_CommentSetShow_ModalProps} />
			<ExamineModal {...ExamineModalProps} />
		</div>

	);
}

ContentComment.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentComment));