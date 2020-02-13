import React, { Component } from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MoviesActions from '../../store/ducks/Movie/actions';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class MoviesUpdate extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            id: this.props.match.params.id,
            name: '',
            rating: '',
            time: '',
        }
    }

    componentDidMount() {
        const { movie } = this.props.location.state
        this.setState({
            name: movie.name,
            rating: movie.rating,
            time: movie.time.join(',')
        })   
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleUpdateMovie = async () => {
        const { id, name, rating, time } = this.state
        const arrayTime = time.split(',');
        const payload = { name, rating, time: arrayTime }
        
        await this.props.updateMovieAsync(id, payload);
        this.props.history.goBack();
    }

    render() {        
        const { name, rating, time } = this.state;

        return (
            <Wrapper>
                <Title>Edit Movie</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={rating}
                    onChange={this.handleChangeInputRating}
                />

                <Label>Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.handleChangeInputTime}
                />

                <Button onClick={this.handleUpdateMovie}>Update Movie</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>
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
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesUpdate));


