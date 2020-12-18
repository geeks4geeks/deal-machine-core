import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  toggleActionSheet,
  appRedirect,
  changeTab
} from 'app/NativeActions';

class Account extends Component{

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    this.props.changeTab("settings");

  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
  }

  render(){
    return(
      <Container>
        <Header
          title="Profile"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
        />
        <WebContainer>
          <Body
            {...this.props}
          />
        </WebContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, settings }) => {
  const { token, user } = auth;
  const { device } = native;
  const { colors } = settings;

  return {
    token,
    user,
    device,
    colors
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  toggleActionSheet,
  appRedirect,
  changeTab
})(Account);
