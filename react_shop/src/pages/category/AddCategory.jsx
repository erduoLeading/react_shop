import React, {Component} from 'react';

import {
	Form,
	Select,
	Input
} from 'antd'
const { Option } = Select;
class AddCategory extends Component {

	UNSAFE_componentWillMount(){
		this.props.setForm(this.props.form)
	}
	//把子组件的form对象传递给 父组件
	render() {
		// console.log(this.props.form)
		const {getFieldDecorator} = this.props.form
		const {categorys,parentId} = this.props
		return (
			<Form>
				<Form.Item>
					{
						getFieldDecorator(
							'parentId', //存储option的value
							{
								initialValue:parentId //初始的时候Selec显示value
							}
						)(    //收集的Option的value值
							<Select>
								<Option value='0'>一级分类</Option>
								{
								categorys.map(item=>{
								return  <Option
										key={item._id} //key唯一
										value={item._id} //value为对应分类key
										>
											{item.categoryName}
										</Option>
								})
								}
							</Select>
						)
					}
				</Form.Item>

				<Form.Item>
					{
						getFieldDecorator('categoryName', {
							rules: [
								{required: true, message: '分类名不能为空'}
							]
						})(
							<Input placeholder='请输入分类名称'/>
						)
					}

				</Form.Item>
			</Form>
		);
	}
}

export default Form.create()(AddCategory);