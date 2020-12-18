import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleActionSheet,
  appRedirect,
  changeTab,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class CancelPlan extends Component{

  componentDidMount(){
    /*mobile*/
    if(this.props.user.team_owner != 1){
      this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
    }

    this.props.changeTab("settings");

  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}});
  }

  render(){

    return(
      <Container>
        <Header
          title="Cancel Plan"
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

const mapStateToProps = ({ auth, drawer, native }) => {
  const { token, user } = auth;
  const { stats } = drawer;
  const { device } = native;

  return {
    token,
    user,
    stats,
    device
  }
}



export default connect(mapStateToProps, {
  toggleActionSheet,
  appRedirect,
  changeTab
})(CancelPlan);
