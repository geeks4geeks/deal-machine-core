import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  appRedirect,
  toggleActionSheet,
  getUser,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class RequestedTeam extends Component{

  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    if(this.props.user.requested_team == 0 || this.props.user.requested_team == null){
      this.props.appRedirect({redirect: "dashboard"});
    }
  }


  checkIfNeedsToSave(){
    if(this.props.invite_email && this.props.invite_email != ""){
      return true;
    }
    return false;
  }

  refreshApp(){
    this.props.getUser({token: this.props.token, loading: true});
  }

  render(){
    return(
      <Container>
        <Header
          title="Team Request"
          leftButtonIcon="logo"
          rightButtonIcon={"refresh"}
          rightButtonAction={this.refreshApp.bind(this)}
        />
        <KeyboardView>
          <Body
            {...this.props}
            refreshApp={this.refreshApp.bind(this)}
          />
        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, team, drawer }) => {
  const { token, user } = auth;

  return {
    token,
    user
  };
}



export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  appRedirect,
  toggleActionSheet,
  getUser
})(RequestedTeam);
