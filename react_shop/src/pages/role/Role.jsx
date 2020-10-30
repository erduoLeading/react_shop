import React, {Component} from 'react';
import {
	Card,
	Button,
	Table,
	Modal,
	Icon,
	message,
} from 'antd'
import tableConfig from '../../config/tableConfig'
import AddRole from "./AddRole"
import {reqAddRole, reqGetRoles, reqUpdateRole} from "../../api"
import UpdateRole from "./updateRole"
import storage from '../../utils/storage'
class Role extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			showAdd: false,
			roles: [],
			role: {},
			selectedRowKeys: [],
			showUpdate: false,
		}
		this.menus = React.createRef()
	}
	UNSAFE_componentWillMount() {
		this.initColumns()
		this.authorizePerson = storage.getUser().username
	}
	componentDidMount() {
		this.getRoles();
	}
	initColumns() {
		this.columns = [
			{
				title: '角色名称',
				dataIndex: 'roleName',
			},
			{
				title: '创建时间',
				dataIndex: 'createTime',
				render: (createTime) => new Date(createTime).toLocaleString()
			},
			{
				title: '授权时间',
				dataIndex: 'authorizeTime',
			},
			{
				title: '授权人',
				dataIndex: 'authorizePerson',
			}
		];
	}
	getRoles = async () => {
		const {status, data, msg} = await reqGetRoles()
		if (status === 0) {
			this.setState({
				roles: data
			})
		} else {
			message.error(msg)
		}
	}
	addRole = () => {
		this.form.props.form.validateFields(async (err, values)=> {
			if (!err) {
				console.log(values)
				const {status, msg} = await reqAddRole(values)
				if (status === 0) {
					message.success(msg)
					this.setState({
						showAdd: false
					})
					this.form.props.form.resetFields()
					this.getRoles()
				} else {
					message.error(msg)
				}
			}
		})
	}
	handleCancel = (type) => {
		switch (type) {
			case 'add':
				this.setState({showAdd: false});
				this.form.props.form.resetFields();
				break;
			case 'update':
				this.setState({showUpdate: false});
				// this.form.props.form.resetFields();
				break;
			default:
		}
	}
	onRow = role => ({
		onClick: event => this.setState({
			selectedRowKeys:[role._id],
			role
		}), // 点击行
	})
	updateRole = async () => {
		let {role} = this.state
		role.menus = this.menus.current.state.checkedKeys
		role.authorizePerson = this.authorizePerson
		role.authorizeTime = new Date().toLocaleString()
		const {status, msg} = await reqUpdateRole(role)
		if (status === 0) {
			message.success(msg)
			if (storage.getUser().role_id === role._id) {
				storage.removeUser()
				this.props.history.replace('/login')
				return
			}
			this.getRoles()
			this.setState({
				showUpdate: false
			})
			/*
			* 	修改的角色权限是当前用户的角色，则需要退出登录更新用户权限
			*
			* */

		} else {
			message.error(msg)
		}
	}
	render() {

		const {isLoading, showAdd, roles, role, selectedRowKeys, showUpdate } = this.state
		const title = <span>
			<Button type="primary" onClick={()=>this.setState({showAdd: true})}><Icon type="plus" />添加角色</Button>
			<Button type="primary" style={{marginLeft: '10px'}}
					disabled={selectedRowKeys.length > 0? false : true}
					onClick={()=>this.setState({showUpdate:true})}
			>设置角色权限</Button>
		</span>
		return (
			<Card title={title}>
				<Table
					rowSelection={{
						type:'radio',
						selectedRowKeys,
						onChange: (selectedRowKeys, selectedRows) => { //点击radio触发
							this.setState({ selectedRowKeys, role: selectedRows[0] });
						},
					}}
					onRow={this.onRow}
					columns={this.columns}
					loading={isLoading}
					dataSource={roles}
					{...tableConfig()}
				/>
				<Modal
					title="请添加角色"
					visible={showAdd}
					onOk={this.addRole}
					onCancel={() => this.handleCancel('add')}
				>
					<AddRole
						wrappedComponentRef={(form) => this.form = form}
					/>
				</Modal>
				<Modal
					title="请修改角色"
					visible={showUpdate}
					onOk={this.updateRole}
					onCancel={() => this.handleCancel('update')}
				>
					<UpdateRole
						ref={this.menus}
						role={role}
					/>
				</Modal>
			</Card>
		);
	}
}

export default Role;