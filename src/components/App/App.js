import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import getServerBaseUrl from '../Api';
import LoginForm from '../accounts/LoginForm/LoginForm';
import StudentDashBoard from "../StudentDashBoard/StudentDashBoard";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  getUserDetails(){
        const authString = window.localStorage.getItem('auth');
        let authTokenToDecod = _.trimStart(authString, 'Student');
        const decodedToken = jwtDecode(authTokenToDecod);
        return decodedToken.sub;
  }
  signOut(){
    const { history } = this.props;
    window.localStorage.removeItem('auth');
    history.push('login');
    window.location.reload();
  }
  authenticate(user) {
    const { history } = this.props;
    let serverUrl = getServerBaseUrl();
    serverUrl = 'https://www227.lamp.le.ac.uk';
    const apiClient = axios.create({
      baseURL: serverUrl,
    });
    apiClient.defaults.headers.post['Content-Type'] = 'application/json';
    apiClient.post('/v2/api/login', user)
      .then(({ data }) => {
        this.setState({ isAuthenticated: true });
        window.localStorage.setItem('auth',data);
        history.push('student_dash_board');
        window.location.reload();
      })
      .catch(error => console.log(error));
  }
  verifyAuthentication() {
    const storedToken = window.localStorage.getItem('auth');
    Promise.resolve()
      .then(() => Promise.resolve(_.trimStart(storedToken, 'Student')))
      .then(tokenToDecode => Promise.resolve(jwtDecode(tokenToDecode)))
      .then((decodedToken) => {
        const { exp, sub } = decodedToken;
        const userName = sub;
        if (_.round(new Date().getTime() / 1000) > exp) {
          return Promise.reject('Token is expired');
        }
        this.setState({ userName });
        return Promise.resolve('token is valid');
      })
      .catch((error) => {
        this.props.history.push('login');
        window.location.reload();
        console.log(error);
      });
  }
  render() {
    const { verifyAuthentication, authenticate, getUserDetails, signOut } = this;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/login'
            render={props => (<LoginForm {...props} signIn={authenticate}/>)}
          />
          <Route
            exact
            path='/'
            render={props => (<LoginForm {...props} signIn={authenticate}/>)}
          />
          <Route
            exact
            path='/student_dash_board'
            render={props => (
              <StudentDashBoard
                {...props}
                verifyAuthentication={verifyAuthentication}
                getUserDetailsHandler={getUserDetails}
                signOutHandler={signOut}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
