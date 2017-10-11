import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Icon } from 'semantic-ui-react';
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
      <Segment basic>
        <List divided relaxed='very' size='large'>
          {this.state.words.map((word, i) => (
            <List.Item key={i}>
              <List.Content floated='right'>
                <Icon color='yellow' name='star' />
              </List.Content>
              <List.Content>
                <List.Header>
                  <Link to={`/word/${word.word}`}>{word.word}</Link>
                </List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }
}

export default WordList;