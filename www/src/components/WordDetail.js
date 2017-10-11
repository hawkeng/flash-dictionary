import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Container } from 'semantic-ui-react';
import wordAPI from '../lib/word.api';

class WordDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
    
    if (props.word !== undefined) {
      this.state = { word: props.word };
    } else if (props.match !== undefined && props.match.params.word !== undefined) {
      this.state = { lookup: props.match.params.word };
    }
  }
  
  async componentDidMount() {
    if (this.state.word === undefined) {
      const word = await wordAPI.find({ word: this.state.lookup });
      this.setState({ word, lookup: null });
    }
  }
  
  render() {
    const { word } = this.state;
    
    if (!word) {
      return (
        <div>
          <Link to='/'>
            <Icon name='angle left' size='large' />
          </Link>
          Word not found
        </div>
      );
    }
    
    return (
      <div>
        <Header as='h2'>
          <Link to='/'>
            <Icon name='angle left' />
          </Link>
          <Header.Content>
            {word.word}
          </Header.Content>
        </Header>
      
        <Divider />
      
        <Container textAlign='justified'>
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
        </Container>
      </div>
    );
  }
}

export default WordDetail;