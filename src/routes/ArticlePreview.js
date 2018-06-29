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
import Useradmin from '../components/User/UserAdmin';
import ExamineModal from '../components/User/ExamineModal';
import SetHotuser from '../components/User/SetHotuser';
import LockModal from '../components/User/LockModal';
import {timeFormat} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message,Alert,Tag} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './Common.css';
import logo from '../assets/images/logo.png'
//console.log(merId)
function ArticlePreview({location,dispatch,content,router,}) {
	
	var previewTitle =localStorage.getItem("previewTitle");
	var previewText =localStorage.getItem("previewText");
	var previewartic =localStorage.getItem("previewartic");
	var previewdec =localStorage.getItem("previewdec");
	var previewLink =localStorage.getItem("previewLink");
	var previewSource =localStorage.getItem("previewSource");
	var previewType =localStorage.getItem("previewType");
	var previewTag =localStorage.getItem("previewTag");
	if(previewTag!=""){
		previewTag = previewTag.split(',');
	}else{
		previewTag=null
	}
	
	console.log(previewTag)
	//var H = document.body.clientHeight + 'px'
	//console.log(previewTitle,previewartic)
	return (
			<div style={{minHeight:"100%"}}>
				<div className={styles.context} >
					<p className={styles.title}>{previewTitle=='undefined'?"":previewTitle}</p>
					<div>
						{previewType=="1"&&<span className={styles.name}>原创</span>}
						{previewType=="2"&&<span className={styles.name}>转载<span className={styles.pname}>本文来源：{previewSource}</span>
					<a target = "_blank" className={styles.articlwe}>阅读原文</a></span>}
					</div>
					<p className={styles.hx}></p>
					<div className={styles.articleDec}>{(previewartic=='undefined'||previewartic=="")?previewdec:previewartic}</div>
					<article className={styles.article} dangerouslySetInnerHTML={{__html: previewText}}></article>
					<p className={styles.hx}></p>
					<p className={styles.statement}>
						声明：千氪财经登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考，不构成投资建议，投资者据此操作，风险自担。
					</p>
					{(previewTag!=null)?previewTag.map((t,index)=>{
							return(
								<Tag color="blue" key={index} className={styles.tags}>{t}</Tag>
								)
					}):null}  
				</div>
			</div>
	);
}

ArticlePreview.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ArticlePreview));