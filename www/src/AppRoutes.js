import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';
import WordSearchBar from './components/WordSearchBar';

const AppRoutes = () => (
  <Container>
    <Header>
      <Route path='/' component={WordSearchBar} />
    </Header>

    <Route exact path='/' component={WordList} />
    <Route path='/word/:id' component={WordDetail} />
  </Container>
);

export default AppRoutes;