import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    logout,
    appRedirect
} from 'app/NativeActions';

class Logout extends Component{

  componentDidMount(){
    window.localStorage.clear();
    window.location.href = '/';
  }

  render(){
    return(
      <div/>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { token, user } = auth;

  return {
    token,
    user
  }
}

export default connect(mapStateToProps, {
  logout,
  appRedirect
})(Logout);
