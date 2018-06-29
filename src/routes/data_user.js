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
import {getDay} from '../services/data'
const { MonthPicker, RangePicker } = DatePicker;
const ButtonGroup = Button.Group;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

function DataUser({dispatch,center}) {
	const {ChartColumn,UserList,size} = center;
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
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
	});
	//console.log(size)
	class MyComponent extends Component {
	  state = {
	    shape: 'line',
	    data: ChartColumn,
	    width: 500,
	    height: 400,
	    forceFit:true,
	  }
	  handleSizeChange = (e) => {
	    dispatch({
	    	type:"center/getDataStatChart",
	    	payload:{
	    		 startDate:getDay(-(parseInt(e.target.value)-1)),
                 endDate:getDay(0),
                 type:1,
                 size:e.target.value
	    	}
	    })
	    dispatch({
                  type:"center/getNormalUserList",
                  payload:{
                    startDate:getDay(-(parseInt(e.target.value)-1)),
                    endDate:getDay(0),
                  }
        })
	  }
	  handlechange = (dates,dateStrings) =>{
	  		//console.log(dates,dateStrings)
	  		dispatch({
		  		type:"center/getDataStatChart",
		    	payload:{
		    		 startDate:dateStrings[0].split('/').join('-'),
	                 endDate:dateStrings[1].split('/').join('-'),
	                 type:1,
		    	}
		    })
	  		 dispatch({
                  type:"center/getNormalUserList",
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
	  	
	  	const columns = [{
			  title: '日期',
			  dataIndex: 'time',
			  key: 'time',
			 
		},{
			  title: '普通用户数',
			  dataIndex: 'value',
			  key: 'value',
			 
		}, {
		  title: '粘性数据',
			  children: [{
			    title: '评论数',
			    dataIndex: 'commentNum',
			    key: 'commentNum',
			  }, {
			    title: '收藏数',
		        dataIndex: 'collectNum',
		        key: 'collectNum',
		       
		      }, {
			    title: '分享数',
		        dataIndex: 'shareNum',
		        key: 'shareNum',
		       
		      }, {
			    title: '文章浏览数',
		        dataIndex: 'browseNum',
		        key: 'browseNum',
		       
		      }],
		}];
	  	
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
						    />
				    </div>
			      <Chart
			        shape={this.state.shape}
			        data={this.state.data}
			        width={this.state.width}
			        height={this.state.height}
			        forceFit={this.state.forceFit}
			      />
			      <div>
			      	<Table columns={columns} bordered dataSource={UserList} pagination={false} rowKey={record => record.uid} />
			      </div>
	    </div>
	  }
	}
	
	return (
			<div>
				<h2>普通用户增长趋势<span>*此处仅统计解锁状态下的普通用户数</span></h2>
				<MyComponent/>
			</div>

	);
}

DataUser.propTypes = {

};

function mapStateToProps({
	center
}) {
	return {
		center
	};
}



export default connect(mapStateToProps)(withRouter(DataUser));