import React, { Component } from 'react';
import { Form, Input, Rate, Switch, Button, Row, Col, AutoComplete, Drawer } from 'antd';

import axios from 'axios';
import styled from "styled-components"
import withErrorHandler from '../hoc/withErrorHandler';

const { TextArea } = Input;

const desc = ['😴', '😬', '😐', '😊', '🤯'];

const SugModal = styled.p`
    text-align: right;
    margin-top: -100px;
`;

class Suggestion extends Component {

    state = {
        title: '',
        director: '',
        year: '',
        genre: '',
        posterImg: '',
        synopsis: '',
        posterShow: false,
        rating: 0,
        spoilers: false,
        entry: '',
        titleChanged: false,
        formWrapper: 24,
        posterWrapper: 0,

        value: '',
        options: [],
        visible: false,

        drawerVisible: false,
    }

    submitMovieData = (values) => {
        const movData = {
            title: this.state.title,
            posterImg: this.state.posterImg,
            rating: values.rate,
            entry: values.entry,
            spoilers: this.state.spoilers,
            synopsis: this.state.synopsis
        }
        axios.post('https://media-diary-25762.firebaseio.com/movies.json', movData)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSpoilersChange = () => {
        this.setState(prevState => ({
            spoilers: !prevState.spoilers
        }));
    }

    onTitleSearch = searchText => {
        if (searchText.length > 2) {
            this.setState({ visible: true });
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=9523b359a5faa28ea6054e5c5c0a7582&query=' + searchText)
                .then(response => {

                    if (response.data.total_results === 0) {
                        this.setState({ visible: false });
                    }

                    this.setState({
                        options: [
                            { key: response.data.results[0].id, value: response.data.results[0].title },
                            { key: response.data.results[1].id, value: response.data.results[1].title },
                            { key: response.data.results[2].id, value: response.data.results[2].title },
                            { key: response.data.results[3].id, value: response.data.results[3].title },
                            { key: response.data.results[4].id, value: response.data.results[4].title }
                        ]
                    })
                }).catch(err => console.log(err))
        }
        else {
            this.setState({ visible: false });
        }
    };

    onTitleSelect = data => {
        axios.get('http://www.omdbapi.com/?t=' + data + '&apikey=3fa2007d')
            .then(response => {
                this.setState({
                    director: response.data['Director'],
                    year: response.data['Year'],
                    posterImg: response.data['Poster'],
                    title: response.data['Title'],
                    genre: response.data['Genre'],
                    synopsis: response.data['Plot'],
                    posterShow: true,
                    titleChanged: true,
                    formWrapper: 16,
                    posterWrapper: 8,
                    visible: false,
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

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

        let form = (
            <div>
                <Row>
                    <Col className="FormText" span={this.state.formWrapper}>
                        <Form onFinish={this.submitMovieData} hideRequiredMark={true} >
                            <Form.Item
                                label="Movie Title"
                                name="title"
                                rules={[{ required: true, message: 'Please select a movie' }]}>
                                <AutoComplete
                                    options={this.state.options}
                                    onSelect={this.onTitleSelect}
                                    onSearch={this.onTitleSearch}
                                    open={this.state.visible} />
                            </Form.Item>

                            {movieInfo}

                            <Row>
                                <Col span={12}>
                                    <Form.Item name="rate" label="Rating" rules={[{ required: true, message: 'Please add a rating' }]} >
                                        <Rate allowHalf tooltips={desc}
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item name="spoilers" label="Spoilers?" valuePropName="checked" colon={false}>
                                        <Switch onClick={this.handleSpoilersChange} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name="entry"
                                rules={[{ required: true, message: 'Please write something' }]}>
                                <TextArea placeholder="How did this movie make you feel 😌" autoSize={{ minRows: 3 }} />
                            </Form.Item>

                            <Form.Item style={{ marginTop: '40px', marginBottom: '0px' }}>
                                <Button type="primary" htmlType="submit">
                                    Upload Data</Button>
                            </Form.Item>

                        </Form>
                    </Col>
                    <Col span={this.state.posterWrapper}>{poster}</Col>
                </Row>
            </div>
        )

        const showDrawer = () => {
            this.setState({ drawerVisible: true })
        };
        const onClose = () => {
            this.setState({ drawerVisible: false })
        };

        return (
            <>
                <SugModal onClick={showDrawer}>Leave me a suggestion!</SugModal>
                <Drawer
                    title={null}
                    placement="bottom"
                    closable={false}
                    onClose={onClose}
                    visible={this.state.drawerVisible}
                    height={500}
                >
                    <h4>Hi! Thanks for viewing my quarantine media diary 😊</h4>
                    <p>As you can see, I have watched <em>a lot</em> of movies in the last few months, but there's still so many
                    more I have yet to discover. If you have any suggestions on movies you think I should watch/I would like,
                    please tell me hehehe</p>
                    {form}
                </Drawer>
            </>
        )
    }
}

export default withErrorHandler(Suggestion, axios);