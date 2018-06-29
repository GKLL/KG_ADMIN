import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider, Form, Modal, Input, Radio, Popconfirm } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const statusMap = ['default', 'processing', 'success', 'error'];
import style_pagination from '../pagination.css';
function StandardTable({ data, loading, total, lookOver, deleteItem, handelchande, onShowSizeChange, pageSize, pageNumber, fixSort,currentPage}) {
  const columns = [
    {
      title: '版本号',
	  dataIndex: 'versionNum',
	  render: val => <span>{'v'+val}</span>,
    },
    {
      title: '更新提示语',
	  dataIndex: 'prompt',
	  width:300,
	  render:(text,record)=>(
		<span className={style_pagination.appText}>{text}</span>
		)
    },
    {
      title: '强制更新',
      dataIndex: 'forced',
	  align: 'left',
	  render: val => <span>{val==1&&"强制更新"}{val==0&&"非强制更新强提示"}{val==-1&&"非强制更新弱提示"}</span>,
    },
    {
      title: '下载地址',
	  dataIndex: 'downloadUrl',
	  width:300,
	  render:(text,record)=>(
		<span className={style_pagination.appText}>{text}</span>
		)
    },
    {
      title: '操作系统',
	  dataIndex: 'systemType',
	  render: val => <span>{val==1&&"Android"}{val==2&&"ios"}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <a onClick={() => lookOver(record)}>查看</a>
          {/* <Divider type="vertical" /> */}
          {/* <Popconfirm
            placement="topRight"
            title="是否删除？"
            onConfirm={() => deleteItem(record)}
            okText="确定"
            cancelText="取消">
            <a>删除</a>
          </Popconfirm> */}

        </span>
      ),
    },
  ];

  const list = [
    {
      sortOrder: 'v0.1.0',
      categoryName: "这是一段描述"
    }
  ]

  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: true,
    total: total,
    onChange: handelchande,
    onShowSizeChange: onShowSizeChange,
    pageSize: 25,
    current: currentPage
  };
  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={paginationProps}
      />

    </div>
  )
}
export default StandardTable;
