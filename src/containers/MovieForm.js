import React, { Component } from 'react';
import { Form, Input, Rate, Switch, Button } from 'antd';

const { TextArea } = Input;

const desc = ['😴', '😬', '😐', '😊', '🤯'];

class MovieForm extends Component {
    render() {
        return (
            <div className="MovieForm">
                <Form name="basic">
                    <Form.Item
                        label="Movie Title"
                        name="title">
                        <Input />
                    </Form.Item>

                    <Form layout="inline" style={{ display: 'flex', marginBottom: '24px'}}>
                        <Form.Item label="Director" >
                            <span className="ant-form-text">DIRECTOR</span>
                        </Form.Item>

                        <Form.Item label="Year">
                            <span className="ant-form-text">YEAR OF RELEASE</span>
                        </Form.Item>


                    <Form.Item name="rate" label="Rating">
                        <Rate allowHalf tooltips={desc} />
                    </Form.Item>

                    <Form.Item name="switch" label="Spoilers" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    </Form>

                    <TextArea placeholder="How did this movie make you feel 😌" autoSize />

                    <Form.Item style={{ marginTop: '40px', marginBottom: '0px' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        )
    }
}

export default MovieForm;