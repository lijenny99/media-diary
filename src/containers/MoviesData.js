import React, { Component } from 'react';

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
        return (
            <div>
                {this.state.movies.sort(function (a, b) {
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
                ))}
            </div>
        );
    }
}

export default withErrorHandler(MoviesData, axios);