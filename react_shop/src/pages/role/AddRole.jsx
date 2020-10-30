import React, {Component} from 'react';
import {
	Form,
	Input
} from 'antd'
class AddRole extends Component {
	render() {
		const {getFieldDecorator} = this.props.form
		return (
			<Form>
				<Form.Item>
					{
						getFieldDecorator('roleName', {
							rules: [
								{required: true, message: '角色名不能为空'}
							]
						})(
							<Input placeholder='请输入角色名称'/>
						)
					}

				</Form.Item>
			</Form>
		)
	}
}

export default Form.create()(AddRole);