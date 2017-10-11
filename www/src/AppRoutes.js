import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';
import WordSearchBar from './components/WordSearchBar';

const AppRoutes = () => (
  <Grid>
    <Grid.Row style={{ margin: 10 }}>
      <Grid.Column>
        <Route path='/' component={WordSearchBar} />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Route exact path='/' component={WordList} />
        <Route path='/word/:word' component={WordDetail} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default AppRoutes;