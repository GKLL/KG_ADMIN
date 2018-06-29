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
import RealName from '../components/User/RealName';
import RealNameModal from '../components/User/RealNameModal';
import RealsModal from '../components/User/RealsModal';
import {timeFormat,uploadUrl,GetRequest} from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import { Form, Row, Col, Input, Button, Icon,Table,DatePicker,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserRealName({location,dispatch,user,router,}) {
	const {RealNameVisible,RealsVisible,UserCertList,loading,totalNumber,currentPage,selectList,confirmLoading,currentValue}=user;
	//console.log(loading)
	let merId =localStorage.getItem("userId");
	//console.log(merId)
	/*if(merId == 'undefined'){
		message.error('请重新登陆')
		console.log(1111111111)
		router.push('/')
	}*/

	const UserRealNameProps ={
		data:UserCertList,
	    currentPage:currentPage,
	    total:totalNumber,
	    loading:loading,
	    showIdCard(record){
	    	Modal.info({
			    title: (<div>身份证照片</div>),
			    content: (<div><Row>
			    			<Col span={12} style={{textAlign:'center',width:'50%'}}>
			    				<img src= {uploadUrl+record.idcardFront} style={{width:300}}/>
			    				<p  style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>正面</p>
			    			</Col>
			    			<Col span={12} style={{textAlign:'center',width:'50%'}} >
			    			    <img src= {uploadUrl+record.idcardBack} style={{width:300}}/>
			    			    <p style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>反面</p>
			    			</Col>
			    			</Row>
			    			<Row>
			    				<Col span={12} style={{textAlign:'center',width:'50%'}}>
			    			    <img src= {uploadUrl+record.idcardPic} style={{width:300}}/>
			    			    <p  style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>手持正面</p>
			    			    </Col>
			    			</Row>
			    		  </div>
			    	),
			    iconType:null,
			    okText:'关闭',
			    maskClosable:true,
			    width:820,
			    onOk() {
			      console.log('OK');
			    },
			    onCancel() {
			      console.log('Cancel');
			    },
			  });
	    },
	    Examine(selectList){
	    	dispatch({
	    		type:'user/showRealNameModal',
	    		payload:{
	    			selectList:selectList
	    		}
	    	})
	    },
	    ExamineModal(selectList){
	    	//console.log(selectList)
	    	var Ids =""
				for(var i in selectList){
						if(selectList[i].status !=1){
						//	console.log(selectList[i].userId)
							Ids +=selectList[i].userId+","
						}
			    }
			  //  console.log(Ids)
			if(Ids == ""){
				message.warn('无需审核的用户')

			}else{
				dispatch({
					  type: 'user/showRealsModal',
					  payload:{
					  	selectList:Ids,

					  }
				   });
			}
	    },
	    handlsearch(values){
	    	
	    },
	    changepage(page){
	    	const search =GetRequest(location.search);
	    	dispatch(routerRedux.push('/user/realName?page='+page+"&userId="+search.userId+
		         	"&email="+search.email+"&mobile="+search.mobile+"&status="+search.status+
		         	"&startDate="+search.startDate+"&endDate="+search.endDate
		         	))	
	    }
	}

	const RealNameModalProps ={
		visible:RealNameVisible,
		confirmLoading:confirmLoading,
		currentValue:currentValue,
		selectList,
		dispatch,
		onCancel(){
			dispatch({
	    		type:'user/hideRealNameModal',
	    		payload:{
	    			
	    		}
	    	})
		},
		onOk(values,selectList){
			console.log(values,selectList);
			if(values.radio =="1") {
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userId:selectList.userId,
						status:1,
						auditUser:merId,
						idcardNo:selectList.idcardNo,
						auditUserName:localStorage.getItem("realname"),
						search:location.search
					}
				})

			}else{
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userId:selectList.userId,
						status:0,
						auditUser:merId,
						idcardNo:selectList.idcardNo,
						refuseReason:values.text,
						auditUserName:localStorage.getItem("realname"),
						search:location.search
					}
			    })
			}
			
		}
	}
	const RealsModalProps ={
		visible:RealsVisible,
		selectList,
		confirmLoading:confirmLoading,
		onCancel(){
			dispatch({
	    		type:'user/hideRealsModal',
	    		payload:{
	    			
	    		}
	    	})
		},
		onOk(values,selectList){
		//	console.log(values,selectList)

			if(values.radio == '1'){
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList,
						status:parseInt(values.radio),
						auditUser:merId,
						auditUserName:localStorage.getItem("realname"),
						search:location.search
					}
				})
			}else{
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList,
						status:parseInt(values.radio),
						auditUser:merId,
						refuseReason:values.text,
						auditUserName:localStorage.getItem("realname"),
						search:location.search
					}
			    })
			}
		}
	}
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='用户ID'>
		            {getFieldDecorator('userId')(
		              <Input placeholder="请输入用户Id" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile')(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='认证时间'>
		            {getFieldDecorator('time')(
		              <RangePicker />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='审核状态'>
		            {getFieldDecorator('status')(
		              <Select   placeholder="请选择" allowClear={true}>
					      <Option value="2">审核中</Option>
					      <Option value="1">已通过</Option>
					      <Option value="0" >不通过</Option>
					      
					    </Select>
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}

	function getFieldsFirst(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='用户ID'>
		            {getFieldDecorator('userId')(
		              <Input placeholder="请输入用户Id" />
		            )}
		          </FormItem>
		        </Col>
						<Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile')(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	//搜索
	function handlsearch(values){
		if(values.time!=undefined){
			if(values.time.length==0){
				 values.time=undefined
			}
		}
		if(values.time ==undefined){
			dispatch(routerRedux.push('/user/realName?page=1'+"&userId="+values.userId+
				 "&email="+values.email+"&mobile="+values.mobile+"&status="+values.status
				 ))	
		}else{
			dispatch(routerRedux.push('/user/realName?page=1'+"&userId="+values.userId+
				 "&email="+values.email+"&mobile="+values.mobile+"&status="+values.status+
				 "&startDate="+timeFormat(new Date(values.time[0]))+"&endDate="+timeFormat(new Date(values.time[1]))
		    ))	
		}
	}
	return (
			<div>
			    <WrappedAdvancedSearchForm getFields = {getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch}/>
				<RealName {...UserRealNameProps}/>
				<RealNameModal {...RealNameModalProps} />
				<RealsModal {...RealsModalProps}/>
			</div>

	);
}

UserRealName.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserRealName));