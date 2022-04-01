import { combineReducers } from 'redux';
import campaign from './campaign/slice';

const reducer = combineReducers({
  campaign
});

export default reducer;