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
  updateUser,

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

    if(this.props.user.team_removed != 1 || this.props.user.team_owner == 1){
      this.props.appRedirect({redirect: "dashboard"});
    }
  }

  createAccount(){
    this.props.updateUser({
      token: this.props.token,
      type: "create_account",
      payload: null
    });
  }

  render(){
    return(
      <Container>
        <Header
          title="Inactive Account"
          leftButtonIcon="logo"
        />

        <KeyboardView>
          <Body
            {...this.props}
            createAccount={this.createAccount.bind(this)}
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
  updateUser
})(RequestedTeam);
