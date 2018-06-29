import pathToRegexp from 'path-to-regexp';
import { addNoticeInfo,deleteNotice,getBkgNoticeInfo,updateNotice,getNoticeById} from '../services/notice';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'notice',

	state: {
		loading: false,
		deskUserId: '',
		currentPage: 1,
		totalNumber: 0,
		uploading:false,
		NotciceList:[],//公告列表
		confirmLoading:false,
		currentItem:{},
		NoticeItem:{},  //公告详情
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/content/notice').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getBkgNoticeInfo',
						payload: {
							currentPage: search.page,
							pageSize:25,
							addUser: (search.addUser == 'undefined' ||search.addUser==undefined)? null : Base64.decode(search.addUser),
							updateUser: (search.updateUser == 'undefined' ||search.updateUser==undefined)? null : Base64.decode(search.updateUser),
						}
					});
				}
				match = pathToRegexp('/content/notice_editor').exec(location.pathname);
				if(match){
					const search = GetRequest(location.search);
					dispatch({
						type: 'getById',
						payload: {
							id: search.id,
						}
					});
				}
				
			})
		},
	},

	effects: {
		*getBkgNoticeInfo({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getBkgNoticeInfo, payload);
			if (data && data.code == 10000) {
				var res = data.responseBody;
				// for (var i in res.data) {
				// 	res.data[i].createDate = formatDate(res.data[i].createDate)
				// }
				yield put({
					type: 'getBkgNoticeInfoSuccess',
					payload: {
						NotciceList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.total
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
		*addNoticeInfo({ payload }, { call, put }) {
			yield put({
				type:'showSubmitLoading'
			})
			const { data } = yield call(addNoticeInfo, payload);

			if (data && data.code == 10000) {
					message.success('公告添加成功');
				yield put({
					type:'hideSubmitLoading'
				})

				yield put(routerRedux.push('/content/notice?page=1'))
			} else {
				yield put({
					type:'hideSubmitLoading'
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*updateNotice({ payload }, { call, put }) {
			yield put({
				type:'showSubmitLoading'
			})
			const { data } = yield call(updateNotice, payload);
			if (data && data.code == 10000) {
					message.success('公告编辑成功');
				yield put({
					type:'hideSubmitLoading'
				})

				//返回列表页
				setTimeout(()=>{
					history.back();
				},50)
			} else {
				yield put({
					type:'hideSubmitLoading'
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*delNotice({ payload }, { call, put }) {
			let params = {
				id:payload.id
			}
			const { data } = yield call(deleteNotice, params);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				message.success('公告删除成功');
				const search = GetRequest(payload.search);
				yield put({
					type: 'getBkgNoticeInfo',
					payload: {
						pageSize: 25,
						currentPage: parseInt(search.page),
						addUser: (search.addUser == 'undefined' ||search.addUser==undefined)? null : Base64.decode(search.addUser),
						updateUser: (search.updateUser == 'undefined' ||search.updateUser==undefined)? null : Base64.decode(search.updateUser),
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
		*getNoticeById({ payload }, { call, put }) {
			// yield put({
			// 	type:'showLoading'
			// })
			const { data } = yield call(getNoticeById, payload);
			
			if (data && data.code == 10000) {
				var res = data.responseBody;
				console.log(res.imageAddress)
				yield put({
					type: "getNoticeByIdSuccess",
					payload:{
						NoticeItem:res,
						loading:false
					}
				})
				localStorage.setItem("articleText", res.info);
				yield put(routerRedux.push('/content/notice_editor?id='+payload.id))
			} else {
				yield put({
					type: "hideLoading"
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getById({ payload }, { call, put }) {
			yield put({
				type:'showLoading'
			})
			const { data } = yield call(getNoticeById, payload);
			
			if (data && data.code == 10000) {
				var res = data.responseBody;
				yield put({
					type: "getNoticeByIdSuccess",
					payload:{
						NoticeItem:res,
						loading:false
					}
				})
				localStorage.setItem("articleText", res.info);
			} else {
				yield put({
					type: "hideLoading"
				})
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
		showSubmitLoading(state, action) {
			return {...state,confirmLoading: true};
		},
		hideSubmitLoading(state, action) {
			return {...state,confirmLoading: false};
		},
		showModal(state, action) {
			return {...state,ImgVisible: true,imageUrl:'',selectValue:'1'};
		},
		hideModal(state, action) {
			return {...state,ImgVisible: false};
		},
		hideEditorModal(state, action) {
			return {...state,ImgEditorVisible: false,...action.payload};
		},
		selectWordsSuccess(state, action) {
			return {...state,...action.payload};
		},
		imgurlSuccess(state, action) {
			return {...state,...action.payload};
		},
		uploadingSuccess(state, action) {
			return {...state,...action.payload};
		},
		getBkgNoticeInfoSuccess(state, action) {
			return {...state,...action.payload};
		},
		ImgtypeChangeSuccess(state, action) {
			return {...state,...action.payload};
		},
		getNoticeByIdSuccess(state, action) {
			return {...state,...action.payload};
		},
	},

}