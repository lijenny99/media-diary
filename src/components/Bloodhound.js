var suggests = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../data/films/post_1960.json',
    remote: {
      url: '../data/films/queries/%QUERY.json',
    }
  });
  
  $('#remote .typeahead').typeahead(null, {
    name: 'best-pictures',
    display: 'value',
    source: suggests
  });