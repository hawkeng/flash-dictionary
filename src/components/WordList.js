import React, { Component } from 'react';
import wordAPI from '../word.api';

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
        {this.state.words.map(word => <li>{word.word}</li>)}
      </ul>
    );
  }
}

export default WordList;