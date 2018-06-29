import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';


function UrlSearch() {
	var name, value;
	var str = location.href; //取得整个地址栏
	var num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

	var arr = str.split("&"); //各个参数放到数组里
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			this[name] = value;
		}
	}
}

// function User() {
const Log = (props) => {

	var Request = new UrlSearch()
	var token = Request.token;
	var merchat_id = Request.merchat_id
	var scmAddress = Request.scmAddress
		// console.log('token', token)
	if (token != null) {
		localStorage.setItem("scmtoken", token);
		localStorage.setItem("merchant_id", merchat_id);
		localStorage.setItem("scmAddress", scmAddress);
	}
	console.log('token', token)
	console.log('merchat_id', merchat_id)
	console.log('scmAddress', scmAddress)
	return (
		<LayoutContainer>
			{props.children}
		</LayoutContainer>

	);
}

Log.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(Log));