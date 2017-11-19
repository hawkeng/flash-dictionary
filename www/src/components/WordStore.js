import React, { Component } from 'react';
import * as firebase from 'firebase';
import config from '../config';

class WordStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordIndex: {},
    };

    this.storeRef = this.initRemoteStore();
  }

  componentDidMount() {
    this.storeRef.once('value', snapshot => {
      this.setState({
        wordIndex: snapshot.val() || {}
      });
    });
  }

  initRemoteStore() {
    firebase.initializeApp(config.firebase);
    firebase.auth()
      .signInWithEmailAndPassword('hawkins.dom@gmail.com', 'master')
      .catch(console.error);
    
    return firebase.database().ref('/wordIndex');
  }

  getIndexKey = (word) => word.replace(/[.$#[\]/]/g, '-')

  getWord = (word) => {
    if (word) {
      return this.state.wordIndex[ this.getIndexKey(word) ];
    }
    return Object.values(this.state.wordIndex);
  }

  addToIndex = (word) => {
    const key = this.getIndexKey(word);
    const { wordIndex: oldIndex } = this.state;
    const newIndex = {
      ...oldIndex,
      [key]: {
        id: key,
        word,
        createdAt: new Date(),
        visited: 1,
        priority: 0
      }
    };
    this.storeRef.update(newIndex);
    this.setState({ wordIndex: newIndex });
  }

  visitWord = (word) => {
    const key = this.getIndexKey(word);
    const { wordIndex: oldIndex } = this.state;
    const oldWord = oldIndex[key];
    const newIndex = {
      ...oldIndex,
      [key]: {
        ...oldWord,
        visited: oldWord.visited + 1
      }
    };
    this.storeRef.update(newIndex);
    this.setState({ wordIndex: newIndex });
  }

  render() {
    const { addToIndex, getWord, visitWord } = this;
    return React.Children.only(
      this.props.children({ addToIndex, getWord, visitWord })
    );
  }
}

export default WordStore;