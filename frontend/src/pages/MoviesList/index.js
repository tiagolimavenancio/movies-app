import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MoviesActions from '../../store/ducks/Movie/actions';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`
class MoviesList extends Component {
  constructor(props) {
    super(props);    
  }

  componentDidMount() {
    this.props.fetchMoviesAsync()     
  }

  updateMovie(row) {                   
    this.props.history.push({
      pathname : `/movies/update/${row._id}`,
      state : {
        'movie': row
      }
      } 
    );
  }

  deleteMovie(row) {        
    if (window.confirm(`Do tou want to delete the movie ${row.name} permanently?`)) {
        this.onDeleteMovie(row._id)          
    }
  }

  async onDeleteMovie(id) {
    await this.props.deleteMovieAsync(id);         
  }

  editButton(cell, row) {
    return (
      <Button variant='warning' onClick={() => this.updateMovie(row)}>Edit</Button>
    )
  }

  deleteButton(cell, row) {
    return (
      <Button variant='danger' onClick={() => this.deleteMovie(row)}>Delete</Button>
    )
  }
 
  render() {
    const { movies } = this.props;    
    
    if(movies.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Wrapper>
         <BootstrapTable data={movies.data} pagination options={{ noDataText: 'This is custom text for empty data' }}>
            <TableHeaderColumn dataField='_id' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='rating'>Rating</TableHeaderColumn>
            <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
            <TableHeaderColumn dataField='button' dataFormat={this.editButton.bind(this)}></TableHeaderColumn>
            <TableHeaderColumn dataField='button' dataFormat={this.deleteButton.bind(this)}></TableHeaderColumn>
        </BootstrapTable>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, MoviesActions), dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList));

