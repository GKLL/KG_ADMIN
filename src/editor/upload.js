import React, {Component} from 'react';
import {Upload, Button, message, Icon, Alert, Input} from 'antd';

const limit = 1 * 1024 * 1024;

class Uploader extends Component {
  constructor (props){
    super(props)

    let me = this;
    this.state = {
      fileList: []
    }
    this.uploadProps = {
      name: 'picFile',
      action: this.props.uploadUrl,
      // withCredentials: true,
      beforeUpload(file) {
        if ( file.name && file.size ) {
          if ( file.size > limit ) {
            message.error(`上传失败，文件大小超过限制`);
            return false;
          }
        }
      },
      onChange(info) {
        if (info.file.status === 'done') {
          let r = info.file.response;

          if (r.status && r.status === 'FAILED') {
            return message.error(`${info.file.name} 上传失败。`);
          }

          message.success(`${info.file.name} 上传成功。`);
          let fileList = info.fileList.slice(-1);
          me.setState({
            fileList
          })

          me.props.onUploaded(r.data)

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`);
        }
      }
    };
  }
  render () {
    return (
      <div>
        <Alert message="单张图片大小不能超过1M" type="info" />
        <Upload {...this.uploadProps}>
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
      </div>
    );
  }
}

export default Uploader;
