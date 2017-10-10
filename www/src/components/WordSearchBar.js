import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import dictionary from '../lib/dictionary';

class WordSearchBar extends Component {
    state = { loading: false };

    handleChange = (event) => {

    };

    render() {
        return (
            <Input 
                loading={this.state.loading}
                placeholder='Search for word'
                onChange={this.handleChange} />
        );
    }
}

export default WordSearchBar;