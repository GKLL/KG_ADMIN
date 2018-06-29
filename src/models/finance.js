import pathToRegexp from 'path-to-regexp';
import {
	getAccountRecharge, getAccountWIthdraw, auditAccountWithdraw, getAccount,
	getAccountDiposit, getBusinessType, getAccountTxb, getSumBonus
} from '../services/finance';
import { formatDate, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import {
	routerRedux,
} from 'dva/router';
export default {

	namespace: 'finance',

	state: {
		logged: false,
		RechargeList: [],
		loading: false,
		currentPage: 1,
		totalNumber: 0,
		WIthdrawList: [],
		AccountList: [],
		AccountDiposit: [],
		selectList: {},
		BusinessType: [],
		ActiveKey: '1',
		total: 0,
		confirmLoading: false, //提交
		getSumBonus:0,
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/finance/recharge').exec(location.pathname);


				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getAccountRecharge',
						payload: {
							currentPage: search.page,
							userId: search.userId != "undefined" ? search.userId : null,
							email: search.email != "undefined" ? search.email : null,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							status: search.status != "undefined" ? parseInt(search.status) : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							pageSize: 25,

						}
					});

				}
				match = pathToRegexp('/finance/withdrawals').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getAccountWIthdraw',
						payload: {
							currentPage: search.page,
							email: search.email != "undefined" ? search.email : null,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							status: search.status != "undefined" ? parseInt(search.status) : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							pageSize: 25,
						}
					});

				}
				match = pathToRegexp('/finance/record').exec(location.pathname);

				if (match) {
					const search = GetRequest(location.search);
					//console.log(Base64.decode(search.nickName))
					dispatch({
						type: 'getAccount',
						payload: {
							currentPage: search.page,
							flowId: search.flowId != "undefined" ? search.flowId : null,
							businessTypeId: search.businessTypeId != "undefined" ? parseInt(search.businessTypeId) : null,
							nickName: (search.nickName == 'undefined' ||search.nickName==undefined)? null : Base64.decode(search.nickName),
							mobile: search.mobile != "undefined" ? search.mobile : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							minAmount: search.minAmount != "undefined" ? parseInt(search.minAmount) : null,
							maxAmount: search.maxAmount != "undefined" ? parseInt(search.maxAmount) : null,
							pageSize: 25,
						}
					});
					dispatch({
						type: 'getBusinessType',
						payload: {

						}
					})
				}
				match = pathToRegexp('/user/reward').exec(location.pathname);

				if (match) {
					const search = GetRequest(location.search);

					dispatch({
						type: 'getAccount',
						payload: {
							currentPage: search.page,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							searchType: "bonus",
							pageSize: 25,
						}
					});
					dispatch({
						type: 'getSumBonus',
						payload: {
							mobile: search.mobile != "undefined" ? search.mobile : null,
						}
					});

				}
				match = pathToRegexp('/user/kgaward').exec(location.pathname);

				if (match) {
					const search = GetRequest(location.search);

					dispatch({
						type: 'getAccountTxb',
						payload: {
							currentPage: search.page,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							searchType: "bonus",
							pageSize: 25,
						}
					});
					dispatch({
						type: 'getSumBonus',
						payload: {
							mobile: search.mobile != "undefined" ? search.mobile : null,
						}
					});

				}
				match = pathToRegexp('/finance/recordTxb').exec(location.pathname);

				if (match) {
					const search = GetRequest(location.search);
					console.log(Base64.decode(search.nickName))
					dispatch({
						type: 'getAccountTxb',
						payload: {
							currentPage: search.page,
							flowId: search.flowId != "undefined" ? search.flowId : null,
							businessTypeId: search.businessTypeId != "undefined" ? parseInt(search.businessTypeId) : null,
							nickName: (search.nickName == 'undefined' ||search.nickName==undefined)? null : Base64.decode(search.nickName),
							mobile: search.mobile != "undefined" ? search.mobile : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							minAmount: search.minAmount != "undefined" ? parseInt(search.minAmount) : null,
							maxAmount: search.maxAmount != "undefined" ? parseInt(search.maxAmount) : null,
							pageSize: 25,
						}
					});
					dispatch({
						type: 'getBusinessType',
						payload: {

						}
					})
				}
				match = pathToRegexp('/finance/bond').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getAccountDiposit',
						payload: {
							currentPage: search.page,
							userId: search.userId != "undefined" ? search.userId : null,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							startDate: search.startDate != "undefined" ? search.startDate : null,
							endDate: search.endDate != "undefined" ? search.endDate : null,
							pageSize: 25,
						}
					});
				}

			})
		},
	},

	effects: {
		*getAccountRecharge({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getAccountRecharge, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				for (var i in res.data) {

					res.data[i].rechargeTime = formatDate(res.data[i].rechargeTime)
					res.data[i].accountTime = formatDate(res.data[i].accountTime)
				}
				yield put({
					type: 'getAccountRechargeSuccess',
					payload: {
						RechargeList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber,
						ActiveKey: "1"
					}
				});
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
		*getAccountWIthdraw({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getAccountWIthdraw, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {

					res.data[i].withdrawTime = formatDate(res.data[i].withdrawTime)
					if (res.data[i].accountTime != null) {
						res.data[i].accountTime = formatDate(res.data[i].accountTime)
					}

				}
				yield put({
					type: 'getAccountWIthdrawSuccess',
					payload: {
						WIthdrawList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber,
						ActiveKey: "1"
					}
				});
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
		*getAccount({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getAccount, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {

					res.data[i].flowDate = formatDate(res.data[i].flowDate)
				}
				yield put({
					type: 'getAccountSuccess',
					payload: {
						AccountList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber,
						total: res.totalPage,
						ActiveKey: "1"
					}
				});
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
		*getAccountTxb({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getAccountTxb, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {

					res.data[i].flowDate = formatDate(res.data[i].flowDate)
				}
				yield put({
					type: 'getAccountTxbSuccess',
					payload: {
						AccountList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber,
						ActiveKey: "2"
					}
				});
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
		*getSumBonus({ payload }, { call, put }) {
			const { data } = yield call(getSumBonus, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				
				yield put({
					type: 'getSumBonusSuccess',
					payload: {
						getSumBonus: res,
					}
				});
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
		*getAccountDiposit({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getAccountDiposit, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {

					res.data[i].accountTime = formatDate(res.data[i].accountTime)
				}
				yield put({
					type: 'getAccountDipositSuccess',
					payload: {
						AccountDiposit: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber,
					}
				});
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
		*auditAccountWithdraw({ payload }, { call, put }) {
			yield put({
				type: 'showSubmitLoading'
			})
			let params = {
				flowId: payload.flowId,
				status: payload.status,
				refuseReason: payload.refuseReason,
			};

			const { data } = yield call(auditAccountWithdraw, params);

			if (data && data.code == 10000) {
				message.success('审核成功')
				yield put({
					type: 'hideSubmitLoading'
				})
				yield put({
					type: 'hideModal',
				});
				const search = GetRequest(payload.search)
				yield put({
					type: 'getAccountWIthdraw',
					payload: {
						currentPage: search.page,
						email: search.email != "undefined" ? search.email : null,
						mobile: search.mobile != "undefined" ? search.mobile : null,
						status: search.status != "undefined" ? parseInt(search.status) : null,
						startDate: search.startDate != "undefined" ? search.startDate : null,
						endDate: search.endDate != "undefined" ? search.endDate : null,
						pageSize: 25,
					}
				});

				//history.back()
			} else {
				yield put({
					type: 'hideSubmitLoading'
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}

			}
		},
		*getBusinessType({ payload }, { call, put }) {

			const { data } = yield call(getBusinessType, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getBusinessTypeSuccess',
					payload: {
						BusinessType: res
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
	},
	reducers: {
		showLoading(state, action) {
			return { ...state, loading: true, ...action.payload };
		},
		hideLoading(state, action) {
			return { ...state, loading: false, ...action.payload };
		},
		getAccountRechargeSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		getAccountWIthdrawSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		getAccountSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		getAccountTxbSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		getAccountDipositSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		showModal(state, action) {
			return { ...state, ExamineVisible: true, ...action.payload };
		},
		hideModal(state, action) {
			return { ...state, ExamineVisible: false, ...action.payload };
		},
		getBusinessTypeSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		selectActiveKey(state, action) {
			return { ...state, ...action.payload };
		},
		getSumBonusSuccess(state, action) {
			return { ...state, ...action.payload };
		},
		showSubmitLoading(state, action) {
			return {
				...state, ...action.payload, confirmLoading: true
			};
		},
		hideSubmitLoading(state, action) {
			return {
				...state, ...action.payload, confirmLoading: false
			};
		},
	},

}