import React from 'react';
import { Upload, Icon, message,Modal,Button} from 'antd';
import styles from "./search.css";
import {videoUrl,uploadVideoUrl} from "../services/common"
let articleText = localStorage.getItem("articleText");
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
var videoList = JSON.parse(localStorage.getItem('videoList'));
function beforeUpload(file) {
   var isTrue = false;
    if (file.type == 'video/mp4') {
      isTrue = true
    } else if (file.type === 'video/avi') {
      isTrue = true
    } else if (file.type ==='video/rmvb') {
      isTrue = true
    } else if (file.type === 'video/rm') {
      isTrue = true
    }else {
      message.error('视频仅支持mp4、avi、rm、rmvb格式')
      isTrue = false
      return false
    }
  const is200M = file.size / 1024 / 1024 < 200;
  //console.log('is200M', is200M)
  if (!is200M) {
    message.error('视频大小不超过200M');
  }
  return isTrue && is200M
}   
    var url = uploadVideoUrl;
    var token = localStorage.getItem("Kgtoken");
    var userId = localStorage.getItem("userId");
    const headers ={
      'Content-Type': 'multipart/form-data',
    }
export default class MyUpload extends React.Component {
  state = {
    fileList: this.props.videoData!=undefined?this.props.videoData:[],
  }
  handleChange = (info) => {
    let fileList = info.fileList; 
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);
    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.data[0].filePath
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.errorCode === 10000;
      }

      return true;
    });
    console.log(fileList)
    this.setState({ fileList });
    this.props.fileVideo(fileList); 
  }
  render() {
    console.log(this.props.videoData)
    //this.state.fileList = this.props.videoData;
    const props = {
      action: uploadVideoUrl,
      onChange: this.handleChange,
      multiple: true,
      name:"file",
      accept:'video/MP4;video/avi;video/rm;video/rmvb',
      beforeUpload:beforeUpload
    };
    return (
      <Upload {...props} fileList={this.state.fileList}  >
        <Button type="primary" size="large">
          <Icon type="upload" /> 上传视频
        </Button>
      </Upload>
    );
  }
}