import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Grid, Segment, Loader, Icon, Header } from 'semantic-ui-react';
import Dictionary from './components/Dictionary';
import WordStore from './components/WordStore';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';
import WordSearchBar from './components/WordSearchBar';

class App extends Component {
  state = {
    loading: false,
    currentWord: undefined,
    wordCache: {}
  }

  loadWord = ({ word, history, addToIndex, getWord, findWord, visitWord }) => {
    if (typeof word !== 'string' || word.trim().length === 0) {
      return
    }

    this.setState({ loading: true });

    // Cambridge dictionary doesn't understand spaces
    word = word.replace(/\s/g, '-').toLowerCase();

    const indexWord = getWord(word);
    const cacheWord = this.state.wordCache[word];

    if (cacheWord) {
      this.setState({
        loading: false,
        currentWord: cacheWord
      });
    } else {
      findWord(word).then(wordObj => {
        const { wordCache } = this.state;
        this.setState({
          wordCache: {
            ...wordCache,
            [word]: wordObj
          },
          currentWord: wordObj
        });
      });
    }

    if (!indexWord) {
      addToIndex(word);
    }

    visitWord(word);
    
    history.push(`word/${word}`);
  }

  removeWord = ({ word, removeFromIndex }) => {
    word = word.replace(/\s/g, '-').toLowerCase();
    
    removeFromIndex(word);
  }

  render() {
    return (
      <Dictionary>
        {({ findWord, getSuggestions }) =>
          <WordStore>
            {({ addToIndex, getWord, visitWord, removeFromIndex }) => 
              <Grid>
                <Grid.Row style={{ margin: 10 }}>
                  <Grid.Column>
                    <Route path='/' render={({ history }) => 
                      <WordSearchBar
                        getSuggestions={getSuggestions}
                        onSelect={ word => 
                          this.loadWord({
                            word,
                            history,
                            addToIndex,
                            getWord,
                            findWord,
                            visitWord
                          })
                        }/>
                    }/>
                  </Grid.Column>
                </Grid.Row>
    
                <Grid.Row>
                  <Grid.Column>
                    <Route exact path='/' render={({ history }) => 
                      <Segment basic>
                        <WordList 
                          words={ getWord() } 
                          onItemClick={({ word }) => 
                            this.loadWord({
                              word,
                              history,
                              addToIndex,
                              getWord,
                              findWord,
                              visitWord
                            })
                          }
                          onItemRemove={({ word }) => this.removeWord({ word, removeFromIndex }) }
                        />
                      </Segment>
                    }/>
                    <Route path='/word/:word' render={ ({ match }) => {
                      const { currentWord, loading } = this.state;
                      if (!currentWord) {
                        if (loading) return (<Loader>Loading</Loader>);
                        
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
                              {currentWord.word}
                            </Header.Content>
                          </Header>

                          <WordDetail word={currentWord} />
                        </div>
                      );
                    }} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
          </WordStore>
        }
      </Dictionary>
    );
  }
}

export default App;