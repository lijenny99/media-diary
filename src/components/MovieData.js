import React from 'react';
import { Card } from 'antd';

const movieData = (props) => {
    const { Meta } = Card;

    return (
        <Card className="MovieCard"
            cover={
                <img style={{ height: '100%', width: 'auto' }}
                    alt="example"
                    src={props.poster}
                />
            }>
            <Meta
                title={props.title}
                description={props.synopsis}
                style={{ marginBottom: '15px' }}
            />{props.entry}
        </Card>
    );
};

export default movieData;