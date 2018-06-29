import pathToRegexp from 'path-to-regexp';
import { routerRedux, hashHistory } from 'dva/router';
import {
	login, getUserList, getUserInfo, auditUser, setHotUser, lockUser, siteinfoservice, getRoleList, roleSetStatus, getRoleProfile, loginSet,
	userInfoSet, getSysMenu, getUserCert, auditUserCert, getSiteInfo, logOut, getInviteBonus, freezeUser, getInviteUserList, checkUser, getParentUserInfo,
	getSubUserList, unBindUser, realnameBonus, userColumnBonus, getColumnIdentity,certificationColumn,cancelCertification
} from '../services/user';
import { formatDate, GetRequest } from '../services/common'
import {
	message
} from 'antd';

export default {

	namespace: 'user',

	state: {
		logged: false,
		loginStatus: 1, //1为登录框；2为忘记密码，3为修改密码
		userlist: [],//用户列表
		userInfo: {},//用户信息
		selectList: [],
		loading: false,
		userRoleList: [], //用户角色列表
		RoleProfile: [], //角色资料
		currentItem: {},
		totalNumber: 0,
		currentPage: 1,
		UserCertList: [],
		SiteInfo: {},
		InviteBonusList: [], //邀新奖励
		InviteUserList: [], //邀新记录
		ParentUserInfo: {},  //师傅
		SubUserList: [],     //徒弟列表
		total: 0,     //总数
		RealnameAwardList: [],  //实名认证奖励
		ColumnBonusList: [],  //专栏作者奖励
		confirmLoading: false,
		ColumnIdentity: [], //专栏身份
		currentItem:{},  //当前选中的
		currentValue:'1',  
	},
	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/user/user_admin').exec(location.pathname);
				let userId = localStorage.getItem("userId");
				if (match) {
					const search = GetRequest(location.search);
					console.log(search.platform)
					console.log(search.lockStatus)
					dispatch({
						type: 'getUserList',
						payload: {
							currentPage: parseInt(search.page),
							userId: search.userId != "undefined" ? search.userId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							userName: (search.userName == 'undefined' ||search.userName==undefined)? null : Base64.decode(search.userName),
							userMobile: search.userMobile != "undefined" ? search.userMobile : null,
							userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
							auditStatus: search.auditStatus != "undefined" ? parseInt(search.auditStatus) : null,
							lockStatus: search.lockStatus != "undefined" ? parseInt(search.lockStatus) : null,
							createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
							createDateEnd: search.createDateStart != "undefined" ? search.createDateEnd : null,
							platform: search.platform != "undefined" ? search.platform : null,
							pageSize: 25,

						}
					});
					dispatch({
						type: "getColumnIdentity"
					})
				}
				match = pathToRegexp('/user/realName').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getUserCert',
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
				match = pathToRegexp('/user/user_data').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getUserInfo',
						payload: {
							userId: search.userId,
						}
					});
					dispatch({
						type: "getColumnIdentity"
					})
				}
				match = pathToRegexp('/user/user_role').exec(location.pathname);
				if (match) {
					const query = location.query
					dispatch({
						type: 'getRoleList',
						payload: {

						}
					});
				}
				match = pathToRegexp('/user/user_info').exec(location.pathname);
				if (match) {

					dispatch({
						type: 'getSiteInfo',
						payload: {

						}
					});
				}
				match = pathToRegexp('/index').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					///console.log(location.search)
					dispatch({
						type: 'getUserList',
						payload: {
							auditStatus: 0,
							currentPage:1,
							pageSize:999
						}
					});
				}
				match = pathToRegexp('/user/platformReward').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					///console.log(location.search)
					dispatch({
						type: 'getInviteBonus',
						payload: {
							currentPage: search.page,
							pageSize: 25,
							userId: search.userId != "undefined" ? search.userId : null,
							userName: (search.userName == "undefined" || search.userName == undefined) ? null : Base64.decode(search.userName),
							mobile: search.mobile != "undefined" ? search.mobile : null,
							userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
							bonusStatus: search.bonusStatus != "undefined" ? parseInt(search.bonusStatus) : null,
							inviteStatus: search.inviteStatus != "undefined" ? parseInt(search.inviteStatus) : null,
							minValue: search.minValue != "undefined" ? parseFloat(search.minValue) : null,
							maxValue: search.maxValue != "undefined" ? parseFloat(search.maxValue) : null,
						}
					});
				}
				match = pathToRegexp('/user/invite').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					///console.log(location.search)
					dispatch({
						type: "getUserInfo",
						payload: {
							userId: search.inviteUserId != "undefined" ? search.inviteUserId : null,
						}
					})
					dispatch({
						type: 'getInviteUserList',
						payload: {
							currentPage: search.page,
							pageSize: 25,
							inviteUserId: search.inviteUserId != "undefined" ? search.inviteUserId : null,
							userId: search.userId != "undefined" ? search.userId : null,
							userName: (search.userName == "undefined" || search.userName == undefined) ? null : Base64.decode(search.userName),
							userMobile: search.userMobile != "undefined" ? search.userMobile : null,
							userRole: search.userRole != "undefined" ? search.userRole : null,
							createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
							createDateEnd: search.createDateEnd != "undefined" ? search.createDateEnd : null,
							auditStatus: search.auditStatus != "undefined" ? search.auditStatus : null,
							lockStatus: search.lockStatus != "undefined" ? search.lockStatus : null,
						}
					});
				}
				match = pathToRegexp('/user/master').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);

					dispatch({
						type: "getSubUserList",
						payload: {
							currentPage: search.page,
							pageSize: 25,
							inviteUserId: search.inviteUserId != "undefined" ? search.inviteUserId : null,
							userId: search.userId != "undefined" ? search.userId : null,
							userName: search.userName != "undefined" ? search.userName : null,
							userMobile: search.userMobile != "undefined" ? search.userMobile : null,
							userRole: search.userRole != "undefined" ? search.userRole : null,
							createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
							createDateEnd: search.createDateEnd != "undefined" ? search.createDateEnd : null,
							auditStatus: search.auditStatus != "undefined" ? search.auditStatus : null,
							lockStatus: search.lockStatus != "undefined" ? search.lockStatus : null,
						}
					})
					dispatch({
						type: 'getParentUserInfo',
						payload: {
							userId: search.inviteUserId != "undefined" ? search.inviteUserId : null,
						}
					});
				}
				match = pathToRegexp('/user/realnameAward').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					///console.log(location.search)
					dispatch({
						type: 'realnameBonus',
						payload: {
							currentPage: search.page,
							pageSize: 25,
							userId: search.userId != "undefined" ? search.userId : null,
							userName: search.userName != "undefined" ? search.userName : null,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
						}
					});
				}
				//专栏奖励
				match = pathToRegexp('/user/columnAward').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					///console.log(location.search)
					dispatch({
						type: 'userColumnBonus',
						payload: {
							currentPage: search.page,
							pageSize: 25,
							userId: search.userId != "undefined" ? search.userId : null,
							userName: search.userName != "undefined" ? search.userName : null,
							mobile: search.mobile != "undefined" ? search.mobile : null,
							userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
						}
					});
				}
			})
		},
	},

	effects: {
		* login({
			payload
		}, {
			call,
			put
		}) {
			// yield put({ type: 'showLogging'});

			const {
				username,
				password,
				dispatch
			} = payload;
			//router.push('/index');
			let params = {
				username: payload.username,
				password: payload.password
			}
			const {
				data
			} = yield call(login, params);

			if (data && data.code == 10000) {
				localStorage.setItem("nav", JSON.stringify(data.responseBody.menuList));
				localStorage.setItem("Kgtoken", data.responseBody.token.token);
				localStorage.setItem("userId", data.responseBody.token.userId);
				localStorage.setItem("realname", data.responseBody.realname);

				//localStorage.setItem("userId", data.responseBody.userId);

				/*yield put({
					  type:"getSysMenu",
					  payload:{
						userId:parseInt(data.responseBody.userId),
					  }
				  })*/

				dispatch(routerRedux.push('/index?userId=' + data.responseBody.token.userId));
				window.location.reload();


			} else {
				message.error(data.message);
			}
		},
		*getUserList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getUserList, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getUserListSuccess',
					payload: {
						userlist: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage
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
		*getUserInfo({ payload }, { call, put }) {
			yield put({
			  type: 'showLoading',
			});

			const { data } = yield call(getUserInfo, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type:'hideLoading'
				})
				//console.log(res)
				yield put({
					type: 'getUserInfoSuccess',
					payload: {
						userInfo: res,

					}
				});
			} else {
				yield put({
					type:'hideLoading'
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*auditUser({ payload }, { call, put }) {
			const { userId, auditStatus, auditUserId, audit, refuseReason, user_data } = payload;
			let params = {}
			if (auditStatus == 1) {
				params = {
					userId: userId,
					auditStatus: auditStatus,
					auditUserId: auditUserId
				}

			} else {
				params = {
					userId: userId,
					auditStatus: auditStatus,
					auditUserId: auditUserId,
					refuseReason: refuseReason
				}

			}
			yield put({
				type: "showSubmitLoading",
			})
			const { data } = yield call(auditUser, params);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				message.success('审核成功')
				yield put({
					type: "hideSubmitLoading",
				})
				yield put({
					type: 'hideExmianModal',
					payload: {

					}
				});
				
				if (user_data != undefined) {
					setTimeout(()=>{
						history.back(); //返回上一级
					},100)
				} else {
					const search = GetRequest(payload.search);
					yield put({
						type: 'getUserList',
						payload: {
							currentPage: parseInt(search.page),
							userId: search.userId != "undefined" ? search.userId : null,
							orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
							userName: (search.userName == 'undefined' ||search.userName==undefined)? null : Base64.decode(search.userName),
							userMobile: search.userMobile != "undefined" ? search.userMobile : null,
							userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
							auditStatus: search.auditStatus != "undefined" ? parseInt(search.auditStatus) : null,
							lockStatus: search.lockStatus != "undefined" ? parseInt(search.lockStatus) : null,
							createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
							createDateEnd: search.createDateStart != "undefined" ? search.createDateEnd : null,
							platform: search.platform != "undefined" ? search.platform : null,
							pageSize: 25,
						}
					});
				}
			} else {
				yield put({
					type: "hideSubmitLoading",
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*setHotUser({ payload }, { call, put }) {
			/* yield put({
			  type: 'showLoading',
			});*/
			let params = {
				userId: payload.userId,
				hotUser: payload.hotUser
			}
			const { data } = yield call(setHotUser, params);
			// console.log("11",data)
			if (data && data.code == 10000) {
				message.success('设置成功')
				//console.log(res)
				const search = GetRequest(payload.search)
				yield put({
					type: 'getUserList',
					payload: {
						currentPage: parseInt(search.page),
						userId: search.userId != "undefined" ? search.userId : null,
						orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
						userName: (search.userName == 'undefined' ||search.userName==undefined)? null : Base64.decode(search.userName),
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
						auditStatus: search.auditStatus != "undefined" ? parseInt(search.auditStatus) : null,
						lockStatus: search.lockStatus != "undefined" ? parseInt(search.lockStatus) : null,
						createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
						createDateEnd: search.createDateStart != "undefined" ? search.createDateEnd : null,
						platform: search.platform != "undefined" ? search.platform : null,
						pageSize: 25,
					}
				});
				yield put({
					type: 'hideHotModal',
					payload: {
						selectList: []
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
					type: 'hideHotModal',
					payload: {

					}
				});
			}
		},
		*lockUser({ payload }, { call, put }) {

			let params = {
				userId: payload.userId,
				lockUserId: payload.lockUserId,
				lockUnit: payload.lockUnit,
				lockTime: payload.lockTime
			}
			const { data } = yield call(lockUser, params);
			// console.log("11",data)
			if (data && data.code == 10000) {
				message.success('设置成功')
				//console.log(res)
				const search = GetRequest(payload.search)
				yield put({
					type: 'getUserList',
					payload: {
						currentPage: parseInt(search.page),
						userId: search.userId != "undefined" ? search.userId : null,
						orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
						userName: (search.userName == 'undefined' ||search.userName==undefined)? null : Base64.decode(search.userName),
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
						auditStatus: search.auditStatus != "undefined" ? parseInt(search.auditStatus) : null,
						lockStatus: search.lockStatus != "undefined" ? parseInt(search.lockStatus) : null,
						createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
						createDateEnd: search.createDateStart != "undefined" ? search.createDateEnd : null,
						platform: search.platform != "undefined" ? search.platform : null,
						pageSize: 25,
					}
				});
				yield put({
					type: 'hideLockModal',
					payload: {

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
		*siteinfoservice({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(siteinfoservice, payload);
			// console.log("11",data)
			if (data && data.code == 10000) {
				message.success('设置成功')

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getRoleList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getRoleList, payload);
			// console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getRoleListSuccess',
					payload: {
						userRoleList: res,

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
		*roleSetStatus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(roleSetStatus, payload);
			// console.log("11",data)
			if (data && data.code == 10000) {
				message.success("设置成功")
				yield put({
					type: 'getRoleList',
					payload: {

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
		*getRoleProfile({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getRoleProfile, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getRoleProfileSuccess',
					payload: {
						RoleProfile: res
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
		*loginSet({ payload }, { call, put }) {

			const { data } = yield call(loginSet, payload);

			if (data && data.code == 10000) {
				message.success('设置成功')
				/*var res = data.responseBody;
				yield put({
					type: 'getRoleProfileSuccess',
					payload:{
					  RoleProfile:res
					}
				}); */
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*userInfoSet({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(userInfoSet, payload);

			if (data && data.code == 10000) {
				message.success('设置成功')
				//var res = data.responseBody;
				yield put({
					type: 'getSiteInfo',
					payload: {

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
		*getSysMenu({ payload }, { call, put }) {
			const { data } = yield call(getSysMenu, payload);

			if (data && data.code == 10000) {
				localStorage.setItem("nav", JSON.stringify(data.responseBody));
				// window.location.reload()

			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getUserCert({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getUserCert, payload);

			if (data && data.code == 10000) {
				//console.log("菜单",data)

				var res = data.responseBody;
				var address = "address";
				var info = "info";
				var IdCard = "IdCard";
				for (var i in res.data) {
					res.data[i].createDate = formatDate(res.data[i].createDate)
					if(res.data[i].auditDate!=null){
						res.data[i].auditDate = formatDate(res.data[i].auditDate)
					}else{
						res.data[i].auditDate = "——"
					}
					res.data[i][address] = res.data[i].province == null ? "——" : res.data[i].province + (res.data[i].city = null ? "" : ('-' + res.data[i].city))
					res.data[i][info] = {
						'realname': res.data[i].realname,
						'idcardNo': res.data[i].idcardNo,
					}

				}

				yield put({
					type: 'getUserCertSuccess',
					payload: {
						UserCertList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage,
						currentValue:'1'
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
		*auditUserCert({ payload }, { call, put }) {
			/* yield put({
			  type: 'showLoading',
			 });*/
			let params = {};

			if (payload.status == 1) {
				params = {
					userId: payload.userId,
					status: payload.status,
					auditUser: payload.auditUser,
					idcardNo:payload.idcardNo,
					auditUserName: payload.auditUserName,

				}
			} else {
				params = {
					userId: payload.userId,
					status: payload.status,
					idcardNo:payload.idcardNo,
					auditUser: payload.auditUser,
					refuseReason: payload.refuseReason,
					auditUserName: payload.auditUserName,
				}
			}
			yield put({
				type:"showSubmitLoading"
			})
			const { data } = yield call(auditUserCert, params);

			if (data && data.code == 10000) {
				//var res = data.responseBody;
				message.success('设置成功');
				yield put({
					type:"hideSubmitLoading"
				})
				const search = GetRequest(payload.search)
				yield put({
					type: 'getUserCert',
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
				yield put({
					type: 'hideRealNameModal',
					payload: {

					}
				});
				yield put({
					type: 'hideRealsModal',
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
		*getSiteInfo({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getSiteInfo, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: "getSiteInfoSuccess",
					payload: {
						SiteInfo: res
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
		*logOut({ payload }, { call, put }) {
			const { data } = yield call(logOut, payload);

			if (data && data.code == 10000) {
				message.success('退出成功')
				localStorage.clear()
				yield put(routerRedux.push('/'))
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}

			}
		},
		*getInviteBonus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getInviteBonus, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getInviteBonusSuccess',
					payload: {
						InviteBonusList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage
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
		*freezeUser({ payload }, { call, put }) {
			let params = {}
			if (payload.bonusFreezeReason == undefined) {
				params = {
					auditUserId: payload.auditUserId,
					userId: payload.userId,
					bonusStatus: payload.bonusStatus
				}
			} else {
				params = {
					auditUserId: payload.auditUserId,
					userId: payload.userId,
					bonusStatus: payload.bonusStatus,
					bonusFreezeReason: payload.bonusFreezeReason
				}
			}

			yield put({
				type: "showSubmitLoading",
			})
			const { data } = yield call(freezeUser, params);

			if (data && data.code == 10000) {
				if (payload.bonusStatus == 0) {
					message.success("冻结成功");
				} else {
					message.success("解冻成功");
				}
				yield put({
					type: "hideSubmitLoading",
				})
				yield put({
					type: "hideFrozenModal",
					payload: {
						currentItem: {}
					}
				})
				const search = GetRequest(payload.search)
				yield put({
					type: "getInviteBonus",
					payload: {
						currentPage: search.page,
						pageSize: 25,
						userId: search.userId != "undefined" ? search.userId : null,
						userName: (search.userName == "undefined" || search.userName == undefined) ? null : Base64.decode(search.userName),
						mobile: search.mobile != "undefined" ? search.mobile : null,
						userRole: search.userRole != "undefined" ? search.userRole : null,
						bonusStatus: search.bonusStatus != "undefined" ? parseInt(search.bonusStatus) : null,
						inviteStatus: search.inviteStatus != "undefined" ? search.inviteStatus : null,
						minValue: search.minValue != "undefined" ? search.minValue : null,
						maxValue: search.maxValue != "undefined" ? search.maxValue : null,
					}
				})
			} else {
				yield put({
					type: "hideSubmitLoading",
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}

			}
		},
		*freezeUserData({ payload }, { call, put }) {
			let params = {}
			if (payload.bonusFreezeReason == undefined) {
				params = {
					auditUserId: payload.auditUserId,
					userId: payload.userId,
					bonusStatus: payload.bonusStatus
				}
			} else {
				params = {
					auditUserId: payload.auditUserId,
					userId: payload.userId,
					bonusStatus: payload.bonusStatus,
					bonusFreezeReason: payload.bonusFreezeReason
				}
			}
			yield put({
				type: "showSubmitLoading",
			})
			const { data } = yield call(freezeUser, params);

			if (data && data.code == 10000) {
				if (payload.bonusStatus == 0) {
					message.success("冻结成功");
				} else {
					message.success("解冻成功");
				}
				yield put({
					type: "hideSubmitLoading",
				})
				yield put({
					type: "hideFrozenModal",
					payload:{
						currentItem:{}
					}
				})
				// const search =GetRequest(payload.search)
				yield put({
					type: "getUserInfo",
					payload: {
						userId: payload.userId,
					}
				})
			} else {
				yield put({
					type: "hideSubmitLoading",
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}

			}
		},
		*getInviteUserList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getInviteUserList, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getInviteUserListSuccess',
					payload: {
						InviteUserList: res.data,
						loading: false,
						total: res.totalNumber,
						currentPage: res.currentPage
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
		*checkUser({ payload }, { call, put }) {
			const { data } = yield call(checkUser, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				message.success('审查成功')
				yield put({
					type: 'getUserInfo',
					payload: {
						userId: payload.userId
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
		*getParentUserInfo({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getParentUserInfo, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getParentUserInfoSuccess',
					payload: {
						ParentUserInfo: res,
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
				yield put({
					type: 'hideLoading',
				});
			}
		},
		*getSubUserList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getSubUserList, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getSubUserListSuccess',
					payload: {
						SubUserList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage
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
		*unBindUser({ payload }, { call, put }) {
			const { data } = yield call(unBindUser, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				message.success('解除成功')
				yield put({
					type: "getParentUserInfo",
					payload: {
						userId: payload.userId
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
		*realnameBonus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(realnameBonus, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'RealnameAwardListSuccess',
					payload: {
						RealnameAwardList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage
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
		*userColumnBonus({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(userColumnBonus, payload);
			//console.log("11",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'ColumnBonusListSuccess',
					payload: {
						ColumnBonusList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage
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
		*getColumnIdentity({ payload }, { call, put }) {

			const { data } = yield call(getColumnIdentity, payload);
	
			if (data && data.code == 10000) {
				var res = data.responseBody;
				//console.log(res)
				yield put({
					type: 'getColumnIdentitySuccess',
					payload: {
						ColumnIdentity: res,
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
		*certificaion({ payload }, { call, put }) {
			yield put({
				type:"showSubmitLoading"
			})
			
			const { data } = yield call(certificationColumn, payload);
	
			if (data && data.code == 10000) {
				message.success('专栏认证成功')
				yield put({
					type:"hideSubmitLoading"
				})
				yield put({
					type:'hideColumnModal',
					payload:{
						currentItem:{}
					}
				})
				yield put({
					type:"getUserInfo",
					payload:{
						userId:payload.userId
					}
				})
			} else {
				yield put({
					type:"hideSubmitLoading"
				})
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
		*certificationColumn({ payload }, { call, put }) {
			yield put({
				type:"showSubmitLoading"
			})
			let params ={
				userId:payload.userId,
				columnIdentity:payload.columnIdentity
			}
			const { data } = yield call(certificationColumn, params);
	
			if (data && data.code == 10000) {
				message.success('专栏认证成功')
				yield put({
					type:"hideSubmitLoading"
				})
				yield put({
					type:'hideColumnModal',
					payload:{
						currentItem:{}
					}
				})
				const search = GetRequest(payload.search);

				yield put({
					type: 'getUserList',
					payload: {
						currentPage: parseInt(search.page),
						userId: search.userId != "undefined" ? search.userId : null,
						orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
						userName: (search.userName == 'undefined' ||search.userName==undefined)? null : Base64.decode(search.userName),
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
						auditStatus: search.auditStatus != "undefined" ? parseInt(search.auditStatus) : null,
						lockStatus: search.lockStatus != "undefined" ? parseInt(search.lockStatus) : null,
						createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
						createDateEnd: search.createDateStart != "undefined" ? search.createDateEnd : null,
						platform: search.platform != "undefined" ? search.platform : null,
						pageSize: 25,
					}
				});
			} else {
				yield put({
					type:"hideSubmitLoading"
				})
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
		*cancelCertification({ payload }, { call, put }) {
			yield put({
				type:"showSubmitLoading"
			})
			let params ={
				userId:payload.userId,
			}
			const { data } = yield call(cancelCertification, params);
	
			if (data && data.code == 10000) {
				message.success('取消专栏认证成功')
				yield put({
					type:"hideSubmitLoading"
				})
				yield put({
					type:'hideColumnModal',
					payload:{
						currentItem:{}
					}
				})
				const search = GetRequest(payload.search);

				yield put({
					type: 'getUserList',
					payload: {
						currentPage: parseInt(search.page),
						userId: search.userId != "undefined" ? search.userId : null,
						orderByClause: search.orderByClause != "undefined" ? search.orderByClause : null,
						userName: (search.userName == 'undefined' ||search.userName==undefined)? null : Base64.decode(search.userName),
						userMobile: search.userMobile != "undefined" ? search.userMobile : null,
						userRole: search.userRole != "undefined" ? parseInt(search.userRole) : null,
						auditStatus: search.auditStatus != "undefined" ? parseInt(search.auditStatus) : null,
						lockStatus: search.lockStatus != "undefined" ? parseInt(search.lockStatus) : null,
						createDateStart: search.createDateStart != "undefined" ? search.createDateStart : null,
						createDateEnd: search.createDateStart != "undefined" ? search.createDateEnd : null,
						platform: search.platform != "undefined" ? search.platform : null,
						pageSize: 25,
					}
				});
			} else {
				yield put({
					type:"hideSubmitLoading"
				})
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
		*cancelCertiy({ payload }, { call, put }) {
			yield put({
				type:"showSubmitLoading"
			})
			let params ={
				userId:payload.userId,
			}
			const { data } = yield call(cancelCertification, params);
	
			if (data && data.code == 10000) {
				message.success('取消专栏认证成功')
				yield put({
					type:"hideSubmitLoading"
				})
				yield put({
					type:"getUserInfo",
					payload:{
						userId:payload.userId
					}
				})
			} else {
				yield put({
					type:"hideSubmitLoading"
				})
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
		*currentValeChange({ payload }, { call, put }) {
			yield put({
				type:"currentValeChangeSuccess",
				payload:{
					currentValue:payload.currentValue
				}
			})
			
		},
	},
	reducers: {
		// showLogging(state) {
		//   return { ...state, logged: false };
		// },    
		loginSuccess(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload,
				logged: true
			};
		},
		showLoading(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload,
				loading: true
			};
		},
		hideLoading(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload,
				loading: false
			};
		},
		getUserListSuccess(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload
			};
		},
		RealnameAwardListSuccess(state, action) {
			return {
				...state, ...action.payload
			};
		},
		ColumnBonusListSuccess(state, action) {
			return {
				...state, ...action.payload
			};
		},
		getInviteBonusSuccess(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload
			};
		},
		getSubUserListSuccess(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload
			};
		},
		getParentUserInfoSuccess(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload
			};
		},
		getInviteUserListSuccess(state, action) {
			// const newUser = action.payload;      
			return {
				...state,
				...action.payload
			};
		},
		getUserInfoSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		showUserModal(state, action) {
			return {
				...state,
				...action.payload,
				UserVisible: true
			};
		},
		hideUserModal(state, action) {
			return {
				...state,
				UserVisible: false
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
				AuditVisible: false
			};
		},
		showHotModal(state, action) {
			return {
				...state,
				HotVisible: true,
				...action.payload
			};
		},
		hideHotModal(state, action) {
			return {
				...state,
				HotVisible: false,
				...action.payload
			};
		},
		showExmianModal(state, action) {
			return {
				...state,
				ExmianVisible: true,
				...action.payload
			};
		},
		hideExmianModal(state, action) {
			return {
				...state,
				ExmianVisible: false
			};
		},
		showRealNameModal(state, action) {
			return {
				...state,
				RealNameVisible: true,
				...action.payload
			};
		},
		hideRealNameModal(state, action) {
			return {
				...state,
				RealNameVisible: false,
				...action.payload
			};
		},
		showRealsModal(state, action) {
			return {
				...state,
				RealsVisible: true,
				...action.payload
			};
		},
		hideRealsModal(state, action) {
			return {
				...state,
				RealsVisible: false,
				...action.payload
			};
		},
		showLockModal(state, action) {
			return {
				...state,
				LockVisible: true,
				...action.payload
			};
		},
		hideLockModal(state, action) {
			return {
				...state,
				LockVisible: false,
				...action.payload
			};
		},
		getRoleListSuccess(state, action) {
			return {
				...state,
				LockVisible: false,
				...action.payload
			};
		},
		getRoleProfileSuccess(state, action) {
			return {
				...state,
				LockVisible: false,
				...action.payload
			};
		},
		getUserCertSuccess(state, action) {
			return {
				...state,
				LockVisible: false,
				...action.payload
			};
		},
		getSiteInfoSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		showFrozenModal(state, action) {
			return {
				...state,
				FrozenVisible: true,
				...action.payload
			};
		},
		hideFrozenModal(state, action) {
			return {
				...state,
				FrozenVisible: false,
				...action.payload
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
		showColumnModal(state, action) {
			return {
				...state,
				...action.payload,
				columnVisible: true
			};
		},
		hideColumnModal(state, action) {
			return {
				...state,
				...action.payload,
				columnVisible: false
			};
		},
		getColumnIdentitySuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		currentValeChangeSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
	},

}