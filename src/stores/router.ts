import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
export default RouterStore;
export const routerStoreInstance = new RouterStore();
export const history = syncHistoryWithStore(browserHistory, routerStoreInstance);
