import React, { Component } from 'react';
import Slider from 'react-slick';

import MovieData from '../components/MovieData';
import axios from 'axios'
import withErrorHandler from '../hoc/withErrorHandler';

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
            pauseOnHover: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500
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