import React, { useState } from 'react';
import { Card, Button } from 'antd';

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
        <div style={{display: 'inline-block'}}>
            <img className="MoviePoster" 
                alt="Movie poster"
                src={props.poster}
            />
            <p className="MovieTitle">{props.title}</p>
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