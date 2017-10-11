import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Search } from 'semantic-ui-react';
import { getSuggestions } from '../lib/dictionary';

class WordSearchBar extends Component {
  state = {
    loading: false,
    results: [],
    value: ''
  };

  handleChange = async (event, { value }) => {
    this.setState({ value, loading: true });
    
    const results = (await getSuggestions(value))
      .map((item, i) => (
        {
          key: i,
          title: item.searchtext
        }
      ));
    this.setState({ results, loading: false });
  };

  handleSelect = (event, { result }) => {
    this.setState({ value: result.title });
  };

  handleSelectWithHistory = (history) => (event, { result }) => {
    this.handleSelect(event, { result });
    history.push(`/word/${result.title}`);
  };

  render() {
    const { loading, value, results } = this.state;

    return (
      <Route render={({ history }) => 
        <Search 
          loading={loading}
          placeholder='Search for word'
          onSearchChange={this.handleChange}
          onResultSelect={this.handleSelectWithHistory(history)}
          results={results}
          value={value}
          minCharacters={2}
          input={{ fluid: true }}
          size='large'
          fluid={true} />
      } />
    );
  }
}

export default WordSearchBar;