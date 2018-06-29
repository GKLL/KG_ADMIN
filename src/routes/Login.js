import React, {
	Component,
	PropTypes
} from 'react';
import {
	Link,
	routerRedux
} from 'dva/router';
import {
	Menu,
	Icon,
	Row,
	Col,
	Button,
	Spin
} from 'antd';

import stytes from './UserLoginPage.css'

import 'antd/dist/antd.css';

import {
	withRouter
} from 'dva/router';
import {
	connect
} from 'dva';

const Login = (props) => {
	var footerHeight = document.body.clientHeight * 0.05;
	var contentheight = document.body.clientHeight * 0.95;
	var topheight = document.body.clientHeight * 0.1;
	return (
		<div className={stytes.main}>
				<div className  = {stytes.loginContainer} style = {{height:contentheight}}> 
				 	{ props.children }
				</div>
				<div id = 'footer' className={stytes.loginFooter} style = {{height:footerHeight}}>
						<div style = {{lineHeight:footerHeight + 'px'}}>
						    <ul className={stytes.footerfl}>
							    <li><a>xxx</a></li>
							    <li><a>|</a></li>
								<li><a>xxx</a></li>
								<li><a>|</a></li>
								<li><a>xxx</a></li>
								<li><a>|</a></li>
								<li><a>xxx</a></li>
								<li><a>|</a></li>
								<li><a>xxx</a></li>
						    </ul>
						</div>
						<div style = {{lineHeight:footerHeight + 'px'}}>
					        <p>xxxxx</p>
						</div>
						<div style = {{lineHeight:footerHeight + 'px'}}>
							<ul className={stytes.footerfr}>
								<li><span style = {{color:"#108ee9"}}>xxx</span></li>
							    <li><a>|</a></li>
								<li><a>xxx</a></li>
								<li><a>|</a></li>
								<li><a>xxx</a></li>
							</ul>
						</div>
				</div>
	</div>
	);
};
Login.propTypes = {

};

function mapStateToProps({}) {
	return {};
}

export default connect(mapStateToProps)(withRouter(Login));