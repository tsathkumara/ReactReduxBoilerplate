import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SessionHelper from './components/Helper/SessionHelper'

// Import all layouts
import MainLayout from './layouts/mainLayout';
import AuthLayout from './layouts/authLayout';

// Import static pages
import Home from './components/Static/Home';
import About from './components/Static/About';
import Contact from './components/Static/Contact';
import NotFound from './components/Static/NotFound';

// Import Auth User pages
import Dashboard from './components/User/Dashboard';

const MainRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <MainLayout>
          <Component {...matchProps} />
      </MainLayout>
    )} />
  )
};

const AuthRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      SessionHelper.isLoggedIn() ? (
        <AuthLayout>
            <Component {...matchProps} />
        </AuthLayout>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: matchProps.location }
        }}/>
      )
    )} />
  )
}

const Routes = () => (
  <Switch>
    <MainRoute exact path="/" component={Home}  />
    <MainRoute path="/about" component={About} />
    <MainRoute path="/contact" component={Contact} />

    <AuthRoute path="/dashboard" component={Dashboard} />
    <MainRoute path="/404" component={NotFound} />

    <MainRoute component={NotFound} />
  </Switch>
);
export default Routes;
