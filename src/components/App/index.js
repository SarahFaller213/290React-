import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import DashboardPage from '../Dashboard';
import ProfilePage from '../Profile';
import ProfileEdit from '../EditProfile'
import CommunityPage from '../Community'
import TokenPage from '../Token'
import IdeaPage from '../Idea'
import NewsFeedPage from '../NewsFeed'
import Mentor_IdeaPage from '../Idea_Mentor'
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      userType: ""
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      // authUser
      //   ? this.setState({ authUser: authUser.uid })
      //   : this.setState({ authUser: null });
      if(authUser){
        setTimeout(() => { 
          this.setState({ authUser: authUser.uid })
          this.props.firebase.user(this.state.authUser).once('value').then(snapshot => {
            console.log(snapshot.val().userType)
            this.setState({userType: snapshot.val().userType});
        }); 
      }, 100);
      
        
      } else {
        this.setState({ authUser: null, userType: "" });
      }
    });
  }
  componentWillUnmount() {
    this.listener();
  }
    
    
  render() {
    return (
  <Router>
    <div className = "background">
      <Navigation userType={this.state.userType} />
      <Route exact path={ROUTES.LANDING} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.EDIT} component={ProfileEdit} />
      <Route path={ROUTES.COMMUNITY} component={CommunityPage} />
      <Route path={ROUTES.TOKEN} component={TokenPage} />
      <Route path={ROUTES.IDEA_PAGE} component={IdeaPage} />
      <Route path={ROUTES.FEED} component={NewsFeedPage} />
      <Route path={ROUTES.MENTOR_IDEA_PAGE} component={Mentor_IdeaPage} />
    </div>
  </Router>
    );
  }
}

export default withFirebase(App);