import pathToRegexp from 'path-to-regexp';
import $ from 'jquery';
import {
	getArticleList, setDisplayStatus, articleservice, auditArticle, getColumnList, deleteArticle, publishArticle, getArticleById,
	getFeedbackList, deleteFeedback, setStatus, replay, getCommentList, commentSet, deleteComment, setcommentStatus, auditComment, addColumn, deleteColumn,
	sendEmail, getSysUserById, getBonus, getArticleStat, setDisplayOrder,getPushAticleInfo
} from '../services/content';
import {
	message,Modal
} from 'antd';
import { routerRedux } from 'dva/router';
import { formatDate, tokenLogOut, GetRequest, videoUrl,uploadUrl } from '../services/common'
export default {

	namespace: 'content',

	state: {
		logged: false,
		ArticleList: [],//文章列表
		ArticleListNumber: 0, //文章总数
		loading: false,
		selectList: {},
		ColumnList: [],
		BgVisible: false,
		cruImage: '',
		ImageList: [],//图片列表
		currentItem: {},
		type: 'creat',
		FeedbackList: [], //意见反馈表
		Listtotal: 0,
		currentPage: 1,
		CommentList: [],
		CList: [],
		type: 'create',
		editorList: {},
		imgUrl: '',
		UserById: {},
		getBonusList: [],
		artice: [],
		currentArtice: {},
		ArticleStat: {},
		secondC: {},
		firstC: [],
		saveId: 0,
		preList: {},
		confirmLoading:false,
		artSorce: 0,
		getVideoList: {}, //视频详情
		dis:false,
		SensitiveWords:'',
		titleWords:null, //标题中的敏感词
		status_Article:1,
		pubStatus:1,   //审核状态
		timeDis:0, //不开启定时发布
		VideoList:[],//待审核的视频列表
		VideoListNumber:0, //待审核视频数量
		PushAticleInfo:{},
		ifPushValue:'0',//暂时不推送
		validateStatus:'success',
		helpMessage:'',
		editorContent:'',//编辑器内容
		imgSize:'1',
		flag:false,  //大图是否可选
		imgtype:'',
		isCommentAutid:'0' //评论是否审核
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/content/content_article').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type:"getPushAticleInfo"
					})
					dispatch({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							ifPlatformPublishAward: search.ifPlatformPublishAward != "undefined" ? search.ifPlatformPublishAward : null,
							articleFrom: search.articleFrom != "undefined" ? search.articleFrom : null,
							pageSize: 25,
							publishKind: 1,

						}
					})
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
				}
				match = pathToRegexp('/content/videoList').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					//console.log(search.articleTitle)
					dispatch({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							ifPlatformPublishAward: search.ifPlatformPublishAward != "undefined" ? search.ifPlatformPublishAward : null,
							articleFrom: search.articleFrom != "undefined" ? search.articleFrom : null,
							pageSize: 25,
							publishKind: 2,
						}
					})
					dispatch({
						type:"getPushAticleInfo"
					})
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
				}
				match = pathToRegexp('/content/release_article').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					// dispatch({
					// 	type:"getPushAticleInfo"
					// })

					//获取栏目信息
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
					dispatch({
						type:"saveIdSuccess",
						payload:{

						}
					})
					dispatch({
						type: "typeChange",
						payload: {
							artSorce: 0,
							titleWords:null,
							ifPushValue:'0'
							
						}
					})
					dispatch({
						type:'PushAticleInfoChange',
						payload:{
							ifPushValue:'0'
						}
					})
					dispatch({
						type:'handleTimeChane',
						payload:{
							timeDis:0
						}
					})
					dispatch({
						type: 'setting/getRelUser',
						payload: {
							sysUserId: search.userId
						}
					})
					dispatch({
						type: 'imgSizeChange',
						payload: {
							imgSize: '1',
							
						}
					})
					dispatch({
						type: 'imgUrlChange',
						payload: {
							imgUrl: '',
							
						}
					})
					dispatch({
						type: 'flagChange',
						payload: {
							flag: true,
							
						}
					})


				}
				match = pathToRegexp('/content/EditorVideo').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					let merId = localStorage.getItem("userId");
					// console.log("search",search.articleId)
					// dispatch({
					// 	type:"getPushAticleInfo"
					// })
					dispatch({
						type: "getVideoById",
						payload: {
							articleId: search.articleId,
							search: search
						}
					})
					dispatch({
						type: 'getBonus',
						payload: {
							articleId: search.articleId
						}
					});
					dispatch({
						type: 'setting/getRelUser',
						payload: {
							sysUserId: merId
						}
					})
					dispatch({
						type: "publishStatusChange",
						payload: {
							pubStatus: 1,
						}
					})
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
				}
				match = pathToRegexp('/index/editor').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					let merId = localStorage.getItem("userId");
					dispatch({
						type:'getById',
						payload:{
							articleId: search.articleId
						}
					})
					dispatch({
						type: 'getBonus',
						payload: {
							articleId: search.articleId
						}
					});
					dispatch({
						type: 'setting/getRelUser',
						payload: {
							sysUserId: merId
						}
					})
					
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
					dispatch({
						type: "statusChange",
						payload: {
							status_Article: 1,
						}
					})
				}
				match = pathToRegexp('/content/editor_article').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					let merId = localStorage.getItem("userId");
					dispatch({
						type:'getArticleById',
						payload:{
							articleId: search.articleId
						}
					})
					// dispatch({
					// 	type:"getPushAticleInfo"
					// })
					dispatch({
						type: 'getBonus',
						payload: {
							articleId: search.articleId
						}
					});
					dispatch({
						type: 'setting/getRelUser',
						payload: {
							sysUserId: merId
						}
					})
					dispatch({
						type: "publishStatusChange",
						payload: {
							pubStatus: 1,
						}
					})
					
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
				}
				match = pathToRegexp('/articlePreview').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					//let merId =localStorage.getItem("userId"); 
					// console.log("search",search.articleId)
					dispatch({
						type: 'getArById',
						payload: {
							articleId: search.articleId
						}
					});

				}
				
				match = pathToRegexp('/content/content_opinion').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getFeedbackList',
						payload: {
							currentPage: parseInt(search.page),
							content: (search.content == 'undefined' ||search.content==undefined)? null : Base64.decode(search.content),
							status: (search.status != "undefined" && search.status != undefined) ? (search.status == "true" ? true : false) : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							pageSize: 25,
						}
					})
				}
				match = pathToRegexp('/content/opinion').exec(location.pathname);

				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'setStatus',
						payload: {
							feedbackId: search.id
						}
					})

				}
				match = pathToRegexp('/content/content_comment').exec(location.pathname);
				if (match) {

					const search = GetRequest(location.search);
					//console.log(search.content)
					dispatch({
						type: 'getCommentList',
						payload: {
							currentPage: parseInt(search.page),
							content: (search.content == "undefined"|| search.content ==undefined) ? null : Base64.decode(search.content),
							articleTitle: (search.articleTitle == "undefined"|| search.articleTitle==undefined )?  null: Base64.decode(search.articleTitle),
							commentUser: (search.commentUser == "undefined" ||search.commentUser==undefined)?null : Base64.decode(search.commentUser) ,
							userMobile: search.userMobile != "undefined" ? search.userMobile : null,
							status: search.status != "undefined" ? search.status : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							displayStatus: (search.displayStatus != "undefined" && search.displayStatus != undefined) ? (search.displayStatus == "1" ? true : false) : null,
							pageSize: 25,
						}
					})
				}
				match = pathToRegexp('/content/content_column').exec(location.pathname);
				const search = GetRequest(location.search);
				if (match) {
					dispatch({
						type: 'getColumnList',
						payload: {
							currentPage: search.page,
							pageSize: 25,
						}
					})
				}
				match = pathToRegexp('/index').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getArticleList',
						payload: {
							publishStatus: 2,
							publishKind:1,
							currentPage:1,
							pageSize:999
						}
					});
					dispatch({
						type: 'getVideoList',
						payload: {
							publishStatus: 2,
							publishKind:2,
							currentPage:1,
							pageSize:999
						}
					});
					dispatch({
						type: 'getColumnList',
						payload: {

						}
					})
				}
			})
		},
	},

	effects: {

		*getArticleList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getArticleList, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody.data;
				var arr = [];
				var clounm = "clounm";
				for (var i in res) {
					if (res[i].secondColumnName == null) {
						res[i][clounm] = res[i].columnName;
					} else {
						res[i][clounm] = res[i].columnName + '-' + res[i].secondColumnName;
					}


				}

				yield put({
					type: 'getArticleListSuccess',
					payload: {
						ArticleList: res,
						ArticleListNumber: data.responseBody.totalNumber,
						currentPage: data.responseBody.currentPage,
						loading: false,
					}
				});
			} else {
				yield put({
					type: 'hideLoading',
				});
				//message.error(data.message);
				//tokenLogOut(data)
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getVideoList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getArticleList, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody.data;
				var arr = [];
				var clounm = "clounm";
				for (var i in res) {
					if (res[i].secondColumnName == null) {
						res[i][clounm] = res[i].columnName;
					} else {
						res[i][clounm] = res[i].columnName + '-' + res[i].secondColumnName;
					}
				}
				yield put({
					type: 'getVideoArticleSuccess',
					payload: {
						VideoList: res,
						VideoListNumber: data.responseBody.totalNumber,
						loading: false,
					}
				});
			} else {
				yield put({
					type: 'hideLoading',
				});
				//message.error(data.message);
				//tokenLogOut(data)
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*setDisplayOrder({ payload }, { call, put }) {
			const { articleId, displayOrder } = payload;
			//console.log(payload.search)
			let prams = {
				articleId: articleId,
				displayOrder: displayOrder
			}
			const { data } = yield call(setDisplayOrder, prams);
			//console.log("11",data)
			if (data && data.code == 10000) {
				const search = GetRequest(payload.search);
				if (payload.publishKind == 2) {
					yield put({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							ifPlatformPublishAward: search.ifPlatformPublishAward != "undefined" ? search.ifPlatformPublishAward : null,
							articleFrom: search.articleFrom != "undefined" ? search.articleFrom : null,
							pageSize: 25,
							publishKind: 2
						}
					});
				} else {
					yield put({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							articleTag: search.articleTag != 'undefined' ? search.articleTag : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							pageSize: 25,
							publishKind: 1
						}
					});
				}

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*setDisplayStatus({ payload }, { call, put }) {
			const { articleId, displayStatus, updateUser,  } = payload;
			let params = {
				articleId: articleId,
				displayStatus: displayStatus,
				updateUser: updateUser
			}
			yield put({
				type:"showSubmitLoading"
			})
			const { data } = yield call(setDisplayStatus, params);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				const search = GetRequest(payload.search)
				message.success('设置成功')
				yield put({
					type:"hideSubmitLoading"
				})
				//console.log(payload.publishKind)
				if (payload.publishKind == 2) {
					yield put({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							ifPlatformPublishAward: search.ifPlatformPublishAward != "undefined" ? search.ifPlatformPublishAward : null,
							articleFrom: search.articleFrom != "undefined" ? search.articleFrom : null,
							pageSize: 25,
							publishKind: 2
						}
					});
				} else {
					yield put({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							articleTag: search.articleTag != 'undefined' ? search.articleTag : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							pageSize: 25,
							publishKind: 1
						}
					});
				}

				yield put({
					type: 'hideShowModal',
					payload: {

					}
				});
			} else {
				yield put({
					type:"hideSubmitLoading"
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}

			}
		},
		*articleservice({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			yield put({
				type: 'hideLoading',
			});
			const { data } = yield call(setDisplayStatus, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getArticleList',
					payload: {
						currentPage: 1,
						pageSIze: 20,
					}
				});
			} else {
				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*auditArticle({ payload }, { call, put }) {
			yield put({
				type:"showSubmitLoading",
			})
			let params = {
				articleId: payload.articleId,
				auditUser: payload.auditUser,
				refuseReason: payload.refuseReason,
				columnId: payload.columnId,
				secondColumn: payload.secondColumn,
				auditStatus: payload.auditStatus

			}

			const { data } = yield call(auditArticle, params);
			//console.log("11",data)

			if (data && data.code == 10000) {
				message.success('审核成功')
				yield put({
					type: 'hideArticeModal',
					payload: {

					}
				});
				yield put({
					type:"hideSubmitLoading",
				})
				yield put({
					type: 'hideModal'
				})
				const search = GetRequest(payload.search);
				if(payload.Status == 2){
				  yield put({
				  	type: 'getArticleList',
				  	payload:{
				  		publishStatus:2
				  	}
				  })
				}else{
					if (payload.publishKind == 2) {

					yield put({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							ifPlatformPublishAward: search.ifPlatformPublishAward != "undefined" ? search.ifPlatformPublishAward : null,
							articleFrom: search.articleFrom != "undefined" ? search.articleFrom : null,
							pageSize: 25,
							publishKind: 2
						}
					});
				} else {
					yield put({
						type: 'getArticleList',
						payload: {
							currentPage: search.page,
							createUser: (search.createUser == 'undefined' ||search.createUser==undefined)? null : Base64.decode(search.createUser),
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							articleTitle: (search.articleTitle != undefined) ? Base64.decode(search.articleTitle) : null,
							articleTag: search.articleTag != 'undefined' ? search.articleTag : null,
							publishStatus: search.publishStatus != 'undefined' ? parseInt(search.publishStatus) : null,
							displayStatus: search.displayStatus != 'undefined' ? parseInt(search.displayStatus) : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
							secondColumn: search.secondColumn != 'null' ? parseInt(search.secondColumn) : null,
							ifPlatformPublishAward: search.ifPlatformPublishAward != "undefined" ? search.ifPlatformPublishAward : null,
							articleFrom: search.articleFrom != "undefined" ? search.articleFrom : null,
							pageSize: 25,
							publishKind: 1
						}
					});
				}
				}
				

			} else {
				yield put({
					type: 'hideLoading',
				});
				yield put({
					type:"hideSubmitLoading",
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				}else if(data.code==29001){
					if(payload.publishKind == 2){
						message.success('检测到视频标题有敏感词：'+data.message);
					}else{
						message.success('检测到文章标题有敏感词：'+data.message);
					}
				}else if(data.code==29002){
					message.success('检测到正文有敏感词：'+data.message);
				}else if(data.code==29003){
					if(payload.publishKind == 2){
						message.success('检测到视频TAG标签有敏感词：'+data.message);
					}else{
						message.success('检测到文章TAG标签有敏感词：'+data.message);
					}
				}else if(data.code==29004){
					if(payload.publishKind == 2){
						message.success('检测到视频摘要有敏感词：'+data.message);
					}else{
						message.success('检测到文章摘要有敏感词：'+data.message);
					}
				}else if(data.code==29005){
					if(payload.publishKind == 2){
						message.success('检测到视频链接有敏感词：'+data.message);
					}else{
						message.success('检测到文章链接有敏感词：'+data.message);
					}
				}else if(data.code==29006){
					if(payload.publishKind == 2){
						message.success('检测到视频来源有敏感词：'+data.message);
					}else{
						message.success('检测到文章来源有敏感词：'+data.message);
					}
				}else {
					message.error(data.message, 3);
				}
			}
		},
		*publishArticle({ payload }, { call, put }) {
			yield put({
				type:"showLoading"
			})
			const { data } = yield call(publishArticle, payload);
			//console.log("11",data)
			
			const search = GetRequest(window.location.href)

			if (data && data.code == 10000) {
				var res = data.responseBody;

				message.success('成功');
				yield put({
					type: 'hideLoading',
				});
				setTimeout(()=>{
					history.back();   //返回上一级
				},100)
				// if (search.articleTitle == "undefined" || search.articleTitle == undefined) {
				// 	yield put(routerRedux.push('/content/content_article?page=' + search.page + "&pageSize=" + search.pageSize
				// 		+ "&articleTag=" + search.articleTag + "&publishStatus=" + search.publishStatus +
				// 		"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn
				// 		+ '&orderByClause=' + search.orderByClause
				// 	));
				// } else {
				// 	yield put(routerRedux.push('/content/content_article?page=' + search.page + "&pageSize=" + search.pageSize
				// 		+ "&articleTitle=" + search.articleTitle + "&articleTag=" + search.articleTag + "&publishStatus=" + search.publishStatus +
				// 		"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn
				// 		+ '&orderByClause=' + search.orderByClause
				// 	));
				// }
			} else {
				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				}else if(data.code=='29002'){
					//var content = localStorage.getItem('')
					//console.log(data.message)
					Modal.warn({
						title:'检测文章正文有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
			        let articleText = localStorage.getItem('articleText');
					var str = data.message;
					var arr = str.split(',')
					$.each(arr, function (i, e) {
						//console.log(i,e)
						if(articleText.indexOf(e) > 0){
							//若匹配到了铭感词使用高亮显示,这里使用的是红色显示
							articleText = articleText.replace(new RegExp(e,"gm"), '<span style="color:red;"  contenteditable="false">'+e+'</span>');
							//console.log(articleText)
							$('.w-e-text').html(articleText);
							localStorage.setItem('articleText',articleText);
						}
					})
					yield put({
						type: 'SensitiveMessage',
						payload: {
							SensitiveWords:data.message,
						}
					});
				}else if(data.code ==29001){
					Modal.warn({
						title:'检测标题有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测标题有敏感词：'+data.message,3);

					
				}else if(data.code ==29003){
					Modal.warn({
						title:'检测TAG标签有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测TAG标签有敏感词：'+data.message,3);
					
				}else if(data.code ==29004){
					Modal.warn({
						title:'检测摘要有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测摘要有敏感词：'+data.message,3);
					
				}else if(data.code ==29006){
					Modal.warn({
						title:'检测文章来源有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测文章来源有敏感词：'+data.message,3);
					
				}else {
					
					message.error(data.message, 3);
				}
			}
		},
		*publishHomeArticle({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(publishArticle, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'hideLoading',
				});
				message.success('编辑成功');
				var userId =localStorage.getItem('userId');
				yield put(routerRedux.push('/index?userId='+userId))
			} else {
				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				}else if(data.code=='29002'){
					//var content = localStorage.getItem('')
					//console.log(data.message)
					Modal.warn({
						title:'检测文章正文有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
			        let articleText = localStorage.getItem('articleText');
					var str = data.message;
					var arr = str.split(',')
					$.each(arr, function (i, e) {
						//console.log(i,e)
						if(articleText.indexOf(e) > 0){
							//若匹配到了铭感词使用高亮显示,这里使用的是红色显示
							articleText = articleText.replace(new RegExp(e,"gm"), '<span style="color:red;">'+e+'</span>');
							//console.log(articleText)
							$('.w-e-text').html(articleText);
							localStorage.setItem('articleText',articleText);
						}
					})
					yield put({
						type: 'SensitiveMessage',
						payload: {
							SensitiveWords:data.message,
						}
					});
				}else if(data.code ==29001){
					Modal.warn({
						title:'检测标题有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测标题有敏感词：'+data.message,3);

					
				}else if(data.code ==29003){
					Modal.warn({
						title:'检测TAG标签有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测TAG标签有敏感词：'+data.message,3);
					
				}else if(data.code ==29004){
					Modal.warn({
						title:'检测摘要有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测摘要有敏感词：'+data.message,3);
					
				}else if(data.code ==29006){
					Modal.warn({
						title:'检测文章来源有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测文章来源有敏感词：'+data.message,3);
					
				}else {
					
					message.error(data.message, 3);
				}
			}
		},
		*statusChange({ payload }, { call, put }) {
			yield put({
				type:"statusChangeuccess",
				payload:{
					status_Article:payload.status_Article
				}
			})
		},
		*publishVideo({ payload }, { call, put }) {
			yield put({
				type:'showLoading'
			})
			const { data } = yield call(publishArticle, payload);
			//console.log("11",data)

			const search = GetRequest(window.location.href)
			
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type:'hideLoading'
				})
				message.success('成功');
				setTimeout(()=>{
					history.back();
				},100)
				// if (search.articleTitle == "undefined" || search.articleTitle == undefined) {
				// 	yield put(routerRedux.push('/content/videoList?page=' + search.page + "&pageSize=" + search.pageSize
				// 		+ "&articleTag=" + search.articleTag + "&publishStatus=" + search.publishStatus +
				// 		"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn
				// 		+ '&orderByClause=' + search.orderByClause
				// 	));
				// } else {
				// 	yield put(routerRedux.push('/content/videoList?page=' + search.page + "&pageSize=" + search.pageSize
				// 		+ "&articleTitle=" + search.articleTitle + "&articleTag=" + search.articleTag + "&publishStatus=" + search.publishStatus +
				// 		"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn
				// 		+ '&orderByClause=' + search.orderByClause
				// 	));
				// }
			} else {
				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				}else if(data.code ==29001){
					Modal.warn({
						title:'检测视频有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测标题有敏感词：'+data.message,3);

					
				}else if(data.code ==29003){
					Modal.warn({
						title:'检测视频TAG标签有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测TAG标签有敏感词：'+data.message,3);
					
				}else if(data.code ==29004){
					Modal.warn({
						title:'检测视频摘要有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测摘要有敏感词：'+data.message,3);
					
				}else if(data.code ==29006){
					Modal.warn({
						title:'检测视频来源有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
					//message.error('检测文章来源有敏感词：'+data.message,3);
					
				}else {
					
					message.error(data.message, 3);
				}
			}
		},
		*getColumnList({ payload }, { call, put }) {
			const { data } = yield call(getColumnList, payload);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				var arr = [];
				let params = {};
				let chid = {};
				let firstCloumn = [];
				let first = {};
				let second = {};
				let childColumn = {};
				let c = [];
				let m = {}
				for (var i in res) {
					res[i].createDate = formatDate(res[i].createDate);
					for (var k in res[i].children) {
						res[i].children[k].createDate = formatDate(res[i].children[k].createDate);
						res[i].children[k]['partantNavigator'] = res[i].navigatorDisplay;
						res[i].children[k]['partentDisplayMode'] = res[i].displayMode;
						res[i].children[k]['partentId'] = res[i].id;
						res[i].children[k]['partentName'] = res[i].name;
						second = {
							'value': res[i].children[k].id,
							'label': res[i].children[k].name,
						}
						//c.push(second)

					}
					childColumn[res[i].id] = res[i].children.map((j) =>
						m = {
							'value': j.id,
							'label': j.name,
						}
					)

					params = {
						'value': res[i].id,
						'label': res[i].name,
						children: res[i].children.map((j) =>
							chid = {
								'value': j.id,
								'label': j.name,
							}
						)
					}

					first = {
						'value': res[i].id,
						'label': res[i].name,
					}
					firstCloumn.push(first)


					arr.push(params)
				}
				yield put({
					type: 'getColumnListSuccess',
					payload: {
						ColumnList: arr,
						firstC: firstCloumn,
						secondC: childColumn,
						CList: res,
						loading: false,
					}
				});
			} else {
				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*deleteArticle({ payload }, { call, put }) {
			const { articleId, search } = payload;
			let params = {
				articleId: articleId
			}
			const { data } = yield call(deleteArticle, params);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				message.success('删除成功')
				var res = data.responseBody;
				yield put({
					type: 'getArticleList',
					payload: {
						currentPage: search.page,
						pageSize: 25,
					}
				});
			} else {

				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getVideoById({ payload }, { call, put }) {
			let merId = localStorage.getItem("userId");
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getArticleById, params);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				var tags = "tags";
				res[tags] = res.tagnames != null ? res.tagnames.split(",") : '';
				if (res.videoFilename == null || res.videoFilename == "" || res.videoFilename == undefined) {
					res['videoType'] = 2;
					localStorage.setItem('videoFilename',res.videoFilename);
					localStorage.setItem('videoUrl',res.videoUrl);
				} else {
					res['videoType'] = 1;
					let params = {
						uid: -1,
						name: res.videoFilename,
						status: 'done',
						url: res.videoUrl
					}
					res['videoList'] = [params];
					localStorage.setItem('videoUrl',res.videoUrl)
					localStorage.setItem('videoFilename',res.videoFilename)
				}
				yield put({
					type: 'getVideoListSuccess',
					payload: {
						getVideoList: res,
						ifPushValue:res.ifPush+"",
						loading: false,
						pubStatus:res.publishStatus
					}
				});

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getArticleById({ payload }, { call, put }) {
			let merId = localStorage.getItem("userId");
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getArticleById, params);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				var tags = "tags";
				res[tags] = res.tagnames != null ? res.tagnames.split(",") : '';

				var img_url = uploadUrl+res.articleImage;
				//console.log(img_url)
			    // 创建对象
				var img = new Image();
				// 改变图片的src
				img.src = img_url;
				//console.log(img.width,img.height)
				if(img.width<750){
					yield put({
						type: 'flagChange',
						payload: {
							flag:true
						}
					});
				}else if(img.height<422){
					yield put({
						type: 'flagChange',
						payload: {
							flag:true
						}
					});
				}else{
					yield put({
						type: 'flagChange',
						payload: {
							flag:false
						}
					});
				}
				// 打印
				
				yield put({
					type: 'getArticleListSuccess',
					payload: {
						editorList: res,
						loading: false,
						ifPushValue:res.ifPush+'',
						pubStatus:res.publishStatus,
						imgSize:res.articleImgSize,
					}
				});
				if (res.createUser == null) {
					yield put({
						type: 'getSysUserById',
						payload: {
							userId: merId,
						}
					});
				}
				if (res.sysUser == null || res.sysUser != "") {
					yield put({
						type: 'getBonus',
						payload: {
							articleId: res.articleId,
						}
					});
				}
				/*window.location.reload()*/
				localStorage.setItem("articleList", JSON.stringify(res));
				localStorage.setItem("articleText", res.articleText);
				// const search = GetRequest(payload.search)
				// yield put(routerRedux.push('/content/editor_article?articleId=' + payload.articleId + "&page=" + search.page
				// 	+ "&articleTitle=" + search.articleTitle + "&articleTag=" + search.articleTag + "&publishStatus=" + search.publishStatus +
				// 	"&displayStatus=" + search.displayStatus + "&columnId=" + search.columnId + "&displayStatus=" + search.displayStatus + "&secondColumn=" + search.secondColumn + "&pageSize=25" + '&orderByClause=' + search.orderByClause

				// ))

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getArticleDetile({ payload }, { call, put }) {
		
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getArticleById, params);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				localStorage.setItem("articleText", res.articleText);
				yield put(routerRedux.push('/content/editor_article?articleId='+payload.articleId))


			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getIndexById({ payload }, { call, put }) {
		
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getArticleById, params);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				localStorage.setItem("articleText", res.articleText);
				yield put(routerRedux.push('/index/editor?articleId='+payload.articleId))


			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getById({ payload }, { call, put }) {
			let merId = localStorage.getItem("userId");
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getArticleById, params);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				var tags = "tags";
				res[tags] = res.tagnames != null ? res.tagnames.split(",") : '';
				yield put({
					type: 'getArticleListSuccess',
					payload: {
						editorList: res,
						ifPushValue:res.ifPush+'',
						loading: false,
					}
				});
				if (res.createUser == null) {
					yield put({
						type: 'getSysUserById',
						payload: {
							userId: merId,
						}
					});
				}
				if (res.sysUser == null || res.sysUser != "") {
					yield put({
						type: 'getBonus',
						payload: {
							articleId: res.articleId,
						}
					});
				}
				/*window.location.reload()*/
				localStorage.setItem("articleList", JSON.stringify(res));
				localStorage.setItem("articleText", res.articleText);
			
				//yield put(routerRedux.push('/index/editor?articleId=' + payload.articleId ))

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getArById({ payload }, { call, put }) {

			const { data } = yield call(getArticleById, payload);
			//console.log("栏目",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				var tags = "tags";
				res[tags] = res.tagnames != null ? res.tagnames.split(",") : '';
				yield put({
					type: 'getPreSuccess',
					payload: {
						preList: res,
						loading: false,
					}
				});

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getFeedbackList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getFeedbackList, payload);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				var res = data.responseBody.data;
				for (var i in res) {
					res[i].createDate = formatDate(res[i].createDate)
				}
				yield put({
					type: 'getFeedbackListSuccess',
					payload: {
						FeedbackList: res,
						totalNumber: data.responseBody.totalNumber,
						currentPage: data.responseBody.currentPage,
						loading: false,

					}
				});
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*deleteFeedback({ payload }, { call, put }) {
			const { feedbackId } = payload;
			let params = {
				feedbackId: feedbackId
			}

			const { data } = yield call(deleteFeedback, params);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				const search = GetRequest(payload.search)
				message.success('删除成功');
				yield put({
					type: 'getFeedbackList',
					payload: {
						currentPage: parseInt(search.page),
						content: (search.content == 'undefined' ||search.content==undefined)? null : Base64.decode(search.content),
						status: (search.status != "undefined" && search.status != undefined) ? (search.status == "true" ? true : false) : null,
						startDate: search.startDate != "undefined" ? search.startDate : null,
						endDate: search.endDate != "undefined" ? search.endDate : null,
						pageSize: 25,
					}
				});
			} else {
				if (data.code == 10004 || data.code == 10011) {

					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*setStatus({ payload }, { call, put }) {

			const { data } = yield call(setStatus, payload);
			//console.log("图片",data)
			if (data && data.code == 10000) {

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*replay({ payload }, { call, put }) {

			const { data } = yield call(replay, payload);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				message.success('保存成功');
				setTimeout(()=>{
					history.back();
				},50)
				//yield put(routerRedux.push('/content/content_opinion?page=1'))
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getCommentList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getCommentList, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {
					res.data[i].createDate = formatDate(res.data[i].createDate);
				}
				yield put({
					type: 'getCommentListSuccess',
					payload: {
						CommentList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber,
						isCommentAutid:res.totalPrice+''
					}

				})
			} else {

				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*commentSet({ payload }, { call, put }) {

			const { data } = yield call(commentSet, payload);

			if (data && data.code == 10000) {
				message.success('设置成功')
				yield put({
					type: 'hideCommentSet',
				})
				yield put({
					type: 'getCommentList',
					payload: {
						currentPage: 1,
						pageSize: 25,
					}

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*deleteComment({ payload }, { call, put }) {
			const { commentId } = payload;
			let params = {
				commentId: commentId
			}

			const { data } = yield call(deleteComment, params);

			if (data && data.code == 10000) {
				message.success('删除成功')
				const search = GetRequest(payload.search)

				yield put({
					type: 'getCommentList',
					payload: {
						currentPage: search.page,
						content: (search.content == "undefined"|| search.content ==undefined) ? null : Base64.decode(search.content),
						articleTitle: (search.articleTitle == "undefined"|| search.articleTitle==undefined )?  null: Base64.decode(search.articleTitle),
						commentUser: (search.commentUser == "undefined" ||search.commentUser==undefined)?null : Base64.decode(search.commentUser) ,
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						status: search.status != "undefined" ? search.status : null,
						startDate: search.startDate != "undefined" ? search.startDate : null,
						endDate: search.endDate != "undefined" ? search.endDate : null,
						displayStatus: (search.displayStatus != "undefined" && search.displayStatus != undefined) ? (search.displayStatus == "1" ? true : false) : null,
						pageSize: 25,
					}

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*setcommentStatus({ payload }, { call, put }) {
			const { commentIds, displayStatus } = payload;
			let params = {
				commentIds: commentIds,
				displayStatus: displayStatus
			}
			const { data } = yield call(setcommentStatus, params);

			if (data && data.code == 10000) {
				const search = GetRequest(payload.search)
				message.success('设置成功')

				yield put({
					type: 'getCommentList',
					payload: {
						currentPage: search.page,
						content: (search.content == "undefined"|| search.content ==undefined) ? null : Base64.decode(search.content),
                        articleTitle: (search.articleTitle == "undefined"|| search.articleTitle==undefined )?  null: Base64.decode(search.articleTitle),
						commentUser: (search.commentUser == "undefined" ||search.commentUser==undefined)?null : Base64.decode(search.commentUser) ,
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						status: search.status != "undefined" ? search.status : null,
						startDate: search.startDate != "undefined" ? search.startDate : null,
						endDate: search.endDate != "undefined" ? search.endDate : null,
						displayStatus: (search.displayStatus != "undefined" && search.displayStatus != undefined) ? (search.displayStatus == "1" ? true : false) : null,
						pageSize: 25
					}
				})
				yield put({
					type: 'hideSetModal',

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*auditComment({ payload }, { call, put }) {

			const { commentId, status, refuseReason } = payload;

			let params = {};
			if (status == 1) {
				params = {
					commentId: commentId,
					status: status,

				}
			} else {
				params = {
					commentId: commentId,
					status: status,
					refuseReason: refuseReason
				}
			}

			const { data } = yield call(auditComment, params);

			if (data && data.code == 10000) {
				const search = GetRequest(payload.search)
				message.success('审核成功')
				// var res = data.responseBody.data;
				yield put({
					type: 'hideExamineModal',
					payload: {

					}

				})
				yield put({
					type: 'getCommentList',
					payload: {
						currentPage: search.page,
						content: (search.content == "undefined"|| search.content ==undefined) ? null : Base64.decode(search.content),
						articleTitle: (search.articleTitle == "undefined"|| search.articleTitle==undefined )?  null: Base64.decode(search.articleTitle),
						commentUser: (search.commentUser == "undefined" ||search.commentUser==undefined)?null : Base64.decode(search.commentUser) ,
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						status: search.status != "undefined" ? search.status : null,
						startDate: search.startDate != "undefined" ? search.startDate : null,
						endDate: search.endDate != "undefined" ? search.endDate : null,
						displayStatus: (search.displayStatus != "undefined" && search.displayStatus != undefined) ? (search.displayStatus == "1" ? true : false) : null,
						pageSize: 25
					}

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*addColumn({ payload }, { call, put }) {

			const { data } = yield call(addColumn, payload);

			if (data && data.code == 10000) {
				if (payload.columnId != undefined) {
					message.success('修改成功')
				} else {
					message.success('添加成功')
				}

				// var res = data.responseBody.data;
				yield put({
					type: 'hideColumnAddModal',
					payload: {

					}

				})
				yield put({
					type: 'hideColumnChildModal',
					payload: {

					}

				})
				yield put({
					type: 'hideColumnEditorModal',
					payload: {

					}

				})

				yield put({
					type: 'getColumnList',
					payload: {
					}
				})
				//yield put(routerRedux.push('/content/content_column?page=1'))
				//window.location.reload()
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*deleteColumn({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(deleteColumn, payload);

			if (data && data.code == 10000) {
				message.success('刪除成功')
				yield put({
					type: 'getColumnList',
					payload: {

					}

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*sendEmail({ payload }, { call, put }) {

			const { data } = yield call(sendEmail, payload);

			if (data && data.code == 10000) {
				message.success('发送成功')
				yield put({
					type: 'hideOpinionModal',
					payload: {

					}

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getSysUserById({ payload }, { call, put }) {

			const { data } = yield call(getSysUserById, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getSysUserByIdSuccess',
					payload: {
						UserById: res
					}

				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*publishSave({ payload }, { call, put }) {
			const { list, aoSave, autoSaveInterval } = payload;
			window.clearInterval(autoSaveInterval);
			
			let params = {};
			if (list.articleId == "") {
				params = {
					articleTitle: list.articleTitle,
					articleText: list.articleText,
					publishStatus: 0,
					tagnames: list.tagnames,
					description: list.description,
					image: list.image,
					type: list.type,
					columnId: list.columnId,
					secondColumn: list.secondColumn,
					displayStatus: list.displayStatus,
					displayOrder: list.displayOrder,
					articleSource: list.articleSource,
					articleLink: list.articleLink,
					commentSet: list.commentSet,
					publishSet: list.publishSet,
					createUser: list.createUser,
					sysUser: list.sysUser,
					bonusStatus: list.bonusStatus,
					textnum: list.textnum,
					browseNum: list.browseNum,
					thumbupNum: list.thumbupNum,
					collectNum: list.collectNum,
					ifPlatformPublishAward:list.ifPlatformPublishAward,
			        ifPush:list.ifPush

				}
			} else {
				params = {
					articleTitle: list.articleTitle,
					articleText: list.articleText,
					publishStatus: 0,
					articleId: list.articleId,
					tagnames: list.tagnames,
					description: list.description,
					image: list.image,
					type: list.type,
					columnId: list.columnId,
					secondColumn: list.secondColumn,
					displayStatus: list.displayStatus,
					displayOrder: list.displayOrder,
					articleSource: list.articleSource,
					articleLink: list.articleLink,
					commentSet: list.commentSet,
					publishSet: list.publishSet,
					createUser: list.createUser,
					sysUser: list.sysUser,
					bonusStatus: list.bonusStatus,
					textnum: list.textnum,
					browseNum: list.browseNum,
					thumbupNum: list.thumbupNum,
					collectNum: list.collectNum,
					ifPlatformPublishAward:list.ifPlatformPublishAward,
					ifPush:list.ifPush

				}
			}

			const { data } = yield call(publishArticle, params);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var id = data.responseBody;
				list.articleId = id;

				yield put({
					type: "saveSuccess",
					payload: {
						saveId: id
					}
				})
				window.clearInterval(autoSaveInterval);
				/* payload.autoSaveInterval = window.setInterval(function() {
					    
					   // aoSave(list.articleId)
					  }, 10000);*/



			} else {

				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
			}
		},
		*getBonus({ payload }, { call, put }) {
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getBonus, params);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getBonusSuccess',
					payload: {
						getBonusList: res
					}
				})
				/*yield put({
				  type:"showBonsModal",
				  payload:{
					artice:res,
					currentArtice:payload.record
				  }
				})*/
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getArticleStat({ payload }, { call, put }) {
			let params = {
				articleId: payload.articleId
			}
			const { data } = yield call(getArticleStat, params);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getArticleStatSuccess',
					payload: {
						ArticleStat: res
					}
				})

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*typeChange({ payload }, { call, put }) {

			yield put({
				type: "typeChangeSuccess",
				payload: {
					artSorce: payload.artSorce
				}
			})
		},
		*publishStatusChange({ payload }, { call, put }) {
			yield put({
				type: "publishStatusChangeSuccess",
				payload: {
					pubStatus: payload.pubStatus
				}
			})
		},
		*handleTimeChane({ payload }, { call, put }) {
			yield put({
				type: "handleTimeChaneSuccess",
				payload: {
					timeDis: payload.timeDis
				}
			})
		},
		*imgSizeChange({ payload }, { call, put }) {
			yield put({
				type: "imgSizeChangeSuccess",
				payload: {
					imgSize: payload.imgSize
				}
			})
		},
		*imgUrlChange({ payload }, { call, put }) {
			yield put({
				type: "imgUrlChangeSuccess",
				payload: {
					imgUrl: payload.imgUrl
				}
			})
		},
		*getPushAticleInfo({ payload }, { call, put }) {
			const { data } = yield call(getPushAticleInfo, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'PushAticleInfoSuccess',
					payload: {
						PushAticleInfo: res
					}
				})

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*ifPushValue({ payload }, { call, put }) {
		
			yield put({
				type: "ifPushValueSuccess",
				payload: {
					ifPushValue: payload.ifPushValue
				}
			})
		},
		*textChange({ payload }, { call, put }) {
		
			yield put({
				type: "textChangeSuccess",
				payload: {
					validateStatus:payload.validateStatus,
					helpMessage:payload.helpMessage
				}
			})
		},
		*editorText({ payload }, { call, put }) {
		
			yield put({
				type: "editorTextSuccess",
				payload: {
					editorContent:payload.editorContent,
				}
			})
		},
		*flagChange({ payload }, { call, put }) {
		
			yield put({
				type: "flagChangeSuccess",
				payload: {
					flag:payload.flag,
				}
			})
		},
	},
	reducers: {
		showLoading(state, action) {
			return {
				...state,
				...action.payload,
				loading: true
			};
		},
		hideLoading(state, action) {
			return {
				...state,
				...action.payload,
				loading: false
			};
		},
		showSubmitLoading(state, action) {
			return {
				...state,
				...action.payload,
				confirmLoading: true
			};
		},
		hideSubmitLoading(state, action) {
			return {
				...state,
				...action.payload,
				confirmLoading: false
			};
		},
		showModal(state, action) {
			return {
				...state,
				...action.payload,
				AuditVisible: true
			};
		},
		hideModal(state, action) {
			return {
				...state,
				...action.payload,
				AuditVisible: false
			};
		},
		showBgModal(state, action) {
			return {
				...state,
				...action.payload,
				BgVisible: true
			};
		},
		hideBgModal(state, action) {
			return {
				...state,
				...action.payload,
				BgVisible: false
			};
		},
		setShowModal(state, action) {
			return {
				...state,
				...action.payload,
				setshow: true
			};
		},
		hideShowModal(state, action) {
			return {
				...state,
				...action.payload,
				setshow: false
			};
		},
		showArticeModal(state, action) {
			return {
				...state,
				...action.payload,
				articeVisible: true
			};
		},
		showfpModal(state, action) {
			return {
				...state,
				...action.payload,
				FtVisible: true
			};
		},
		hidefpModal(state, action) {
			return {
				...state,
				...action.payload,
				FtVisible: false
			};
		},
		hideArticeModal(state, action) {
			return {
				...state,
				...action.payload,
				articeVisible: false
			};
		},
		getArticleListSuccess(state, action) {
			return {
				...state,
				...action.payload,
				imgUrl: "",
				saveId: 0
			};
		},
		setDisplayStatusSuccess(state, action) {
			return {
				...state,
				...action.payload,
				saveId: 0
			};
		},
		handleTimeChaneSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		textChangeSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		ifPushValueSuccess(state, action) {
		
			return {
				...state,
				...action.payload,
			};
		},
		getColumnListSuccess(state, action) {
			return {
				...state,
				...action.payload,
				
			};
		},
		PushAticleInfoSuccess(state, action) {
			return {
				...state,
				...action.payload,
				
			};
		},
		publishStatusChangeSuccess(state, action) {
			return {
				...state,
				...action.payload,
				
			};
		},
		saveSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		getVideoListSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		SensitiveMessage(state, action) {
			console.log(action.payload)
			return {
				...state,
				...action.payload,
			};
		},
		getFeedbackListSuccess(state, action) {
			return {
				...state,
				...action.payload,
				saveId: 0
			};
		},
		getCommentListSuccess(state, action) {
			return {
				...state,
				...action.payload,
				saveId: 0
			};
		},
		showCommentSet(state, action) {
			return {
				...state,
				...action.payload,
				CommentSetVisible: true
			};
		},
		hideCommentSet(state, action) {
			return {
				...state,
				...action.payload,
				CommentSetVisible: false
			};
		},
		showSetModal(state, action) {
			return {
				...state,
				...action.payload,
				showSetVisible: true
			};
		},
		hideSetModal(state, action) {
			return {
				...state,
				...action.payload,
				showSetVisible: false
			};
		},
		showExamineModal(state, action) {
			return {
				...state,
				...action.payload,
				ExamineVisible: true
			};
		},
		hideExamineModal(state, action) {
			return {
				...state,
				...action.payload,
				ExamineVisible: false
			};
		},
		showColumnAddModal(state, action) {
			return {
				...state,
				...action.payload,
				ColumnAddVisbile: true
			};
		},
		hideColumnAddModal(state, action) {
			return {
				...state,
				...action.payload,
				ColumnAddVisbile: false
			};
		},
		showOpinionModal(state, action) {
			return {
				...state,
				...action.payload,
				OpinionVisible: true
			};
		},
		hideOpinionModal(state, action) {
			return {
				...state,
				...action.payload,
				OpinionVisible: false
			};
		},
		getSysUserByIdSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		showEditorImageModal(state, action) {
			return {
				...state,
				...action.payload,
				EditorImageVisible: true
			};
		},
		hideEditorImageModal(state, action) {
			return {
				...state,
				...action.payload,
				EditorImageVisible: false
			};
		},
		getBonusSuccess(state, action) {
			return {
				...state,
				...action.payload,
				saveId: 0
			};
		},
		showImageModal(state, action) {
			return {
				...state,
				...action.payload,
				ImgShowVisible: true
			};
		},
		hideImageModal(state, action) {
			return {
				...state,
				...action.payload,
				ImgShowVisible: false
			};
		},
		showColumnEditorModal(state, action) {

			return {
				...state,
				...action.payload,
				columnEditor: true,
				saveId: 0
			};
		},
		hideColumnEditorModal(state, action) {
			return {
				...state,
				...action.payload,
				columnEditor: false
			};
		},
		typeChangeSuccess(state, action) {
			//console.log("111",action.payload)
			return {
				...state,
				...action.payload,
			};
		},
		showColumnChildModal(state, action) {

			return {
				...state,
				...action.payload,
				childCloum: true
			};
		},
		hideColumnChildModal(state, action) {

			return {
				...state,
				...action.payload,
				childCloum: false
			};
		},
		showBonsModal(state, action) {
			return {
				...state,
				...action.payload,
				BonsVisible: true
			};
		},
		hideBonsModal(state, action) {
			return {
				...state,
				...action.payload,
				BonsVisible: false
			};
		},
		getArticleStatSuccess(state, action) {
			return {
				...state,
				...action.payload,
				saveId: 0
			};
		},
		saveIdSuccess(state, action) {
			return {
				...state,
				...action.payload,
				saveId: 0
			};
		},
		getPreSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		fixdisabeld(state, action) {
			return {
				...state,
				dis:true,
				...action.payload,
			};
		},
		falsedisabeld(state, action) {
			return {
				...state,
				dis:false,
				...action.payload,
			};
		},
		titleSensitiveMessage(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		statusChangeuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		getVideoArticleSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		PushAticleInfoChange(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		editorTextSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		imgSizeChangeSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		imgUrlChangeSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		flagChangeSuccess(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
	},

}