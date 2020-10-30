import React, {Component} from 'react';
import {
	Card,
	Button,
	Icon,
	Modal,
	message,
	Table,
	Tag,
	Divider,
	Popconfirm
} from 'antd'
import AddCategory from './AddCategory'
import MyButton from '../../components/my-button/MyButton'
import {reqAddCategory, reqGetCategory, reqRemoveCategory, reqUpdateCategory} from "../../api"
import TableConfig from '../../config/tableConfig'
import C from '../../utils/Constant'
import UpdateCategory from "./UpdateCategory"

let original = {}

class Category extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showAdd: false,
			showUpdate: false,
			categorys: [], // 所有一级分类,
			currentCategory: {}, // 当前的一级分类
			parentId: '0', // 当前分类所属分类ID
			parentName: '', // 当前二级分类所属一级分类的名称
			isLoading: false,
			subCategorys: [],
			total: 0,
			currentPage: 1,
			pageSize: C.PAGE_SIZE,
		}
	}

	UNSAFE_componentWillMount() {
		this.initColumns()
	}

	componentDidMount() {
		this.initEntry()
	}

	initColumns() {
		this.columns = [
			{
				title: '序号',
				dataIndex: "",
				render: (txt, record, index) => {
					return index + 1 + (this.state.currentPage - 1) * this.state.pageSize
				}
			},
			{
				title: '分类名称',
				dataIndex: 'categoryName',
			},
			{
				title: '所属分类',
				dataIndex: 'parentId',
				render: (parentId) => {
					let obj = {}
					switch (parentId) {
						case '0':
							obj.color = 'blue'
							obj.txt = '一级分类'
							break;
						default:
							obj.color = 'green'
							obj.txt = '二级分类'
							break;
					}
					return <Tag color={obj.color}>{obj.txt}</Tag>
				}
			},
			{
				title: '操作',
				render: (record) => {
					return (
						<div>
							<MyButton handleClick={this.showModal.bind(this,'update', record)}>修改分类名</MyButton><Divider type="vertical "/>
							{
								this.state.parentId === '0' ? (
									<React.Fragment>
										<MyButton handleClick={this.showSubCategory.bind(this, record)}>查看子分类</MyButton><Divider
										type="vertical "/>
									</React.Fragment>
								) : null
							}
							<Popconfirm
								title="您确认要删除该分类?"
								onConfirm={this.confirmRemove.bind(this, record)}
								onCancel={this.cancelRemove}
								okText="确认"
								cancelText="取消"
							>
								<a href="/#">删除分类</a>
							</Popconfirm>
						</div>
					)
				}
			}
		];
	}

	initEntry() {
		this.getCategorys('0')
	}

	// 获取分类和子分类
	async getCategorys(parentId) {
		this.setState({isLoading: true});
		parentId = parentId || this.state.parentId;
		const {data, msg, status} = await reqGetCategory(parentId)
		this.setState({isLoading: false});
		if (status === 0) {
			if (parentId === '0') {
				this.setState({
					categorys: data,
					total: data.length,
					currentPage: 1
				})
			} else {
				this.setState({
					subCategorys: data || [],
					total: data.length,
					currentPage: 1
				})
			}

		} else {
			message.error(msg)
			this.setState({
				subCategorys: [],
			})
		}
	}

	// 点击添加分类
	showModal = (type, currentCategory) => {
		switch (type) {
			case 'add':
				this.setState({
					showAdd: true,
				});
				break;
			case 'update':
				this.setState({
					showUpdate: true,
					currentCategory: currentCategory
				});
				break;
			default:

		}
	}
	// 点击一级分类标题
	showCategory = () => {
		this.getCategorys('0')
		this.setState({
			parentId: '0',
			parentName: '',
			total: this.state.categorys.length,
			currentPage: original.currentPage,
		})
	}
	// 点击查看子分类
	showSubCategory = (record) => {
		this.setState({
			parentId: record._id,
			parentName: record.categoryName
		}, () => {
			original.currentPage = this.state.currentPage;
			console.log("currentPage:", original.currentPage)
			this.getCategorys()
		})
	}
	// 确认删除分类
	confirmRemove = async (record) => {
		const {parentId, categoryName} = record
		const {status, msg} = await reqRemoveCategory({parentId, categoryName})
		if (status === 0) {
			message.success(msg)
			this.getCategorys()
		} else {
			message.error(msg)
		}
	}
	//取消删除分类
	cancelRemove = () => {

	}
	// 确认添加新分类
	addCategory = () => {
		this.form.validateFields(async (err, values) => {
			if (!err) {
				// 发送添加商品分类请求
				const {status} = await reqAddCategory(values)
				if (status === 0) {
					message.success("添加分类成功")
					this.form.resetFields()
					this.getCategorys(values.parentId)
					// 根据添加分类表单的parentId 重新渲染并进入对应的子分类或者父级分类，标题和内容做出相应的修改
					let categoryName, parentId;
					if (values.parentId !== '0' && this.state.parentName !== '') {
						let obj = this.state.categorys.find(item => item._id === values.parentId);
						categoryName = obj.categoryName;
						parentId = obj._id;
					} else {
						categoryName = '';
						parentId = '0'
					}
					this.setState({
						showAdd: false,
						parentName: categoryName,
						parentId: parentId,
					})
				} else {
					message.error("分类已存在")
				}

			}
		})

	}
	// 确认更新分类
	updateCategory = () => {
		this.form.validateFields(async (err, values) => {
			values._id = this.state.currentCategory._id
			console.log(values)
			if (!err) {
				const {status, msg} = await reqUpdateCategory(values)
				if (status === 0) {
					message.success("修改分类成功");
					this.setState({showUpdate: false})
					this.getCategorys()
				} else {
					message.error(msg)
				}
			}
		})
	}
	handleCancel = (type) => {
		switch (type) {
			case 'add':
				this.setState({
					showAdd: false,
				});
				break;
			case 'update':
				this.setState({
					showUpdate: false,
				});
				break;
			default:
		}
		this.form.resetFields()
	};

	handlePageChange = page => {
		this.setState({
			currentPage: page,
		});
	};

	render() {
		const {parentId, parentName, categorys, subCategorys, currentPage, total} = this.state
		const title = parentId === '0' ? '一级分类' : (
			<span>
				<MyButton handleClick={this.showCategory}>一级分类</MyButton>
				<Icon type="right"/>
				<MyButton>{parentName}</MyButton>
			</span>
		)
		// 添加分类
		const extra = (
			<Button type='primary' onClick={this.showModal.bind(this,'add')}>
				<Icon type='plus'/>
				<span>添加分类</span>
			</Button>
		)
		return (
			<Card title={title} extra={extra}>
				<Modal
					title="请添加分类"
					visible={this.state.showAdd}
					onOk={this.addCategory}
					onCancel={this.handleCancel.bind(this, 'add')}
				>
					<AddCategory
						setForm={(form) => this.form = form}
						categorys={categorys}
						parentId={parentId}
					/>
				</Modal>
				{/*修改分类模态框*/}
				<Modal
					title="请修改分类"
					visible={this.state.showUpdate}
					onOk={this.updateCategory}
					onCancel={this.handleCancel.bind(this, 'update')}
				>
					<UpdateCategory
						setForm={(form) => this.form = form}
						currentCategory = {this.state.currentCategory}
					/>
				</Modal>
				<Table columns={this.columns}
					   dataSource={parentId === '0' ? categorys : subCategorys}
					   loading={this.state.isLoading}
					   {...TableConfig({
						   pagination: {
							   total,
							   onChange: page => {
								   this.setState({
									   currentPage: page,
								   });
							   },
							   current: currentPage
						   }
					   })}
				/>
			</Card>
		);
	}
}

export default Category;