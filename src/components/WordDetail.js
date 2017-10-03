import React, { Component } from 'react';
import wordAPI from '../word.api';

class WordDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
    
    if (props.word !== undefined) {
      this.state = { word: props.word };
    } else if (props.match !== undefined && props.match.params.id !== undefined) {
      this.state = { wordId: props.match.params.id };
    }
  }
  
  async componentDidMount() {
    if (this.state.word === undefined) {
      const word = await wordAPI.find({ id: this.state.wordId });
      this.setState({ word });
    }
  }
  
  render() {
    const { word } = this.state;
    
    if (word === undefined) {
      return <div>Word not found</div>;
    }
    
    return (
      <div>
        <h2>{word.word}</h2>
        <hr />
        <div>
          {word.definitions.map((def, i) => (
            <div key={i}>
              <span>{`(${ def.type })`}</span>
              <span>{def.definition}</span>
              <p>{def.translation}</p>
              <div>
                {def.examples.map((example, i) => <p key={i}>{example}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default WordDetail;