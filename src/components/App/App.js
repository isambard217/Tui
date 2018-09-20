import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import getServerBaseUrl from '../Api';
import LoginForm from '../accounts/LoginForm/LoginForm';
import StudentDashBoard from '../StudentDashBoard/StudentDashBoard';
import TeacherDashBorad from '../TeacherDashBoard';
import AccessDenied from '../AccessDenied';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: false,
      isAuthorized: false,
    };
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.verifyAuthorization = this.verifyAuthorization.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  getUserDetails() {
    const authString = window.localStorage.getItem('auth');
    const authTokenToDecode = _.trimStart(authString, 'ApiUser');
    const decodedToken = jwtDecode(authTokenToDecode);
    this.setState({ user: decodedToken });
    return decodedToken;
  }
  signOut() {
    const { history } = this.props;
    window.localStorage.removeItem('auth');
    history.push('login');
    window.location.reload();
  }
  authenticate(user) {
    const { history } = this.props;
    const serverUrl = getServerBaseUrl();
    const apiClient = axios.create({
      baseURL: serverUrl,
    });
    apiClient.defaults.headers.post['Content-Type'] = 'application/json';
    apiClient.post('/v2/api/login', user)
      .then(({ data }) => {
        this.setState({ isAuthenticated: true });
        window.localStorage.setItem('auth', data);
        const { authorities } = this.getUserDetails();
        if (authorities.length === 2) { history.push('teacher_dash_board'); }
        if (authorities.length === 1) { history.push('student_dash_board'); }
        window.location.reload();
      })
      .catch(error => console.log(error));
  }
  verifyAuthentication() {
    const storedToken = window.localStorage.getItem('auth');
    Promise.resolve()
      .then(() => Promise.resolve(_.trimStart(storedToken, 'ApiUser')))
      .then(tokenToDecode => Promise.resolve(jwtDecode(tokenToDecode)))
      .then((decodedToken) => {
        const { exp } = decodedToken;
        if (_.round(new Date().getTime() / 1000) > exp) {
          return Promise.reject('Token is expired');
        }
        this.setState({ user: decodedToken });
        return Promise.resolve('token is valid');
      })
      .catch((error) => {
        this.props.history.push('login');
        window.location.reload();
        console.log(error);
      });
  }
  verifyAuthorization(componentName) {
    const storedToken = window.localStorage.getItem('auth');
    const authorizedAccess = 'Authorized access ... ';
    const decodedToken = jwtDecode(_.trimStart(storedToken, 'ApiUser'));
    const { authorities } = decodedToken;
    let isAdmin = false;
    Promise.all(_.map(authorities, ({ authority }) => {
      if (!isAdmin) {
        if (authority === 'ROLE_USER_PRIVILEGE' && componentName === 'student_dash_board') {
          return Promise.resolve(authorizedAccess);
        }
        if (authority === 'ROLE_ADMIN_PRIVILEGE') {
          isAdmin = true;
          return Promise.resolve(authorizedAccess);
        }
        return Promise.reject('Access is denied ...');
      }
      return Promise.resolve('Authorized access ... ');
    }))
      .then(authrizationResult => Promise.resolve(authrizationResult[0]))
      .catch((error) => {
        console.log(error);
        this.props.history.push('access_denied');
        window.location.reload();
      });
  }
  render() {
    const {
      verifyAuthentication,
      authenticate,
      getUserDetails,
      signOut,
      verifyAuthorization } = this;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/login'
            render={props => (<LoginForm {...props} signIn={authenticate} />)}
          />
          <Route
            exact
            path='/'
            render={props => (<LoginForm {...props} signIn={authenticate} />)}
          />
          <Route
            exact
            path='/student_dash_board'
            render={props => (
              <StudentDashBoard
                {...props}
                verifyAuthentication={verifyAuthentication}
                verifyAuthorization={verifyAuthorization}
                getUserDetailsHandler={getUserDetails}
                signOutHandler={signOut}
              />
            )}
          />
          <Route
            exact
            path='/teacher_dash_board'
            render={props => (
              <TeacherDashBorad
                {...props}
                verifyAuthentication={verifyAuthentication}
                verifyAuthorization={verifyAuthorization}
                getUserDetailsHandler={getUserDetails}
                signOutHandler={signOut}
              />
            )}
          />
          <Route
            exact
            path='/access_denied'
            render={props => (<AccessDenied {...props} />)}
          />
        </Switch>
      </Router>
    );
  }
}
App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
export default App;
