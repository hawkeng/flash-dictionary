import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

class WordSearchBar extends Component {
  state = {
    loading: false,
    results: [],
    value: ''
  };

  handleChange = async (event, { value }) => {
    this.setState({ value, loading: true });
    
    const results = (await this.props.getSuggestions(value))
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
    this.props.onSelect(result.title);
  };

  handleOnBlur = () => {
    this.setState({ 
      value: '',
      results: [],
      loading: false 
    });
  }

  render() {
    const { loading, value, results } = this.state;

    return (
      <Search 
        loading={loading}
        placeholder='Search for word'
        onSearchChange={this.handleChange}
        onResultSelect={this.handleSelect}
        /* onBlur={this.handleOnBlur} */
        results={results}
        value={value}
        minCharacters={2}
        input={{ fluid: true }}
        size='large'
        fluid={true} />
    );
  }
}

export default WordSearchBar;