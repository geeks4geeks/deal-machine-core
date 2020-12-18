import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Wrapper
} from "app/NativeComponents/common";


import {
  appRedirect
} from 'app/NativeActions';

import SuccessSteps from './SuccessSteps';

class TasksTab extends Component {

  componentDidMount(){

  }

  render() {
    if(this.props.notification_panel_tab == "tasks"){
      return (
        <SuccessSteps {...this.props}/>
      );
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings, native }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { isMobile, device } = native;


  return {
    token,
    user,
    isMobile,
    colors,
    device

  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect
  }
)(TasksTab);
