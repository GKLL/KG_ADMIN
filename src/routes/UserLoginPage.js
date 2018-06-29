import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import stytes from './UserLoginPage.css';
import { withRouter,browserHistory} from 'dva/router';
import LoginForm from '../components/User/LoginForm';
function LoginPage({location, dispatch, user, router}) {

	//console.log("location",location)

	const loginProps = {
		onSubmit: function(data) {
			//console.log("login:", data);
			dispatch({
				type: 'user/login',
				payload: {
					...data, dispatch
				},
			})
		},
	};

 
	return (
	
		<LoginForm {...loginProps}/>	
	);
}

LoginPage.propTypes = {
	
};

function mapStateToProps({user}) {
	return { user };
}



export default connect(mapStateToProps)(withRouter(LoginPage));
