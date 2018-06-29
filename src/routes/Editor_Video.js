import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import styles from './Common.css';
import BgModal from '../components/Content/BgModal';
import FtModal from '../components/Content/FtModal';
import {dataURLtoBlob,ImgUrl,uploadUrl,getBase64} from '../services/common'
import  VideoEditor from '../components/Content/VideoEditor';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import axios from 'axios';
function Editor_article({dispatch,router,content,setting}) {
	//let logoimg = require("image!../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");
  let token =localStorage.getItem("Kgtoken");
  if(!token) {
    dispatch(routerRedux.push('/'))
  }

  var html = '';
  let src = "";
  
  const {ArticleList,imgtype,dis,pubStatus,loading,BgVisible,ifPushValue,PushAticleInfo,UserById,FtVisible,activeImg,ColumnList,cruImage,getVideoList,getBonusList,imgUrl} =content;

  const options = ColumnList;
  console.log("imgUrl",imgtype)
  const ArticleEditorProps = {
    ColumnList,
    dispatch,
    ArticleList:getVideoList,
    router,
    cruImage,
    setting,
    getBonusList,
    imgUrl,
    dis,
    UserById,
    pubStatus,
    PushAticleInfo,
    loading,
    ifPushValue,
    editorText(h,t){
        text  = t;
        html  = h;
    },
    uploadImg(img){
      //console.log(e.target.src)
      //var img = e.target.src;
      const hide = message.loading('加载中..', 0);
      getBase64(img)
            .then(function(base64){
              //console.log(base64);//处理成功打印在控制台
              var s = dataURLtoBlob(base64)
              let formData = new FormData();
                    formData.append('name', 'file');
                    formData.append('file', s);
                    let config = {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                    }
              axios.post(ImgUrl, formData, config).then(res=>{
                       res =res.data; 
                       hide();
                        if (res.errorCode == 10000) {
                            console.log(res) 
                           //imgUrl =res.data[0].filePath;
                            dispatch({
                              type:'content/hidefpModal',
                              payload:{
                                imgUrl:res.data[0].filePath
                              }
                            })    
                        }
                    })
            },function(err){
                  console.log(err);//打印异常信息
            });      
    }
  }
  const BgModalProps ={
  	visible:BgVisible,
  	onCancel(){
      
  		dispatch({
  		    type:'content/hideBgModal'
  	    })
  
  	},
  	showfpModal(activeImg){
  		if(activeImg==""){
        message.warning("请选择图片")
      }else{
        dispatch({
          type:'content/hideBgModal',
          payload:{
            activeImg:activeImg
          }
        })
        dispatch({
          type:'content/showfpModal',
          payload:{
            
          }
        })
      }
  	}
  }
  const FtModalProps ={
  	visible:FtVisible,
    activeImg:activeImg,
    imgtype:imgtype,
  	onCancel(){
  		 dispatch({
  		    type:'content/hidefpModal',
  		    payload:{
  		    	
  		    }
  	    })
      
  	},
  	oncroup(src){
  		var s = dataURLtoBlob(src)
      //console.log(s)
      let formData = new FormData();
            formData.append('name', 'file');
            formData.append('file', s);
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
      axios.post(ImgUrl, formData, config).then(res=>{
               res =res.data; 
              
                if (res.errorCode == 10000) {
                    console.log(res) 
                   //imgUrl =res.data[0].filePath;
                    dispatch({
                      type:'content/hidefpModal',
                      payload:{
                        imgUrl:res.data[0].filePath
                      }
                    })    
                }
            })
  	}
  }
  


	return (
			<div>
				<Row span={24} >
					<Col>
						<VideoEditor {...ArticleEditorProps}/>
            <BgModal {...BgModalProps}/>
            <FtModal {...FtModalProps} />
					</Col>
				</Row>
			</div>

	);
}

Editor_article.propTypes = {

};

function mapStateToProps({
	content,setting
}) {
	return {
		content,setting
	};
}



export default connect(mapStateToProps)(withRouter(Editor_article));