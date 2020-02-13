import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MoviesList from './pages/MoviesList';
import MoviesInsert from './pages/MoviesInsert';
import MoviesUpdate from './pages/MoviesUpdate';
import NotFound from './pages/NotFound';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={MoviesList} />
                <Route exact path='/movies/create' component={MoviesInsert} />
                <Route exact path='/movies/update/:id' component={MoviesUpdate} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}


