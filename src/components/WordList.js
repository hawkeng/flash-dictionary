import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wordAPI from '../lib/word.api';

class WordList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      words: []
    };
  }
  
  async componentDidMount() {
    const words = await wordAPI.find();
    this.setState({ words });
  }
  
  render() {
    return (
      <ul>
        {this.state.words.map(word => (
          <li key={word.id}>
            <Link to={`/word/${word.id}`}>{word.word}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default WordList;