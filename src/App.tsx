import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './index.less';
import { viewPatientInfo } from '@/service';
import { getToken } from '@/service/cookie';
import { userStoreInstance } from '@/stores/user';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import User from '@/pages/User';

export default class App extends React.PureComponent {
  async componentDidMount() {
    const token = getToken();
    if (token) {
      await viewPatientInfo();
    }
  }

  render() {
    return (
      <Provider userStore={userStoreInstance}>
        <Router>
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
