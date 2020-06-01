import React from 'react';
import { Card } from 'antd';

const movieData = (props) => {
    const { Meta } = Card;


    let newTitle = props.title + " (" + props.rating + "/5)"

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
                style={{ marginBottom: '15px'}}
            />
            {props.entry}
        </Card>
    );
};

export default movieData;