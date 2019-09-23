import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.less';
import Home from '@/pages/Home';

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}
