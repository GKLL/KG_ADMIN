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
import Manage from '../components/Finance/Mange';
import ManageTi from '../components/Finance/MangeTi';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import stytes from './UserLoginPage.css';
import ExamineModal from '../components/Finance/ExamineModal';
import {timeFormat,GetRequest} from '../services/common';
import { Form, Row, Col, Input,Tabs,DatePicker,Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function Withdrawals({location,dispatch,finance,router,}) {
	
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {WIthdrawList,currentPage,totalNumber,loading,ExamineVisible,selectList,ActiveKey,confirmLoading} =finance;


	const ManageProps ={
		data:WIthdrawList,
		currentPage,
		total:totalNumber,
		loading,
		Examine(reacord){
			Modal.info({
			    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>提币时间：{reacord.withdrawTime}</span></div>),
			    content: (<table className={stytes.table}>
			    			<tbody>
				    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
				    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
				    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>提币地址</td><td>{reacord.toAddress}</td></tr>
				    			<tr><td>提币数量</td><td>{reacord.withdrawAmount}</td><td>手续费</td><td>{reacord.poundageAmount}</td></tr>
				    			<tr><td>实际到账数量</td><td>{reacord.accountAmount}</td><td>当前状态</td><td>{reacord.statusDisplay}</td></tr>
				    			<tr><td>到账时间</td><td>{reacord.accountTime==null?"——":reacord.accountTime}</td><td>备注</td><td>{reacord.remark==null?"——":reacord.remark}</td></tr>
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
			dispatch(routerRedux.push('/finance/withdrawals?page='+page+"&email="+search.email
				+"&mobile="+search.mobile+"&status="+search.status+"&startDate="+search.startDate+
				"&endDate="+search.endDate
				))
			//router.push('/finance/withdrawals?page='+page)
		},
		onEdit(record){
			dispatch({
				type:'finance/showModal',
				payload:{
					selectList:record
				}
			})
		}
	}

	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='邮箱'>
		            {getFieldDecorator('email')(
		              <Input type="email"placeholder="请输入邮箱" />
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
		          <FormItem {...formItemLayout} label='提现时间'>
		            {getFieldDecorator('time')(
		              <RangePicker/>
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='提现状态'>
		            {getFieldDecorator('status')(
		              <Select   placeholder="请选择">
					      <Option value="0">审核中</Option>
					      <Option value="1">已通过</Option>
					      <Option value="2">已撤销</Option>
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
		          <FormItem {...formItemLayout} label='邮箱'>
		            {getFieldDecorator('email')(
		              <Input type="email"placeholder="请输入邮箱" />
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
			if(values.time ==undefined){
			dispatch(routerRedux.push('/finance/withdrawals?page=1'+"&email="+values.email+
				"&mobile="+values.mobile+"&status="+values.status
				))
			}else{
				dispatch(routerRedux.push('/finance/withdrawals?page=1'+"&email="+values.email+
				"&mobile="+values.mobile+"&status="+values.status+"&startDate="+timeFormat(new Date(values.time[0]))+
				"&endDate="+timeFormat(new Date(values.time[1]))
				))
			}
	}
	const  ExamineModalProps ={
		visible:ExamineVisible,
		confirmLoading:confirmLoading,
		selectList,
		onCancel(){
			dispatch({
				type:'finance/hideModal',

			})
		},
		onOk(values,selectList){

			if(values.radio=='2'){
				dispatch({
					type:'finance/auditAccountWithdraw',
					payload:{
						flowId:selectList.flowId,
						status:parseInt(values.radio),
						refuseReason:values.text,
						search:location.search
					}
			    })
			}else{
				dispatch({
					type:'finance/auditAccountWithdraw',
					payload:{
						flowId:selectList.flowId,
						status:parseInt(values.radio),
						search:location.search
					}
				})
			}
			
		}

	}

	function callback(key){
		console.log(key)
		dispatch({
			type:"finance/selectActiveKey",
			payload:{
				ActiveKey:key
			}
		})
	}
	class TableList extends React.Component {
			  state = {
			    defaultActiveKey: ActiveKey, 
			    selectedRowKeys:[],
			  };
			  render() {
			   const {defaultActiveKey}=this.state
			    return (
			      <Tabs defaultActiveKey={defaultActiveKey} onChange={callback}>
				    <TabPane tab="钛值TV" key="1">
				    <Manage {...ManageProps}/>
				    <ExamineModal {...ExamineModalProps}/>
				    </TabPane>
				    <TabPane tab="钛小白" key="2">
				    <ManageTi />
				    <ExamineModal {...ExamineModalProps}/>
				    </TabPane>
				</Tabs>
			    );
			  }
    }
	return (
			<div>
				<WrappedAdvancedSearchForm getFieldsFirst={getFieldsFirst} getFields = {getFields} handlsearch={handlsearch}/>
				<Manage {...ManageProps}/>
				<ExamineModal {...ExamineModalProps}/>
			</div>

	);
}

Withdrawals.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(Withdrawals));