import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import withErrorHandler from '../hoc/withErrorHandler';

class LoginForm extends Component {

    state = {
        isAuthenticated: false,
    }

    submitHandler = (values) => {
        const authData = {
            email: values.email,
            password: values.password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCafZebAOTsMnXxjX_71at_5Pz27h05Qg'

        axios.post(url,authData).then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            this.setState({isAuthenticated: true})
            console.log('ur good')
        }).catch(err => {
          console.log(err);
        })
    }

    render() {
        return (
            <div className="Form FormText">
                <Form
                    name="basic"
                    hideRequiredMark={true} 
                    onFinish={this.submitHandler}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item style={{ marginTop: '24px', marginBottom: '0px' }}>
                        <Button type="primary" htmlType="submit">
                            Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withErrorHandler(LoginForm,axios);