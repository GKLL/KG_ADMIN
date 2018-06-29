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
import { Modal, message, Row, Col, Tabs, Icon, Button, Form, Input, Cascader, Select } from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Article from '../components/Content/Content_Article';
import SetModal from '../components/Content/SetShow';
import ArticleModal from '../components/Content/AricleMoadl';
import { formatDate, tokenLogOut, GetRequest } from '../services/common';
import BonsModal from '../components/Content/BonsModal';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from "./Common.css";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
function ContentArticle({ location, dispatch, router, content }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	//console.log("location",location)
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const { ArticleStat, confirmLoading, PushAticleInfo,artice, currentArtice, BonsVisible, ArticleList, getBonusList, setshow, articeVisible, selectList, ArticleListNumber, currentPage, ColumnList, loading } = content;
	const options = ColumnList;
	const Content_ArticleProps = {
		dispatch,
		loading,
		ArticleList,
		ColumnList,
		getBonusList,
		total: ArticleListNumber,
		currentPage: currentPage,
		PushAticleInfo:PushAticleInfo,
		confirm(record) {
			dispatch({
				type: "content/deleteArticle",
				payload: {
					articleId: record.articleId,
					dispatch,
				}
			})
		},
		setShowModal(record) {
			//console.log(record)
			dispatch({
				type: 'content/setShowModal',
				payload: {
					selectList: record.articleId
				}

			})
		},
		article(selectList) {
			dispatch({
				type: 'content/showArticeModal',
				payload: {
					selectList: selectList
				}

			})
		},
		onShowMOdal(selectList) {
			var Ids = ""
			for (var i in selectList) {
				Ids += selectList[i].articleId + ","
			}
			//console.log(Ids)
			dispatch({
				type: 'content/setShowModal',
				payload: {
					selectList: Ids
				}
			})

		},

		editorItem(record) {
			dispatch({
				type: "content/getArticleDetile",
				payload: {
					articleId: record.articleId,
				}
			})
			//dispatch(routerRedux.push('/content/editor_article?articleId='+record.articleId))
			
		},
		changepage(page) {
			const search = GetRequest(location.search);

			if (search.articleTitle == "undefined" || search.articleTitle == undefined) {
				dispatch(routerRedux.push('/content/content_article?page=' + page +
					"&articleId=" + search.articleId +"&publishStatus=" + search.publishStatus +
					"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn
					+ '&orderByClause=' + search.orderByClause + "&createUser=" + search.createUser+'&ifPlatformPublishAward='+search.ifPlatformPublishAward+'&articleFrom='+search.articleFrom
				))
			} else {
				dispatch(routerRedux.push('/content/content_article?page=' + page +
					"&articleId=" + search.articleId
					+ "&articleTitle=" + search.articleTitle + "&publishStatus=" + search.publishStatus +
					"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&secondColumn=" + search.secondColumn + '&orderByClause=' + search.orderByClause
					+ "&createUser=" + search.createUser+'&ifPlatformPublishAward='+search.ifPlatformPublishAward+'&articleFrom='+search.articleFrom
				))
			}


		},
		delArticle(record) {
			/*console.log(location)*/

			dispatch({
				type: 'content/showBonsModal',
				payload: {
					currentArtice: record
				}
			})


			dispatch({
				type: 'content/getBonus',
				payload: {
					articleId: record.articleId,
					record: record
				}
			})
			dispatch({
				type: 'content/getArticleStat',
				payload: {
					articleId: record.articleId,
				}
			})
		},
		fixSort(data, e) {
			//console.log(location);
			var reg = /^[0-9]\d*$/; //匹配0以上的正则表达式
			var val = e.target.value;
		
			if(val==""){

			}else if(!reg.test(val)){
			
			}else{
				dispatch({
					type: "content/setDisplayOrder",
					payload: {
						articleId: data.articleId,
						displayOrder: parseInt(e.target.value),
						search: location.search
					}
				})
			}
			
		},
		sorterUserList(sorter){
		
			let orderByClause = "";
			if (sorter.order == "descend") {
				orderByClause = "bowse_num desc"
			} else {
				orderByClause = "bowse_num asc"
			}
			const search = GetRequest(location.search);
			if (search.articleTitle == "undefined" || search.articleTitle == undefined) {
				dispatch(routerRedux.push('/content/content_article?page=1' +
					"&articleId=" + search.articleId + "&publishStatus=" + search.publishStatus +
					"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn + '&orderByClause=' + orderByClause
					+'&ifPlatformPublishAward='+search.ifPlatformPublishAward+'&articleFrom='+search.articleFrom
				))
			} else {
				dispatch(routerRedux.push('/content/content_article?page=1' +
					"&articleId=" + search.articleId
					+ "&articleTitle=" + search.articleTitle +  "&publishStatus=" + search.publishStatus +
					"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&secondColumn=" + search.secondColumn + '&orderByClause=' + orderByClause
					+'&ifPlatformPublishAward='+search.ifPlatformPublishAward+'&articleFrom='+search.articleFrom
				))
			}
		}
	}
	const SetModalProps = {
		visible: setshow,
		selectList:selectList,
		confirmLoading:confirmLoading,
		onCancel() {
			dispatch({
				type: 'content/hideShowModal',

			})
		},
		onOk(selectList, status) {

			dispatch({
				type: 'content/setDisplayStatus',
				payload: {
					articleId: selectList,
					displayStatus: status.radio,
					updateUser: merId,
					search: location.search,
					publishKind: 1
				}
			})
		}

	}
	const ArticleModalProps = {
		visible: articeVisible,
		selectList,
		ColumnList,
		confirmLoading,
		onCancel() {
			dispatch({
				type: 'content/hideArticeModal',

			})
		},
		onOk(data, selectList) {
			if (data.column == undefined) {
				dispatch({
					type: "content/auditArticle",
					payload: {
						articleId: selectList.articleId,
						auditUser: merId,
						refuseReason: data.text,
						auditStatus: parseInt(data.radio),
						search: location.search,
						publishKind: selectList.publishKind
					}
				})
			} else {
				dispatch({
					type: "content/auditArticle",
					payload: {
						articleId: selectList.articleId,
						auditUser: merId,
						refuseReason: data.text,
						columnId: data.column[0],
						secondColumn: data.column[1],
						auditStatus: parseInt(data.radio),
						search: location.search,
						publishKind: selectList.publishKind
					}
				})
			}



		}
	}

	//阅读奖励
	const BonsMoadlProps = {
		visible: BonsVisible,
		currentArtice,
		artice: getBonusList,
		ArticleStat,
		onCancel() {
			dispatch({
				type: "content/hideBonsModal"
			})
		}
	}

	//搜索
	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='文章ID'>
			            {getFieldDecorator('Id',{
			            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"文章ID只能输入数字"}
			            	]
			            })(
			              <Input placeholder="请输入" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='标题'>
			            {getFieldDecorator('title')(
			              <Input placeholder="请输入" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='所属栏目'>
			            {getFieldDecorator('cloumn')(
			              <Cascader options={options}  placeholder="请选择文章栏目"  changeOnSelect/>
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='状态' >
			            {getFieldDecorator('status')(
			              <Select placeholder="请选择" allowClear={true}>
			              	<Option value="0">草稿</Option>
			              	<Option value="1">通过</Option>
			              	<Option value="2">审核中</Option>
			              	<Option value="3">不通过</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='显示状态' >
			            {getFieldDecorator('displayStatus')(
			              <Select placeholder="请选择" allowClear={true}>
			              	<Option value="1">正常显示</Option>
			              	<Option value="2">首页置顶</Option>
			              	<Option value="3">首页推荐</Option>
			              	<Option value="4">前台隐藏</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
							<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='发布人' >
			            {getFieldDecorator('createUser')(
										<Input placeholder="请输入发布人" />
			            )}
			          </FormItem>
			        </Col>
							<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='是否设有奖励' >
			            {getFieldDecorator('ifPlatformPublishAward')(
										<Select placeholder="请选择" allowClear={true}>
			              	<Option value="1">是</Option>
			              	<Option value="0">否</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
							<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='来源分类' >
			            {getFieldDecorator('articleFrom',{
										initialValue:'1',
									})(
										<Select placeholder="请选择" allowClear={true}>
			              	<Option value="0">全部</Option>
			              	<Option value="1">人工添加</Option>
											<Option value="2">系统抓取</Option>
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
					<FormItem {...formItemLayout} label='文章ID'>
						{getFieldDecorator('Id', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "文章ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='标题'>
						{getFieldDecorator('title')(
							<Input placeholder="请输入" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	function handlsearch(values) {
		if (values.createUser == "" || values.createUser == undefined) {
			values.createUser = undefined;
		} else {
			values.createUser = Base64.encode(values.createUser)
		}
		if (values.title != undefined) {
			var title = Base64.encode(values.title)
			dispatch(routerRedux.push('/content/content_article?page=1' + "&articleId=" + values.Id + "&articleTitle=" + title +
			 "&publishStatus=" + values.status + "&displayStatus=" + values.displayStatus +
				"&columnId=" + (values.cloumn != undefined ? parseInt(values.cloumn[0]) : null) + "&secondColumn=" + (values.cloumn != undefined ? parseInt(values.cloumn[1]) : null) +
				"&createUser=" + values.createUser+'&ifPlatformPublishAward='+values.ifPlatformPublishAward+'&articleFrom='+values.articleFrom
			))
		} else {
			dispatch(routerRedux.push('/content/content_article?page=1' + "&articleId=" + values.Id +
				"&publishStatus=" + values.status + "&displayStatus=" + values.displayStatus +
				"&columnId=" + (values.cloumn != undefined ? parseInt(values.cloumn[0]) : null) + "&secondColumn=" + (values.cloumn != undefined ? parseInt(values.cloumn[1]) : null) +
				"&createUser=" + values.createUser+'&ifPlatformPublishAward='+values.ifPlatformPublishAward+'&articleFrom='+values.articleFrom
			))
		}
	}

	//跳转发布文章
	function release() {
		localStorage.removeItem("articleText");
		dispatch(routerRedux.push('/content/release_article?userId=' + merId + "&page=1"));
	}
	return (
		<div >
			<Button type="primary" size='large' onClick={release} style={{ marginBottom: "20px" }}>发布文章</Button>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<Content_Article {...Content_ArticleProps} />
			<SetModal {...SetModalProps} />
			<ArticleModal {...ArticleModalProps} />
			<BonsModal {...BonsMoadlProps} />
		</div>

	);
}

ContentArticle.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentArticle));