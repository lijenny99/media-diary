import React, { Component } from 'react';
import { Form, Input, Rate, Switch, Button } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const desc = ['😴', '😬', '😐', '😊', '🤯'];

class MovieForm extends Component {
    state = {
        title: '',
        director: '', 
        year: '',
    }
    getMovieData = () => {
        axios.get('http://www.omdbapi.com/?t=' + this.state.title +'&apikey=3fa2007d')
            .then(response => {
                this.setState({
                    director: response.data['Director'],
                    year: response.data['Year']
                })
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://img.omdbapi.com/?apikey=3fa2007d&t='+this.state.title).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    handleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    render() {
        return (
            <div className="MovieForm">
                <Form>
                    <Form.Item
                        label="Movie Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}>
                        <Input />
                    </Form.Item>
                </Form>

                <Form layout="inline" style={{ display: 'flex', marginBottom: '24px' }}>
                    <Form.Item label="Director" >
                        <span className="ant-form-text">{this.state.director}</span>
                    </Form.Item>

                    <Form.Item label="Year">
                        <span className="ant-form-text">{this.state.year}</span>
                    </Form.Item>


                    <Form.Item name="rate" label="Rating">
                        <Rate allowHalf tooltips={desc} />
                    </Form.Item>

                    <Form.Item name="switch" label="Spoilers" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>

                <Form>
                    <TextArea placeholder="How did this movie make you feel 😌" autoSize />

                    <Form.Item style={{ marginTop: '40px', marginBottom: '0px' }}>
                        <Button type="primary" htmlType="submit" onClick={this.getMovieData}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        )
    }
}

export default MovieForm;