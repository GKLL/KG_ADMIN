import React, { PureComponent } from 'react';
import {
	connect
} from 'dva';

import { Form, Row, Col, Input, Button, Badge, Divider, Icon, Table, Pagination, Modal, DatePicker, Popconfirm, message, Select } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
function StandardTable({ data, loading, pageSize, handelchande, currentPage, total, editorItem, deleteItem, setShow, onShowModal, autidShow, type }) {


	const columns = [
		{
			title: '奖励类型',
			dataIndex: 'businessTypeName',
		},
		{
			title: '奖励说明',
			dataIndex: 'flowDetail',
		},
		{
			title: '状态',
			dataIndex: 'status',
			align: 'left',
		}, {
			title: '时间',
			dataIndex: 'flowDate',

		},
		{
			title: '数量',
			dataIndex: 'amount',
			render: (text, record) => (
				<span>
					{type == 'TV' && ((record.freezeAmount != 0&& record.freezeAmount!=null)? record.freezeAmount : text) + 'TV'}
					{type == 'KG' && text + 'KG'}
				</span>
			)
		},
	];
	
	const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total: total,
		onChange: handelchande,
		current: currentPage,
		pageSize: 25
	};

	class App extends React.Component {
		state = {
			selectedRowKeys: [], // Check here to configure the default column
		};
		onSelectChange = (selectedRowKeys, selectedRows) => {
			// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			this.setState({
				selectedRowKeys: selectedRowKeys,
				selectedRows: selectedRows
			});
		}
		onShowSizeChange = (page, pageSize) => {
			//console.log(page)
			changepage(page, pageSize)
		}
		onChange = (page, pageSize) => {
			changepage(page, pageSize)
		}
		render() {
			const { selectedRowKeys, selectedRows } = this.state;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
			};
			const hasSelected = selectedRowKeys.length > 0;

			return (
				<div>
					<Table columns={columns} dataSource={data} rowKey={record => record.flowId} loading={loading} pagination={paginationProps} />
				</div>
			);
		}
	}
	return (
		<div>
			<App />
		</div>
	);
};

export default StandardTable;