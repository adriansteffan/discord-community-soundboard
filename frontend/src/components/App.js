import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers/reducers'

import FloatingMenu from './floating-menu/FloatingMenu.jsx'
import './App.css';

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <FloatingMenu/>
    </Provider>
  );
}

export default App;
