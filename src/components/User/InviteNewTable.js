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
function StandardTable({ data, loading, pageSize, handelchande, getUserData, currentPage, total, InviteUserListData, confirm, showModal }) {

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
    },
    {
      title: '昵称',
      dataIndex: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'left',
    }, {
      title: '角色',
      dataIndex: 'userRoleDisplay',
      align: 'left',
    }, {
      title: '级别',
      dataIndex: 'levelDisplay',
      align: 'left',
    }, {
      title: '邀新数量',
      dataIndex: 'inviteCount',
      align: 'left',
    }, {
      title: '邀新状态',
      dataIndex: 'inviteStatus',
      align: 'left',
      render: (text, record) => (
        <span>
          {text == 0 && "无需审查"}
          {text == 1 && <span style={{ color: "#f5222d" }}>需审查</span>}
        </span>
      )
    }, {
      title: '已获得奖励',
      dataIndex: 'getAmount',
      render: val => <span>{val == null ? "——" : val + "TV"}</span>,
    }, {
      title: '奖励提取发起时间',
      dataIndex: 'bonusWithdrawDate',
      render: val => <span>{val == null ? "——" : moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '奖励状态',
      dataIndex: 'bonusStatus',
      render: (text, record) => (
        <span>
          {text == 0 && <span style={{ color: "#f5222d" }}>冻结</span>}
          {text == 1 && <span style={{ color: "#52c41a" }}>可用</span>}
          {text == 2 && <span style={{ color: "#ccc" }}>已退回</span>}
        </span>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          {(record.bonusStatus == 0 ||record.bonusStatus==2)? <Popconfirm placement="topRight" title="确定解冻吗？" onConfirm={() => confirm(record)} okText="确定" cancelText="取消">
            <a>解冻</a>
          </Popconfirm> : <a onClick={() => showModal(record)}>冻结</a>}
          <Divider type="vertical" />
          <a onClick={() => getUserData(record)}>查看详细信息</a>
          <Divider type="vertical" />
          <a onClick={() => InviteUserListData(record)}>查看邀新记录</a>
        </span>
      ),
    },
  ];
  const list = [{
    "no": 1,
    "description": "这是一段描述",
    "callNo": "杨XX"
  }]
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
          <Table columns={columns} dataSource={data} rowKey={record => record.userId} loading={loading} pagination={paginationProps} />
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