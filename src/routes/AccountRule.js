import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form ,Button, Upload, Icon,Input,Select,Col,Modal,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import UserList from '../components/Setting/UserList';
import AdduserModal from '../components/Setting/AddUserModal.js';
import GetRelUser from '../components/Setting/GetRelUser.js';
import EditoruserModal from '../components/Setting/EditorUserModal.js';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import ManageModal from '../components/Setting/ManageModal';
import AddPostModal from '../components/Setting/AddPostModal';
import EditorPostModal from '../components/Setting/EditorPostModal';
import RelationModal from '../components/Setting/RelationUser';

import {formatDate,tokenLogOut,GetRequest} from '../services/common'
function AccountRule({location,dispatch,setting,router,}) {
	let  userId = localStorage.getItem('userId');
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const { confirmLoading,getRelUserList,GetRelUserViible,deskUserId,EditorPostVisible,loading,editorUserVisible,listVisible,ManageVisible,PostVisible,SysUserList,PostList,getPost,TreeList,type,currentItem,RelationVisible,item,selectList,totalNumber,currentPage}=setting;
	//console.log('getAuthTree',getAuthTree)
	//生成随机密码
	function upsetArr(arr){
        return arr.sort(function(){ return Math.random() - 0.5});
		}
		//可以这样使用
   
	function randomString(len, charSet,num,capital) {
		  charSet = charSet || 'abcdefghijklmnopqrstxyz';
		  num = num || '0123456789';
		  capital = capital || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		  var randomString = '';
		  var numString ="";
		  var cap = ""
		  for (var i = 0; i < len; i++) {
		   var randomPoz = Math.floor(Math.random() * charSet.length);
		   var random = Math.floor(Math.random() * num.length);
		   var ran = Math.floor(Math.random() * capital.length);
		   randomString += charSet.substring(randomPoz,randomPoz+1);
		   numString += num.substring(random,random+1);
		   cap +=capital.substring(ran,ran+1);
		  }

		  var total = upsetArr((randomString+numString+cap).split("")).join("");

		  return total;
	}

	//搜索
	function handlsearch(values) {
		if (values.username == "" || values.username == undefined) {
			values.username = undefined;
		} else {
			values.username = Base64.encode(values.username)
		}
			dispatch(routerRedux.push('/setting/account?page=1'+"&username="+values.username+"&mobile="+values.mobile+"&postId="+values.postId))
	}
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
	    		<Col  md={8} sm={24} style = {{display:'block'}}>
				   	<FormItem
			          label="用户名"
			          {...formItemLayout}
			        >
			          {getFieldDecorator('username', {
			          
			          })(
			            <Input />
			          )}
	               </FormItem>
                </Col>
                <Col  md={8} sm={24} style = {{display:'block'}}>
					 <FormItem
			          label="手机号"
			          {...formItemLayout}
			        >
			          {getFieldDecorator('mobile', {
			           
			          })(
			            <Input />
			          )}
		            </FormItem>
		        </Col>
		      <Col span={8} style = {{display:'block'}}>
   			 <FormItem
	          {...formItemLayout}
	          label="岗位"
	          hasFeedback
	        >
	          {getFieldDecorator('postId', {
	            
	          })(
                <Select placeholder="请选择">
	              {PostList.map((item,index)=>
							<Option key={index} value={item.postId+""}>{item.postName}</Option>
				  )}
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
	    		<Col  md={8} sm={24} style = {{display:'block'}}>
				   	<FormItem
			          label="用户名"
			          {...formItemLayout}
			        >
			          {getFieldDecorator('username', {
			          
			          })(
			            <Input />
			          )}
	               </FormItem>
                </Col>
                <Col  md={8} sm={24} style = {{display:'block'}}>
					 <FormItem
			          label="手机号"
			          {...formItemLayout}
			        >
			          {getFieldDecorator('mobile', {
			           
			          })(
			            <Input />
			          )}
		            </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	//添加账号
	
	function addUser() {

		dispatch({
			type: 'setting/showListModal',
			payload: {
				type: 'create',
				currentItem:{}
			},
		});
	}
	
	const AdduserModalProps = {
		visible: listVisible,
		confirmLoading:confirmLoading,
		PostList,
		onOk:function(vaules){
				dispatch({
					type:'setting/addSysUser',
					payload:{
						username:vaules.username,
						mobile:vaules.mobile,
						realname:vaules.realname,
						password:vaules.password,
						postId:parseInt(vaules.postId),
						search:location.search
					}
				})
				
		},
		onCancel:function(){
			dispatch({
				type: 'setting/hideListModal',
				payload: {
					currentItem: {}
				}
			});
		}
	}
	
	//编辑账号
	const EditoruserModalProps ={
		visible: editorUserVisible,
		confirmLoading:confirmLoading,
		PostList,
		type:type,
		item:currentItem,
		onCancel(){
			dispatch({
				type: 'setting/hideEditorListModal',
				
			});
		},
		onOk:function(id,vaules){
				// console.log(id,vaules)
				dispatch({
					type:'setting/addSysUser',
					payload:{
						userId:id,
						username:vaules.username,
						mobile:vaules.mobile,
						realname:vaules.realname,
						password:vaules.password,
						postId:parseInt(vaules.postId),
						search:location.search
					}
				})
				
		}
	}
	//岗位列表
	const ManageModalProps = {
		visible: ManageVisible,
		data:getPost,
		onOk:function(){
			
		},
		onCancel:function(){
			dispatch({
				type: 'setting/hideMangeModal',
				
			});
		},
		showModal:function(){
			dispatch({
				type: 'setting/hideMangeModal',
				
			});
			dispatch({
				type: 'setting/showPostModal',
				
			});
		},
		handleDel(record){
				console.log(record)
			dispatch({
				type:"setting/postSetStatus",
				payload:{
					userId:userId,
					status:record.status==true?false:true,
					postId:record.postId
				}
			})
		},
		onEditItem(record){
			//console.log(record)
			//localStorage.setItem('kg_aboutEditor',JSON.SON.stringify(record)
			dispatch({
				type: 'setting/hideMangeModal',

				
			});
			dispatch({
				type: 'setting/showEditorPostModal',
				payload:{
					currentItem:record,
				}
			});
		}
	}
	
	//管理岗位
	function manage(){
		dispatch({
			type: 'setting/showMangeModal',
			payload: {
			
			},
		});
	}
	
	
	//添加岗位
	const AddPostModalProps ={
		visible: PostVisible,
		TreeList,
		item:currentItem,
		onCancel:function(){
			dispatch({
			    type: 'setting/hidePostModal',
			
		    });
		},
		onOk(values,list){
			console.log(list.join(','))
				dispatch({
					type: 'setting/addPost',
					payload: {
						name:values.name,
						authIds:list.join(','),
						userId:userId,
					},
			    });
			
			
		}
	}

	//编辑岗位
	const EditorPostModalProps ={
		visible: EditorPostVisible,
		TreeList,
		item:currentItem,
		onCancel:function(){
			dispatch({
			    type: 'setting/hideEditorPostModal',
				currentItem:{...{}}
		    });
		     //window.location.reload()
		},
		onOk(values,id,list){
			dispatch({
					type: 'setting/addPost',
					payload: {
						name:values.name,
						postId:id,
						authIds:list.join(','),
						userId:userId,
					},
			    });
		}
	}
	const UserListProps ={
		data:SysUserList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		onEditItem:function(record){
			dispatch({
				type: 'setting/showEditorListModal',
				payload: {
				    currentItem:record,
				},
		    });
		},
		setStatus(record){
			Modal.confirm({
				title: record.status ==0?"是否启用？":"是否禁用？",
				okText:"确定",
		        cancelText:"取消",
				onOk() {
				    dispatch({
				    	type:"setting/sysuserSetStatus",
				    	payload:{
				    		userId:record.id,
							status:record.status ==0?true:false,
							search:location.search
				    	}
				    })

				},
				onCancel() {
				      console.log('Cancel');
				},
			
			})
		},
		capage(page){
			const search =GetRequest(location.search)
			dispatch(routerRedux.push('/setting/account?page='+page+"&username="+search.username+"&mobile="+search.mobile+"&postId="+search.postId))
		},
		reseatPaw(record){
			var paw = randomString(2)
			Modal.confirm({
				title: "确认重置密码吗？",
				okText:"确定",
		        cancelText:"取消",
				content:(
					      <div>
					        <p style={{fontSize:16+'px'}}>将重置为初始密码：{paw}</p>
					      </div>
					    ),
				onOk() {
				    dispatch({
				    	type:"setting/resetPassword",
				    	payload:{
				    		userId:record.id,
							password:paw,
							search:location.search
				    	}
				    })
				},
				onCancel() {
				      console.log('Cancel');
				},			
			})
		},
		setKgUser(record){
			if(record.kgUsername == null){
				dispatch({
					type:"setting/showRelationModal",
					payload:{
						item:record
					}
				})

			}else{
				dispatch({
					type:"setting/getRelUser",
					payload:{
						sysUserId:record.id
					}

				})
				dispatch({
					type:"setting/showGetRelUserModal",
					payload:{
						item:record
					}
				})
				// Modal.confirm({
				// 	title: "关联前台用户",
				// 	iconType:null,
				// 	content:(
				// 		      <div>
				// 		      	   <p>手机号：{record.kgUsername}</p>
				// 		      </div>
				// 		   ),
				// 	okText : '修改',
				// 	cancelText:"取消",
				// 	onOk() {
				// 	    dispatch({
				// 	    	type:"setting/showRelationModal",
				// 	    	payload:{
				// 	    		item:record
				// 	    	}
				// 	    })

				// 	},
				// 	onCancel() {
				// 	      console.log('Cancel');
				// 	},			
				// })
			}


		}
	}


	const RelationModalProps ={
		visible:RelationVisible,
		item,
		deskUserId,
		onCancel(){
			dispatch({
				type:"setting/hideRelationModal"
			})
		},
		handleBlur(e){
			// console.log(e.target.value.length)
			if(e.target.value.length == 11){
				dispatch({
					type:"setting/getUserId",
					payload:{
						userMobile:e.target.value
					}
				})
			}
		},
		onOk(record,deskUserId){
			//console.log(record,deskUserId)
            Modal.confirm({
				title:"确认关联前台用户吗？",
				okText : '确定',
				cancelText:"取消",
				onOk() {
					dispatch({
					    type:"setting/setKgUser",
					    	payload:{
					    		userId:record.id,
								kgUserId:deskUserId,
								search:location.search
					    	}
			            })
					},
				onCancel() {
					      console.log('Cancel');
					},	
			    })
			}
		
	}

	//已关联的用户列表
	//console.log(getRelUserList)
	const GetRelUserProps ={
		visible:GetRelUserViible,
		data:getRelUserList,
		item,
		onCancel(){
			dispatch({
				type:"setting/hideGetRelUserModal",
				payload:{
					item:{}
				}
			})
		},
		handleDel(record,item){
			dispatch({
				type:"setting/unsetKgUser",
				payload:{
					relId:record.relId,
					sysUserId:item.id,
					search:location.search
				}
			})
		},
		addGetUser(item){
			dispatch({
				type:"setting/hideGetRelUserModal",
				payload:{
					//item:{}
				}
			})
			dispatch({
				type:"setting/showRelationModal",
				payload:{
					item:item
				}
			})
		}

	}
	return (
			<div className={styles.Indexbox}>
				<div>
					<WrappedAdvancedSearchForm getFieldsFirst ={getFieldsFirst} getFields = {getFields}  handlsearch={handlsearch}/>
				</div>
				<div className= {styles.addAccount}>
					<Button type="primary" size='large' onClick = {addUser} >添加账号</Button><Button type="primary" size='large' className={styles.post} onClick = {manage}>管理岗位</Button>
				</div>
				<UserList {...UserListProps}/>
				<AdduserModal {...AdduserModalProps} />
				<EditoruserModal {...EditoruserModalProps} />
				<ManageModal {...ManageModalProps}/>
				<AddPostModal {...AddPostModalProps}/>
				<RelationModal {...RelationModalProps}/>
				<EditorPostModal {...EditorPostModalProps}/>
				<GetRelUser {...GetRelUserProps}/>
			</div>

	);
}

AccountRule.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AccountRule));