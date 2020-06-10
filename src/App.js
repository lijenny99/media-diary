import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';

import * as actions from './store/actions';

import NavigationPane from './components/Navigation';
import Books from './components/Books';
import Movies from './components/Movies';
import Landing from './components/Landing';
import Login from './components/Login';
import Logout from './containers/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />
      </Switch>

    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/books" component={Books} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Landing} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className="App">
        <NavigationPane isAuthenticated={this.props.isAuth} />
        {routes}
      </div>
    )
  }
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
