import React, {
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'dva/router';
import {
  Table,
  Icon,
  Switch,
  Pagination,
  Popconfirm,
  Divider
} from 'antd';

/*import styles from './purchaseList.css'*/


function ArticleList({
  loading,
  BaseInfoList,
  onEditItem,
  handleDel,
  handeShow
}) {
	

  const columns = [{
    title: '类别',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },{
    title: '目录',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  }, {
    title: '发布人',
    dataIndex: 'user',
    key: 'user',
    width: 120,
  }, {
    title: '发布时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width: 120,
  }, {title: '更新时间',
    dataIndex: 'updateDate',
    key: 'updateDate',
    width: 120,
  }, {title: '显示状态',
    dataIndex: 'infoStatusDisplay',
    key: 'infoStatusDisplay',
    width: 120,
  }, {title: '排序',
    dataIndex: 'infoOrder',
    key: 'infoOrder',
    width: 120,
  }, {title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (text, record, i) => {
			return (
				<div>
          <a data-key={i} onClick={() => onEditItem(record)}>编辑</a>
           <Divider type="vertical" />
          <a data-key={i} onClick={()=>handeShow(record)}>显示状态</a>  
        </div>
			)
		}
  },];
  
  return (
    <Table bordered rowKey="uid" columns={columns}  dataSource={BaseInfoList} pagination={false} rowKey={record => record.id}/>
  )
}

ArticleList.propTypes = {
  onPageChange: PropTypes.func,
  loading: PropTypes.any,
};

export default ArticleList;