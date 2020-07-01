import React, { useState } from 'react';
import styled from "styled-components"

import { Modal, Button } from 'antd';

const Wrapper = styled.div`
    margin-left: 30px;
    margin-right: 30px;
`;

const MoviePoster = styled.img`
    cursor: pointer;
    height: 225px;
    width: 150px;
    margin-bottom: 20px;
    border-radius: 5px;
    text-align: left;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
        box-shadow: 0 10px 70px 0 rgba(0, 0, 0, 0.5);
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        transform: scale(1.25,1.25) translateY(-50px)
    }
`;

const MovieTitle = styled.p`
    font-weight: 600;
    margin-bottom: 30px;
`;

const MovieModal = styled(Modal)`

`

const Heading = styled.h2`
    font-size: 24px;
    font-weight: bold;
`

const Synopsis = styled.p`
    font-style: italic;
`

const FeaturedPoster = styled.img`
    float: left;
    margin-right: 30px;
    margin-top: -70px;
    border-radius: 10px;
    height: 350px;
    width: 225px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.5);
`

function MovieData(props) {
    const [visible, toggleVisible] = useState(false);

    const [clicked, handleClick] = useState(false);

    let buttonDisplay = null
    if (props.spoilers && !clicked) {
        buttonDisplay = (
            <Button className="center-button" onClick={() => handleClick(true)}>View Spoilers</Button>
        )
    }

    const showModal = () => {
        toggleVisible(true);
    };

    const handleCancel = e => {
        toggleVisible(false);
    };

    return (
        <Wrapper>
            <MoviePoster
                alt="Movie poster"
                src={props.poster}
                onClick={showModal}
            />
            <MovieModal
                title={null}
                closable={false}
                footer={null}
                visible={visible}
                width={'60%'}
                centered
                onCancel={handleCancel}
                maskStyle={{
                    backdropFilter: 'blur(4px)',
                    webkitFilter: 'blur(4px)'
                }}
            >
                <div>
                    <FeaturedPoster
                        alt="Movie Poster"
                        src={props.poster} />
                    <Heading>{props.title}</Heading>
                    <Synopsis>{props.synopsis}</Synopsis>
                        <p className={
                            !props.spoilers ? 'entry' :
                                [
                                    !clicked ? 'blurry-text entry' : 'entry'
                                ]
                        }>  {buttonDisplay}
                            {props.entry}</p>
                </div>
            </MovieModal>
            <MovieTitle>{props.title}</MovieTitle>
        </Wrapper>
    );
};

export default MovieData;

