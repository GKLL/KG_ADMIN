import React from 'react';
import style from './common.css';
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
function load() {

	let scmKey = localStorage.getItem("scmKey");


	if (scmKey == '2') {
		window.location.reload();
	} else {
		console.log(1)
	}
}
/*class SideBar extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
    	<Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        </Layout>
    );
  }
}*/
const SideBar = (props) => {
	const height = document.body.clientHeight * 0.85;
	return (
		<ul className = {style.sideBar} style = {{height:height}}>
			<li><Link activeClassName = {style.activeColor} to = '/index'>xxx</Link></li>
			<li><Link activeClassName = {style.activeColor} to = '/material'>xxx</Link></li>
			<li><Link activeClassName = {style.activeColor} to = '/inventory_report'>xxx</Link></li>
    	</ul>
	);
};

SideBar.propTypes = {};

export default SideBar;
