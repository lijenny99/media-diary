import React from 'react';
import MoviesData from '../containers/MoviesData';
import Suggestion from '../containers/Suggestion';

const Landing = () => {
    return (
        <div>
            <div className="LandingText">
                <h4>Jenny's Quarantine Movie Diary</h4>
                <h1>The Highlight Reel</h1></div>
            <MoviesData />
            <Suggestion />
        </div>
    )

};

export default Landing;