import React, {Component} from 'react';
import {
	Card,
	Select,
	Button,
	Input,
	Icon,
	message,
	Table

} from 'antd';
import {reqGetProduct, reqSearchProducts} from "../../api"
import TableConfig from "../../config/tableConfig"
import C from "../../utils/Constant"
import MyButton from "../../components/my-button/MyButton"

const {Option} = Select;
class HomeProduct extends Component {
	state = {
		products: [],
		isLoading: false,
		currentPage: this.props.location.state ? this.props.location.state.currentPage : 1, //可定义也可不定义，在onchange中能拿到
		total: 0,
		searchInfo: {
			searchType: 'productName',
			keyWords: '',
		}
	}
	 getProducts = async (page, num) => {
		const { searchInfo:{searchType, keyWords}} = this.state
		this.setState({isLoading: true})
		 let result = {};
		 if (keyWords) {
		 	result = await reqSearchProducts({searchType,keyWords,page, num})
		 } else {
			 result = await reqGetProduct(page, num)
		 }
		 const {status, data, msg} = result
		this.setState({isLoading: false})
		if (status === 0) {
			this.setState({
				products: data.products,
				total: data.total,
				currentPage: page,
				// searchInfo: {
				// 	keyWords: '',
				// 	searchType,
				// }
			})
		} else {
			message.error(msg)
		}
	}
	//初始化每列的信息
	initColumns = ()=>{
		this.columns = [
			{
				title: '商品名称',
				dataIndex: 'productName',
			},
			{
				title: '商品描述',
				dataIndex: 'description',
			},
			{
				title: '商品价格',
				dataIndex: 'price',
				render:(price)=>`￥${price}元`
			},
			{
				title: '操作类型',
				width:300,
				render:(product)=>{
					// console.log(a);//render函数的参数 是对应行的数据源
					// console.log(product)
					return (
						<span>
                            <MyButton handleClick={()=>this.props.history.push({
								pathname:'/admin/product/detail',
								state:{
									product,
									currentPage: this.state.currentPage
								}
							})}>详情</MyButton>
                            <MyButton handleClick={()=>this.props.history.push({
								pathname:'/admin/product/addUpdate',
								state:{
									product
								}
							})}>修改</MyButton>
                        </span>
					)
				}

			}
		];
	}
	UNSAFE_componentWillMount() {
		this.initColumns()
	}
	 componentDidMount() {
		this.getProducts(this.state.currentPage,C.PAGE_SIZE)
	}


	render() {
		const {products, currentPage, total, searchInfo, searchInfo:{searchType,keyWords}} = this.state
		const title = (
			<span>
				<Select value={searchType}
						style={{width: '200px'}}
						onChange={value =>{
							searchInfo.searchType = value
							this.setState({searchInfo})
						}}>
					<Option value="productName">按名称搜索</Option>
					<Option value="description">按描述搜索</Option>
				</Select>
				<Input placeholder={"请输入关键词"}style={{width: '200px', margin: '0 10px'}}
						value={keyWords}
						onChange={e =>{
									searchInfo.keyWords=e.target.value;
									this.setState({searchInfo})
								}} />
				<Button type="primary" onClick={()=>this.getProducts(1, C.PAGE_SIZE)}>搜索</Button>
			</span>
		)
		const extra = (
				<Button type="primary" onClick={()=>this.props.history.push('/admin/product/addupdate')}>
					<Icon type="plus"/>
					<span>添加商品</span>
				</Button>
		)
		return (
			<Card title={title} extra={extra}>
				<Table columns={this.columns}
					   dataSource={products}
					   loading={this.state.isLoading}
					   {...TableConfig({
						   bordered: true,
						   pagination: {
							   current: currentPage,
							   total,
							   onChange: page => {
								   this.setState({
									   currentPage: page,
								   },
									   ()=> {
										   this.getProducts(this.state.currentPage,C.PAGE_SIZE)
									   }
								   );
							   },
						   }
					   })}
				/>
			</Card>
		);
	}
}

export default HomeProduct;