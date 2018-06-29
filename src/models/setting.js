import pathToRegexp from 'path-to-regexp';
import {
	getBaseinfoList, deleteBaseinfo, getSysUserList, sysuserSetStatus, resetPassword, getPostList,
	getPost, getAuthTree, postSetStatus, addSysUser, setKgUser, addBaseinfo, addPost, setInfoStatus,
	getUserId, getRelUser, unsetKgUser,getRevenueSet,revenueSet

} from '../services/setting';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'setting',

	state: {
		BaseInfoList: [],
		SysUserList: [],
		PostList: [],
		getPost: [],
		TreeList: [],
		type: 'create',
		currentItem: {},
		arr: [],
		item: {},
		loading: false,
		deskUserId: '',
		currentPage: 0,
		totalNumber: 0,
		getRelUserList: [],//关联账户列表
		confirmLoading: false,
		setShow:0,  //是否展示排行
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/setting/about').exec(location.pathname);

				if (match) {
					dispatch({
						type: 'getBaseinfoList',
						payload: {

						}
					});
				}
				match = pathToRegexp('/setting/account').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getSysUserList',
						payload: {
							currentPage: search.page,
							pageSize: 25,
							username: (search.username == 'undefined' ||search.username==undefined)? null : Base64.decode(search.username),
							mobile: search.mobile != "undefined" ? search.mobile : null,
							postId: search.postId != "undefined" ? search.postId : null,
						}
					})
					dispatch({
						type: 'getPostList',
						payload: {

						}
					})
					dispatch({
						type: 'getPost',
						payload: {

						}
					})
					dispatch({
						type: 'getAuthTree',
						payload: {

						}
					})
				}
				match = pathToRegexp('/setting/addinfo').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getBaseinfoList',
						payload: {
							id: search.id
						}
					})
				}
				match = pathToRegexp('/setting/system').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getRevenueSet',
						payload: {
						
						}
					})
				}
			})
		},
	},

	effects: {
		*getBaseinfoList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getBaseinfoList, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getBaseinfoListSuccess',
					payload: {
						BaseInfoList: res,
						loading: false
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
		*deleteBaseinfo({ payload }, { call, put }) {

			const { data } = yield call(deleteBaseinfo, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getBaseinfoList',
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
		*getSysUserList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getSysUserList, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody.data;
				for (var i in res) {
					res[i].createDate = formatDate(res[i].createDate)
				}
				yield put({
					type: 'getSysUserListSuccess',
					payload: {
						SysUserList: res,
						loading: false,
						currentPage: data.responseBody.currentPage,
						totalNumber: data.responseBody.totalNumber,
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
		*sysuserSetStatus({ payload }, { call, put }) {
			let params ={
				userId:payload.userId,
				status:payload.status
			}
			const { data } = yield call(sysuserSetStatus, params);

			if (data && data.code == 10000) {
				message.success('设置成功')
				const search =GetRequest(payload.search);
				// console.log(search)
				yield put({
					type: 'getSysUserList',
					payload: {
						currentPage: search.page,
						pageSize: 25,
						username: (search.username == 'undefined' ||search.username==undefined)? null : Base64.decode(search.username),
						mobile: search.mobile != "undefined" ? search.mobile : null,
						postId: search.postId != "undefined" ? search.postId : null,
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
		*resetPassword({ payload }, { call, put }) {

			const { data } = yield call(resetPassword, payload);

			if (data && data.code == 10000) {
				message.success('重置成功')
				
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getPostList({ payload }, { call, put }) {


			const { data } = yield call(getPostList, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getPostListSuccess',
					payload: {
						PostList: res
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
		*getPost({ payload }, { call, put }) {

			const { data } = yield call(getPost, payload);

			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getPostSuccess',
					payload: {
						getPost: res
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
		*getAuthTree({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});

			const { data } = yield call(getAuthTree, payload);
			//console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;

				yield put({
					type: 'getAuthTreeSuccess',
					payload: {
						TreeList: res
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
		*postSetStatus({ payload }, { call, put }) {

			const { data } = yield call(postSetStatus, payload);

			if (data && data.code == 10000) {
				message.success('设置成功')
				//var res = data.responseBody;
				yield put({
					type: 'getPost',
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
		*addSysUser({ payload }, { call, put }) {
			//打开loading
			yield put({
				type: 'showConfirmLoading'
			})
			let params={}
			if(payload.userId != undefined){
				params ={
					userId:payload.userId,
					username:payload.username,
					mobile:payload.mobile,
					realname:payload.realname,
					password:payload.password,
					postId:payload.postId,
				}
			}else{
				params ={
					username:payload.username,
					mobile:payload.mobile,
					realname:payload.realname,
					password:payload.password,
					postId:payload.postId,
				}
			}
			
			const { data } = yield call(addSysUser, params);
			if (data && data.code == 10000) {
				//关闭loading;
				yield put({
					type: 'hideConfirmLoading'
				})

				if (payload.userId != undefined) {
					message.success('编辑成功')

				} else {
					message.success('添加成功')
				}

				const search =GetRequest(payload.search);
				// console.log(search)
				yield put({
					type: 'getSysUserList',
					payload: {
						currentPage: search.page,
						pageSize: 25,
						username: (search.username == 'undefined' ||search.username==undefined)? null : Base64.decode(search.username),
						mobile: search.mobile != "undefined" ? search.mobile : null,
						postId: search.postId != "undefined" ? search.postId : null,
					}
				})
				yield put({
					type: 'hideListModal',
					payload: {

					}
				})
				yield put({
					type: 'hideEditorListModal',
					payload: {

					}
				})
				yield put({
					type: 'getPost',
					payload: {

					}
				})

			} else {
				yield put({
					type: 'hideConfirmLoading'
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*setKgUser({ payload }, { call, put }) {
			let merId =localStorage.getItem('userId')
			let params = {
				userId:payload.userId,
				kgUserId:payload.kgUserId
			}
			const { data } = yield call(setKgUser, params);
			// console.log(data)
			if (data && data.code == 10000) {
				message.success('关联成功')
				yield put({
					type: 'hideRelationModal',
					payload: {

					}
				})
				const search =GetRequest(payload.search);
				//console.log(search)
				yield put({
					type: 'getSysUserList',
					payload: {
						currentPage: search.page,
						pageSize: 25,
						username: (search.username == 'undefined' ||search.username==undefined)? null : Base64.decode(search.username),
						mobile: search.mobile != "undefined" ? search.mobile : null,
						postId: search.postId != "undefined" ? search.postId : null,
					}
				})
				yield put({
					type: 'content/getSysUserById',
					payload: {
						userId: merId
					}
				})
				//window.location.reload();
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*addBaseinfo({ payload }, { call, put }) {

			const { router, infoDetail, infoOrder, infoType, createUser, infoName, infoStatus, status, infoId } = payload;
			let params = {}
			if (infoId == undefined) {
				params = {
					infoDetail: infoDetail,
					infoOrder: infoOrder,
					infoType: infoType,
					createUser: createUser,
					infoName: infoName,
					infoStatus: infoStatus
				}
			} else {
				params = {
					infoId: infoId,
					infoDetail: infoDetail,
					infoOrder: infoOrder,
					infoType: infoType,
					createUser: createUser,
					infoName: infoName,
					infoStatus: infoStatus
				}
			}
			const { data } = yield call(addBaseinfo, params);

			if (data && data.code == 10000) {
				if (status == "editor") {
					message.success('编辑成功')
				} else {
					message.success('添加成功')
				}
				yield put(routerRedux.push('/setting/about'))
				//router.push('/setting/about') 
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*addPost({ payload }, { call, put }) {


			const { data } = yield call(addPost, payload);

			if (data && data.code == 10000) {
				if (payload.postId != undefined) {
					message.success('编辑成功')
				} else {
					message.success('添加成功')
				}
				yield put({
					type: 'getSysUserList',
					payload: {

					}
				})
				yield put({
					type: 'getPost',
					payload: {

					}
				})

				yield put({
					type: 'hidePostModal'
				})
				yield put({
					type: 'hideEditorPostModal'
				})
				window.location.reload()
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*setInfoStatus({ payload }, { call, put }) {
			const { data } = yield call(setInfoStatus, payload);
			if (data && data.code == 10000) {
				message.success('设置成功')
				yield put({
					type: 'hidePostModal'
				})
				yield put({
					type: 'getBaseinfoList'
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
		*getUserId({ payload }, { call, put }) {
			const { data } = yield call(getUserId, payload);
			//console.log("data",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getUserIdSuccess',
					payload: {
						deskUserId: res,
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
		*getRelUser({ payload }, { call, put }) {
			const { data } = yield call(getRelUser, payload);
			//console.log("data",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: 'getRelUserSuccess',
					payload: {
						getRelUserList: res
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
		*unsetKgUser({ payload }, { call, put }) {
			let params = {
				relId: payload.relId
			}
			const { data } = yield call(unsetKgUser, params);
			//console.log("data",data)
			if (data && data.code == 10000) {
				message.success('解绑成功')
				yield put({
					type: "getRelUser",
					payload: {
						sysUserId: payload.sysUserId
					}
				})
				const search =GetRequest(payload.search);
				//console.log(search)
				yield put({
					type: 'getSysUserList',
					payload: {
						currentPage: search.page,
						pageSize: 25,
						username: (search.username == 'undefined' ||search.username==undefined)? null : Base64.decode(search.username),
						mobile: search.mobile != "undefined" ? search.mobile : null,
						postId: search.postId != "undefined" ? search.postId : null,
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
		*getRevenueSet({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getRevenueSet, payload);
			console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				
				yield put({
					type: 'getRevenueSetSuccess',
					payload: {
						loading:false,
						setShow:res
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
		*revenueSet({ payload }, { call, put }) {
			yield put({
				type: 'showConfirmLoading',
			});
			const { data } = yield call(revenueSet, payload);
			console.log(data)
			if (data && data.code == 10000) {
				message.success('设置成功')
				yield put({
					type: 'hideConfirmLoading',
				});
				yield put({
					type:'getRevenueSet',
					payload:{
						
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
					type: 'hideConfirmLoading',
				});
			}
		},

	},
	reducers: {
		showLoading(state, action) {

			return {
				...state,
				loading: true,
			};
		},
		hideLoading(state, action) {

			return {
				...state,
				loading: false,
			};
		},
		showListModal(state, action) {

			return {
				...state,
				...action.payload,
				listVisible: true,

			};
		},
		showEditorListModal(state, action) {

			return {
				...state,
				...action.payload,
				editorUserVisible: true,
				currentItem: action.payload.currentItem
			};
		},
		hideEditorListModal(state, action) {

			return {
				...state,
				...action.payload,
				editorUserVisible: false,
			};
		},
		hideListModal(state, action) {
			return {
				...state,
				listVisible: false
			};
		},
		showMangeModal(state, action) {
			return {
				...state,
				ManageVisible: true
			};
		},
		hideMangeModal(state, action) {
			return {
				...state,
				ManageVisible: false
			};
		},
		showPostModal(state, action) {
			return {
				...state,
				...action.payload,
				PostVisible: true
			};
		},
		hidePostModal(state, action) {
			return {
				...state,
				...action.payload,
				PostVisible: false,
			};
		},
		getBaseinfoListSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		getSysUserListSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		getPostListSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		getPostSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		getAuthTreeSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		getRelUserSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		showRelationModal(state, action) {
			return {
				...state,
				RelationVisible: true,
				deskUserId: '',
				...action.payload
			};
		},
		hideRelationModal(state, action) {
			return {
				...state,
				RelationVisible: false,
				...action.payload
			};
		},
		showEditorPostModal(state, action) {
			return {
				...state,
				EditorPostVisible: true,
				...action.payload,

			};
		},
		hideEditorPostModal(state, action) {
			return {
				...state,
				EditorPostVisible: false,
				...action.payload,
				currentItem: {}
			};
		},
		getUserIdSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
		showGetRelUserModal(state, action) {
			return {
				...state,
				GetRelUserViible: true,
				...action.payload
			};
		},
		hideGetRelUserModal(state, action) {
			return {
				...state,
				GetRelUserViible: false,
				...action.payload
			};
		},
		showConfirmLoading(state, action) {
			return {
				...state,
				confirmLoading: true,
				...action.payload
			};
		},
		hideConfirmLoading(state, action) {
			return {
				...state,
				confirmLoading: false,
				...action.payload
			};
		},
		getRevenueSetSuccess(state, action) {
			return {
				...state,
				...action.payload
			};
		},
	},

}