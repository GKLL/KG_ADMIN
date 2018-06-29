import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import styles from './Layout.css';
import style from './common.css';

import {
	withRouter, Link, hashHistory, NavLink
} from 'dva/router';

import {
	connect
} from 'dva';
import SideBar from './SideBar.js'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
let selectItem = '';
// const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let menuItems = []
let nav = JSON.parse(localStorage.getItem("nav"))
let userId = localStorage.getItem("userId");
let realname = localStorage.getItem("realname")
//console.log("nav",nav)
let first = "";
let second = "";
let third = "";
let four = "";
class LayoutContainer extends React.Component {
	rootSubmenuKeys: ['sub0', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7']
	state = {
		collapsed: false,
		openKeys: ['sub0'],
		current: '1',
		dispatch: {

		}
	};
	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	onOpenChange = (openKeys) => {
		//console.log(openKeys)
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		//console.log(latestOpenKey)
		this.setState({
			openKeys: latestOpenKey ? [latestOpenKey] : [],
		});
		/*if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
		  this.setState({ openKeys });
		} else {
		  this.setState({
			openKeys: latestOpenKey ? [latestOpenKey] : [],
		  });
		}*/
	}
	handleClick = (e) => {
		// console.log('click ', e);
		this.setState({
			current: e.key,
			openKeys: [e.keyPath[1]]
		});
	}
	logout(dispatch) {
		//console.log(dispatch)
		dispatch({
			type: "user/logOut",
			payload: {
				userId: userId
			}
		})
	}
	render() {
		const { collapsed } = this.state;
		//console.log('openKeys',this.props.dispatch)
		/*this.setState({
		  dispatch:this.props.dispatch
		})*/
		//this.state.dispatch=this.props.dispatch
		const path = this.props.location.pathname;
		if (path == "/index") {
			first = "首页";
			second = "";
			third = "";
			four = "";
		} else if (path == "/user/user_admin") {
			first = "首页";
			second = "用户管理";
			third = "";
			four = "";
		} else if (path == "/user/user_role") {
			first = "首页";
			second = "用户角色管理";
			third = "";
			four = "";
		} else if (path == "/user/user_login") {
			first = "首页";
			second = "用户登陆管理";
			third = "";
			four = "";
		} else if (path == "/user/user_info") {
			first = "首页";
			second = "用户默认信息设置";
			third = "";
			four = "";
		} else if (path == "/user/realName") {
			first = "首页";
			second = "实名认证管理";
			third = "";
			four = "";
		} else if (path == "/user/platformReward") {
			first = "首页";
			second = "平台奖励管理";
			third = "邀新奖励";
			four = "";
		} else if (path == "/user/user_data") {
			first = "首页";
			second = "用户管理";
			third = "查看用户信息";
			four = "";
		} else if (path == "/user/reward") {
			first = "首页";
			second = "用户管理";
			third = "查看用户信息"
			four = "奖励明细";
		} else if (path == "/user/invite") {
			first = "首页";
			second = "用户管理";
			third = "查看用户信息"
			four = "邀新记录";
		} else if (path == "/user/realnameAward") {
			first = "首页";
			second = "平台奖励管理";
			third = "实名认证奖励"
			four = "";
		} else if (path == "/user/columnAward") {
			first = "首页";
			second = "平台奖励管理";
			third = "成为专栏作家奖励"
			four = "";
		} else if (path == "/user/writingAward") {
			first = "首页";
			second = "平台奖励管理";
			third = "发文奖励"
			four = "";
		} else if (path == "/user/shareReward") {
			first = "首页";
			second = "平台奖励管理";
			third = "分享奖励"
			four = "";
		} else if (path == "/user/master") {
			first = "首页";
			second = "用户管理";
			third = "查看用户信息"
			four = "师徒关系";
		} else if (path == "/content/content_column") {
			first = "首页";
			second = "栏目管理";
			third = "";
			four = "";
		} else if (path == "/content/content_article") {
			first = "首页";
			second = "文章管理";
			third = "";
			four = "";
		} else if (path == "/content/content_comment") {
			first = "首页";
			second = "评论管理";
			third = "";
			four = "";
		} else if (path == "/content/release_article") {
			first = "首页";
			second = "文章管理",
				third = "发布文章";
			four = "";
		} else if (path == "/content/editor_article") {
			first = "首页";
			second = "文章管理";
			third = "编辑文章";
			four = "";
		} else if (path == "/index/editor") {
			first = "首页";
			second = "编辑文章";
			third = "";
			four = "";
		} else if (path == "/content/videoList") {
			first = "首页";
			second = "文章管理";
			third = "视频管理";
			four = "";
		} else if (path == "/content/EditorVideo") {
			first = "首页";
			second = "文章管理";
			third = "编辑视频";
			four = "";
		} else if (path == "/content/content_opinion") {
			first = "首页";
			second = "意见反馈";
			third = "";
			four = "";
		} else if (path == "/content/opinion") {
			first = "首页";
			second = "意见反馈";
			third = "反馈内容";
			four = "";
		} else if (path == "/content/content_image") {
			first = "首页";
			second = "图片管理";
			third = "";
			four = "";
		} else if (path == "/data/data_column") {
			first = "首页";
			second = "专栏数据";
			third = "";
			four = "";
		} else if (path == "/data/data_user") {
			first = "首页";
			second = "用户数据";
			third = "";
			four = "";
		} else if (path == "/setting/about") {
			first = "首页";
			second = "关于我们";
			third = "";
			four = "";
		} else if (path == "/setting/base") {
			first = "首页";
			second = "网站基本信息";
			four = "";
		} else if (path == "/setting/account") {
			first = "首页";
			second = "系统账号管理";
			third = "";
			four = "";
		} else if (path == "/finance/recharge") {
			first = "首页";
			second = "充值管理";
			third = "";
			four = "";
		} else if (path == "/finance/withdrawals") {
			first = "首页";
			second = "提现管理";
			third = "";
			four = "";
		} else if (path == "/finance/record") {
			first = "首页";
			second = "交易记录";
			third = "";
			four = "";
		} else if (path == "/finance/bond") {
			first = "首页";
			second = "保证金记录";
			third = "";
			four = "";
		} else if (path == "/app/editon") {
			first = "首页";
			second = "APP版本管理";
			third = "";
			four = "";
		} else if (path == "/app/detail") {
			first = "首页";
			second = "APP版本管理";
			third = "查看版本详情";
			four = "";
		} else if (path == "/finance/addAward") {
			first = "首页";
			second = "用户奖励";
			third = "新增奖励";
			four = "";
		} else if (path == "/finance/userAward") {
			first = "首页";
			second = "用户奖励";
			third = "";
			four = "";
		} else if (path == "/finance/awardDetails") {
			first = "首页";
			second = "用户奖励";
			third = "奖励详情";
			four = "";
		} else if (path == "/content/news_list") {
			first = "首页";
			second = "内容中心";
			third = "快讯管理";
			four = "";
		} else if (path == "/content/news_publish") {
			first = "首页";
			second = "内容中心";
			third = "快讯管理";
			four = "添加快讯";
		}else if (path == "/content/news_editor") {
			first = "首页";
			second = "内容中心";
			third = "快讯管理";
			four = "编辑快讯";
		}else if (path == "/advert/list") {
			first = "首页";
			second = "广告中心";
			third = "广告管理";
			four = "";
		}else if (path == "/advert/advert_add") {
			first = "首页";
			second = "广告中心";
			third = "广告管理";
			four = "添加广告";
		}else if (path == "/advert/advert_editor") {
			first = "首页";
			second = "广告中心";
			third = "广告管理";
			four = "编辑广告";
		}else if (path == "/advert/advert_editor") {
			first = "首页";
			second = "广告中心";
			third = "广告管理";
			four = "编辑广告";
		}else if (path == "/content/notice") {
			first = "首页";
			second = "内容中心";
			third = "公告管理";
			four = "";
		}else if (path == "/content/notice_publish") {
			first = "首页";
			second = "内容中心";
			third = "公告管理";
			four = "发布公告";
		}else if (path == "/content/notice_editor") {
			first = "首页";
			second = "内容中心";
			third = "公告管理";
			four = "编辑公告";
		}else if (path == "/setting/system") {
			first = "首页";
			second = "基础设置";
			third = "系统参数设置";
			four = "";
		}

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					breakpoint="md"
					className={styles.sider}
				>
					<Menu
						theme="dark"
						onClick={this.handleClick}
						inlineCollapsed={false}
						mode="inline"
						openKeys={this.state.openKeys}
						onOpenChange={this.onOpenChange}

					>
						<Menu.Item key="-1">
							<Link to={"/index?userId=" + userId}>
								<Icon type="home" />
								<span>主页</span>
							</Link>
						</Menu.Item>
						{nav && nav.map((item, index) =>
							<SubMenu key={"sub" + index} title={<span><Icon type={item.menuIcon} /><span>{item.menuName}</span></span>}>
								{item.children.map((c, inde) =>
									<Menu.Item key={c.menuId + ''} >
										<Link to={"/" + c.menuLink + '?page=1'}>{c.menuName}</Link>
									</Menu.Item>
								)}
							</SubMenu>
						)

						}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className={styles.trigger}
							type={collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
						<div className={styles.header_right}>
							<span className={styles.rename}>欢迎您，<span style={{ color: "#FFA500" }}>{realname && realname}</span></span>
							<Icon className={styles.logOut} onClick={() => this.logout(this.props.dispatch)} type="logout" />
						</div>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>{first}</Breadcrumb.Item>
							<Breadcrumb.Item>{second}</Breadcrumb.Item>
							<Breadcrumb.Item>{third}</Breadcrumb.Item>
							<Breadcrumb.Item>{four}</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							{this.props.children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						KG ©2018 Created by Ant UED
          </Footer>
				</Layout>
			</Layout>
		);
	}
}

function mapStateToProps({
	user
}) {
	return {
		user
	};
}

export default connect(mapStateToProps)(withRouter(LayoutContainer));
{/*		<div className={styles.container} style = {{height:containerHeight}}>
			<SideBar />
			<div className = {styles.right_content}>
				<div className={styles.nav}  style = {{height:navHeight}}>
					<span><img  style = {{height:navHeight}}/></span>
					<span className={styles.pullRight} style = {{lineHeight:navHeight + 'px',display:'none'}}><span className={styles.pullText}>{scmAddress}</span>,欢迎您!</span>
					<span onClick={handleClick} className={styles.out}  style = {{lineHeight:navHeight + 'px'}}><span className={styles.outpull}><Icon type='arrow-right' /></span></span>
				</div>
				<div className={styles.content} style = {{height:contentHeight}}>
				    {props.children}
				</div>
			</div>
		</div>*/}

{/*  <SubMenu key="sub3"  style ={{display:"none"}} title={<span><Icon type="user3" /><span>seo中心</span></span>}>
              <Menu.Item key="7"><Link activeClassName = {style.activeColor} to = '/seo/tdk'>首页TDK</Link></Menu.Item>
              <Menu.Item key="8"><Link activeClassName = {style.activeColor} to = '/seo/hot'>热门关键词</Link></Menu.Item>
              <Menu.Item key="9"><Link activeClassName = {style.activeColor} to = '/seo/link'>友情链接</Link></Menu.Item>
              <Menu.Item key="556"><Link activeClassName = {style.activeColor} to = '/seo/top_search'>热搜词管理</Link></Menu.Item>
            </SubMenu>*/}

{/* <SubMenu key="sub5" style ={{display:"none"}} title={<span><Icon type="user4" /><span>日志管理</span></span>}>
              <Menu.Item key="14"><Link activeClassName = {style.activeColor} to = '/log/log_user'>用户日志</Link></Menu.Item>
              <Menu.Item key="15"><Link activeClassName = {style.activeColor} to = '/log/log_admin'>管理员日志</Link></Menu.Item>
            </SubMenu>*/}

