const initialState = {
    data: [],
    movie: {},
    message: '',
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_MOVIES_START':
            return { ...state, isLoading: true }
        case 'ADD_MOVIE':
            return { ...state, data: [ ...state.data, ...action.payload ]}
        case 'FETCH_MOVIES':                      
            return { ...state, data: action.payload }        
        case 'SET_MOVIE':            
            return { ...state, movie: action.payload, isLoading: false }        
        case 'EDIT_MOVIE':
            return { 
                ...state, 
                data: state.data.map((movie) => movie._id === action.payload._id ? { ...movie, ...action.payload } : movie)
            }
        case 'DELETE_MOVIE':
            return { ...state, data: state.data.filter((movie) => movie._id !== action.payload._id)}
        case 'REQUEST_MOVIES_DONE':
            return { ...state, isLoading: false }
        case 'REQUEST_MOVIES_FAIL':
            return {
                ...state,
                isLoading: false,
                message: action.message
            }
        default:
            return state
    }
}