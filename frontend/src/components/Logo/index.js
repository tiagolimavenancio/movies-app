import React, { Component } from 'react'
import styled from 'styled-components';
import logo from '../../assets/logo-08.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href='https://sambarros.com'>
                <img src={logo} width="90" height="50" alt='https://sambarros.com' />
            </Wrapper>
        )
    }
}

export default Logo;