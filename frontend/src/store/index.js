import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './ducks';

const middlewares = [thunk];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(reducers);