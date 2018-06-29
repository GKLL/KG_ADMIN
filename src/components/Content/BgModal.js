import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	message,
	Button,
	Tabs,
	Steps,
	Col,
	Row
} from 'antd';
import styles from './Content_Opinion_Show.css'
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const Step = Steps.Step;
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const BgModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	fatherType,
	showfpModal,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {


	function handleOk(value,text) {
			
			//console.log(value,text)
			onOk(value,text,selectList);
		
	}

	function Cancel() {
		onCancel()
		
	}
	const modalOpts = {
		title: "选择图片",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		footer:null,
		
	};
	
	//let logoimg = require("image!../../assets/images/lx4.png");
	var ImgBox = React.createClass({
    propTypes: {//定义传入props中的属性各种类型
        initialValue: React.PropTypes.string
    },
    defaultProps: { //组件默认的props对象
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {//组件相关的状态对象
        return {
            text: this.props.initialValue || 'placeholder',
            activeStatus:0,
            active:-1,
            coverImg:[
	         
	        ],
	        activeImg:""
	        };
    },
    handleChange: function(event) {
        this.setState({ //this represents react component instance
            text: event.target.value
        });
    },
    stepNext:function(){
    	this.setState({
    		activeStatus:1
    	})
    },
    selectImg:function(i,img){
    	console.log(i)
    	this.setState({
    		active:i,
    		activeImg:img
    	})
    },
    file:function () {
    	//获取图片文件
    	var that =this;
        var docobj=document.getElementById("upImg");  

        var fileList=docobj.files[0]; 
        //现在图片文件大小
        var imgSize = fileList.size;
        console.log(imgSize);
        if(imgSize>2*1024*1024){
         message.error('上传的图片的大于2M,请重新选择');
         docobj.val('')
         return false;
        }
        //将图片文件转换为base64
        var coverImg = this.state.coverImg
        var reader=new FileReader();
        reader.onload=function(){
          coverImg.push({"img":reader.result})  
          that.setState({
        	coverImg:coverImg
        })
        }  
        reader.readAsDataURL(fileList)
    },
    render: function() {
    	const {activeStatus,Img,active,coverImg,activeImg}  =this.state;

    	const ImgX = coverImg.map((item,index)=>{
			   	return(
			   		<Col span={6} key={index} className={active == index ?styles.selImg:styles.upImg}>
			   		   <img src={item.img} onClick={()=>this.selectImg(index,item.img)}/>
			   		</Col>
			   	)
			   })
        return (
            <div>
               <div className={styles.upBox}>
               <input type="file" onChange={this.file} id="upImg" name="coverImg" multiple="multiple" className={styles.upFile} accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" />
               <Button type="primary" size="large" className={styles.upLoadBtn} style={{paddingLeft:30,paddingRight:30}}> 上传 </Button>
               <span className={styles.infoSize}>建议尺寸：660*420</span>
               </div>
			   <Row >
			   		{ImgX}
			   </Row>
			   <div className={styles.upBtn}>
			   	   <Button type="primary" size="large" onClick={()=>showfpModal(activeImg)}> 下一步</Button>
			   </div>
            </div>
        );
    }
    });
	
	return (
			
		<Modal {...modalOpts} width='40%'>
			<ImgBox />
		</Modal>
	);
};

BgModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(BgModal);