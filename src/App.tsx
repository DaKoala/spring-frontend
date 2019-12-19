import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './index.less';
import { viewPersonalInfo } from '@/service';
import { getToken } from '@/service/cookie';
import { userStoreInstance } from '@/stores/user';
import { routerStoreInstance, history } from '@/stores/router';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import User from '@/pages/User';

/**
 * Paths in this list can be accessed without authorization
 */
const whiteListPaths = [
  '/',
];

/**
 * The root component, which is the parent of all components
 */
export default class App extends React.PureComponent {
  async componentDidMount() {
    /**
     * If not authorized, redirect to the home page
     */
    if (!whiteListPaths.includes(routerStoreInstance.location.pathname)) {
      routerStoreInstance.replace('/');
    }
    const token = getToken();
    if (token) {
      await viewPersonalInfo();
      routerStoreInstance.push('/user');
    }
  }

  /**
   * The provider inject the store as props of its all children
   * The router render components dynamically
   */
  render() {
    return (
      <Provider
        userStore={userStoreInstance}
        routerStore={routerStoreInstance}
      >
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={User} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
