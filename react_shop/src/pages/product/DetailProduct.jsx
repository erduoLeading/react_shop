import React, {Component} from 'react';
import {
	Card,
	List,
	Icon,
	message
} from 'antd';
import MyButton from "../../components/my-button/MyButton"
import C from '../../utils/Constant'
import './detail.less'
import {reqGetCategoryById} from "../../api"

class DetailProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {},
			categoryName1: "",
			categoryName2: "",
		}
	}

	UNSAFE_componentWillMount() {
		if (this.props.location.state) {
			this.product = this.props.location.state.product
		}
	}

	componentDidMount() {
		this.getCategoryById()
	}

	async getCategoryById() {
		let result;
		let {pCategoryId, categoryId} = this.product
		if (this.product.pCategoryId === '0') {
			result = await reqGetCategoryById({_id1:categoryId})
		} else {
			result = await reqGetCategoryById({_id1:pCategoryId,_id2: categoryId})
		}
		const {status, msg, data} = result
		if (status === 0) {
			this.setState({
				categoryName1: data.categoryName1,
				categoryName2: data.categoryName2 || "",
			})
		} else {
			message.error(msg)
		}

}

render()
{
	const {productName, imgs,description, price, details} = this.product
	const {categoryName1, categoryName2} = this.state
	const title = <span>
			<MyButton handleClick={
				() => this.props.history.push({
					pathname: '/admin/product/home',
					state: {currentPage: this.props.location.state.currentPage}
				})
			}>
				<Icon type={"left"}/>
			</MyButton>
			<span>商品详情</span>
		</span>
	return (
		<Card title={title}>
			<List
				// header={<div>Header</div>}
				// footer={<div>Footer</div>}
				bordered
				// dataSource={data}
				// renderItem={item => (
				// 	<List.Item>
				// 		{item}
				// 	</List.Item>
				// )}
			>
				<List.Item>
					<span className='left'>商品名称：</span>
					<span className='right'>{productName}</span>
				</List.Item>
				<List.Item>
					<span className='left'>商品描述：</span>
					<span className='right'>{description}</span>
				</List.Item>
				<List.Item>
					<span className='left'>商品价格：</span>
					<span className='right'>{price}元</span>
				</List.Item>
				<List.Item>
				<span className='left'>商品分类：</span>
				<span className='right'>
				{categoryName2?categoryName1+'/'+categoryName2:categoryName1}
				</span>
				</List.Item>
				<List.Item>
					<span className='left'>商品图片：</span>
					<span className='right'>
                            {
								imgs.length !== 0 ? (
									imgs.map((item, index) => <img
										key={index}
										className='product-img'
										src={C.BASE_URL + item}
										alt=""/>)
								) : '无'
							}
                        </span>
				</List.Item>
				<List.Item>
					<span className='left'>商品详情：</span>
					<span className="details" dangerouslySetInnerHTML={{__html: details}}/>
				</List.Item>
			</List>
		</Card>
	);
}
}

export default DetailProduct;