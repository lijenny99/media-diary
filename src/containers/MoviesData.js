import React, { Component } from 'react';
import Slider from 'react-slick';

import MovieData from '../components/MovieData';
import axios from 'axios'
import withErrorHandler from '../hoc/withErrorHandler';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

class MoviesData extends Component {
    state = {
        movies: [],
    }

    componentDidMount() {
        axios.get('https://media-diary-25762.firebaseio.com/movies.json')
            .then(res => {
                const fetchedMovies = [];
                for (let key in res.data) {
                    fetchedMovies.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ movies: fetchedMovies });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 6,
            slidesToScroll: 6,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        let slides = (
            this.state.movies.sort(function (a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            }).map(movie => (
                <MovieData
                    key={movie.id}
                    title={movie.title}
                    poster={movie.posterImg}
                    rating={movie.rating}
                    spoilers={movie.spoilers}
                    entry={movie.entry}
                    synopsis={movie.synopsis} />
            ))
        )

        return (
            <div>
                {this.state.movies != null && this.state.movies.length > 0 &&
                    <Slider {...settings}>
                        {slides}
                    </Slider>
                }
            </div>
        );
    }
}

export default withErrorHandler(MoviesData, axios);