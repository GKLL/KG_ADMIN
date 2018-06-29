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
  Divider,
  Badge
} from 'antd';
import style_pagination from '../pagination.css'
/*import styles from './purchaseList.css'*/


function ArticleList({
  loading,
  total,
  current,
  onPageChange,
  onEditItem,
  onSetItem,
  onToggleItem,
  data,
  onPreview
}) {

  //console.log("total",total)
  const columns = [{
    title: '文章ID',
    dataIndex: 'articleId',
    key: 'articleId',
  
  }, {
    title: '标题',
    dataIndex: 'articleTitle',
    key: 'articleTitle',
  
  }, {
    title: '发布人',
    dataIndex: 'createUser',
    key: 'createUser',
   
  }, {title: '发布时间',
    dataIndex: 'createDate',
    key: 'createDate',
 
  }, {title: '审核状态',
    dataIndex: 'publishStatusDisplay',
    key: 'publishStatusDisplay',
    render:(text,record)=>{
      return(
        <span> <Badge status="processing" text="审核中" /></span>
      )
    },
 
  }, {title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text, record, i) => {
			return (
				<div>
              <a data-key={i} onClick={() => onEditItem(record)}>编辑</a>
            </div>
			)
		}
  },];

  function onChange(page){
    console.log(page)
  }

  return (
    <div>
      <Table  rowKey={record => record.articleId}  columns={columns}  dataSource={data} pagination={false} loading={loading}/>
    </div>
  )
}

ArticleList.propTypes = {
  onPageChange: PropTypes.func,
  loading: PropTypes.any,
};

export default ArticleList;