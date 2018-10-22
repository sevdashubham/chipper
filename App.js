import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './Router';


export default class App extends Component<Props> {
  render() {
      const store = createStore(reducers, {}, applyMiddleware(thunk));
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
  }
}
