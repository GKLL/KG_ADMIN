import pathToRegexp from 'path-to-regexp';
import {
	appvmList,deleteAppvm,AppDetail,createApp
} from '../services/app';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'app',

	state: {
		appList: [], //APP版本列表
		isSys: 1,
		currentPage: 1,
		totalNumber: 0,
		loading:false,
		AppDetailItem:{}, //查看版本详情
		loging:false,
		forcedVal:'1',   //默认强制更新
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/app/editon').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'appvmList',
						payload: {
							currentPage:search.page,
							pageSize:25
						}
					});
				}
				match = pathToRegexp('/app/detail').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'AppDetail',
						payload: {
							id:search.id,
						}
					});
				}
			})
		},
	},

	effects: {
		*appvmList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(appvmList, payload);
	
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'appvmListSuccess',
					payload: {
					    appList: res.data,
						loading: false,
						currentPage:res.currentPage,
						totalNumber:res.totalNumber
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
		*selectType({ payload }, { call, put }) {
			yield put({
				type: 'selectTypeSuccess',
				payload: {
					isSys: payload.isSys,
				}
			})
		},
		*deleteAppvm({ payload }, { call, put }) {
			let params ={
				id:payload.id
			}
			const { data } = yield call(deleteAppvm, params);

			if (data && data.code == 10000) {
				message.success('删除成功');
				const search = GetRequest(payload.search);
				yield put({
					type: 'appvmList',
					payload: {
						page: search.page,
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
		*AppDetail({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(AppDetail, payload);
	
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'AppDetailSuccess',
					payload: {
					    AppDetailItem: res,
						loading: false,
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
		*createApp({ payload }, { call, put }) {
			yield put({
				type:"showCofiomLoding"
			})
			const { data } = yield call(createApp, payload);
	
			if (data && data.code == 10000) {
				message.success('新建成功');
				
				yield put({
					type: 'hideCofiomLoding',
				});
				yield put({
					type: 'hideModal',
				});
				yield put({
					type: 'appvmList',
					payload: {
						page: 1,
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
				yield put({
					type: 'hideCofiomLoding',
				});
			}
		},
		*forcedChange({ payload }, { call, put }) {
			yield put({
				type:"forcedChangeSuccess",
				payload:{
					forcedVal:payload.forcedVal
				}
			})
		},

	},
	reducers: {
		showLoading(state, action) {
			return { ...state, loading: true };
		},
		hideLoading(state, action) {
			return { ...state, loading: true };
		},
		showModal(state, action) {
			return { ...state, addModal: true,isSys:1,forcedVal:'1' };
		},
		hideModal(state, action) {
			return { ...state, addModal: false };
		},
		showCofiomLoding(state, action) {
			return {...state,loging: true};
		},
		hideCofiomLoding(state, action) {
			return {...state,loging: false};
		},
		selectTypeSuccess(state, action) {
			return { ...state,...action.payload};
		},
		appvmListSuccess(state, action) {
			return { ...state,...action.payload};
		},
		AppDetailSuccess(state, action) {
			return { ...state,...action.payload};
		},
		forcedChangeSuccess(state, action) {
			return { ...state,...action.payload};
		},
	}
}