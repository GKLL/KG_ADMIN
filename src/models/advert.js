import pathToRegexp from 'path-to-regexp';
import { siteimagelist, addImage, deleteImage,ImageSetStatus,addAdvertise,getAdvertise} from '../services/advert';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'advert',

	state: {
		loading: false,
		deskUserId: '',
		currentPage: 1,
		totalNumber: 0,
		checkInfoList: [],//检索的用户表
		uploading:false,
		imageUrl:'',  //上传图片地址
		keWordArr:[], //选择的行业关键词
		selectValue:'1',//图片类型
		ImageList:[],//图片列表
		confirmLoading:false,
		currentItem:{},
		Advertise:{},  //广告详情
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/advert/list').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'siteimagelist',
						payload: {
							currentPage: search.page,
							pageSize:25,
							adverType:2,
							imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
							navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
							imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
							adverStyle: search.adverStyle != "undefined" ? parseInt(search.adverStyle) : null,
							displayPort: search.displayPort != "undefined" ? parseInt(search.displayPort) : null,
							adverTitle: (search.adverTitle == 'undefined' ||search.adverTitle==undefined)? null : Base64.decode(search.adverTitle),
							adverOwner: (search.adverOwner == 'undefined' ||search.adverOwner==undefined)? null : Base64.decode(search.adverOwner),
						}
					});
					
				}
				match = pathToRegexp('/advert/advert_add').exec(location.pathname);
				if(match){
					dispatch({
						type:'selectWords',
						payload:{
							keWordArr:[],
						}
					})
					dispatch({
						type:'imgurlChange',
						payload:{
							imageUrl:'',
							uploading:false,
						}
					})
				}
				match = pathToRegexp('/advert/advert_editor').exec(location.pathname);
				if(match){
					const search = GetRequest(location.search);
					dispatch({
						type:'selectWords',
						payload:{
							keWordArr:[],
						}
					})
					dispatch({
						type:'imgurlChange',
						payload:{
							imageUrl:'',
							uploading:false,
						}
					})
					dispatch({
						type:'getAdvertise',
						payload:{
							imageId:parseInt(search.imageId)
						}
					})
				}
				match = pathToRegexp('/advert/other_imgs').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'siteimagelist',
						payload: {
							currentPage: parseInt(search.page),
							adverType:1,
							imageType: search.imageType != "undefined" ? parseInt(search.imageType) : null,
							imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
							navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
							imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
							pageSize: 25,
						}
					})
					dispatch({
						type: 'ImgtypeChange',
						payload: {
							selectValue:'1'
						}
					})
					dispatch({
						type: 'imgurlChange',
						payload: {
							imageUrl:'',
							uploading:false,
						}
					})
				}
			})
		},
	},

	effects: {
		*selectWords({ payload }, { call, put }) {
			yield put({
				type: 'selectWordsSuccess',
				payload:{
					keWordArr:payload.keWordArr
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
		*uploading({ payload }, { call, put }) {
			yield put({
				type: 'uploadingSuccess',
				payload:{
					uploading:payload.uploading
				}
			});
		},
		*ImgtypeChange({ payload }, { call, put }) {
			yield put({
				type: 'ImgtypeChangeSuccess',
				payload:{
					selectValue:payload.selectValue
				}
			});
		},
		*siteimagelist({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(siteimagelist, payload);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {
					res.data[i].createDate = formatDate(res.data[i].createDate)
				}
				yield put({
					type: 'siteimagelistSuccess',
					payload: {
						ImageList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber
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
		*addImage({ payload }, { call, put }) {
			// console.log(payload)
			let params = {};
			if (payload.imageId != undefined) {
				params = {
					imageType: payload.imageType,
					imageDetail: payload.imageDetail,
					navigatorPos: payload.navigatorPos,
					imagePos: payload.imagePos,
					imageStatus: payload.imageStatus,
					createUser: payload.createUser,
					imageOrder: payload.imageOrder,
					imageAddress: payload.imageAddress,
					imageId: payload.imageId
				}

			} else {
				params = {
					imageType: payload.imageType,
					imageDetail: payload.imageDetail,
					navigatorPos: payload.navigatorPos,
					imagePos: payload.imagePos,
					imageStatus: payload.imageStatus,
					createUser: payload.createUser,
					imageOrder: payload.imageOrder,
					imageAddress: payload.imageAddress,
				}
			}
			yield put({
				type:'showSubmitLoading'
			})
			const { data } = yield call(addImage, params);

			if (data && data.code == 10000) {
				if (payload.imageId != undefined) {
					message.success('图片编辑成功');
				} else {
					message.success('图片添加成功');
				}
				yield put({
					type:'hideSubmitLoading'
				})
				yield put({
					type:'hideModal'
				})
				yield put({
					type:'hideEditorModal'
				})
				
				const search = GetRequest(payload.search)
				yield put({
					type: 'siteimagelist',
					payload: {
						pageSize: 25,
						currentPage: parseInt(search.page),
						adverType:1,
						imageType: search.imageType != "undefined" ? parseInt(search.imageType) : null,
						imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
						navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
						imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
					}
				});
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
		*deleteImage({ payload }, { call, put }) {
			let params = {
				imageId:payload.imageId
			}
			const { data } = yield call(deleteImage, params);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				message.success('图片删除成功');
				const search = GetRequest(payload.search);
				yield put({
					type: 'siteimagelist',
					payload: {
						pageSize: 25,
						currentPage: parseInt(search.page),
						adverType:1,
						imageType: search.imageType != "undefined" ? parseInt(search.imageType) : null,
						imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
						navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
						imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
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
		*deleteAdvertImage({ payload }, { call, put }) {
			let params = {
				imageId:payload.imageId
			}
			const { data } = yield call(deleteImage, params);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				message.success('图片删除成功');
				const search = GetRequest(payload.search);
				yield put({
					type: 'siteimagelist',
					payload: {
						currentPage: search.page,
						pageSize:25,
						adverType:2,
						imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
						navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
						imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
						adverStyle: search.adverStyle != "undefined" ? parseInt(search.adverStyle) : null,
						displayPort: search.displayPort != "undefined" ? parseInt(search.displayPort) : null,
						adverTitle: (search.adverTitle == 'undefined' ||search.adverTitle==undefined)? null : Base64.decode(search.adverTitle),
						adverOwner: (search.adverOwner == 'undefined' ||search.adverOwner==undefined)? null : Base64.decode(search.adverOwner),
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
		*ImageSetStatus({ payload }, { call, put }) {

			const { data } = yield call(ImageSetStatus, payload);
			if (data && data.code == 10000) {
				message.success('设置成功')
				yield put({
					type: "hideImageModal"
				})
				yield put({
					type: 'siteimagelist',
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
		*addAdvertise({ payload }, { call, put }) {
			yield put({
				type:'showSubmitLoading'
			})
			const { data } = yield call(addAdvertise, payload);
			if (data && data.code == 10000) {
				if(payload.imageId ==undefined){
					message.success('图片添加成功')
				}else{
					message.success('图片编辑成功')
				}
				
				yield put({
					type: "hideSubmitLoading"
				})
				setTimeout(()=>{
					history.back();
				},50)
			} else {
				yield put({
					type: "showSubmitLoading"
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*getAdvertise({ payload }, { call, put }) {
			yield put({
				type:'showLoading'
			})
			const { data } = yield call(getAdvertise, payload);
			
			if (data && data.code == 10000) {
				var res = data.responseBody;
				console.log(res.imageAddress)
				yield put({
					type: "getAdvertiseSuccess",
					payload:{
						Advertise:res,
						imageUrl:res.imageAddress,
						keWordArr:res.adverTarget!=null?res.adverTarget.split(','):[],
						loading:false
					}
				})
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
		showEditorModal(state, action) {
			let imageAddress = action.payload.currentItem.imageAddress;
			let imageType = action.payload.currentItem.imageType;
			return {...state,ImgEditorVisible: true,imageUrl:imageAddress,selectValue:imageType,...action.payload};
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
		siteimagelistSuccess(state, action) {
			return {...state,...action.payload};
		},
		ImgtypeChangeSuccess(state, action) {
			return {...state,...action.payload};
		},
		getAdvertiseSuccess(state, action) {
			return {...state,...action.payload};
		},
	},

}