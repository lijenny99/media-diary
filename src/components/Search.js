import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';

const Search = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [visible, setVisibility] = useState(false);

  const onSearch = searchText => {
    if (searchText.length > 2) {
      setVisibility(true);
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=9523b359a5faa28ea6054e5c5c0a7582&query=' + searchText)
        .then(response => {
          setOptions([{ value: response.data.results[0].title },
          { value: response.data.results[1].title },
          { value: response.data.results[2].title },
          { value: response.data.results[3].title },
          { value: response.data.results[4].title }])
        }).catch(err => console.log(err))
    }
    else {
      setVisibility(false);
    }
  };

  const onSelect = data => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: '100%',
        }}
        onSelect={onSelect}
        onChange={onChange}
        onSearch={onSearch}
        open={visible}
      />
    </>
  );
};

export default Search