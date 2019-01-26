import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthtoken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

//Check token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthtoken(localStorage.jwtToken);
  //decode token and set user and isAuthenticated
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check if token already expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //TODO: clear profile

    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
