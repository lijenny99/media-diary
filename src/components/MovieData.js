import React from 'react';

const movieData = ( props ) => {
    return (
        <div className="MovieDisplay">
            <h3>Title: {props.title}</h3>
            <p>Entry: {props.entry}</p>
            <img className="Poster" src={props.poster} alt="this don't work"></img>
        </div>
    );
};

export default movieData;