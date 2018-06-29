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
import stytes from './UserLoginPage.css';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import { Button,DatePicker,Radio,Table} from 'antd';
import moment from 'moment';
import {getDay} from '../services/data';
import {options} from '../services/common';
const { MonthPicker, RangePicker } = DatePicker;
const ButtonGroup = Button.Group;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

function DataColumn({dispatch,center}) {
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {ChartColumn,ColumnUserList,size} = center;
	const Chart = createG2(chart => {
		chart.legend({ 
		  position: 'bottom', // 设置图例的显示位置
		  itemGap: 100, // 图例项之间的间距
		  marker:'square'
		});
		chart.animate(true);
		chart.line().position('time*value').color('name').size(2);
		chart.axis('time', {
		  title: null // 不展示 xField 对应坐标轴的标题
		});
		chart.axis('value', {
			  title:null
		});
		chart.render();
	})
	//console.log('size',center)
	class MyComponent extends Component {
	  state = {
	    shape: 'line',
	    data: ChartColumn,
	    width: 500,
	    height: 400,
	    padding: [ 20, 20, 95, 80 ],// 上，右，下，左
	    forceFit:true,
	    //size:'3'
	  }
	  handleSizeChange = (e) => {
	  	console.log(e.target.value)
	    //this.setState({ size: e.target.value });
	    dispatch({
	    	type:"center/getDataStatChart",
	    	payload:{
	    		 startDate:getDay(-(parseInt(e.target.value)-1)),
                 endDate:getDay(0),
                 type:2,
                 size:e.target.value
	    	}
	    })
	    dispatch({
                  type:"center/getColumnUserList",
                  payload:{
                    startDate:getDay(-(parseInt(e.target.value)-1)),
                    endDate:getDay(0),
                  }
        })
	  }
	  handlechange = (dates,dateStrings) =>{
	  		console.log(dates,dateStrings)
	  		dispatch({
		  		type:"center/getDataStatChart",
		    	payload:{
		    		 startDate:dateStrings[0].split('/').join('-'),
	                 endDate:dateStrings[1].split('/').join('-'),
	                 type:2,
		    	}
		    })
		    dispatch({
                  type:"center/getColumnUserList",
                  payload:{
                    startDate:dateStrings[0].split('/').join('-'),
                    endDate:dateStrings[1].split('/').join('-'),
                  }
            })
	  }
	  disabledDate =(current) => {
	  	return current && current.valueOf() > Date.now();
	  }
	  render() {
	  	//const size = this.state.size;
	  	const columns = [{
			  title: '日期',
			  dataIndex: 'time',
			  key: 'time',
			 
		},{
			  title: '普通用户数',
			  dataIndex: 'value',
			  key: 'value',
			 
		}, {
		  title: '专栏用户数',
			  children: [{
			    title: '个人',
			    dataIndex: 'personal',
			    key: 'personal',
			  
			  }, {
			    title: '媒体',
		        dataIndex: 'media',
		        key: 'media',
		       
		      }],
		}, {
			  title: '投稿总数',
			  dataIndex: 'articleNum',
			  key: 'articleNum',
			 
		},{
			  title: '人均投稿数',
			  dataIndex: 'avgNum',
			  key: 'avgNum',
			 
		},];
	  	
	    return <div>
	    		    <div>  <Radio.Group value={size} onChange={this.handleSizeChange}>
					          <Radio.Button value="3">最近3天</Radio.Button>
					          <Radio.Button value="7">最近7天</Radio.Button>
					          <Radio.Button value="30">最近30天</Radio.Button>
					        </Radio.Group>
					       <RangePicker className={stytes.RangePick}
						      onChange ={this.handlechange}
						      format={dateFormat}
						      disabledDate={this.disabledDate}
						      locale={options}
						    />
				    </div>
			      <Chart
			        shape={this.state.shape}
			        data={this.state.data}
			        width={this.state.width}
			        height={this.state.height}
			        padding={this.state.padding}
			        forceFit={this.state.forceFit}
			      />
			     
			      <div>
			      	<Table columns={columns} bordered dataSource={ColumnUserList} rowKey={record => record.uid} pagination={false} locale={{emptyText:'暂无数据'}}/>
			      </div>
	    </div>
	  }
	}
	
	return (
			<div>
				<h2>专栏作者增长趋势<span>*此处仅统计审核通过的专栏作者数</span></h2>
				<MyComponent/>
			</div>

	);
}

DataColumn.propTypes = {

};

function mapStateToProps({
	center
}) {
	return {
		center
	};
}



export default connect(mapStateToProps)(withRouter(DataColumn));