import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
} from 'dva/router';
import Seo_TopSearch from '../components/Seo/Seo_TopSearch';

const SeoTopSearch = (props) => {
	return (
		<div>
			<Seo_TopSearch />
		</div>

	);
}

SeoTopSearch.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(SeoTopSearch));