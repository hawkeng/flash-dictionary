import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Container, Segment } from 'semantic-ui-react';
import wordAPI from '../lib/word.api';
import './WordDetail.css';

class WordDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
    
    if (props.match !== undefined && 
        props.match.params.word !== undefined) {

      this.state = { lookup: props.match.params.word };
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.match !== undefined && 
        nextProps.match.params.word !== this.state.word.word) {

      const word = await wordAPI.find({ word: nextProps.match.params.word });
      this.setState({ word });
    }
  }
  
  async componentDidMount() {
    const word = await wordAPI.find({ word: this.state.lookup });
    this.setState({ word, lookup: null });
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

        <div>{word.definitions.length} Definitions</div>

        <Divider />
      
        <Container textAlign='justified'>
          {word.definitions.map((def, i) => (
            <div key={i}>
              <span className='word-type'>
                {`(${ def.type })`}
              </span>

              <span className='definition'>{def.definition}</span>

              <p className='translation'>{def.translation}</p>
              
              <Segment basic>
                {def.examples && def.examples.map((example, i) => 
                  <q key={i}>{example}</q>
                )}
              </Segment>

              {i !== (word.definitions.length - 1) ? <Divider /> : null}
            </div>
          ))}
        </Container>
      </div>
    );
  }
}

export default WordDetail;