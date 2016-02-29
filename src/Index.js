import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import App from './components/App'
import PoweredBy from './components/Powered-by'
import About from './components/About'
import Comments from './components/Comments'

window.React = React;

render(
  (<Router>
    <Route path="/" component={App}>
      <Route path="/comments" component={Comments}/>
      <Route path="/about" component={About}/>
      <Route path="/poweredby" component={PoweredBy}/>
    </Route>
  </Router>), document.getElementById('content')
);
