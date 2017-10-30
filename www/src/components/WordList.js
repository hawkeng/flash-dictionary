import React from 'react';
import { List, Icon } from 'semantic-ui-react';

const WordList = ({ words, onItemClick }) => {
  return (
    <List divided relaxed='very' size='large'>
      {words.map((word) => (
        <List.Item key={word.id}>
          <List.Content floated='right'>
            <Icon color='yellow' name='star' />
          </List.Content>
          <List.Content>
            <List.Header as='a' onClick={() => onItemClick(word)}>{word.word}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default WordList;