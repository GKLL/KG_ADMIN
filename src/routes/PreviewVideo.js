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
import {timeFormat,formatDate} from '../services/common';
import { Form, Row, Col, Input, Tag, Icon,Table,Pagination,Modal,Radio,Select,message,Alert} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './Common.css';
import logo from '../assets/images/logo.png'
//console.log(merId)
function ArticlePreview({location,dispatch,content,router,}) {
	let videoUrl =localStorage.getItem('videoUrl');
	let videoFilename =localStorage.getItem('videoFilename');
	return (
			<div style={{background:'#000'}}>
              	<div className={styles.container_left_pre}>
	                <div className={styles.videoMain}>
	                	{(videoFilename!='null'&&videoFilename != '')?
	                		<video  controls="controls" autoplay="autoplay">
                            <source src={videoUrl} type="video/mp4" />
                            </video>:<div dangerouslySetInnerHTML={{__html: videoUrl}}></div>
	                    }
	                </div>
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