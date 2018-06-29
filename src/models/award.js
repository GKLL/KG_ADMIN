import pathToRegexp from 'path-to-regexp';
import { publishArticleBonus,markHighQualityArticles,freezePublishBonus,addedBonus,getSysUsers,shareArticleBonus } from '../services/user';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'award',

	state: {
		loading: false,
		deskUserId: '',
		currentPage: 1,
		totalNumber: 0,
		ArticleBonusList: [],//发文奖励列表
		currentItem:{},
		totalPrice:0,   //发出总奖励
		loging:false,
		SysUsersList:[], //后台用户列表
		ShareBonusList:[], //分享奖励列表
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/user/writingAward').exec(location.pathname);
				const search = GetRequest(location.search);
				//console.log(search.publisher)
				if (match) {
					dispatch({
						type: 'publishArticleBonus',
						payload: {
							currentPage: search.page,
							pageSize:25,
							articleId: search.articleId != 'undefined' ? search.articleId : null,
							sortRule: search.sortRule != 'undefined' ? search.sortRule : null,
							sortFiledName: search.sortFiledName != 'undefined' ? search.sortFiledName : null,
							adminId: search.adminId != "undefined" ? search.adminId : null,
							articleTitle: (search.title == undefined||search.title=="undefined") ? null : Base64.decode(search.title),
							publisher: (search.publisher == 'undefined'|| search.publisher == undefined)?null : Base64.decode(search.publisher),
							publishStartDate: search.publishStartDate != 'undefined' ? search.publishStartDate : null,
							publishEndDate: search.publishEndDate != 'undefined' ? search.publishEndDate : null,
							auditStartDate: search.auditStartDate != 'undefined' ? search.auditStartDate : null,
							auditEndDate: search.auditEndDate != 'undefined' ? search.auditEndDate : null,
							bonusStatus: search.bonusStatus != 'undefined' ? search.bonusStatus : null,
							addBonusStatus: search.addBonusStatus != 'undefined' ? parseInt(search.addBonusStatus) : null,
							articleMark: search.articleMark != 'undefined' ? search.articleMark : null,
							columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
						}
					});
					dispatch({
						type:'content/getColumnList',
						payload: {

						}
					})
					dispatch({
						type:"getSysUsers",
						payload:{

						}
					})
				}
				match = pathToRegexp('/user/shareReward').exec(location.pathname);
				if (match) {
					dispatch({
						type: 'shareArticleBonus',
						payload: {
							currentPage: search.page,
							pageSize:25,
							userId: search.userId != 'undefined' ? search.userId : null,
							nickName: (search.nickName == undefined||search.nickName=="undefined") ? null : Base64.decode(search.nickName),
							userPhone: search.userPhone != 'undefined' ? search.userPhone : null,
							userRoleId: search.userRoleId != 'undefined' ? search.userRoleId : null,
							userLevel: search.userLevel != 'undefined' ? search.userLevel : null,
						}
					});
				}
			})
		},
	},

	effects: {
		*publishArticleBonus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(publishArticleBonus, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				var arr = res.data;
				var clounm = "clounm";
				for (var i in arr) {
					if (arr[i].secondColumnName == null) {
						arr[i][clounm] = arr[i].columnName;
					} else {
						arr[i][clounm] = arr[i].columnName + '-' + arr[i].secondColumnName;
					}
				}
				yield put({
					type: 'publishArticleBonusSuccess',
					payload: {
						ArticleBonusList: arr,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage,
						totalPrice:res.totalPrice,
					}
				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
				yield put({
					type: 'hideLoading',
				});
			}
		},
		*markHighQualityArticles({ payload }, { call, put }) {
			let params ={
				articleId:payload.articleId,
				articleMark:payload.articleMark,
				adminId:payload.adminId,
			}
			const { data } = yield call(markHighQualityArticles, payload);
			if (data && data.code == 10000) {
				if(payload.articleMark == 1){
					message.success('标识成功');
				}else{
					message.success('取消标识成功');
				}
				const search = GetRequest(payload.search);
				yield put({
					type:"publishArticleBonus",
					payload:{
						currentPage: search.page,
						pageSize:25,
						articleId: search.articleId != 'undefined' ? search.articleId : null,
						adminId: search.adminId != "undefined" ? search.adminId : null,
						sortRule: search.sortRule != 'undefined' ? search.sortRule : null,
						sortFiledName: search.sortFiledName != 'undefined' ? search.sortFiledName : null,
						articleTitle: (search.title == undefined||search.title=="undefined") ? null : Base64.decode(search.title),
						publisher: (search.publisher == 'undefined'|| search.publisher == undefined)?null : Base64.decode(search.publisher),
						publishStartDate: search.publishStastDate != 'undefined' ? search.publishStastDate : null,
						publishEndDate: search.publishEndDate != 'undefined' ? search.publishEndDate : null,
						auditStartDate: search.auditStartDate != 'undefined' ? search.auditStartDate : null,
						auditEndDate: search.auditEndDate != 'undefined' ? search.auditEndDate : null,
						bonusStatus: search.bonusStatus != 'undefined' ? search.bonusStatus : null,
						addBonusStatus: search.addBonusStatus != 'undefined' ? search.addBonusStatus : null,
						articleMark: search.articleMark != 'undefined' ? search.articleMark : null,
						columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
					}
				})	
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
				yield put({
					type: 'hideLoading',
				});
			}
		},
		*freezePublishBonus({ payload }, { call, put }) {
			let params = {};
			if(payload.publishStatus == 0){
				if(payload.freezeReason == undefined){
					params ={
						articleId:payload.articleId,
						publishStatus:payload.publishStatus,
						adminId:payload.adminId
					}
				}else{
					params ={
						articleId:payload.articleId,
						publishStatus:payload.publishStatus,
						adminId:payload.adminId,
						freezeReason:payload.freezeReason
					}
				}
			}else{
				params ={
					articleId:payload.articleId,
					publishStatus:payload.publishStatus,
					adminId:payload.adminId,
				}
			}
			yield put({
				type:"showCofiomLoding"
			})
			const { data } = yield call(freezePublishBonus, params);
			if (data && data.code == 10000) {
				if(payload.publishStatus == 0){
					message.success('冻结成功');
				}else{
					message.success('解冻成功');
				}
				yield put({
					type: 'hideCofiomLoding',
				});
				yield put({
					type:"hideFrozenModal",
					payload:{
						currentItem:{}
					}
				})
				const search = GetRequest(payload.search);
				yield put({
					type:"publishArticleBonus",
					payload:{
						currentPage: search.page,
						pageSize:25,
						articleId: search.articleId != 'undefined' ? search.articleId : null,
						adminId: search.adminId != "undefined" ? search.adminId : null,
						sortRule: search.sortRule != 'undefined' ? search.sortRule : null,
						sortFiledName: search.sortFiledName != 'undefined' ? search.sortFiledName : null,
						articleTitle: (search.title == undefined||search.title=="undefined") ? null : Base64.decode(search.title),
						publisher: (search.publisher == 'undefined'|| search.publisher == undefined)?null : Base64.decode(search.publisher),
						publishStartDate: search.publishStartDate != 'undefined' ? search.publishStartDate : null,
						publishEndDate: search.publishEndDate != 'undefined' ? search.publishEndDate : null,
						auditStartDate: search.auditStartDate != 'undefined' ? search.auditStartDate : null,
						auditEndDate: search.auditEndDate != 'undefined' ? search.auditEndDate : null,
						bonusStatus: search.bonusStatus != 'undefined' ? search.bonusStatus : null,
						addBonusStatus: search.addBonusStatus != 'undefined' ? search.addBonusStatus : null,
						articleMark: search.articleMark != 'undefined' ? search.articleMark : null,
						columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
					}
				})	
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
				yield put({
					type: 'hideCofiomLoding',
				});
			}
		},
		*addedBonus({ payload }, { call, put }) {
			let params = {
				articleId:payload.articleId,
				bonus:payload.bonus,
				bonusType:payload.bonusType,
				adminId:payload.adminId,
			};
			yield put({
				type:"showCofiomLoding"
			})
			const { data } = yield call(addedBonus, params);
			if (data && data.code == 10000) {
				message.success('额外奖励发放成功');
				yield put({
					type: 'hideCofiomLoding',
				});
				yield put({
					type:"hideAdditionalModal",
					payload:{
						currentItem:{},
						loging:false
					}
				})
				const search = GetRequest(payload.search);
				yield put({
					type:"publishArticleBonus",
					payload:{
						currentPage: search.page,
						pageSize:25,
						articleId: search.articleId != 'undefined' ? search.articleId : null,
						adminId: search.adminId != "undefined" ? search.adminId : null,
						sortRule: search.sortRule != 'undefined' ? search.sortRule : null,
						sortFiledName: search.sortFiledName != 'undefined' ? search.sortFiledName : null,
						articleTitle: (search.title == undefined||search.title=="undefined") ? null : Base64.decode(search.title),
						publisher: (search.publisher == 'undefined'|| search.publisher == undefined)?null : Base64.decode(search.publisher),
						publishStartDate: search.publishStartDate != 'undefined' ? search.publishStartDate : null,
						publishEndDate: search.publishEndDate != 'undefined' ? search.publishEndDate : null,
						auditStartDate: search.auditStartDate != 'undefined' ? search.auditStartDate : null,
						auditEndDate: search.auditEndDate != 'undefined' ? search.auditEndDate : null,
						bonusStatus: search.bonusStatus != 'undefined' ? search.bonusStatus : null,
						addBonusStatus: search.addBonusStatus != 'undefined' ? search.addBonusStatus : null,
						articleMark: search.articleMark != 'undefined' ? search.articleMark : null,
						columnId: search.columnId != 'null' ? parseInt(search.columnId) : null,
					}
				})	
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 3);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 3);
				}
				yield put({
					type: 'hideCofiomLoding',
				});
			}
		},
		*getSysUsers({ payload }, { call, put }) {
			const { data } = yield call(getSysUsers, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getSysUsersSuccess',
					payload: {
						SysUsersList: res,
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
		*shareArticleBonus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(shareArticleBonus, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				
				yield put({
					type: 'shareArticleBonusSuccess',
					payload: {
						ShareBonusList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage,
						totalPrice:res.totalPrice,
					}
				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
				yield put({
					type: 'hideLoading',
				});
			}
		},
	},
	reducers: {
		showLoading(state, action) {
			return {...state,loading: true};
		},
		hideLoading(state, action) {
			return {...state,loading: false};
		},
		showCofiomLoding(state, action) {
			return {...state,loging: true};
		},
		hideCofiomLoding(state, action) {
			return {...state,loging: false};
		},
		publishArticleBonusSuccess(state, action) {
			return {...state,...action.payload};
		},
		showFrozenModal(state, action) {
			return {...state,...action.payload,FrozenVisible:true};
		},
		hideFrozenModal(state, action) {
			return {...state,...action.payload,FrozenVisible:false};
		},
		showAdditionalModal(state, action) {
			return {...state,...action.payload,AdditionalVisible:true};
		},
		hideAdditionalModal(state, action) {
			return {...state,...action.payload,AdditionalVisible:false};
		},
		getSysUsersSuccess(state, action) {
			return {...state,...action.payload};
		},
		shareArticleBonusSuccess(state, action) {
			return {...state,...action.payload};
		},
	},

}