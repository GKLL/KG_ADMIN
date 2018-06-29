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
import Seo_Hot from '../components/Seo/Seo_Hot';

const SeoHot = (props) => {
	return (
		<div>
			<Seo_Hot />
		</div>

	);
}

SeoHot.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(SeoHot));