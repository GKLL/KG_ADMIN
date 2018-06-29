import pathToRegexp from 'path-to-regexp';
import { getUserBonusList,checkInfo,confirmBonus,getUserBonusDetailList,getUserBonusDetail,shareArticleBonus } from '../services/reward';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'reward',

	state: {
		loading: false,
		deskUserId: '',
		currentPage: 1,
		totalNumber: 0,
		checkInfoList: [],//检索的用户表
		currentItem:{},
		totalPrice:0,   //发出总奖励
		loging:false,
		UserBonusList:[], //奖励列表
		total:0,    //列表总数
		awardpeople:'',
		BonusDetail:{},//奖励详情
		BonusDetailList:[],// 受奖人列表
		validateStatus:"success",
		helpMessage:''
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/finance/userAward').exec(location.pathname);
				
				
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getUserBonusList',
						payload: {
							currentPage: search.page,
							pageSize:25,
							extraBonusId: search.extraBonusId != 'undefined' ? search.extraBonusId : null,
							startTvBonus: search.startTvBonus != 'undefined' ? search.startTvBonus : null,
							endTvBonus: search.endTvBonus != 'undefined' ? search.endTvBonus : null,
							startKgBonus: search.startKgBonus != "undefined" ? search.startKgBonus : null,
							endKgBonus: search.endKgBonus != 'undefined' ? search.endKgBonus : null,
							adminName: (search.adminName == undefined||search.adminName=="undefined") ? null : Base64.decode(search.adminName),
							startTime: search.startTime != 'undefined' ? search.startTime : null,
							endTime: search.endTime != 'undefined' ? search.endTime : null,
							numStart: search.numStart != 'undefined' ? search.numStart : null,
							numEnd: search.numEnd != 'undefined' ? search.numEnd : null,
						}
					});
					
				}
				match = pathToRegexp('/finance/awardDetails').exec(location.pathname);	
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type:"getUserBonusDetail",
						payload:{
							extraBonusId:search.id != 'undefined' ? search.id : null,
						}
					})
					dispatch({
						type: 'getUserBonusDetailList',
						payload: {
							currentPage: search.page,
							pageSize:25,
							extraBonusId: search.id != 'undefined' ? search.id : null,
							userId: search.userId != 'undefined' ? search.userId : null,
							userMobile: search.userMobile != 'undefined' ? search.userMobile : null,
							nickName: (search.nickName == undefined||search.nickName=="undefined") ? null : Base64.decode(search.nickName),
							startTvBonus: search.startTvBonus != 'undefined' ? search.startTvBonus : null,
							endTvBonus: search.endTvBonus != 'undefined' ? search.endTvBonus : null,
							startKgBonus: search.startKgBonus != 'undefined' ? search.startKgBonus : null,
							endKgBonus: search.endKgBonus != 'undefined' ? search.endKgBonus : null,
						}
					});
					
				}
				match = pathToRegexp('/finance/addAward').exec(location.pathname);	
				if (match) {
					
					dispatch({
						type: 'getAwardSuccess',
						payload: {
							validateStatus:"success",
							helpMessage:'',
							total:0,  
							awardpeople:'',
							checkInfoList:[],
						}
					});
					
				}
			})
		},
	},

	effects: {
		*getUserBonusList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getUserBonusList, payload);
			// console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				
				yield put({
					type: 'publishArticleBonusSuccess',
					payload: {
						UserBonusList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage,
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
		*checkInfo({ payload }, { call, put }) {
			yield put({
				type: 'showCofiomLoding',
			});
			const { data } = yield call(checkInfo, payload);
			// console.log(data)
			if(data && data.code == 10000){
			    let res =data.responseBody;
				yield put({
					type:"checkInfoSuccess",
					payload:{
						checkInfoList:res,
					}
				})
				yield put({
					type: 'hideCofiomLoding',
				});
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
		*confirmBonus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(confirmBonus, payload);
			
			if (data && data.code == 10000) {
				yield put({
					type: 'hideLoading',
				});
				message.success('奖励发放成功', 3);
					setTimeout(()=>{
						history.back();
					},100)
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
				yield put({
					type: 'hideCofiomLoding',
				});
			}
		},
		*getUserBonusDetailList({ payload }, { call, put }) {
			
			yield put({
				type:"showLoding"
			})
			const { data } = yield call(getUserBonusDetailList, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type:'getUserBonusDetailListSuccess',
					payload:{
						BonusDetailList:res.data,
						totalNumber:res.totalNumber,
						currentPage:res.currentPage
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
					type: 'hideLoding',
				});
			}
		},
		*getUserBonusDetail({ payload }, { call, put }) {
			yield put({
				type:'showCofiomLoding'
			})
			const { data } = yield call(getUserBonusDetail, payload);
		
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type:'hideCofiomLoding'
				})
				yield put({
					type: 'getUserBonusDetailSuccess',
					payload: {
						BonusDetail: res,
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
		*changeAward({ payload }, { call, put }) {
			yield put({
				type:"changeReward",
				payload:{
					awardpeople:payload.awardpeople
				}
			})
			
		},
		*changeValidateStatus({ payload }, { call, put }) {
			
			yield put({
				type:"changeValidateStatusSuccess",
				payload:{
					validateStatus:payload.validateStatus,
					helpMessage:payload.helpMessage
				}
			})
			
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
		changeReward(state, action) {
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
		getUserBonusDetailListSuccess(state, action) {
			return {...state,...action.payload};
		},
		checkInfoSuccess(state, action) {
			return {...state,...action.payload};
		},
		getUserBonusDetailSuccess(state, action) {
			return {...state,...action.payload};
		},
		changeValidateStatusSuccess(state, action) {
			return {...state,...action.payload};
		},
		getAwardSuccess(state, action) {
			return {...state,...action.payload};
		},
	},

}