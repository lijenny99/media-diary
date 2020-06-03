import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import {connect} from 'react-redux';

import axios from 'axios';
import * as actions from '../store/actions';
import withErrorHandler from '../hoc/withErrorHandler';

class LoginForm extends Component {

    state = {
        isAuthenticated: false,
    }

    submitHandler = (values) => {
        this.props.onAuth(values.email,values.password)
    }

    render() {
        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }
        return (
            <div className="Form FormText">
                {authRedirect}
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

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
        authRedirect: state.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(LoginForm,axios));