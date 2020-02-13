import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from '../components/Logo';
import Links from '../components/Links';

const Container = styled.div.attrs({
    className: 'container'
})``

const Nav = styled.div.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        )
    }
}

export default NavBar;