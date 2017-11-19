import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import Dismissable from './Dismissable';

const WordList = ({ words, onItemClick, onItemRemove }) => {
  return (
    <List divided relaxed='very' size='large'>
      {words.map((word) => (
        <List.Item key={word.id}>
          <List.Content floated='right'>
            <Icon color='yellow' name='star' />
          </List.Content>
          <Dismissable onDismiss={() => onItemRemove(word)}>
            <List.Content>
              <List.Header as='a' onClick={() => onItemClick(word)}>{word.word}</List.Header>
            </List.Content>
          </Dismissable>
        </List.Item>
      ))}
    </List>
  );
};

export default WordList;