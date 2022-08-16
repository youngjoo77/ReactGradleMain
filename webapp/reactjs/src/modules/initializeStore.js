import { legacy_createStore as createStore } from "redux";
import rootReducer from '@modules/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const initializeStore = (initialState = {}) => {
  // createStore returns a plain object so we'll mess with it after creation.
  const store = createStore(
    // See rootReducer.createReducer for more info on this. Calling it without
    // a param creates a reducer with whatever is in rootReducer.
    rootReducer(),
    initialState,
    // NOTE: Don't put this in a prod build, just doing this for the demo.
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // composeWithDevTools 는 위에 window.... 대신 import 하여 사용함.
    composeWithDevTools()
  );

  // Create an object for any later reducers
  store.asyncReducers = {};

  // Creates a convenient method for adding reducers later
  // See withReducer.js for this in use.
  store.injectReducer = (key, reducer) => {
    // Updates the aysncReducers object. This ensures we don't remove any old
    // reducers when adding new ones.
    store.asyncReducers[key] = reducer;
    // This is the key part: replaceReducer updates the reducer
    // See rootReducer.createReducer for more details, but it returns a function.
    store.replaceReducer(rootReducer(store.asyncReducers));
    return store;
  };
  
  return store;
};

export default initializeStore;
