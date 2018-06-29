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
import axios from 'axios';
import LayoutContainer from '../components/Layout';
import styles from './Common.css';
import NewsAdd from '../components/News/NewsAdd';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import {dataURLtoBlob,ImgUrl,getBase64} from '../services/common'

function News_publish({location,dispatch,router,news}) {

  const {uploading,imageUrl,NewsFlashTopMenus,loading,ifPushValue,PushNewsFlashInfo} =news; //获取modal数据
  let merId =localStorage.getItem("userId");
  
  //父子组件传递
  const NewsAddProps = {
    dispatch:dispatch,
    uploading:uploading,
	imageUrl:imageUrl,
	NewsFlashTopMenus:NewsFlashTopMenus,
	loading:loading,
	ifPushValue:ifPushValue,
	PushNewsFlashInfo:PushNewsFlashInfo,
  }
  
	return (
			<div>
          <NewsAdd {...NewsAddProps}/>
			</div>

	);
}

News_publish.propTypes = {

};

function mapStateToProps({
	news
}) {
	return {
    news
	};
}



export default connect(mapStateToProps)(withRouter(News_publish));