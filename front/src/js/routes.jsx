import React  from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';

import store from './store.js';

import App from './app.jsx';

import Template from './pages/Template.jsx';

const Routes = store => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="/template" component={Template} />
          <IndexRoute component={Template} />
        </Route>
      </Router>
    </Provider>
  )
};

export default Routes(store);
