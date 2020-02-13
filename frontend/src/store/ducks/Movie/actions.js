import api from '../../../services/api';

function requestMoviesStart() {
    return {
        type: 'REQUEST_MOVIES_START'
    }
}

function requestMoviesDone() {
    return {
        type: 'REQUEST_MOVIES_DONE'
    }
}

function requestMoviesFail(message) {
    return {
        type: 'REQUEST_MOVIES_FAIL',
        message: message
    }
}

function setMovies(payload) {
    return {
        type: 'FETCH_MOVIES',
        payload
    }
}

function addMovie(payload) {
    return {
        type: 'ADD_MOVIE',
        payload
    }
}

function setMovie(payload) {
    return {
        type: 'SET_MOVIE',
        payload
    }
}


function editMovie(payload) {
    return {
        type: 'EDIT_MOVIE',
        payload
    }
}

function deleteMovie(payload) {
    return {
        type: 'DELETE_MOVIE',
        payload
    }
}

export function fetchMoviesAsync() {
    return dispatch => {
        dispatch(requestMoviesStart())
        api.get('/').then(response => {            
            dispatch(setMovies(response.data.data));
            dispatch(requestMoviesDone());
        }).catch(error => {
            dispatch(requestMoviesFail(error.message));
        })
    }
}

export function createMovieAsync(object) {
    return dispatch => {
        dispatch(requestMoviesStart())
        api.post('/movie', object).then(response => {            
            dispatch(addMovie(response.data));
            dispatch(requestMoviesDone());
        }).catch(error => {
            dispatch(requestMoviesFail(error.message));
        })
    }
}

export function showMovieAsync(id) {
    return dispatch => {
        dispatch(requestMoviesStart())
        api.get(`/movie/${id}`).then(response => {                 
            dispatch(setMovie(response.data.data));
            dispatch(requestMoviesDone());               
        }).catch(error => {
            dispatch(requestMoviesFail(error.message));
        })
    }
}

export function updateMovieAsync(id, object) {
    return dispatch => {
        dispatch(requestMoviesStart());
        api.put(`/movie/${id}`, object).then((response) => {                        
            dispatch(requestMoviesDone());
        }).catch(error => {
            dispatch(requestMoviesFail(error.message));
        })
    }
}

export function deleteMovieAsync(id) {
    return dispatch => {
        dispatch(requestMoviesStart())
        api.delete(`/movie/${id}`).then((response) => {                        
            dispatch(deleteMovie(response.data.data))
            dispatch(requestMoviesDone())
        }).catch(error => {
            dispatch(requestMoviesFail(error.message));
        })
    }
}