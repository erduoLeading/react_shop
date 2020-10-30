import React, {Component} from 'react';
import {
	Card,
	Button,
	Modal,
	message,
	Table
} from 'antd'
import AddUser from './AddUser'
import {reqGetRoles, reqAddUser, reqGetUsers, reqUpdateUser, reqDeleteUser} from "../../api"
import MyButton from "../../components/my-button/MyButton"
import C from '../../utils/Constant'
const { confirm } = Modal;
export default class User extends Component {

	state = {
		visible:false, //表示添加用户的界面 默认不显示
		roles:[],
		users:[],
		roleName:{}//{角色id:角色名}

	}
	componentDidMount(){
		this.getData()
	}

	getData = async()=>{
		const result = await Promise.all([reqGetUsers(),reqGetRoles()])
		// console.log(result)
		// const {status,msg,data} = result
		// if(status===0){ //如果获取分类成功
		//     this.setState({users:data})
		// }
		this.setState({
			users:result[0].data,
			roles:result[1].data
		})

		this.initRoles()

	}
	initRoles = ()=>{
		// console.log(this.state.roles)
		const roleName = this.state.roles.reduce((pre,next)=>{
			pre[next._id] = next.roleName
			return pre
		},{})
		this.setState({roleName})
	}
	// getUsers = async()=>{
	//     const result = await reqUsers()
	//     // console.log(result)
	//     const {status,msg,data} = result
	//     if(status===0){ //如果获取分类成功
	//         this.setState({users:data})
	//     }
	// }
	//
	// //获取所有的角色信息
	// getRoles = async()=>{
	//     const result = await reqRoles()
	//
	//     // console.log(result)
	//     const {status,msg,data} = result
	//     if(status===0){ //如果获取分类成功
	//         this.setState({roles:data})
	//     }
	// }
	handleCancel = e => {
		//清空输入框的数据
		this.setState({
			visible:false
		});
	}

	//展示修改页面
	showUpdate = (user)=>{
		this.user = user
		this.setState({visible:true})
	}

	showAdd = ()=>{
		this.user = null
		this.setState({visible:true})
	}

	showDelete = (user)=>{
		console.log("我执行了")
		confirm({
			title: `确定删除${user.username}吗?`,
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk:async ()=>{  //删除用户
				const result = await reqDeleteUser(user)
				const {status,msg} = result
				if(status===0){
					message.success(msg)
					this.getData()
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}
	columns = [
		{
			title: '用户名',
			dataIndex: 'username',
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			render:(create_time)=>new Date(create_time).toLocaleString()
		},
		{
			title: '手机号',
			dataIndex: 'phone',
		},
		{
			title: '所属角色',
			dataIndex: 'role_id',   //角色id  roleName = {角色id:角色name}

			render:(role_id)=>{
				return this.state.roleName[role_id]

				// return this.state.roles.find(item=>item._id===role_id).name
			}
		},
		{
			title: '操作',
			width:300,
			render:(user)=>{
				// console.log(a);//render函数的参数 是对应行的数据源
				return (
					<span>
                        <MyButton handleClick={()=>this.showUpdate(user)}>修改用户</MyButton>
                        <MyButton handleClick={()=>this.showDelete(user)}>删除用户</MyButton>
                    </span>
				)
			}
		}
	]
	//点击添加/修改界面的ok按钮
	addOrUpdateUser = ()=>{
		// console.log('addUser')
		this.form.props.form.validateFields(async (err,values)=>{
			console.log(err, values)

			if(!err){   //如果通过了前台验证  就向后台发起请求 把用户数据添加到数据库

				let result = null;
				if(this.user){  //如果是修改用户页面
					values._id = this.user._id
					result = await reqUpdateUser(values) ;
				}else{  //如果是添加用户页面
					result = await reqAddUser(values) ;
				}
				const {status,msg} = result
				console.log(result)
				if(status===0){ //如果添加用户成功  从数据库中获取所有的用户  展示在页面中
					message.success(msg)
					this.form.props.form.resetFields()
					this.setState({visible: false});
					this.getData()
				}else{
					message.error(msg)
				}
			}
		})
	}


	render() {
		const {roles,users} = this.state
		const {user} = this
		const title = (
			<Button
				type='primary'
				icon={'plus'}
				onClick={this.showAdd}>添加用户</Button>
		)
		return (
			<Card title={title}>
				<Table
					dataSource={users}  //数据源
					columns={this.columns}       //每列的信息
					rowKey='_id'        //必须要有的
					// loading={loading}      //设置数据是否在加载中
					bordered
					pagination={{defaultPageSize:C.PAGE_SIZE}}    //配置分页器
				/>
				<Modal
					title={user?"请修改用户":"请添加用户"}
					visible={this.state.visible}
					onOk={this.addOrUpdateUser}
					onCancel={this.handleCancel}
				>
					<AddUser
						wrappedComponentRef={(form) => this.form = form}
						user={user}
						roles={roles}/>
				</Modal>
			</Card>
		);
	}
}

