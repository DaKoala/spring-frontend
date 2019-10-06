import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.less';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import User from '@/pages/User';

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
