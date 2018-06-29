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
import { message,Modal,Cascader,Form,Input,Select,Row, Col,Button } from 'antd';
import {GetRequest,residences} from '../services/common';
import OtherImgTable from '../components/Advert/OtherImgTable';
import OtherImgAdd from '../components/Advert/OtherImgAdd';
import OtherImgEditor from '../components/Advert/OtherImgEditor';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from './Record.css';
import advert from '../models/advert';
const FormItem = Form.Item;
const Option = Select.Option;
function ContentImage({dispatch,advert,location}) {
	let  userId = localStorage.getItem('userId');
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {ImageList,loading,currentPage,totalNumber,ImgVisible,selectValue,imageUrl,confirmLoading,uploading,ImgEditorVisible,currentItem} = advert;

	function getFieldsFirst(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col md={8} sm={24} style = {{display:'block'}}>
				           <FormItem
					          {...formItemLayout}
					          label="显示位置"
					        >
					          {getFieldDecorator('residence', {
					          
					            rules: [{ type: 'array', required: false, message: '请选择!' }],
					          })(
					            <Cascader options={residences}placeholder="请选择" />
					          )}
					        </FormItem>
				        </Col>
			            <Col md={8} sm={24} style = {{display:'block'}}>
			            <FormItem {...formItemLayout} label='类型'>
			            {getFieldDecorator('type',{
			            	
			            	})(
			              <Select placeholder="请选择">
									   	<Option value="1">资讯</Option>
			              	<Option value="3">其他</Option>
											<Option value="4">活动</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			     
		        </div>
	      	);
	   		return children;
	}
	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col md={8} sm={24} style = {{display:'block'}}>
				           <FormItem
					          {...formItemLayout}
					          label="显示位置"
					        >
					          {getFieldDecorator('residence', {
					          
					            rules: [{ type: 'array', required: false, message: '请选择!' }],
					          })(
					            <Cascader options={residences}placeholder="请选择" />
					          )}
					        </FormItem>
				        </Col>
			            <Col md={8} sm={24} style = {{display:'block'}}>
			            <FormItem {...formItemLayout} label='类型'>
			            {getFieldDecorator('type',{
			            	
			            	})(
			              <Select placeholder="请选择">
			              	<Option value="1">资讯</Option>
			              	<Option value="3">其他</Option>
											<Option value="4">活动</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        <Col md={8} sm={24} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='显示状态'>
			            {getFieldDecorator('showStatus',{
			            	
			            	})(
			               <Select placeholder="请选择">
			               
			              	<Option value="1">显示</Option>
			              	<Option value="0">隐藏</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
		        </div>
	      	);
	   		return children;
	}

	function handlsearch(values){
			if(values.residence!=undefined){
			
			dispatch(routerRedux.push('/advert/other_imgs?page=1'+"&imageType="+values.type+
				"&imageStatus="+values.showStatus+"&navigatorPos="+values.residence[0]+"&imagePos="+values.residence[1]
				))

			}else{
				dispatch(routerRedux.push('/advert/other_imgs?page=1'+"&imageType="+values.type+
				"&imageStatus="+values.showStatus

				))
			}
    }
    //添加图片
    function showModal(){
			dispatch({
				type:'advert/showModal',
			})
	}
	

	//添加图片模态框
	const OtherImgAddProps = {
			visible:ImgVisible,
			selectValue:selectValue,
			imageUrl:imageUrl,
			confirmLoading:confirmLoading,
			dispatch:dispatch,
			uploading:uploading,
			onCancel(){
				dispatch({
					type:'advert/hideModal'
				})
			},
			onOk(data){
				dispatch({
					type:'advert/addImage',
					payload:{
						...data,
						search:location.search
					}
				})
			}
	}
	//编辑图片模态框
	const OtherImgEditorProps = {
		visible:ImgEditorVisible,
		selectValue:selectValue,
		item:currentItem,
		imageUrl:imageUrl,
		confirmLoading:confirmLoading,
		dispatch:dispatch,
		uploading:uploading,
		onCancel(){
			dispatch({
				type:'advert/hideEditorModal'
			})
		},
		onOk(data){
			dispatch({
				type:'advert/addImage',
				payload:{
					...data,
					search:location.search
				}
			})
		}
}
	//父子组件传递
	const OtherImgTableProps = {
		data:ImageList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		editorItem(record){
			dispatch({
				type:'advert/showEditorModal',
				payload:{
					currentItem:record
				}
			})
		},
		deleteItem(record){
			dispatch({
				type:'advert/deleteImage',
				payload:{
					imageId:record.imageId,
					search:location.search,
					imageType:2
				}
			})
		},
		changepage(page){
			const values =GetRequest(location.search)
			dispatch(routerRedux.push('/advert/other_imgs?page='+page+"&imageType="+values.type+
			"&imageStatus="+values.showStatus+"&navigatorPos="+values.navigatorPos+"&imagePos="+values.imagePos
			))
		}
	}
	return (
			<div >
				<div className = {styles.changeAward}>
					<Link  to = '/advert/list?page=1'>广告</Link>
					<Link  className = {styles.activeAward}  to = '/advert/other_imgs?page=1'>其他图片</Link>
					
				</div>
				<Button type="primary" size = 'large' onClick={showModal} style = {{marginBottom:20,marginTop:20}} icon="plus">添加图片</Button>
			    <WrappedAdvancedSearchForm  style = {{margin:0}} getFields = {getFields} getFieldsFirst = {getFieldsFirst} handlsearch ={handlsearch}/>
				<OtherImgTable {...OtherImgTableProps}/>
				<OtherImgAdd {...OtherImgAddProps}/>
				<OtherImgEditor {...OtherImgEditorProps}/>
			</div>

	);
}

ContentImage.propTypes = {

};

function mapStateToProps({
	advert
}) {
	return {
		advert
	};
}



export default connect(mapStateToProps)(withRouter(ContentImage));