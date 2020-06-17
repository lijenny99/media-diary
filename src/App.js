import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {useDarkMode} from './components/useDarkMode';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

import Toggler from "./components/Toggler"

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';

import * as actions from './store/actions';

// import NavigationPane from './components/Navigation';
import Movies from './components/Movies';
import Landing from './components/Landing';
import Login from './components/Login';
import Logout from './containers/Logout';

const App = () => {
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Landing} />
      <Redirect to="/" />
    </Switch>

  )

  if (true) {
    routes = (
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />
      </Switch>
    )
  }

  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <div className="App">
        {/* <NavigationPane isAuthenticated={this.props.isAuth} /> */}
        <Toggler theme={theme} toggleTheme={themeToggler} />
        {routes}
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
