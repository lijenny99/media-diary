import React from 'react';
import MoviesData from '../containers/MoviesData';

const Landing = (props) => {
    return (
        <div>
            <div className="LandingText">
                <h4>Jenny's Quarantine Movie Diary</h4>
                <h1>What I've Been Watching</h1></div>
            <MoviesData />
        </div>
    )

};

export default Landing;