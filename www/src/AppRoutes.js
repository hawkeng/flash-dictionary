import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';

const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={WordList} />
    <Route path='/word/:id' component={WordDetail} />
  </Switch>
);

export default AppRoutes;