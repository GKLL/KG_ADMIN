import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import { message, Modal, Cascader, Form, Input, Select, Row, Col, Button } from 'antd';
import AdvertTable from '../components/Advert/AdvertTable';
import { GetRequest, residences } from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from './Record.css'
const FormItem = Form.Item;
const Option = Select.Option;
function ContentImage({ dispatch, advert, location }) {
	let userId = localStorage.getItem('userId');
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const {ImageList,loading,currentPage,totalNumber} = advert;
	function getFieldsFirst(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem
						{...formItemLayout}
						label="显示位置"
					>
						{getFieldDecorator('residence', {

							rules: [{ type: 'array', required: false, message: '请选择!' }],
						})(
							<Cascader options={residences} placeholder="请选择" />
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='显示状态'>
						{getFieldDecorator('showStatus', {

						})(
							<Select placeholder="请选择" allowClear>
								<Option value="1">显示</Option>
								<Option value="0">隐藏</Option>
							</Select>
						)}
					</FormItem>
				</Col>

			</div>
		);
		return children;
	}
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem
						{...formItemLayout}
						label="显示位置"
					>
						{getFieldDecorator('residence', {

							rules: [{ type: 'array', required: false, message: '请选择!' }],
						})(
							<Cascader options={residences} placeholder="请选择" />
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='显示状态'>
						{getFieldDecorator('showStatus', {

						})(
							<Select placeholder="请选择" allowClear>

								<Option value="1">显示</Option>
								<Option value="0">隐藏</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='显示端口'>
						{getFieldDecorator('displayPort', {

						})(
							<Select placeholder="请选择" allowClear>
								<Option value="1">千氪WEB</Option>
								<Option value="2">千氪APP</Option>
								<Option value="3">千氪WEB专栏</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='广告样式'>
						{getFieldDecorator('adverStyle', {

						})(
							<Select placeholder="请选择" allowClear>
								<Option value="1">信息流</Option>
								<Option value="2">图片广告</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='广告标题'>
						{getFieldDecorator('adverTitle', {

						})(
							<Input placeholder="请输入广告标题"/>
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='广告主名称'>
						{getFieldDecorator('adverOwner', {

						})(
							<Input placeholder="请输入广告主名称"/>
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}

	function handlsearch(values) {
		if (values.adverTitle == "" || values.adverTitle == undefined) {
			values.adverTitle = undefined;
		} else {
			values.adverTitle = Base64.encode(values.adverTitle)
		}
		if (values.adverOwner == "" || values.adverOwner == undefined) {
			values.adverOwner = undefined;
		} else {
			values.adverOwner = Base64.encode(values.adverOwner)
		}
		if (values.residence != undefined) {
			dispatch(routerRedux.push('/advert/list?page=1' +"&imageStatus=" + values.showStatus + "&navigatorPos=" + values.residence[0] + "&imagePos=" + values.residence[1]+
			"&adverTitle=" + values.adverTitle+"&adverOwner=" + values.adverOwner+"&adverStyle=" + values.adverStyle+
			"&displayPort=" + values.displayPort
			))

		} else {
			dispatch(routerRedux.push('/advert/list?page=1' +
				"&imageStatus=" + values.showStatus+"&adverTitle=" + values.adverTitle+"&adverOwner=" + values.adverOwner+"&adverStyle=" + values.adverStyle+
				"&displayPort=" + values.displayPort
			))
		}
	}
	//添加图片
	function showModal() {
		dispatch(routerRedux.push('/advert/advert_add'))
	}

	//广告列表父子组件之间的传值
	const AdvertTableProps = {
		data:ImageList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		editorItem(record){
			dispatch(routerRedux.push('/advert/advert_editor?imageId='+record.imageId))
		},
		deleteItem(record){
			dispatch({
				type:'advert/deleteAdvertImage',
				payload:{
					imageId:record.imageId,
					search:location.search,
				}
			})
		},
		handelchande(page){
			const values =GetRequest(location.search)
			dispatch(routerRedux.push('/advert/list?page='+page+"&imageStatus=" + values.showStatus + "&navigatorPos=" + values.navigatorPos+ "&imagePos=" +values.imagePos+
			"&adverTitle=" + values.adverTitle+"&adverOwner=" + values.adverOwner+"&adverStyle=" + values.adverStyle+
			"&displayPort=" + values.displayPort
			))
		}
	}
	return (
		<div >
			<div className={styles.changeAward}>
				<Link className={styles.activeAward} to='/advert/list?page=1'>广告</Link>
				<Link to='/advert/other_imgs?page=1'>其他图片</Link>

			</div>
			<Button type="primary" size='large' onClick={showModal} style={{ marginBottom: 20, marginTop: 20 }} icon="plus">添加广告</Button>
			<WrappedAdvancedSearchForm style={{ margin: 0 }} getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<AdvertTable {...AdvertTableProps} />
		</div>

	);
}

ContentImage.propTypes = {

};

function mapStateToProps({
	advert
}) {
	return {
		advert
	};
}



export default connect(mapStateToProps)(withRouter(ContentImage));