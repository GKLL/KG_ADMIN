import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Link,
	browserHistory
} from 'dva/router';
import { Form, Row, Col, Input, Button, Icon, Table, Pagination, Modal, DatePicker, Popconfirm, message, Select } from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';

import style_common from '../common.css';
import { options } from "../../services/common"

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const InputGroup = Input.Group;
const Transaction = ({
	loading,
	handlsearch,
	Examine,
	router,
	total,
	changepage,
	currentPage,
	BusinessType,
	handelchande,
	data,
}) => {
	// console.log(currentPage)


	const columns = [{
		title: 'ID',
		dataIndex: 'extraBonusId',
		key: 'extraBonusId',
		render: text => <span>{text}</span>,
	}, {
		title: '奖励总数量(TV)',
		dataIndex: 'totalTv',
		key: 'totalTv',
		render: text => <span>{text}</span>,
	}, {
		title: '奖励总数量(KG)',
		dataIndex: 'totalKg',
		key: 'totalKg',
	}, {
		title: '奖励人数',
		dataIndex: 'totalNum',
		key: 'totalNum',
	}, {
		title: '奖励时间',
		dataIndex: 'createTime',
		key: 'createTime',
	}, {
		title: '奖励人',
		dataIndex: 'adminName',
		key: 'adminName',
	},{
		title: '奖励原因',
		dataIndex: 'bonusReason',
		key: 'bonusReason',
	}, {
		title: '操作',
		key: 'action',
		render: (text, record) => (
			<span>
				<Link to={'/finance/awardDetails?id='+record.extraBonusId+'&page=1'}>详情</Link>
			</span>
		),
	}];

	const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total: total,
		onChange: handelchande,
		current: currentPage,
		pageSize: 25
	};
	class TableList extends React.Component {

		onShowSizeChange = (page) => {
			console.log(page)
			changepage(page)
		}
		onChange = (page) => {
			changepage(page)
		}
		render() {
			return (
				<div>
					<Table columns={columns} dataSource={data} pagination={paginationProps} loading={loading} rowKey={record => record.extraBonusId} />
				</div>
			);
		}
	}



	return (
		<div className={style_common.contentDiv}>
			<p>当前共有奖励：{total}</p>
			<div className={style_search.search_result}>
				<TableList />
			</div>
		</div>
	);
};

Transaction.propTypes = {};

export default Form.create()(Transaction);
