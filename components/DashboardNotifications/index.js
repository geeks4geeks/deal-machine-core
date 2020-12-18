import React, { Component } from "react";
import { connect } from "react-redux";

import {
  RightPanelContainer,
  Wrapper
} from "app/NativeComponents/common";

import {
  appRedirect
} from 'app/NativeActions';

import NotificationPanel from 'app/DealMachineCore/components/NotificationPanel';

class DashboardNotifications extends Component {

  componentDidMount(){

  }


  render() {

    if(!this.props.isMobile){
      return(
        <RightPanelContainer>
          <NotificationPanel />
        </RightPanelContainer>
      )
    }
    return <Wrapper />;

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
)(DashboardNotifications);
