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
import Seo_Link from '../components/Seo/Seo_Link';
const SeoLink = (props) => {
	return (
		<div>
			<Seo_Link />
		</div>

	);
}

SeoLink.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(SeoLink));