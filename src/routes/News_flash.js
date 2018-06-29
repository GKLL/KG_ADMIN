import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux, Link } from 'dva/router';
import { Modal, message, Row, Col, Button, Form, Input, Cascader, Select } from 'antd';
import { formatDate, GetRequest } from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from "./Common.css";
import NewsTable from '../components/News/NewsTable'
const FormItem = Form.Item;
const Option = Select.Option;
function ContentArticle({ location, dispatch, router, news }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	//console.log("location",location)
	if (!token) {
		dispatch(routerRedux.push('/'))
	}

	const {NewsFlashList,loading,totalNumber,currentPage,NewsFlashTopMenus,PushNewsFlashInfo} = news;  //获取modal的数据
	//搜索
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='快讯内容'>
						{getFieldDecorator('newsflashText', {
							rules: [
								{ required: false, }
							]
						})(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='快讯分类'>
						{getFieldDecorator('newsflashType')(
							<Select  placeholder="请选择快讯分类"  allowClear={true}>
								{NewsFlashTopMenus&&NewsFlashTopMenus.map(item=>{
										return(
										<Option key={item.newsflashType+''} value={item.newsflashType+''}>{item.remark}</Option>
									)
								}
								)}
					        </Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='来源分类'>
						{getFieldDecorator('newsflashOrigin')(
							
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">系统抓取</Option>
								<Option value="1">人工添加</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='发布人' >
						{getFieldDecorator('createUserName')(
							<Input placeholder="请输入发布人" />
						)}
					</FormItem>
				</Col>
				
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='显示状态' >
						{getFieldDecorator('displayStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">显示</Option>
								<Option value="0">隐藏</Option>
								
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='快讯来源' >
						{getFieldDecorator('remark')(
							<Input placeholder="请输入快讯来源" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='重要级别' >
						{getFieldDecorator('level')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">重要</Option>
								<Option value="0">不重要</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='是否推送' >
						{getFieldDecorator('ifPush', {
						})(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">未推送</Option>
								<Option value="0">已推送</Option>
							</Select>
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	function getFieldsFirst(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='快讯内容'>
						{getFieldDecorator('newsflashText', {
							rules: [
								{ required: false, }
							]
						})(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='快讯分类'>
						{getFieldDecorator('newsflashType')(
							<Select  placeholder="请选择快讯分类"  allowClear={true}>
								{NewsFlashTopMenus&&NewsFlashTopMenus.map(item=>{
										return(
										<Option key={item.newsflashType+''} value={item.newsflashType+''}>{item.remark}</Option>
									)
								}
								)}
					        </Select>
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	function handlsearch(values) {
		if (values.newsflashText == "" || values.newsflashText == undefined) {
			values.newsflashText = undefined;
		} else {
			values.newsflashText = Base64.encode(values.newsflashText)
		}
		if (values.remark == "" || values.remark == undefined) {
			values.remark = undefined;
		} else {
			values.remark = Base64.encode(values.remark)
		}
		if (values.createUserName == "" || values.createUserName == undefined) {
			values.createUserName = undefined;
		} else {
			values.createUserName = Base64.encode(values.createUserName)
		}
		dispatch(routerRedux.push('/content/news_flash?page=1' + "&newsflashText=" + values.newsflashText + "&newsflashType=" + values.newsflashType +
				"&newsflashOrigin=" + values.newsflashOrigin + "&displayStatus=" + values.displayStatus +
				"&createUserName=" + values.createUserName+ "&level=" + values.level+
				"&ifPush=" + values.ifPush +'&remark=' + values.remark
		))
	}

	//跳转发布文章
	function release() {
		dispatch(routerRedux.push('/content/news_publish'));
	}

	//文章列表
	const NewsTableProps = {
		data:NewsFlashList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		PushNewsFlashInfo:PushNewsFlashInfo,
		editorItem(record){
			dispatch(({
				type:'news/imgurlChange',
				payload:{
					imageUrl:'',
					uploading:false
				}
			}))
			dispatch(routerRedux.push('/content/news_editor?newsId='+record.newsflashId))
		},
		deleteItem(record){
			dispatch({
				type:'news/delNewsFlash',
				payload:{
					newsflashId:record.newsflashId,
					search: location.search
				}
			})
		},
		handelchande(page){
			const values = GetRequest(location.search);
			dispatch(routerRedux.push('/content/news_flash?page='+ page + "&newsflashText=" + values.newsflashText + "&newsflashType=" + values.newsflashType +
				"&newsflashOrigin=" + values.newsflashOrigin + "&displayStatus=" + values.displayStatus +
				"&createUserName=" + values.createUserName+ "&level=" + values.level+
				"&ifPush=" + values.ifPush +'&remark=' + values.remark
		))
		}

	}
	return (
		<div >
			<Button type="primary" size='large' onClick={release} style={{ marginBottom: "20px" }}>添加快讯</Button>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<NewsTable {...NewsTableProps}/>
		</div>

	);
}

ContentArticle.propTypes = {

};

function mapStateToProps({
	news
}) {
	return {
		news
	};
}



export default connect(mapStateToProps)(withRouter(ContentArticle));