import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.less';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Register from '@/pages/Register';

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Router>
    );
  }
}
