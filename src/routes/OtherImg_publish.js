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
import { message, Modal, Cascader, Form, Input, Select, Row, Col, Button } from 'antd';
import LayoutContainer from '../components/Layout';
import OtherImgAdd from '../components/Advert/OtherImgAdd';
import { GetRequest, residences } from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from './Record.css'
const FormItem = Form.Item;
const Option = Select.Option;
function ContentImage({ dispatch, advert, location }) {
	let userId = localStorage.getItem('userId');
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const {keWordArr,imageUrl,uploading,selectValue} =advert;  //获取modal数据
	//父子组件之间传递数据
	const OtherImgAddProps = {
		dispatch:dispatch,
		selectValue:selectValue,
		uploading:uploading,
		imageUrl:imageUrl,
		clickKeyWord(keyword){
			console.log(keyword)
			dispatch({
				type:'advert/selectWordsSuccess',
				payload:{
					currentWord:keyword
				}
			})
		},
		handleChange(tag, checked) {
			const  keWordArr  = advert.keWordArr;
			const nextSelectedTags = checked ?
					[...keWordArr, tag] :
					keWordArr.filter(t => t !== tag);
			dispatch({
				type:'advert/selectWords',
				payload:{
					keWordArr:nextSelectedTags
				}
			})
		},
		clearAll(){
			dispatch({
				type:'advert/selectWords',
				payload:{
					keWordArr:[]
				}
			})
		},
		afterClose(removedTag){
			const  keWordArr  = advert.keWordArr;
			const nextSelectedTags = keWordArr.filter(t => t !== removedTag);
			console.log(nextSelectedTags);
			dispatch({
				type:'advert/selectWords',
				payload:{
					keWordArr:nextSelectedTags
				}
			})
		}
	}
	
	return (
		<div>
			<OtherImgAdd {...OtherImgAddProps}/>
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