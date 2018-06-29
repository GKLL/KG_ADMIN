import React from 'react';
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import {
	connect
} from 'dva';
import { Input, Button, Form } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import style_opinion_show from './Content_Opinion_Show.css';
import Content_Opinion_Show_Modal from './Content_Opinion_Show_Modal';
const FormItem = Form.Item;
const { TextArea } = Input;

function Content_Opinion_Show({ dispatch, router, content, onFeek }) {
	let data = JSON.parse(localStorage.getItem("kg_opinionEditor"));
	const { OpinionVisible } = content

	const Content_Opinion_Show_ModalProps = {
		visible: OpinionVisible,
		mail: data.email,
		onCancel() {
			dispatch({
				type: "content/hideOpinionModal"
			})
		},
		onOk(email, data) {
			console.log(data)
			dispatch({
				type: "content/sendEmail",
				payload: {
					email: email,
					content: data.content,
					title: data.title
				}
			})
		}
	}
	const formItemLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 17 },
	};
	function showModal() {
		dispatch({
			type: "content/showOpinionModal"
		})
	}

	class FormContent extends React.Component {
		constructor() {
			super();
			this.state = {
				visible: false,
				value: data.replayInfo != null ? data.replayInfo : ''
			};
		}
		changeInput = (e) => {
			this.setState({
				value: e.target.value
			})

		}
		onFeekOk = (e) => {
			this.props.form.validateFields((err, values) => {
				if (!err) {
					//console.log('Received values of form: ', values.replayInfo.length);
					values.id = data.id;
					onFeek(values)
					//const {data} ={...this.props.getFieldsValue()}

				}
			});
		}
		render() {
			const { getFieldDecorator } = this.props.form;
			const { value } = this.state;
			return (
				<Form>
					<FormItem {...formItemLayout} label="反馈内容" className="collection-create-form_last-form-item">
						<span>{data.content}</span>
					</FormItem>
					{data.fromType == 1&& <FormItem {...formItemLayout} label="反馈人邮箱" className="collection-create-form_last-form-item">
						<span>{data.email}</span>
						<a onClick={showModal} style={{ marginLeft: 10 }}>回邮件给此用户</a>
					</FormItem>
					}
					{data.fromType == 2&& <FormItem {...formItemLayout} label="反馈类型" className="collection-create-form_last-form-item">
						<span>
							{data.feedbackType ==1&&"功能建议"}
							{data.feedbackType ==2&&"内容建议"}
							{data.feedbackType ==3&&"体验建议"}
						</span>
					</FormItem>
					}
					<FormItem {...formItemLayout} label="反馈人手机号" className="collection-create-form_last-form-item">
						<span>{data.phone}</span>
					</FormItem>
					<FormItem {...formItemLayout} label="提交时间" className="collection-create-form_last-form-item">
						<span>{data.createDate}</span>
					</FormItem>
					<FormItem {...formItemLayout} label="来源" className="collection-create-form_last-form-item">
						<span>{data.fromType == 1 && "WEB"}{data.fromType ==2&&"APP"}</span>
					</FormItem>
					<FormItem {...formItemLayout} label="处理记录" className="collection-create-form_last-form-item">
						{getFieldDecorator("replayInfo", {
							initialValue: data.replayInfo || "",
							rules: [{ required: true, message: '请输入!' }, {
								type: "string", min: 1, max: 2000, message: "最多输入2000个字符"
							}],
						})(
							<TextArea style={{ minHeight: 100 }}>
							</TextArea>
						)}

					</FormItem>
					<FormItem {...formItemLayout} label="&emsp;"colon={false}>
						<Button type="primary" size='large' onClick={this.onFeekOk}>保存</Button>
						<Button style={{marginLeft:'30px'}} size='large' onClick={()=>history.back()}>返回</Button>
					</FormItem>
				</Form>

			)
		}

	}
	const FormParent = Form.create()(FormContent);
	class Content extends React.Component {
		constructor() {
			super();
			this.state = {
				visible: false,
				value: data.replayInfo != null ? data.replayInfo : ''
			};


		}

		render() {


			return (
				<div className="opinion_show">
					<h1>查看反馈内容</h1>
					<FormParent />
					<Content_Opinion_Show_Modal
						{...Content_Opinion_Show_ModalProps}
					/>
				</div>
			);
		};
	}

	return (
		<Content />
	)
}


Content_Opinion_Show.propTypes = {
};
function mapStateToProps({
	content
}) {
	return {
		content
	};
}

export default connect(mapStateToProps)(withRouter(Content_Opinion_Show));