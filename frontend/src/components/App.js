import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers/reducers'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FloatingMenu from './floating-menu/FloatingMenu.jsx'
import Auth from './auth/Auth.jsx'
import Index from './index/Index.jsx'
import './App.css';

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/bot">
            <FloatingMenu/>
          </Route>
          <Route path="/auth" component={Auth}>
          </Route>
          <Route path="/">
            <Index/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
