import React, { Component } from 'react';
import { Form, Input, Rate, Switch, Button} from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const desc = ['😴', '😬', '😐', '😊', '🤯'];

class MovieForm extends Component {
    state = {
        title: '',
        director: '', 
        year: '',
        posterImg: '',
        posterShow: false,
        rating: 0,
        spoilers: false,
        entry: ''
    }
    getMovieData = () => {
        axios.get('http://www.omdbapi.com/?t=' + this.state.title +'&apikey=3fa2007d')
            .then(response => {
                this.setState({
                    director: response.data['Director'],
                    year: response.data['Year'],
                    posterImg: response.data['Poster'],
                    title: response.data['Title'],
                    posterShow: true
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
            entry: this.state.entry
        }
        axios.post( 'https://media-diary-25762.firebaseio.com/movies.json', movData )
            .then( response => {
                alert('done!'+response);
            } )
            .catch( error => {
                console.log(error);
            } );
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    // handleRatingChange = (event) => {
    //     this.setState({ rating: event.target.value });
    // }

    handleEntryChange = (event) => {
        this.setState({ entry: event.target.value });
    }

    render() {
        let poster = null
        if (this.state.posterShow) {
            poster = (
                <img className="Poster" src={this.state.posterImg} alt="Movie poster"></img>
            )
        }
        return (
            <div className="MovieForm">
                <Form>
                    <Form.Item
                        label="Movie Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleTitleChange}>
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
                        <Rate allowHalf tooltips={desc} 
                        value={this.state.rating}
                        onChange={this.handleRatingChange}/>
                    </Form.Item>

                    <Form.Item name="switch" label="Spoilers?" valuePropName="checked" colon={false}>
                        <Switch />
                    </Form.Item>
                </Form>

                <Form>
                    <TextArea placeholder="How did this movie make you feel 😌" autoSize={{ minRows: 3 }} 
                    value={this.state.entry}
                    onChange={this.handleEntryChange}/>

                    <Form.Item style={{ marginTop: '40px', marginBottom: '0px' }}>
                        <Button type="primary" htmlType="submit" onClick={this.getMovieData}>
                            Display Data
                        </Button>

                        <Button type="default" htmlType="submit" onClick={this.submitMovieData}>
                            Upload Data
                        </Button>
                    </Form.Item>
                </Form>
                {poster}
            </div>
        )
    }
}

export default MovieForm;