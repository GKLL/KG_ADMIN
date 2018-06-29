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
import stytes from './UserLoginPage.css';
import { Form, Row, Col, Input, Button, Icon, message, Radio, Card, Modal,Spin } from 'antd';
import { uploadUrl } from '../services/common';
import ColumnModal from '../components/User/ColumnModal';
import avatar from '../assets/images/avatar.jpg';
let Base64 = require('js-base64').Base64;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;

function UserAdmin({ location, dispatch, user, router, }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	//console.log(location)
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const { userInfo, columnVisible, confirmLoading, ColumnIdentity, currentItem,loading} = user;
	//console.log(userInfo)
	const formItemLayout = {
		labelCol: {
			xs: { span: 1 },
			sm: { span: 3 },
		},
		wrapperCol: {
			xs: { span: 1 },
			sm: { span: 3 },
		},
	};


	class DynamicRule extends React.Component {
		state = {
			checkNick: false,
			text: '',
			value:1
		};
		submit = (e) => {
			this.props.form.validateFields(
				(err, values) => {
					if (!err) {
						console.info(values);
						if (values.radio == '1') {
							dispatch({
								type: 'user/auditUser',
								payload: {
									userId: userInfo.userId,
									auditStatus: parseInt(values.radio),
									auditUserId: merId,
									user_data: 1,
								}
							})
						}
						if (values.radio == '2') {
							dispatch({
								type: 'user/auditUser',
								payload: {
									userId: userInfo.userId,
									auditStatus: parseInt(values.radio),
									auditUserId: merId,
									refuseReason: values.text,
									user_data: 1,
								}
							})
						}
					}
				},
			);
		}
		handleChange = (e) => {
			this.setState({
				text: e.target.value
			})
		}
		onChange = (e) => {
			//console.log('radio checked', e.target.value);
			this.setState({
				value: e.target.value,
			});
		}
		render() {
			const { getFieldDecorator } = this.props.form;
			return (
				<Form>
					<FormItem label="审核处理" >
						{getFieldDecorator('radio', {
							rules: [{
									required: true,message:'请选择'
								}]
						})(
							<RadioGroup onChange={this.onChange} value={this.state.value}>
								<Radio value={1}>通过</Radio>
								<Radio value={2}>
									不通过

				        </Radio>
							</RadioGroup>
						)}
					</FormItem>
					<FormItem label="">
						{getFieldDecorator('text', {

						})(
							<TextArea style={{ width: "60%", minHeight: "100px" }} disabled={this.state.value == 2 ? false : true} placeholder="不通过原因(选填)"></TextArea>
						)}
					</FormItem>
					<FormItem>
						<Button type="primary" onClick={this.submit} size="large" loading={confirmLoading}>保存</Button>
					</FormItem>
				</Form>
			);
		}
	}
	const WrappedDynamicRule = Form.create()(DynamicRule);
	function reward(userInfo) {

		dispatch(routerRedux.push('/user/reward?page=1' + '&mobile=' + userInfo.userMobile + "&userName=" + Base64.encode(userInfo.userName)))
	}
	function invite(userInfo) {
		dispatch(routerRedux.push('/user/invite?page=1' + '&inviteUserId=' + userInfo.userId))
	}
	function master(userInfo) {
		dispatch(routerRedux.push('/user/master?page=1' + '&inviteUserId=' + userInfo.userId + "&name=" + Base64.encode(userInfo.userName)))
	}


	//取消认证
	function canelColumn() {
		confirm({
			title: "取消专栏认证",
			content: (
				<div>确认取消<span style={{ color: '#f0f' }}>{userInfo.userName}</span>的专栏认证吗？</div>
			),
			onOk() {
				//console.log('OK');
				dispatch({
					type: "user/cancelCertiy",
					payload: {
						userId: userInfo.userId
					}
				})
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	function columnAute(){
		dispatch({
			type:"user/showColumnModal"
		})
	}
	//专栏认证
	const ColumnModalProps = {
		visible: columnVisible,
		ColumnIdentity: ColumnIdentity,
		confirmLoading: confirmLoading,
		onOk(data) {
			let list = "";
			//console.log(data)
			if (data.name == undefined) {
				list = data.select
			} else {
				list = data.name + data.select
			}
			//console.log(list)
			dispatch({
				type: 'user/certificaion',
				payload: {
					userId: userInfo.userId,
					columnIdentity: list,
				}
			})
		},
		onCancel() {
			dispatch({
				type: "user/hideColumnModal",
				payload: {

				}
			})
		}
	}

	function showImage(url){
		Modal.info({
			content:(
				<div>
					<img src={uploadUrl + url}/>
				</div>
			)
		})
	}
	return (
		<Spin tip="Loading..." spinning={loading} size="large">
		<Card>
			<Card
				title={<div>
					<span style={{ fontSize: 24, fontWeight: 'bold' }}>{userInfo && userInfo.userName}的基础信息</span>

					<span>
						<a className={stytes.btnn} style={{ marginLeft: 50 }} onClick={() => reward(userInfo)}>奖励明细</a>

						<a type="primary" size="large" className={stytes.btnn} onClick={() => master(userInfo)}>师徒关系</a>

						<a type="primary" size="large" className={stytes.btnn} onClick={() => invite(userInfo)}>邀新记录</a>
					</span>
				</div>}
				bordered={false}

			>
				<div className={stytes.avatar}>
					{userInfo&&userInfo.avatar!=null?<img src={uploadUrl+userInfo.avatar}/>:<img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png"/>}
				</div>
				<table className={stytes.table}>
					<tbody>
						<tr>
							<td>用户ID</td><td>{userInfo.userId != null ? userInfo.userId : "——"}</td>
							<td>昵称</td><td>{userInfo && userInfo.userName != null ? userInfo.userName : "——"}</td>
						</tr>
						<tr>
							<td>手机号</td><td>{userInfo.userMobile ? userInfo.userMobile : "——"}</td>
							<td>用户角色</td><td>
								{(userInfo && userInfo.applyRole == 1) && "普通用户"}
								{(userInfo && userInfo.applyRole == 2) && "个人"}
								{(userInfo && userInfo.applyRole == 3) && "媒体"}
								{(userInfo && userInfo.applyRole == 4) && "企业"}
								{(userInfo && userInfo.applyRole == 5) && "组织"}
							</td>
						</tr>
						<tr>
							<td>用户级别</td><td>{userInfo.userLevelDisplay ? userInfo.userLevelDisplay : "——"}</td>
							<td>注册时间</td><td>{userInfo.createDate != null ? userInfo.createDate : "——"}</td>
						</tr>
						<tr>
							<td>提交专栏申请时间</td><td>{userInfo.applyColumnTime != null ? userInfo.applyColumnTime : "——"}</td>
							<td>审核状态</td><td>{userInfo.auditStatusDisplay != null ? userInfo.auditStatusDisplay : "——"}</td>
						</tr>
						<tr>
							<td>审核人</td><td>{userInfo.auditor != null ? userInfo.auditor : "——"}</td>
							<td>审核时间</td><td>{userInfo.auditDate != null ? userInfo.auditDate : "——"}</td>
						</tr>
						<tr>
							<td>师傅</td><td>{userInfo.parentUser != null ? userInfo.parentUser : "——"}</td>
							<td>锁定状态</td><td>{userInfo.lockStatusDisplay != null ? userInfo.lockStatusDisplay : "——"}</td>
						</tr>
						<tr>
							<td>注册来源</td><td>{userInfo && userInfo.registerOrigin == 1 && 'iOS'}{userInfo && userInfo.registerOrigin == 2 && 'Android'}{userInfo && userInfo.registerOrigin == 3 && '千氪财经'}{userInfo && userInfo.registerOrigin == 32 && 'BTC123'}{userInfo && userInfo.registerOrigin == 33 && '钛值APP'}</td>
							<td>专栏认证</td><td>{userInfo && (userInfo.columnAuthed == 1 ? '已认证' : "未认证")}</td>
						</tr>
					</tbody>
				</table>
			</Card>
			<Card title="活跃数据" bordered={false}>
				<table className={stytes.table}>
					<tbody>
						<tr><td>评论数</td><td>{userInfo.commentNum != null ? userInfo.commentNum : "——"}</td>
							<td>浏览数</td><td>{userInfo.bowseNum != null ? userInfo.bowseNum : "——"}</td></tr>
						<tr><td>收藏数</td><td>{userInfo.collectNum != null ? userInfo.collectNum : "——"}</td>
							<td>发文数</td><td>{userInfo.articleNum != null ? userInfo.articleNum : "——"}</td></tr>
						<tr>
							<td>分享数</td><td>{userInfo.shareNum != null ? userInfo.shareNum : "——"}
							</td>
							<td></td><td></td>
						</tr>
					</tbody>
				</table>
			</Card>
			<Card title="其他信息" bordered={false}>
				<div>
					<p className={stytes.dataBox}><span className={stytes.span1}>专栏名称</span>
						<span className={stytes.span2}>
							{(userInfo.profile && userInfo.profile.columnName != null) ? userInfo.profile.columnName : "——"}
						</span>
					</p>
					<p className={stytes.dataBox}><span className={stytes.span1}>专栏介绍</span>
						<span className={stytes.span2}>{(userInfo.profile && userInfo.profile.columnIntro != null) ? userInfo.profile.columnIntro : "——"}</span>
					</p>
					<p className={stytes.dataBox}><span className={stytes.span1}>所在地区</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.columnProvince) != null ? userInfo.profile.columnProvince + userInfo.profile.columnCity + userInfo.profile.columnCounty : "——"}</span></p>
					{(userInfo.userRole == 1 && userInfo.applyRole == 1) && null}
					{(userInfo.userRole == 2 || userInfo.applyRole == 2) && <div>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.realName != null && userInfo.profile.realName != "") ? userInfo.profile.realName : "——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.idcard != null && userInfo.profile.idcard != "") ? userInfo.profile.idcard : "——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份件扫描</span>
							<span className={stytes.span2}>
								{(userInfo.profile && userInfo.profile.idcardBack != null && userInfo.profile.idcardBack !== "") ? <img style={{ width: 300 }} src={uploadUrl + userInfo.profile.idcardBack} /> : <span className={stytes.idcardBack}>暂无上传身份正面</span>}
								{(userInfo.profile && userInfo.profile.idcardFront != null && userInfo.profile.idcardFront !== "") ? <img style={{ width: 300, marginLeft: 20 }} src={uploadUrl + userInfo.profile.idcardFront} /> : <span className={stytes.idcardBack}>暂无上传身份反面</span>}
								{(userInfo.profile && userInfo.profile.idcardPic != null && userInfo.profile.idcardPic != "") ? <img style={{ width: 300, marginLeft: 20 }} src={uploadUrl + userInfo.profile.idcardPic} /> : <span className={stytes.idcardBack}>暂无上传手持身份正面</span>}
							</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{(userInfo.profile && (userInfo.profile.siteLink != "")) ? userInfo.profile.siteLink : "——"}</span></p>
						<p className={stytes.dataBox}>
							<span className={stytes.span1}>其他资质</span>
							<span className={stytes.span2}>
								{(userInfo.profile && (userInfo.profile.otherPic != null && userInfo.profile.otherPic != "" && ((userInfo.profile.otherPic).split(',')).length != 0)) ? <span>{((userInfo.profile.otherPic).split(',')).map((item, index) => {
									return (
										<img src={uploadUrl + item} style={{ width: 300, marginLeft: 20 }} key={index} />
									)
								})}</span> : ""}</span></p>

					</div>
					}
					{(userInfo.userRole == 3 || userInfo.userRole == 5 || userInfo.applyRole == 3 || userInfo.applyRole == 5) ? <div>
						<p className={stytes.dataBox}><span className={stytes.span1}>组织名称</span><span className={stytes.span2}>
							{(userInfo.profile && userInfo.profile.companyName != null) ? userInfo.profile.companyName : "——"}
						</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>组织机构代码证/营业执照</span><span className={stytes.span2}>
							{(userInfo.profile && userInfo.profile.licensePic != null) ?
								<img src={uploadUrl + userInfo.profile.licensePic} />
								: "——"}
						</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.realName != null && userInfo.profile.realName != "") ? userInfo.profile.realName : "——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.idcard != null && userInfo.profile.idcard != "") ? userInfo.profile.idcard : "——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份件扫描</span>
							<span className={stytes.span2}>
								{(userInfo.profile && userInfo.profile.idcardBack != null && userInfo.profile.idcardBack !== "") ? <img style={{ width: 300 }} src={uploadUrl + userInfo.profile.idcardBack} /> : <span className={stytes.idcardBack}>暂无上传身份正面</span>}
								{(userInfo.profile && userInfo.profile.idcardFront != null && userInfo.profile.idcardFront !== "") ? <img style={{ width: 300, marginLeft: 20 }} src={uploadUrl + userInfo.profile.idcardFront} /> : <span className={stytes.idcardBack}>暂无上传身份反面</span>}
								{(userInfo.profile && userInfo.profile.idcardPic != null && userInfo.profile.idcardPic != "") ? <img style={{ width: 300, marginLeft: 20 }} src={uploadUrl + userInfo.profile.idcardPic} /> : <span className={stytes.idcardBack}>暂无上传手持身份正面</span>}
							</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{(userInfo.profile && (userInfo.profile.siteLink != "")) ? userInfo.profile.siteLink : "——"}</span></p>
						<p className={stytes.dataBox}>
							<span className={stytes.span1}>其他资质</span>
							<span className={stytes.span2}>
								{(userInfo.profile && (userInfo.profile.otherPic != null && userInfo.profile.otherPic != "" && ((userInfo.profile.otherPic).split(',')).length != 0)) ? <span>{((userInfo.profile.otherPic).split(',')).map((item, index) => {
									return (
										<img src={uploadUrl + item} style={{ width: 300, marginLeft: 20 }} key={index} />
									)
								})}</span> : ""}
							</span>
						</p>

					</div> : null
					}
					{(userInfo.userRole == 4 || userInfo.applyRole == 4) && <div>
						<p className={stytes.dataBox}><span className={stytes.span1}>企业名称
						            </span><span className={stytes.span2}>
								{(userInfo.profile && userInfo.profile.companyName != null) ? userInfo.profile.companyName : "——"}
							</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>企业机构代码证/营业执照</span><span className={stytes.span2}>
							{(userInfo.profile && userInfo.profile.licensePic != null) ?
								<img src={uploadUrl + userInfo.profile.licensePic} style={{width:700}} />
								: "——"}
						</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.realName != null && userInfo.profile.realName != "") ? userInfo.profile.realName : "——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{(userInfo.profile && userInfo.profile.idcard != null && userInfo.profile.idcard != "") ? userInfo.profile.idcard : "——"}</span></p>
						<div className={stytes.dataBox}>
							<span className={stytes.span1}>管理员身份件扫描</span>
							<span className={stytes.span2}>
								{(userInfo.profile && userInfo.profile.idcardBack != null && userInfo.profile.idcardBack !== "") ? <img style={{ width: 300 }} src={uploadUrl + userInfo.profile.idcardBack} /> : <span className={stytes.idcardBack}>暂无上传身份正面</span>}
								{(userInfo.profile && userInfo.profile.idcardFront != null && userInfo.profile.idcardFront !== "") ? <img style={{ width: 300, marginLeft: 20 }} src={uploadUrl + userInfo.profile.idcardFront} /> : <span className={stytes.idcardBack}>暂无上传身份反面</span>}
								{(userInfo.profile && userInfo.profile.idcardPic != null && userInfo.profile.idcardPic != "") ? <img style={{ width: 300, marginLeft: 20 }} src={uploadUrl + userInfo.profile.idcardPic} /> : <span className={stytes.idcardBack}>暂无上传手持身份正面</span>}
							</span>
						</div>
						<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{(userInfo.profile && (userInfo.profile.siteLink != "")) ? userInfo.profile.siteLink : "——"}</span></p>
						<p className={stytes.dataBox}>
							<span className={stytes.span1}>其他资质</span>
							<span className={stytes.span2}>
								{(userInfo.profile && (userInfo.profile.otherPic != null && userInfo.profile.otherPic != "" && ((userInfo.profile.otherPic).split(',')).length != 0)) ? <span>{((userInfo.profile.otherPic).split(',')).map((item, index) => {
									return (
										<img src={uploadUrl + item} style={{ width: 300, marginLeft: 20 }} key={index} />
									)
								})}</span> : ""}
							</span>
						</p>
					</div>

					}
					{(userInfo.auditStatus == 0 && userInfo.applyRole != 1) ? <WrappedDynamicRule /> : null}
					{(userInfo.auditStatus == 1 && userInfo.userRole != 1) ? <p className={stytes.dataBox}><span className={stytes.span1}>专栏认证情况</span><span className={stytes.span2}>{(userInfo && userInfo.columnAuthed == 0) ? "未认证" : userInfo.columnIdentity} {(userInfo && userInfo.columnAuthed == 0) ? <Button type="primary" style={{ marginLeft: 30 }} onClick={columnAute}>去认证</Button> : <Button type="primary" style={{ marginLeft: 30 }} onClick={canelColumn}>取消认证</Button>}</span></p>
						: null}

					<p className={stytes.dataBox}><span className={stytes.span1}><Button type="primary"  onClick={()=>history.back()} size="large">返回</Button></span></p>
				</div>
				<ColumnModal {...ColumnModalProps} />
			</Card>
		</Card>
		</Spin>
	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));

