import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';
import {connect} from 'react-redux';

import * as actions from '../store/actions';
import Spinner from '../components/Spinner/Spinner';

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

        let form = (
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
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <Modal visible={this.props.error}  
                footer={null}
                onCancel={this.props.resetError}
                title="Oh no!">
                    {this.props.error.message}
                </Modal>
            )
        }


        return (
            <div className="Form FormText">
                {authRedirect}
                {form}
                {errorMessage}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
        resetError: () => dispatch(actions.reset()),
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);