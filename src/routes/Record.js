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
import Transaction from '../components/Finance/Transaction';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import {timeFormat,GetRequest} from '../services/common';
import styles from './Record.css'
import { Form, Row, Col, Input,InputNumber,Tabs, Button, Icon,Table,Pagination,DatePicker,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function Record({location,dispatch,finance,router,}) {
	
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {AccountList,currentPage,totalNumber,loading,BusinessType,ActiveKey} =finance;
	const TransactionProps = {
			data:AccountList,
			currentPage,
			total:totalNumber,
			loading,
			BusinessType,
			Examine(reacord){
				console.log(reacord)

				Modal.info({
				    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>创建时间：{reacord.flowDate}</span></div>),
				    content: (<table className={stytes.table}>
				    			{reacord.businessTypeId == 50 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>支付数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
				    	        {reacord.businessTypeId == 40 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>收入数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
									{reacord.businessTypeId == 640 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>收入数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
									{reacord.businessTypeId == 650 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>支付数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
								{reacord.businessTypeId == 345 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>手机号</td><td>{reacord.mobile}</td></tr>
					    			<tr><td>用户角色</td><td>{reacord.userRoleDisplay}</td><td>用户级别</td><td>{reacord.levelDisplay}</td></tr>
					    			<tr><td>评论文章</td><td>{reacord.articleTitle!=null?reacord.articleTitle:"——"}</td><td>获取数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
				    			{(reacord.businessTypeId == 310 ||reacord.businessTypeId == 340 ||
				    		      reacord.businessTypeId == 320 ||reacord.businessTypeId == 330||reacord.businessTypeId == 560||
											reacord.businessTypeId == 90||reacord.businessTypeId == 540
				    				)&&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>获取数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
				    			{reacord.businessTypeId == 20 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>提币地址</td><td>{reacord.address}</td></tr>
					    			<tr><td>实际到账数量</td><td>{reacord.accountAmount}</td><td>手续费</td><td>{reacord.poundageAmount}</td></tr>
					    			<tr><td>到账时间</td><td>{reacord.flowDate}</td><td>当前状态</td><td>{reacord.status==null?"——":reacord.status}</td></tr>
				    			</tbody>
				    			}
				    			{reacord.businessTypeId == 350 &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>发放总钛值</td><td>{reacord.amount}</td></tr>
					    			<tr><td>奖励总人数</td><td>{reacord.bonusTotalPerson==null?"——":reacord.bonusTotalPerson}</td><td>当前状态</td><td>{reacord.status}</td></tr>
					    			
				    			</tbody>
				    			}
									{reacord.businessTypeId == 30 &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>发放总钛值</td><td>{reacord.amount}</td></tr>
					    			<tr><td>奖励总人数</td><td>{reacord.bonusTotalPerson==null?"——":reacord.bonusTotalPerson}</td><td>当前状态</td><td>{reacord.status}</td></tr>
					    			
				    			</tbody>
				    			}
				    			{reacord.businessTypeId == 10 &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>充值地址</td><td>{reacord.address==null?"——":reacord.address}</td></tr>
					    			<tr><td>充值数量</td><td>{reacord.amount==null?"——":reacord.amount}</td><td>到账时间</td><td>{reacord.flowDate}</td></tr>
					    			<tr><td>当前状态</td><td>{reacord.status==null?"——":reacord.status}</td></tr>
				    			</tbody>
				    			}
				    			{(reacord.businessTypeId == 70||reacord.businessTypeId == 80) &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>获取数额</td><td>{reacord.accountAmount}</td></tr>
				    			</tbody>
				    			}
									{reacord.businessTypeId == 570 &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>昵称</td><td>{reacord.userName==null?"——":reacord.userName}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>收入数额</td><td>{reacord.accountAmount}</td></tr>
										<tr><td>奖励原因</td><td>{reacord.flowDetail}</td><td></td><td></td></tr>
				    			</tbody>
				    			}
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
			console.log(search)
			//if()
			dispatch(routerRedux.push('/finance/record?page='+page+"&flowId="+search.flowId+"&nickName="+search.nickName
				+"&mobile="+search.mobile+"&businessTypeId="+search.businessTypeId+"&minAmount="+search.minAmount+"&maxAmount="+search.maxAmount
				+"&startDate="+search.startDate+"&endDate="+search.endDate
				))
			//router.push('/finance/record?page='+page+"&flowId="+search.flowId)
		},
		handlsearch(values){
			//console.log(values)
			
		}
	}

	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='流水号'>
		            {getFieldDecorator('flowId',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input placeholder="请输入流水号" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='类型'>
		            {getFieldDecorator('businessTypeId')(
		               <Select  placeholder="请选择">
		               		{BusinessType!=undefined?BusinessType.map((item,index)=>
		               			<Option  key={index} value={item.id+''}>{item.name}</Option>
		               			)
		               			
		               			:null}
					    </Select>
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='交易时间'>
		            {getFieldDecorator('time')(
		              <RangePicker />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <Col span={12} style={{paddingLeft:68+"px"}}>
		          	<FormItem {...formItemLayout} label='钛值'>
		            {getFieldDecorator('minAmount')(
		              		<InputNumber style={{ textAlign: 'center' }} placeholder="最小值" />
		              	
		            )}
		          </FormItem>
		          </Col>
		          <Col span={2} style={{ textAlign: 'center',lineHeight:30+"px"}}>
		          	<span >~</span>
		          </Col>
		          <Col span={10}>
		          		<FormItem {...formItemLayout}>
				            {getFieldDecorator('maxAmount')(
				              	<InputNumber style={{ textAlign: 'center'}} placeholder="最大值" />
				            )}
				          </FormItem>
		         </Col>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input placeholder="手机号" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='昵称'>
		            {getFieldDecorator('nickName')(
		              <Input  placeholder="请输入昵称" />
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
		          <FormItem {...formItemLayout} label='流水号'>
		            {getFieldDecorator('flowId',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input placeholder="请输入流水号" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='类型'>
		            {getFieldDecorator('businessTypeId')(
		               <Select  placeholder="请选择">
		               		{BusinessType!=undefined?BusinessType.map((item,index)=>
		               			<Option  key={index} value={item.id+''}>{item.name}</Option>
		               			)
		               			
		               			:null}
					    </Select>
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	function handlsearch(values){
		if (values.nickName == "" || values.nickName == undefined) {
			values.nickName = undefined;
		} else {
			values.nickName = Base64.encode(values.nickName)
		}
		console.log(values.nickName)
		if(values.time ==undefined||values.time.length ==0){
			dispatch(routerRedux.push(
				'/finance/record?page=1'+"&flowId="+values.flowId+"&nickName="+values.nickName+
				"&mobile="+values.mobile+"&businessTypeId="+values.businessTypeId+
				"&minAmount="+values.minAmount+"&maxAmount="+values.maxAmount
				))
		}else{
			dispatch(routerRedux.push(
				'/finance/record?page=1'+"&flowId="+values.flowId+"&nickName="+values.nickName+
				"&mobile="+values.mobile+"&businessTypeId="+values.businessTypeId+
				"&minAmount="+values.minAmount+"&maxAmount="+values.maxAmount
				+"&startDate="+timeFormat(new Date(values.time[0]))+"&endDate="+timeFormat(new Date(values.time[1]))
				))
		}
	}
	return (
			<div>
				<div className = {styles.changCoinType}>
					<Link  className = {styles.activeColor} to = '/finance/record?page=1'>钛值</Link>
					<Link   to = '/finance/recordTxb?page=1'>氪金</Link>
				</div>
				<WrappedAdvancedSearchForm getFields = {getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch}/>
				<Transaction {...TransactionProps}/>
			</div>

	);
}

Record.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(Record));