import React, {
	Component,
	PropTypes
} from 'react';
import { Modal, Button, Input, message } from 'antd';
import Uploader from './upload';
import E from 'wangeditor';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
const { TextArea } = Input;
import { uploadUrl, ImgUrl } from "../services/common";
import styles from '../components/common.css';
//编辑器

class Editor extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			editorContent: "",
			num: 5000,
		}
	}
	componentDidMount() {
		const elem = this.refs.editorElem
		const editor = new E(elem);
		editor.customConfig.uploadImgServer = ImgUrl;//配置服务器上传地址
		editor.customConfig.uploadFileName = 'file';
		editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
		editor.customConfig.pasteFilterStyle = true; //手动关闭掉粘贴样式的过滤
		editor.customConfig.customAlert = function (info) {
			// info 是需要提示的内容
			message.error(info)
		}
		editor.customConfig.pasteTextHandle = function (content) {
			// content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
			var dd = content.replace(/<\/?span[^>]*>/ig,"");//清除span
			return dd
		}
		editor.customConfig.uploadImgHooks = {
			before: function (xhr, editor, files) {
				if (files[0].type == "image/gif") {
					return {
						prevent: true,
						msg: '只能上传jpg、png、jpeg格式的图片'
					}
				}
			},

			customInsert: function (insertImg, result, editor) {
				var url = uploadUrl + result.data[0].filePath;
				insertImg(url)
			}


		}
		editor.customConfig.linkImgCheck = function (src) {
			console.log(src) // 图片的链接

			return true // 返回 true 表示校验成功
			// return '验证失败' // 返回字符串，即校验失败的提示信息
		}
		editor.customConfig.zIndex = 10;
		//editor.customConfig.height = 1000
		editor.customConfig.colors = [
			'#4d4d4d',
			'#f00',
			'#1c487f',
			'#4d80bf',
			'#46acc8',
			'#f9963b',
			'#000000',
		]
		editor.customConfig.fontsizes ={
			1:'12px',
			2:'14px',
			3:'16px',
			4:'18px',
			5:'20px',
			6:'24px',
			7:'28px',
		}
		editor.customConfig.menus = [
			'head',//标题
			'bold',
			'fontSize',  // 字号
			'italic',
			'strikeThrough',
			'underline',
			'justify',
			'quote',  // 引用
			'foreColor',
			'link',  // 插入链接
			'image',
			'video'
		];

		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		/* editor.customConfig.onfocus = function (html) {
		 // html 即编辑器中的内容
		 console.log('onfocus', html)
		 }*/
		editor.customConfig.onchange = html => {
			html = html.replace(/<style(([\s\S])*?)<\/style>/g, '')
			localStorage.setItem("articleTextPreview", html);
			this.setState({
				editorContent: html
			})
			//console.log("编辑器内容",html)
			//console.log("编辑器文本",text)
			this.props.edtiorContent(editor)
			this.props.edtiorContentText(html)
		}
		
		editor.create();
		let articleText = localStorage.getItem("articleText");
	
		editor.txt.html(articleText);
	}

	render() {
	
		return (

			<div ref="editorElem" style={{ display: "block", width: "100%", }} className={styles.editorBox}>
			</div>

		);
	}
}
//braft-editor
const validateFn = (file) => {
	console.log(file)
	const is2M = file.size / 1024 / 1024 < 2;
	if (!is2M) {
		message.error('图片大小不超过2M');
	}
	return is2M
}
const uploadFn = (param) => {

	const serverURL = 'http://kg.btc123.com/kgapi/image/upload'
	const xhr = new XMLHttpRequest
	const fd = new FormData()

	// libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
	console.log(param.libraryId)

	const successFn = (response) => {
		// 假设服务端直接返回文件上传后的地址
		// 上传成功后调用param.success并传入上传后的文件地址
		//console.log(typeof(xhr.responseText))
		console.log(JSON.parse(xhr.responseText));
		var filePath = JSON.parse(xhr.responseText).data[0].filePath;
		param.success({
			url: uploadUrl + filePath
		})
	}

	const progressFn = (event) => {
		// 上传进度发生变化时调用param.progress
		param.progress(event.loaded / event.total * 100)
	}

	const errorFn = (response) => {
		// 上传发生错误时调用param.error
		param.error({
			msg: 'unable to upload.'
		})
	}

	xhr.upload.addEventListener("progress", progressFn, false)
	xhr.addEventListener("load", successFn, false)
	xhr.addEventListener("error", errorFn, false)
	xhr.addEventListener("abort", errorFn, false)

	fd.append('file', param.file)
	xhr.open('POST', serverURL, true)
	xhr.send(fd)

}
class EditorTest extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			content: null
		}
	}
	handleChange = (content) => {
		//console.log(content)
	}
	onRawChange = (content) => {
		///console.log(content)
	}
	handleHTMLChange = (html) => {
		//console.log(html)
		this.props.edtiorContent(html)
	}
	onConFirm = (e) => {
		console.log(this.editorInstance, e)
		//this.editorInstance.toggleSelectionLink('http://www.baidu.com', '_blank')
	}
	render() {
		const editorProps = {
			height: 500,
			initialContent: this.state.content,
			onChange: this.handleChange,
			onHTMLChange: this.handleHTMLChange,
			onRawChange: this.onRawChange,
			media: {
				image: true, // 开启图片插入功能
				video: true, // 开启视频插入功能
				audio: true, // 开启音频插入功能
				validateFn: validateFn, // 指定本地校验函数，说明见下文
				uploadFn: uploadFn // 指定上传函数，说明见下文
			},
			pasteMode: ['text' | ''],
			allowPasteImage: true,
			placeholder: "请输入正文内容..."
		}
		return (
			<div className={styles.editor}>
				<BraftEditor {...editorProps} />
			</div>

		);
	}
}


export default Editor;
