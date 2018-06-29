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



// function User() {
const Data = (props) => {

	return (
		<LayoutContainer>
			{props.children}
		</LayoutContainer>

	);
}

Data.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		Data
	};
}



export default connect(mapStateToProps)(withRouter(Data));