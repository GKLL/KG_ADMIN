import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Button,
	Table,
	Tabs,
	message
} from 'antd';
import $ from 'jquery';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import RuleList from './Rule';
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

    let list =[]
const AddPostModal = ({
	visible,
	type,
	onOk,
	onCancel,
	TreeList,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {

const FormItem = Form.Item;
	function handleOk() {
		var CX = $("input[name^='parentBox']")  
		var arry= [];    
		//var CX = document.getElementsByTagName('input');
			//console.log(CX)
			for(var i in CX){  
			   if(CX[i].checked){
			   	//console.log(CX[i].value)
			   	arry.push(CX[i].value)
			   }
			}
			//console.log(arry)

		    validateFields((errors,values) => {
			if (errors) {
				return;
			}
			if(arry.length==0){
				message.warn('请选择权限')
				return;
			}
			//const data = {...getFieldsValue()}
			//console.log(values)
			onOk(values,arry);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function checked(checked){
		
		return checked
		
	}
	function afterClose(){
      resetFields()
    }
	const modalOpts = {
		title: '添加岗位',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:'800px',
		okText:"确定",
		cancelText:"取消",
		afterClose:afterClose,
		destroyOnClose:true
	};

	 const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };


    
  

    function TreeItem(list) {
    	//console.log("list",list)
    	var arr =[];
    	let params ={};
    	let chid ={};
    	for (var i in list) {
 
            params={
              'value': list[i].id,
              'label': list[i].name,
               children:list[i].children.map((j)=>
                     chid ={
                      'value':j.id,
                      'label':j.name,
                    }
                )
            }
            arr.push(params)
        }  
        return arr
    }
    function getChild(list){
    	var arr =[];
    	let params ={};
    	let chid ={};
    	for (var i in list) {
 
            params={
              'value': list[i].id,
              'label': list[i].name,
               
            }
            arr.push(params)
        }  
        return arr
    }
	return (

		<Modal {...modalOpts}>
			<Form>
				<FormItem label="岗位名称" {...formItemLayout}>
			        {getFieldDecorator('name', {
			        	initialValue:'',
			            rules: [{ required: true, message: '请填写岗位名称!' }],
			        })(<Input />)}

			    </FormItem>
			    <FormItem>
			       <div id="checkList">{TreeList&&TreeItem(TreeList).map((item,index)=>
			        	<RuleList  item = {item} child={item.children}  checked={checked} value={item.value} key={index}/>
			        	)}
			       </div>
			     </FormItem>
			    
			</Form>
			
		</Modal>
	);
};

AddPostModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(AddPostModal);