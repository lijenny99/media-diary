import React, { Component } from 'react';
import { Form, Input, Rate, Switch, Button, Row, Col } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const desc = ['😴', '😬', '😐', '😊', '🤯'];

class MovieForm extends Component {
    state = {
        title: '',
        director: '',
        year: '',
        genre: '',
        posterImg: '',
        posterShow: false,
        rating: 0,
        spoilers: false,
        entry: '',
        titleChanged: false,
        formWrapper: 24,
        posterWrapper: 0,
    }

    getMovieData = () => {
        axios.get('http://www.omdbapi.com/?t=' + this.state.title + '&apikey=3fa2007d')
            .then(response => {
                if (this.state.title !== '') {
                    this.setState({ posterShow: true, titleChanged: true, formWrapper: 16, posterWrapper: 8 })
                }
                this.setState({
                    director: response.data['Director'],
                    year: response.data['Year'],
                    posterImg: response.data['Poster'],
                    title: response.data['Title'],
                    genre: response.data['Genre'],
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    submitMovieData = () => {
        const movData = {
            title: this.state.title,
            posterImg: this.state.posterImg,
            rating: this.state.rating,
            entry: this.state.entry,
            spoilers: this.state.spoilers
        }
        axios.post('https://media-diary-25762.firebaseio.com/movies.json', movData)
            .then(response => {
                alert('done!');
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleRatingChange = (event) => {
        this.setState({ rating: event.currentTarget.getAttribute('value') });
        console.log(this.state.rating);
    }

    handleEntryChange = (event) => {
        this.setState({ entry: event.target.value });
    }

    handleSpoilersChange = () => {
        this.setState(prevState => ({
            spoilers: !prevState.spoilers
        }));
    }

    render() {

        let poster = null
        if (this.state.posterShow) {
            poster = (
                <img className="Poster" src={this.state.posterImg} alt="Movie poster"></img>
            )
        }

        let movieInfo = null
        if (this.state.titleChanged) {
            movieInfo = (
                <Row>

                    <Form.Item label="Director">
                        <span className="ant-form-text">{this.state.director}</span>
                    </Form.Item>

                    <Form.Item label="Year">
                        <span className="ant-form-text">{this.state.year}</span>
                    </Form.Item>

                    <Form.Item label="Genre">
                        <span className="ant-form-text">{this.state.genre}</span>
                    </Form.Item>

                </Row>
            )
        }

        return (
            <div className="MovieForm">
                <Row>
                    <Col className="FormText" span={this.state.formWrapper}>
                        <Form onFinish={this.submitMovieData} hideRequiredMark={true} >
                            <Form.Item
                                label="Movie Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                                rules={[{ required: true, message: 'Please select a movie' }]}>
                                <Input />
                            </Form.Item>
                            {movieInfo}
                            <Row>
                                <Col span={12}>
                                    <Form.Item name="rate" label="Rating" rules={[{ required: true, message: 'Please add a rating' }]} value={this.state.rating} onClick={this.handleRatingChange}>
                                        <Rate allowHalf tooltips={desc} />
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item name="switch" label="Spoilers?" valuePropName="checked" colon={false}>
                                        <Switch onClick={this.handleSpoilersChange} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name="entry"
                                rules={[{ required: true, message: 'Please write something' }]}>
                                <TextArea placeholder="How did this movie make you feel 😌" autoSize={{ minRows: 3 }}
                                    value={this.state.entry}
                                    onChange={this.handleEntryChange} />
                            </Form.Item>

                            <Form.Item style={{ marginTop: '40px', marginBottom: '0px' }}>
                                <Button type="default" onClick={this.getMovieData}>
                                    Display Data</Button>
                                <Button type="primary" htmlType="submit">
                                    Upload Data</Button>
                            </Form.Item>

                        </Form>
                    </Col>
                    <Col span={this.state.posterWrapper}>{poster}</Col>
                </Row>
            </div>
        )
    }
}

export default MovieForm;