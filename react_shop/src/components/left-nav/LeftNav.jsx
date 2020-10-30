import React, {Component} from 'react';
import {Menu, Icon, message} from 'antd';
import menuConifg from '../../config/menusConfig'
import {NavLink, withRouter} from 'react-router-dom'
import storage from '../../utils/storage'
import {reqGetRole} from "../../api"
const {SubMenu} = Menu;

class LeftNav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menus: [],
			defaultOpenKeys: [],
		}
	}

	//同步数据对应钩子
	// UNSAFE_componentWillMount() {
	// 	this.menu = this.getMenuConfig(menuConifg)
	// 	this.getRoleMenus()
	// }
	componentDidMount() {
		this.getRoleMenus()
	}
	getRoleMenus = async () =>{
		const {role_id} = await storage.getUser()
		const {status, data, msg} = await reqGetRole(role_id)
		if (status === 0) {
			this.roleAuth =  data.menus;
			this.setState({
				menus: this.getMenuConfig(menuConifg)
			})
			console.log(this.state.menus, this.state.defaultOpenKeys)
		} else {
			message.error(msg)
		}
	}
	// hasAuthorize = (item) => {
	// 	if (storage.getUser().username === 'admin') return true
	// 	if (item.children) {
	// 		return this.roleAuth.includes(item.key) && item.children.some(child => this.hasAuthorize(child))
	// 	} else {
	// 		return this.roleAuth.includes(item.key)
	// 	}
	// }
	hasAuthorize = (item)=>{
		// console.log(this.roleAuth)  // ['/admin/category']
		if(storage.getUser().username ==='admin'||item.public||this.roleAuth.includes(item.key)){      //如果权限数组中包含了item的权限
			return true
		} else if(item.children){
			// return this.roleAuth.includes(item.key)
			return item.children.find(cItem=>this.roleAuth.includes(cItem.key))
		}else {
			return false
		}

	}
	getMenuConfig(menuConifg) {
		return (
			menuConifg.map((item) => {
				if(this.hasAuthorize(item)) { // 判断是否有该菜单权限
					if (item.children) {
						const {pathname} = this.props.location
						// 通过子路径找到父路径
						let result = item.children.filter(cItem=>{
							return pathname === cItem.key;
						})
						// 找到默认代开的选项
						if (result.length) {
							this.setState({
								defaultOpenKeys: [item.key]
							})
							this.defaultOpenKeys = [item.key]
						}
						return (
							<SubMenu
								key={item.key}
								title={
									<span><Icon type={item.icon}/><span>{item.title}</span></span>
								}
							>
								{
									this.getMenuConfig(item.children)
								}
							</SubMenu>
						)
					} else {
						return (
							<Menu.Item key={item.key}>
								<NavLink to={item.key}>
									<Icon type={item.icon}/>
									<span>{item.title}</span>
								</NavLink>
							</Menu.Item>
						)
					}
				}
				return null
			})
		)

	}
	getDefaultOpenKeys = () => {
		return this.state.defaultOpenKeys
	}

	render() {
		const {pathname} = this.props.location
 		return (
			<div>
				{
						<Menu
							defaultSelectedKeys={[pathname]} //选中的key值
							defaultOpenKeys={this.state.defaultOpenKeys}
							mode="inline"
							theme="dark"
						>
							{this.state.menus}
						</Menu>
				}

			</div>
		);
	}
}

export default withRouter(LeftNav); // 使得LeftNav组件拥有 location history, match