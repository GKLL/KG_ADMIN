import pathToRegexp from 'path-to-regexp';
import { getNewsFlashListByCondition,getNewsFlashTopMenus,addNewsFlash,detailNewsFlash,updateNewsFlash,delNewsFlash,getPushNewsFlashInfo} from '../services/news';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message,Modal
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'news',

	state: {
		loading: false,
		deskUserId: '',
		currentPage: 1,
		totalNumber: 0,
		checkInfoList: [],//检索的用户表
		uploading:false,
		imageUrl:'',  //上传图片地址
		NewsFlashList:[], //快讯列表
		NewsFlashTopMenus:[],//快讯分类
		NewsFlashItem:{},//快讯详情
		confirmLoading: false,
		PushNewsFlashInfo:{},
		ifPushValue:'0'//是否推送
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/content/news_flash').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getNewsFlashListByCondition',
						payload: {
							currentPage: search.page,
							pageSize:25,
							newsflashText: (search.newsflashText == undefined||search.newsflashText=="undefined") ? null : Base64.decode(search.newsflashText),
							createUserName:(search.createUserName == undefined||search.createUserName=="undefined") ? null : Base64.decode(search.createUserName),
							level: search.level != 'undefined' ? search.level : null,
							newsflashType: search.newsflashType != 'undefined' ? search.newsflashType : null,
							displayStatus: search.displayStatus != 'undefined' ? search.displayStatus : null,
							ifPush: search.ifPush != "undefined" ? search.ifPush : null,
							newsflashOrigin: search.newsflashOrigin != 'undefined' ? search.newsflashOrigin : null,
							remark: (search.remark == undefined||search.remark=="undefined") ? null : Base64.decode(search.remark),
						}
					});
					dispatch({
						type:'getNewsFlashTopMenus',
						payload:{

						}
					})
					dispatch({
						type:'getPushNewsFlashInfo',
						paylpoad:{

						}
					})
				}

				//发布快讯
				match = pathToRegexp('/content/news_publish').exec(location.pathname);
				if (match) {
					dispatch({
						type:'getNewsFlashTopMenus',
						payload:{

						}
					})
					dispatch({
						type:'imgurlChange',
						payload:{
							uploading:false,
					        imageUrl:''
						}
					})
					dispatch({
						type:'ifPushValue',
						payload:{
							ifPushValue:'0'
						}
					})
					dispatch({
						type:'getPushNewsFlashInfo',
						paylpoad:{

						}
					})
				}
				//编辑快讯
				match = pathToRegexp('/content/news_editor').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type:'detailNewsFlash',
						payload:{
							newsflashId:search.newsId
						}
					})
					dispatch({
						type:'getNewsFlashTopMenus',
						payload:{

						}
					})
					dispatch({
						type:'getPushNewsFlashInfo',
						paylpoad:{

						}
					})
				}
			})
		},
	},

	effects: {
		*getNewsFlashListByCondition({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getNewsFlashListByCondition, payload);
			// console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				
				yield put({
					type: 'getNewsFlashListByConditionSuccess',
					payload: {
						NewsFlashList: res.data,
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
		*getNewsFlashTopMenus({ payload }, { call, put }) {
			const { data } = yield call(getNewsFlashTopMenus, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getNewsFlashTopMenusSuccess',
					payload: {
						NewsFlashTopMenus: res.newsFlashColumns,
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
		*uploading({ payload }, { call, put }) {
			yield put({
				type: 'uploadingSuccess',
				payload:{
					uploading:payload.uploading
				}
			});
		},
		*imgurlChange({ payload }, { call, put }) {
			yield put({
				type: 'imgurlSuccess',
				payload:{
					uploading:payload.uploading,
					imageUrl:payload.imageUrl
				}
			});
		},
		*ifPushValue({ payload }, { call, put }) {
			yield put({
				type: 'ifPushValueSuccess',
				payload:{
					ifPushValue:payload.ifPushValue,
				}
			});
		},
		*addNewsFlash({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(addNewsFlash, payload);
			// console.log(data)
			if (data && data.code == 10000) {
				message.success('添加快讯成功')
				yield put({
					type: 'hideLoading',
				});
				yield put(routerRedux.push('/content/news_flash?page=1'))
				
			} else {
				yield put({
					type: 'hideLoading',
				});
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else if (data.code === '29002') {
					Modal.warn({
						title:'检测快讯内容有敏感词',
						content:(<div>敏感词：<span style={{color:"#f00"}}>{data.message}</span></div>),
						onOk(){

						}
					})
				} else{
					message.error(data.message, 2);
				}
				yield put({
					type: 'hideLoading',
				});
			}
		},
		*updateNewsFlash({ payload }, { call, put }) {
			yield put({
				type: 'showCofiomLoding',
			});
			const { data } = yield call(updateNewsFlash, payload);
			// console.log(data)
			if (data && data.code == 10000) {
				message.success('编辑快讯成功')
				yield put({
					type: 'hideCofiomLoding',
				});
				setTimeout(()=>{
					history.back();
				},100)
				
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
				yield put({
					type: 'hideCofiomLoding',
				});
			}
		},
		*detailNewsFlash({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(detailNewsFlash, payload);
			// console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type:'detailNewsFlashSuccess',
					payload:{
						NewsFlashItem:res,
						imageUrl:res.newsflashBottomImg,
						ifPushValue:res.ifPush+'',
						loading:false
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
		*delNewsFlash({ payload }, { call, put }) {
			let params = {
				newsflashId:payload.newsflashId,
			}
			const { data } = yield call(delNewsFlash, params);
			// console.log(data)
			if (data && data.code == 10000) {
				message.success('删除快讯成功')
	
				const search =GetRequest(payload.search);
				yield put({
					type:'getNewsFlashListByCondition',
					payload:{
						currentPage: search.page,
						pageSize:25,
						newsflashText: (search.newsflashText == undefined||search.newsflashText=="undefined") ? null : Base64.decode(search.newsflashText),
						createUserName:(search.createUserName == undefined||search.createUserName=="undefined") ? null : Base64.decode(search.createUserName),
						level: search.level != 'undefined' ? search.level : null,
						newsflashType: search.newsflashType != 'undefined' ? search.newsflashType : null,
						displayStatus: search.displayStatus != 'undefined' ? search.displayStatus : null,
						ifPush: search.ifPush != "undefined" ? search.ifPush : null,
						newsflashOrigin: search.newsflashOrigin != 'undefined' ? search.newsflashOrigin : null,
						remark: (search.remark == undefined||search.remark=="undefined") ? null : Base64.decode(search.remark),
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
		*getPushNewsFlashInfo({ payload }, { call, put }) {
			const { data } = yield call(getPushNewsFlashInfo, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type:'getPushNewsFlashInfohSuccess',
					payload:{
						PushNewsFlashInfo:res,
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
			return {...state,confirmLoading: true};
		},
		hideCofiomLoding(state, action) {
			return {...state,confirmLoading: false};
		},
		uploadingSuccess(state, action) {
			return {...state,...action.payload};
		},
		imgurlSuccess(state, action) {
			return {...state,...action.payload};
		},
		getNewsFlashListByConditionSuccess(state, action) {
			return {...state,...action.payload};
		},
		getNewsFlashTopMenusSuccess(state, action) {
			return {...state,...action.payload};
		},
		detailNewsFlashSuccess(state, action) {
			return {...state,...action.payload};
		},
		getPushNewsFlashInfohSuccess(state, action) {
			return {...state,...action.payload};
		},
		ifPushValueSuccess(state, action) {
			return {...state,...action.payload};
		},
	},

}