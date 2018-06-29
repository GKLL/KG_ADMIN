import React, {
	Component,
	PropTypes
} from 'react';
import {connect} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import { Form ,Button, Upload, Icon,Input} from 'antd';
import Layout from '../components/Layout';
import styles from './IndexPage.css';
import AppTable from '../components/APP/AppTable';
import AddModal from '../components/APP/AddModal';
import {uploadUrl} from '../services/common'
function AppPage({ location, dispatch, app }) {
	
	const {addModal,isSys,appList,totalNumber,currentPage,loading,loging,forcedVal} = app;
	//新建版本
	function AddModalBox(){
		dispatch({
			type:"app/showModal",
		})
	}
	const AddModalProps = {
		visible:addModal,
		isSys:isSys,
		loging:loging,
		forcedVal:forcedVal,
		onOk(data){
			let downloadUrl = "";
			if(data.systemType == "1"){
				downloadUrl = uploadUrl+data.upload[0].url
			}else{
				downloadUrl= data.downloadUrl
			}
			console.log(data)
			if(data.forced==-1){
				dispatch({
					type:"app/createApp",
					payload:{
						versionNum:data.versionNum,
						forced:data.forced,
						systemType:parseInt(data.systemType),
						downloadUrl:downloadUrl,
					}
				})
			}else{
				dispatch({
					type:"app/createApp",
					payload:{
						versionNum:data.versionNum,
						prompt:data.prompt,
						forced:data.forced,
						systemType:parseInt(data.systemType),
						downloadUrl:downloadUrl,
					}
				})
			}
			
		},
		onCancel(){
			dispatch({
				type:"app/hideModal"
			})
		},
		checkSysteme(e){
			var value = parseInt(e.target.value);
			dispatch({
				type:"app/selectType",
				payload:{
					isSys:value
				}
			})
		
		},
		forcedChange(e){
			var val = e.target.value;
			dispatch({
				type:'app/forcedChange',
				payload:{
					forcedVal:val
				}
			})
		}
	}
	//APP版本管理列表
	const AppTableProps ={
		data:appList,
		loading:loading,
		currentPage:currentPage,
		total:totalNumber,
		handelchande(page){
			dispatch(routerRedux.push('/app/editon?page='+page))
		},
		deleteItem(record){
			dispatch({
				type:"app/deleteAppvm",
				payload:{
					id:record.id,
					search:location.search
				}
			})
		},
		lookOver(record){
			dispatch(routerRedux.push('/app/detail?id='+record.id))
		}
	}
	return (
		<div>
			<div className = { styles.tableListOperator }>
				<Button 
				style={{marginBottom:20}}
				type = "primary"
				icon="plus"
				onClick={()=>AddModalBox()}
				size = "large" >
				新建版本
				</Button>    
            </div>
			<AppTable {...AppTableProps}/>
			<AddModal {...AddModalProps}/>
		</div>

	);
}

AppPage.propTypes = {

};

function mapStateToProps({
	app
}) {
	return {
		app
	};
}



export default connect(mapStateToProps)(withRouter(AppPage));