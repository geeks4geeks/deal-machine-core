import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  KeyboardView,
  Wrapper
} from "app/NativeComponents/common";

import {
  Header
} from "app/NativeComponents/snippets";



import {
  appRedirect
} from 'app/NativeActions';

import NotificationPanel from 'app/DealMachineCore/components/NotificationPanel';

class UserNotifications extends Component {

  componentDidMount(){

  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "dashboard"}})
  }

  render() {
    if(this.props.isMobile){
      return(
        <Container>
          <Header
            title="Activity & Notifications"
            leftButtonIcon="arrow-back"
            leftButtonAction={()=>this.handleBack()}
          />
          <KeyboardView>
            <NotificationPanel />
          </KeyboardView>
        </Container>
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
)(UserNotifications);
