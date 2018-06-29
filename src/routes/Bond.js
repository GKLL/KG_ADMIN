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
import BondList from '../components/Finance/BondList';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import stytes from './UserLoginPage.css';
import {timeFormat,GetRequest} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,DatePicker,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function Bond({location,dispatch,finance,router,}) {
	
	const {AccountDiposit,totalNumber,currentPage,loading} = finance;
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const BondListProps ={
		data:AccountDiposit,
		total:totalNumber,
		currentPage,
		loading,
		Examine(reacord){
			console.log(reacord)
			Modal.info({
			    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>充值时间：{reacord.accountTime}</span></div>),
			    content: (<table className={stytes.table}>
			    			<tbody>
				    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>手机号</td><td>{reacord.mobile}</td></tr>
				    			<tr><td>用户角色</td><td>{reacord.userRoleDisplay}</td><td>用户级别</td><td>{reacord.levelDisplay}</td></tr>
				    			<tr><td>充值地址</td><td>TVJv1pNo5ge5SB6QpX12CgGc7Ev8QDnYH8h</td><td>应缴纳保证金数额</td><td>{reacord.depositAmount}</td></tr>
				    			<tr><td>实际缴纳数额</td><td>{reacord.accountAmount}</td><td>到账时间</td><td>{reacord.accountTime}</td></tr>
				    			<tr><td>备注信息</td><td>{reacord.accountAmount}</td></tr>
			    			</tbody>
			    	      </table>
			    	),
			    iconType:null,
			    okText:'关闭',
			    width:820,
			    onOk() {
			      console.log('OK');
			    },
			    onCancel() {
			      console.log('Cancel');
			    },
			  });
		},
		changepage(page){
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/finance/bond?page='+page+"&userId="+search.userId
				+"&mobile="+search.mobile+"&startDate="+search.startDate+"&endDate="+search.endDate))
		}
	}
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='用户ID'>
		            {getFieldDecorator('userId',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"用户ID只能输入数字"}
			            	]
		            })(
		              <Input type="text"placeholder="请输入Id" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='缴纳时间'>
		            {getFieldDecorator('time')(
		              <RangePicker/>
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
		            {getFieldDecorator('userId',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"用户ID只能输入数字"}
			            	]
		            })(
		              <Input type="text"placeholder="请输入Id" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	function handlsearch(values){
			console.log(values)
			if(values.time ==undefined){
				dispatch(routerRedux.push('/finance/bond?page=1'+"&userId="+values.userId+"&mobile="+values.mobile))
			}else{
				dispatch(routerRedux.push('/finance/bond?page=1'+"&userId="+values.userId+"&mobile="+values.mobile+
				"&startDate="+timeFormat(new Date(values.time[0]))+"&endDate="+timeFormat(new Date(values.time[1]))
					))
			}
    }


	return (
			<div>
				<WrappedAdvancedSearchForm getFields = {getFields} getFieldsFirst={getFieldsFirst}handlsearch={handlsearch}/>
				<BondList {...BondListProps}/>
			</div>

	);
}

Bond.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(Bond));