import React from 'react';
import { Card, Button } from 'antd';

const movieData = (props) => {
    const { Meta } = Card;

    let newTitle = props.title + " (" + props.rating + "/5)"

    let buttonDisplay = null
    if (props.spoilers) {
        buttonDisplay = (
            <Button className="center-button">View Spoilers</Button>
        )
    }

    return (
        <Card className="MovieCard"
            cover={
                <img style={{ height: '300px', width: 'auto' }}
                    alt="example"
                    src={props.poster}
                />
            }>
            <Meta
                title={newTitle}
                description={props.synopsis}
                style={{ marginBottom: '15px' }}
            />
            <div style={{ position: 'relative' }}>
                {buttonDisplay}
                <p className={(props.spoilers ? 'blurry-text' : null)}>{props.entry}</p>
            </div>
        </Card>
    );
};

export default movieData;