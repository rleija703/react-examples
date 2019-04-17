import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import catStoreConfig from './reducers/cats';

const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    return handlers[action.type] && handlers[action.type](state, action) || state;
  };
};

const catReducers = createReducer(catStoreConfig.initialState, catStoreConfig.actions)

const rootReducer = combineReducers({
  cats: catReducers,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));