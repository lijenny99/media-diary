import React, { Component } from 'react';
import { Form, Input, Button, AutoComplete, Drawer } from 'antd';

import axios from 'axios';
import styled from "styled-components"
import withErrorHandler from '../hoc/withErrorHandler';
import me from '../assets/jen.png'

const Wrapper = styled.div`
    margin: 30px 200px;
`;


const SugModal = styled.p`
    text-align: right;
    margin-top: -100px;
`;

const Heading = styled.h2`
    font-size: 24px;
    font-weight: bold;
`

const Body = styled.h4`
    font-weight: normal;
    margin-bottom: 20px;
`

class Suggestion extends Component {

    formRef = React.createRef();

    state = {
        title: '',
        synopsis: '',

        value: '',
        options: [],
        visible: false,

        drawerVisible: false,
    }

    submitMovieData = (values) => {
        const movData = {
            title: this.state.title,
            synopsis: this.state.synopsis
        }
        axios.post('https://media-diary-25762.firebaseio.com/suggestions.json', movData)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
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
                    title: response.data['Title'],
                    synopsis: response.data['Plot'],
                    visible: false,
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    onReset = () => {
        this.formRef.current.resetFields();
      };

    render() {

        let form = (
            <div>
                <Form onFinish={this.submitMovieData} hideRequiredMark={true} >
                    <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                        label="Movie Title(s)"
                        name="title"
                        rules={[{ required: true, message: 'Please select a movie' }]}>
                        <AutoComplete
                            options={this.state.options}
                            onSelect={this.onTitleSelect}
                            onSearch={this.onTitleSearch}
                            open={this.state.visible} />
                    </Form.Item>

                    <Form.Item labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                        label="Your Name"
                        name="name"
                        rules={[{ required: false }]}>
                        <Input placeholder="so I can tell you when I watch it!" />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>
                            Send to Jenny</Button>
                        <Button type="default" onClick={this.onReset}>
                            Reset
                        </Button>
                    </Form.Item>

                </Form>
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
                    height={400}
                >
                    <Wrapper>
                        <img src={me} alt={'Avatar'} style={{ width: '200px', height: 'auto', float: 'left', marginRight: '40px' }} />
                        <Heading>Hi there! Thanks for viewing my quarantine media diary <span role="img" aria-label="smile" >😊</span></Heading>
                        <Body>As you can see, I have watched <em>a lot</em> of movies in the last few months. At the same time, there's still so many more amazing ones out there that I have yet to discover. If you have any suggestions on movies you think I should watch or I would like, please share them with me!</Body>
                        {form}
                    </Wrapper>
                </Drawer>
            </>
        )
    }
}

export default withErrorHandler(Suggestion, axios);