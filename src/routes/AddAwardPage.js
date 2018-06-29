import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter
} from 'dva/router';
import { Form, Radio, Input, InputNumber, Button, Table,message,Modal} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
function AddAward({ dispatch, loaction,reward,form:{
	getFieldDecorator,
	validateFieldsAndScroll

} }) {
	let merId = localStorage.getItem('userId')
	const  {checkInfoList,total,awardpeople,loading,validateStatus,helpMessage,loging} =reward;
	//console.log(checkInfoList)
	//清除空格
	const ClearAr =(value) =>{
		value = value.replace(/\s+/g, ""); 
		return value
	}
	//清除换行
	const ClearBr =(key) =>{
		key = key.replace(/<\/?.+?>/g,""); 
		key = key.replace(/[\r\n]/g, ""); 
		return key; 
	}


	//跳转到用户详情
	const gotoUserInfo= (user) => {
		window.open('/#/user/user_data?userId='+user.userId)
	}

	//转化成数组
	const format = (str, number) =>{
		str = str.replace(/,/g, '');
		var start = 0;
		var length = str.length;
		var dest = [];
		while(true){
			dest.push(str.slice(start, start+number))
			start += number;
			if(start >= length){
				break;
			}
		}
		return dest;
	}
	const formItemLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 10 },

	};
	const formLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 16 },

	};
	const columns = [{
		title: '用户ID',
		dataIndex: 'userId',
		key: 'userId',
	}, {
		title: '昵称',
		dataIndex: 'userName',
		key: 'userName',
	}, {
		title: '手机号',
		dataIndex: 'userMobile',
		key: 'userMobile',
	}, {
		title: '注册来源',
		dataIndex: 'registerOrigin',
		key: 'registerOrigin',
		render: val => <span>{val==1&&"IOS"}{val==2&&"Android"}{val==3&&"千氪财经(WEB)"}{val==32&&"BTC123"}{val==33&&"钛值APP"}</span>,
	}, {
		title: '注册时间',
		dataIndex: 'createDate',
		key: 'createDate',
	}, {
		title: '角色',
		dataIndex: 'userRole',
		key: 'userRole',
		render:(text,record)=>{
			return(
				<span>
					{text == 1&& '普通用户'}
					{text == 2&& '个人'}
					{text == 3&& '媒体'}
					{text == 4&& '企业'}
					{text == 5&& '其他组织'}

				</span>
			)
		}
	}, {
		title: '专栏认证',
		dataIndex: 'columnAuthed',
		key: 'columnAuthed',
		render:(text,record)=>(
			<span>
				{text == 0&&"未认证"}
				{text == 1&&"已认证"}
			</span>
		)
	}, {
		title: '级别',
		dataIndex: 'userLevel',
		key: 'userLevel',
		render:(text,record)=>{
			return(
				<span>
					{text == 1&& '初级'}
				</span>
			)
		}
	}, {
		title: '锁定状态',
		dataIndex: 'lockStatus',
		key: 'lockStatus',
		render:(text,record)=>{
			return(
				<span>
					{text == 1&& '未锁定'}
					{text == 2&& '已锁定'}
				</span>
			)
		}
	}, {
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		render: (text, record) => {
			return (
				<a onClick={()=>gotoUserInfo(record)}>查看</a>
			)
		}
	}];
	
	const checkInfo = () => {
		if(awardpeople==""){
			dispatch({
				type:'reward/changeValidateStatus',
				payload:{
					validateStatus:'error',
					helpMessage:'请输入或者粘贴手机号'
				}
			})
			return 
		}else{
			dispatch({
				type:'reward/changeValidateStatus',
				payload:{
					validateStatus:'success',
					helpMessage:''
				}
			})
		}
		dispatch({
			type:"reward/checkInfo",
			payload:{
				userMobiles:awardpeople
			}
		})
	}

	const handleSubmit =(e) => {
		e.preventDefault();
		if(awardpeople==""){
			dispatch({
				type:'reward/changeValidateStatus',
				payload:{
					validateStatus:'error',
					helpMessage:'请输入手机号'
				}
			})
		
		}else{
			dispatch({
				type:'reward/changeValidateStatus',
				payload:{
					validateStatus:'success',
					helpMessage:''
				}
			})
		}
	

		validateFieldsAndScroll((err, data) => {
		if (!err) {
			console.log(data)
			if(data.tvBonus ==undefined&&data.kgBonus==undefined){
				message.error('钛值奖励和氪金奖励不能同时为空')
				return 
			}
			if(data.tvBonus ==""&&data.kgBonus==""){
				message.error('钛值奖励和氪金奖励不能同时为空')
				return 
			}
			if(data.tvBonus ==0&&data.kgBonus==0){
				message.error('钛值奖励和氪金奖励不能同时为0')
				return 
			}
			
			//console.log('Received values of form: ', data);
			Modal.confirm({
				title:(<div>确认给这<span style={{color:"#f00"}}>{checkInfoList.length}</span>个用户发放奖励吗?</div>),
				onOk(){
					dispatch({
						type:'reward/confirmBonus',
						payload:{
						tvBonus:data.tvBonus==undefined?0:data.tvBonus,
						kgBonus:data.kgBonus==undefined?0:data.kgBonus,
						bonusReason:data.bonusReason,
						userMobiles:awardpeople,
						adminId:merId
						}
					})
				}
			})
			

		}
		});
	}

	//受奖人
	const awardChange = (e) => {
		var reg = /^[0-9,]+$/;
		let number = e.target.value;
		  
			number = ClearAr(number); //清除空格
			number = ClearBr(number); //清除换行
			if(number == ""){
				dispatch({
					type:'reward/changeValidateStatus',
					payload:{
						validateStatus:'error',
						helpMessage:'请输入或者粘贴手机号'
					}
				})
			}else{
				if(!reg.test(number)){
					dispatch({
						type:'reward/changeValidateStatus',
						payload:{
							validateStatus:'error',
							helpMessage:'只能输入数字'
						}
					})
					return
				}else{
					dispatch({
						type:'reward/changeValidateStatus',
						payload:{
							validateStatus:'success',
							helpMessage:''
						}
					})
				}
			}
			
			number = format(number,11); //转化成数组
		    
			if(number.length>100){
				dispatch({
					type:'reward/changeValidateStatus',
					payload:{
						validateStatus:'error',
						helpMessage:'最多输入或粘贴100个手机号'
					}
				})
				return 
			}else{
				dispatch({
					type:'reward/changeValidateStatus',
					payload:{
						validateStatus:'success',
						helpMessage:''
					}
				})
			}
			number = number.join(',');
			dispatch({
				type:'reward/changeAward',
				payload:{
					awardpeople:number,

				}
			})
	}

	//校验奖励原因输入30个汉字；
	const validator =(rules,value,callback)=>{
	
		var len = 0;
		
		if (value == undefined || value == "") {
		callback()
		} else {
			for (var i = 0; i < value.length; i++) {
				var a = value.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
				len += 2;
				}
				else {
				len += 1;
				}
			}
			if ((len > 60 || len < 2) && value != "") {
				callback("最多输入30个汉字！")
		    }
		callback()
		}
	}

	//TV数量限制3位小数；
	const tvBonusChange = (rules,value,callback) => {
		if(value==undefined||value==""){
			callback();
		}
		var re = /^\d+(?=\.{0,1}\d+$|$)/;
		if(!re.test(value)){
			callback('请正确输入数量')
		}

		var reg = /^\d+(\.\d{1,3})?$/;
		console.log(reg.test(value))
		if(!reg.test(value)){
			callback('最多输入3位小数')
		}else{
			callback();
		}
	}
	const kgBonusChange = (rules,value,callback) => {
		if(value==undefined||value==""){
			callback();
		}
		var re = /^\d+(?=\.{0,1}\d+$|$)/;
		if(!re.test(value)){
			callback('请正确输入数量')
		}

		var reg = /^\d+(\.\d{1,3})?$/;
		console.log(reg.test(value))
		if(!reg.test(value)){
			callback('最多输入3位小数')
		}else{
			callback();
		}
	}
	return (
		<div>
			<Form>
				<FormItem
					{...formItemLayout}
					label="钛值奖励"
				>
					{getFieldDecorator('tvBonus', {
						initialValue:0,
						rules: [
							{ required: false, message: '请输入TV数量!' },
					       	{validator:tvBonusChange}
						],
					})(
						<InputNumber 
						    placeholder="请输入" 
						    style={{ width: '50%' }} 
							min={0}  
							step={0.111}
							/>
					)}
					<span style={{ marginLeft: '20px' }} >TV</span>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="氪金奖励"
				>
					{getFieldDecorator('kgBonus', {
						initialValue:0,
						rules: [{ required: false, message: '请输入KG数量!' },{validator:tvBonusChange}],
					})(
						<InputNumber placeholder="请输入" style={{ width: '50%' }} min={0} step={0.111}/>
					)}
					<span style={{ marginLeft: '20px' }}>KG</span>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="奖励原因"
				>
					{getFieldDecorator('bonusReason', {
						rules: [{ required: true, message: '请输入奖励原因' },
						{validator:validator}
						],
					})(
					<TextArea style={{ minHeight: '100px' }} autosize placeholder="填写结果将发送给用户"/>
				)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="受奖励人"
					validateStatus={validateStatus}
					help={helpMessage}
				>
						<TextArea autosize value={awardpeople} onChange={awardChange} style={{minHeight:'100px'}}  placeholder="在这里复制一个或多个手机号码（最多100个号码）" />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="&emsp;"
					colon={false}
				>
					<Button type="primary" onClick={checkInfo} loading={loging} size="large">检索</Button>
				</FormItem>
				<FormItem
					{...formLayout}
					label="&emsp;"
					colon={false}
				>
					<div>共{checkInfoList.length}个结果</div>
					<Table columns={columns} dataSource={checkInfoList} pagination={false} rowKey={record => record.userId}/>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="&emsp;"
					colon={false}
				>
					<Button type="primary" onClick={handleSubmit} size="large" loading={loading} disabled={(checkInfoList&&checkInfoList.length)>0?false:true}>确认发放</Button>
					<Button style={{ marginLeft: '30px' }} onClick={() => history.back()} size="large">返回</Button>
				</FormItem>
			</Form>
		</div>
	)
}

AddAward.propTypes = {

};

function mapStateToProps({
	reward
}) {
	return {
		reward
	};
}



export default  Form.create()(connect(mapStateToProps)(withRouter(AddAward)));