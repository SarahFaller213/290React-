import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import AdminPage from '../Admin';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import DashboardPage from '../Dashboard';
import ProfilePage from '../Profile';
import ProfileEdit from '../EditProfile'

import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
  }
    
    
  render() {
    return (
  <Router>
    <div>
      <Navigation authUser={this.state.authUser} />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.EDIT} component={ProfileEdit} />

    </div>
  </Router>
    );
  }
}

export default withFirebase(App);