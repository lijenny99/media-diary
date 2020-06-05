import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Search = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = searchText => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = data => {
    console.log('onSelect', data);
  };

  const onChange = data => {
    setValue(data);
  };

  let suggests = new Bloodhound({
    datumTokenizer: function(datum) {
      return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
      filter: function(movies) {
        // Map the remote source JSON array to a JavaScript object array
        return $.map(movies.results, function(movie) {
          return {
            value: movie.original_title, // search original title
            id: movie.id // get ID of movie simultaniously
          };
        });
      } 
    } 
  });

  suggests.initialize(); // initialise bloodhound suggestion engine

  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 2
  }, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
    this.fetchMovieID(datum.id)
  }.bind(this));

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: '100%',
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
      />
    </>
  );
};

export default Search