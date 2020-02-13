import React, { Component } from 'react';

import {
  Container,
  Row, 
  Col
} from 'react-bootstrap'

import NavBar from './navigation'
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavBar />
        <Container>
          <Row>
            <Col md={12}>
              <div className='wrapper'>
                <Routes />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
