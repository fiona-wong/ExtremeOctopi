import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import App from './App.jsx';
import React from 'react'

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));