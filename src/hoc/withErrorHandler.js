import React, {Component} from 'react';
import { Modal } from 'antd';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error: false
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <>
                    <Modal visible={this.state.error} 
                    footer={null}
                    onCancel={this.errorConfirmedHandler}
                    title="Oh no!">
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler;