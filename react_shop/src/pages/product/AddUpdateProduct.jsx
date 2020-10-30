import React, {Component} from 'react';
import {
	Card,
	Cascader ,
	Icon,
	Form,
	Input,
	message,
	Button
} from 'antd';
import MyButton from "../../components/my-button/MyButton"
import {reqGetCategory, reqAddProduct, reqUpdateProduct} from '../../api'
import PicturesWall from './PicturesWall'
import RichTextEditor from "./RichTextEditor"
const {TextArea} = Input;

class AddUpdateProduct extends Component {
	state = {
		options : []
	};
	UNSAFE_componentWillMount() {
		this.imgs = React.createRef();
		this.details = React.createRef();
		if (this.props.location.state) {
			this.update = true
			this.product = this.props.history.location.state.product
		} else {
			this.update = false
			this.product = {}

		}
	}
	componentDidMount() {
		this.getCategory('0')
	}
	formateData = (data,bool)=>{
		return data.map(item=>({
			value: item._id,
			label: item.categoryName,
			isLeaf: bool?false:true,
		}))
	}
	getCategory = async (parentId) => {
		const {status, data, msg} = await reqGetCategory(parentId)
		const {pCategoryId} = this.product
		if (status === 0) {
			let options = this.formateData(data, true)
			console.log("我是options:",options)
			// 修改页面中，ID !=== 0 需要请求一下二级分类, 根据pCategoryId
			if (this.update && pCategoryId !== '0') {
				console.log("我进来了")
				// 拿到一级分类
				let targetOption = options.find(item => item.value === pCategoryId)
				// 拿到一级分类的ID,对应的分类索引
				let index = options.findIndex(item => item.value === targetOption.value )
				// 用二级分类的父ID即作为reqGetCategory的参数  即 targetOption.value 或者pCategoryId
				const {data} = await  reqGetCategory(pCategoryId)
				if (status === 0) {
					targetOption.children = this.formateData(data,false)

				} else {
					targetOption.isLeaf = true
				}
				options[index] = targetOption
			}
			this.setState({options});
		} else {
			message.error(msg)
		}

	}

	// 点击级联选项加载二级分类数据
	loadData =  async selectedOptions => {
		const targetOption = selectedOptions[0];
		targetOption.loading = true;

		// load options lazily 请求二级分类数据
		const {status, data} = await  reqGetCategory(targetOption.value)
		targetOption.loading = false;
		if (status === 0) {
			targetOption.children = data.map(item => ({
				value: item._id,
				label: item.categoryName,
				isLeaf: true,
			}))
		} else {
			targetOption.isLeaf = true;
		}
		this.setState({
			options: [...this.state.options],
		});
	};
	handleSubmit = () => {
		// 级联表单项获取到的是_id组成的数组
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				values.imgs = this.imgs.current.getImgs()
				values.details = this.details.current.getDetails()
				// 只有一级分类
				if (values.category.length === 1) {
					values.pCategoryId = '0';
					values.categoryId = values.category[0]
				} else { // 二级分类
					values.pCategoryId = values.category[0];
					values.categoryId = values.category[1];
				}
				let result;
				// 根据此时的页面类型: 修改页面(多一个_id参数判断) 添加页面
				if (this.update) {
					values._id = this.product._id
					 result = await  reqUpdateProduct(values)
				} else {
					result = await reqAddProduct(values)
				}


				const {status, msg} = result
				if (status === 0) {
					message.success(msg)
					this.props.history.push('/admin/product/home')
				} else {
					message.error(msg)
				}
			}
		})
	}
	render() {
		const {productName, description, price, pCategoryId, categoryId, imgs, details} = this.product
		let category = []
		if (pCategoryId === '0') {
			category.push(categoryId)
		}else {
			category.push(pCategoryId)
			category.push(categoryId)
		}
		const title = (
			<span>
				<MyButton handleClick={this.props.history.goBack}>
					<Icon type="left"></Icon>
				</MyButton>
				<span>{
						this.update ? '修改商品' : '添加商品'
				}</span>
			</span>
		)

		const formItemLayout = {
			labelCol: { // label占比
				xs: {span: 6},
				sm: {span: 6},
			},
			wrapperCol: { //input占比
				xs: {span: 12},
				sm: {span: 12},
			},
		};
		const {getFieldDecorator} = this.props.form
		return (
			<Card title={title}>
				<Form {...formItemLayout}>
					<Form.Item label={"商品名称:"}>
						{
							getFieldDecorator('productName', {
								initialValue: productName,
								rules: [
									{required: true, message: '商品名称不能为空'}
								]
							})(
								<Input placeholder='请输入商品名称'/>
							)
						}
					</Form.Item>
					<Form.Item label={"商品描述:"}>
						{
							getFieldDecorator('description', {
								initialValue: description,
								rules: [
									{required: true, message: '商品描述不能为空'}
								]
							})(
								<TextArea
									placeholder="请输入商品描述"
									autoSize={{minRows: 3, maxRows: 5}}
								/>
							)
						}
					</Form.Item>
					<Form.Item label={"商品价格:"}>
						{
							getFieldDecorator('price', {
								initialValue: price,
								rules: [
									{required: true, message: '商品价格不能为空'}
								]
							})(
								<Input type="number" min={0} placeholder='请输入商品价格' addonAfter={"元"}/>
							)
						}
					</Form.Item>
					<Form.Item label={"商品分类:"}>
						{
							getFieldDecorator('category', {
								initialValue:category, // 原理是根据[]中的值去匹配options中value,若有children就去匹配children
								rules: [
									{required: true, message: '商品分类不能为空'}
								]
							})(
								<Cascader
									options={this.state.options}
									loadData={this.loadData}
									placeholder='请输入商品分类'
									changeOnSelect
								/>
							)
						}
					</Form.Item>
					<Form.Item label={'商品图片'}>
						<PicturesWall ref={this.imgs}
						  			  imgs={imgs}/>
					</Form.Item>
					<Form.Item label={'商品详细介绍'}>
						<RichTextEditor ref={this.details} details={details}/>
					</Form.Item>
					<Form.Item>
						{
							<Button type="primary" onClick={this.handleSubmit}>提交</Button>
						}
					</Form.Item>
				</Form>
			</Card>
		);
	}
}

export default Form.create()(AddUpdateProduct);