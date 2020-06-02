import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

import NavigationPane from './components/Navigation';
import Books from './components/Books';
import Movies from './components/Movies';
import Landing from './components/Landing';
import Login from './components/Login';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavigationPane isAuthenticated={true}/>
          <Switch>
              <Route path="/movies" component={Movies} />
              <Route path="/books" component={Books} />
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Landing} />
              <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
