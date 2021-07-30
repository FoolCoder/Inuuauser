import {createStore,combineReducers} from 'redux';

import detailsReducer from '../reducers/details';

const rootReducer=combineReducers({
  details:detailsReducer
});

const configureStore=()=>{
  return createStore(rootReducer);
}

export default configureStore;