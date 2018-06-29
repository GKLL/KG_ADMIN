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
	Checkbox,
	message
} from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import $ from 'jquery';
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
const EditorPostModal = ({
	visible,
	item = {},
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

//console.log("selectlist",item)
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
		validateFields((errors,values) => {
		

			if (errors) {

				return;
			}
			if(arry.length==0){
				message.warn('请选择权限')
				return;
			}
			
			onOk(values,item.postId,arry);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function checked(checked){
		console.log("checked",checked)
		return checked
	}
	function afterClose(){
      resetFields()
    }
	const modalOpts = {
		title: "编辑岗位",
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

	return (

		<Modal {...modalOpts}>
			<Form>
				<FormItem label="岗位名称" {...formItemLayout}>
				{getFieldDecorator('name', {
					initialValue:item.name,
					rules: [{ required: true, message: '请填写岗位名称!' }],
				})
				(<Input className="name"/>
				)}
				</FormItem>
				<FormItem>
				<div id="checkList">{TreeList&&TreeItem(TreeList).map((t,index)=>
						<RuleList key={index} item = {t} defValue ={item.authIds} child={t.children} value={t.value}/>
						)}
				</div>
				</FormItem>	
		    </Form>
		</Modal>
	);
};

EditorPostModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(EditorPostModal);