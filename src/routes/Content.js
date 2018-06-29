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
const ContentRouter = (props) => {

	return (
		<LayoutContainer>
			{props.children}
		</LayoutContainer>

	);
}

ContentRouter.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(ContentRouter));