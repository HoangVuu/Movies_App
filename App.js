/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import AppContainer from './src/navigation';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import MovieAppContainer from './movieManager/navigation';
import reducer from './movieManager/redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      {/* <AppContainer /> */}
      <MovieAppContainer />
    </Provider>
  );
};

export default App;
