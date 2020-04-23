import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faUpload, faStopCircle, faForward, faBackward, faPause, faPlay, faBullhorn, faSlidersH, faTimes, faCaretDown} from '@fortawesome/free-solid-svg-icons'

import Auth from './auth/Auth.jsx';
import Index from './index/Index.jsx';
import './App.css';
import Bot from './bot/Bot.jsx';

library.add(fab, faCheckSquare, faUpload, faStopCircle, faForward, faBackward, faPause, faPlay, faBullhorn, faSlidersH, faTimes, faCaretDown)

const store = createStore(reducer,applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/bot" component={Bot}>
          </Route>
          <Route path="/auth" component={Auth}>
          </Route>
          <Route path="/" component={Index}>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
