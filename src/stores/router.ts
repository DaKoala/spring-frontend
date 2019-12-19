import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

/**
 * Router store is necessary for Single Page Application
 */
const browserHistory = createBrowserHistory();
export default RouterStore;
export const routerStoreInstance = new RouterStore();
export const history = syncHistoryWithStore(browserHistory, routerStoreInstance);
