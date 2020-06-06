let movieSuggestions = new Bloodhound({
    datumTokenizer: function (datum) {
      return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
      filter: function (movies) {
        // Map the remote source JSON array to a JavaScript object array
        return $.map(movies.results, function (movie) {
          return {
            value: movie.original_title, // search original title
            id: movie.id // get ID of movie simultaniously
          };
        });
      }
    }
  });

  movieSuggestions.initialize(); // initialise bloodhound suggestion engine

  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 2
  }, { source: movieSuggestions.ttAdapter() }).on('typeahead:selected', function (obj, datum) {
    this.fetchMovieID(datum.id)
  }.bind(this));