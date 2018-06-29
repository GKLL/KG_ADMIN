import React from 'react';
import { Form, Row, Col, Input, Button, Icon,Checkbox,Tree} from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode; 
import styles from '../common.css'    

   const defaultCheckedList = [];
    const chList =[]; //选中的条数
    class RuleList extends React.Component {
    state = {
      checkedList: this.defaultV(this.props.defValue),
      indeterminate: true,
      checkAll: false,
      arrs:[],
      childCheck:false,
    };
    componentDidMount(){
      if(this.props.defValue!=undefined){
        var defout = [...(this.props.defValue).split(",")];
        for(var i in defout){
          var CX =$("input[name=parentBox"+defout[i]+"]")
          //console.log(CX)
          CX[0].checked=true;
        if(CX[1]!=undefined){
            CX[1].checked=true;
          }
          
       }
      }
	}
    defaultV(value){
           // console.log("value",value);
            if(value!=undefined){
                var de = value.split(',')
                    for (var i in de){
                        de[i] =parseInt(de[i])
                    }
                return de
            }else{
                return value
            }
            
            
	}
	componentWillReceiveProps(nextProps){
		// console.log(nextProps);
		// if(this.props.defValue!=undefined){
		// 	var defout = [...(this.props.defValue).split(",")];
		// 	for(var i in defout){
		// 	  var CX =$("input[name=parentBox"+defout[i]+"]")
		// 	  //console.log(CX)
		// 	  CX[0].checked=true;
		// 	if(CX[1]!=undefined){
		// 		CX[1].checked=true;
		// 	  }
			  
		//    }
		//   }
	}
    render() {
      return (
        <div className={styles.checkAll}>
            <input
              type="checkbox"
              onChange={this.onCheckAllChange}
              checked  ={this.state.checkAll}
              name={"parentBox"+this.props.item.value}
              value={this.props.item.value}
              className="regularCheckbox"
             /
            >
            {this.props.item.label}    
          <br />
          <div style={{ borderBottom: '1px solid #E9E9E9',paddingBottom:20 }}>
          {this.props.child.map((x,index)=>
            <span key={x.value}>
              <input  type="checkbox"  className="regularCheckbox" value={x.value} name={"parentBox"+x.value} onChange={this.onChange}/>{x.label}
            </span>
            )}
          
           </div>
        </div>
      );
    }
    onChange = (e) => {
     // console.log(e.target.checked)
      let arrs= this.state.arrs
      if(e.target.checked){
        arrs.push(e.target.value)
        
      }else{
        for(var i in arrs){
          if(e.target.value == arrs[i]){
            arrs.splice(i,1)
          }
        }
      }
	  var CX = $("input[name^='parentBox']")  
      console.log(CX)
      this.setState({
        childCheck:e.target.checked,
        checkAll: (this.state.arrs.length)>0?true:false,
      });    
    }
    onCheckAllChange = (e) => {
     //console.log(e.target.value)
      var arr=[];
      var params =[];
      if(!e.target.checked){
        var CX =$("input[name=parentBox"+e.target.value+"]").nextAll()[1].children
       // console.log(CX)
        for(var i in CX){
           CX[i].childNodes[0].checked=false
        }
      }
      this.setState({
        checkedList: e.target.checked ==true? arr : [],
        childCheck: e.target.checked,
        checkAll: e.target.checked,
      });
      
    }
  }
 

export default RuleList;