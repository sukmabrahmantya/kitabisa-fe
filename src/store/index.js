import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
);

export default createStore(reducer, composedEnhancer)