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
import Content_Column from '../components/Content/Content_Column';
const ContentColumnContainer = (props) => {

	return (
			<div>
				{props.children}
			</div>

	);
}

ContentColumnContainer.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(ContentColumnContainer));