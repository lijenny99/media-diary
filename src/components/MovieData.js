import React, { useState } from 'react';
import styled from "styled-components"
// import { Card, Button } from 'antd';

const MoviePoster = styled.img`
    cursor: pointer;
    height: 225px;
    width: 150px;
    margin-right: 70px;
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

function MovieData(props) {

    // const { Meta } = Card;
    // const [clicked, handleClick] = useState(false);

    // let newTitle = props.title + " (" + props.rating + "/5)"

    // let buttonDisplay = null
    // if (props.spoilers && !clicked) {
    //     buttonDisplay = (
    //         <Button className="center-button" onClick={() => handleClick(true)}>View Spoilers</Button>
    //     )
    // }

    return (
        <div style={{ }}>
            <MoviePoster
                alt="Movie poster"
                src={props.poster}
            />
            <MovieTitle>{props.title}</MovieTitle>
        </div>

        // <Card className="MovieCard"
        //     cover={
        //         <img style={{ height: '300px', width: 'auto' }} // make this more dynamic
        //             alt="example"
        //             src={props.poster}
        //         />
        //     }>
        //     <Meta
        //         title={newTitle}
        //         description={props.synopsis}
        //         style={{ marginBottom: '15px'}}
        //     />
        //     <div style={{ position: 'relative' }}>
        //         {buttonDisplay}
        //         <p className={
        //             !props.spoilers ? null :
        //             [
        //                 !clicked ? 'blurry-text' : null
        //             ]
        //         }>{props.entry}</p>
        //     </div>
        // </Card>
    );
};

export default MovieData;