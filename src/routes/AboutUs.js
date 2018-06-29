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

import { Button,Modal} from 'antd';

import ArticleList from '../components/Setting/ArticleList';
const confirm = Modal.confirm;


let userId =localStorage.getItem("userId");
function AboutUs({dispatch,router,setting}) {
	const {BaseInfoList} =setting
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const ArticleListProps = {
		BaseInfoList,
		onEditItem:function(record){
			localStorage.setItem('kg_aboutEditor',JSON.stringify(record));
			localStorage.setItem('articleText',record.infoDetail);
			dispatch(routerRedux.push('/setting/addinfoEditor?id='+record.id))
		
		},
		handleDel(record){
			dispatch({
				type:'setting/deleteBaseinfo',
				payload:{
					id:record.id,
				}
			})
		},
		handeShow(record){
				confirm({
				    title:(<div>
				    	{record.infoStatus ==true&&<span>是否设置成<span style={{color:"#f00"}}>隐藏</span>?</span>}
				    	{record.infoStatus ==false&&<span>是否设置成<span style={{color:"#52c41a"}}>显示</span>?</span>}
				    </div>),
				    okText:"确定",
				    cancelText:"取消",
				    onOk() {
				      dispatch({
				      	type:'setting/setInfoStatus',
				      	payload:{
				      		id:parseInt(record.id),
				      		updateUser:parseInt(userId),
				      	}
				      })
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
				  });
				}
	}
	function addInfo (){
		localStorage.removeItem('articleText');
		dispatch(routerRedux.push('/setting/addinfo'))
		//router.push('setting/addinfo')
	}
	return (
			<div className={styles.Indexbox}>
				
				<ArticleList {...ArticleListProps}/>
				
			</div>

	);
}

AboutUs.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AboutUs));

//<div className={styles.addbtn}>
//<Button type="primary" size="large" onClick={()=>addInfo()}>添加信息</Button>
//</div>				