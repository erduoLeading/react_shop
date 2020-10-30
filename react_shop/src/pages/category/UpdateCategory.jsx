import React, {Component} from 'react';
import {
	Form,
	Input
} from 'antd'
class updateCategory extends Component {
	UNSAFE_componentWillMount() {
		this.props.setForm(this.props.form)
	}
	render() {
		const {getFieldDecorator} = this.props.form
		const {currentCategory} = this.props
		return (
			<Form>
				<Form.Item>
					{
						getFieldDecorator('categoryName', {
							initialValue: currentCategory.categoryName,
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

export default Form.create()(updateCategory);