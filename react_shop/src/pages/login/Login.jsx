import React, { Component } from "react";
import "./login.less";
import { Form, Icon, Input, Button, message } from "antd";
import {requireLogin} from '../../api/index'
import Storage from '../../utils/storage'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();
    //api：校验表单结果
    this.props.form.validateFields(async (err, values) => {
        if (!err) {
            const  {status, data, msg} =await requireLogin(values)
            if (status === 0) {
                message.success("登录成功")
				Storage.setUser(data);
                // 页面跳转
                this.props.history.push('/admin/home')
            } else {
                message.error(msg)
            }
        }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form; //收集表单数据函数
    return (
      <div className="login-form">
        <h2 className="login-title">React后台管理系统</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
            // userName校验规则
              rules: [
                { required: true, message: "请输入您的用户名" },
                {min: 5, message:"用户名的长度不能小于5位"},
                {max: 12, message: "用户名的长度不能超过12位"},
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator("password", {
               rules: [
                { required: true, message: "请输入您的密码" },
                {min: 5, message:"密码的长度不能小于5位"},
                {max: 12, message: "密码的长度不能超过12位"},
              ],
            })(
                <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;
