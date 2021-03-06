import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, Icon, notification, Spin } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props)

        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({
            isLoading: true,
        })
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                        this.setState({
                            isLoading: false,
                        })
                    }).catch(error => {
                        this.setState({
                            isLoading: false,
                        })
                        if (error.status === 401) {
                            notification.error({
                                message: 'Health QA',
                                description: 'Your Username or Password is incorrect. Please try again!'
                            });
                        } else {
                            notification.error({
                                message: 'Health QA',
                                description: error.message || 'Sorry! Something went wrong. Please try again!'
                            });
                        }
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Spin spinning={this.state.isLoading} size="large" delay={200}>
                    <FormItem>
                        {getFieldDecorator('usernameOrEmail', {
                            rules: [{ required: true, message: 'Please input your username or email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                size="large"
                                name="usernameOrEmail"
                                placeholder="Username or Email" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="password"
                                type="password"
                                placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                        Or <Link to="/signup">register now!</Link>
                    </FormItem>
                </Spin>
            </Form>
        );
    }
}


export default Login;