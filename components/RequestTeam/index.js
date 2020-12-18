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
  teamFieldChanged,
  editTeam,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class RequestTeam extends Component{

  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    if((this.props.user.requested_team != 0 && this.props.user.requested_team != null && this.props.user.team_removed != 1 && this.props.user.canceled != 1)){
      this.props.appRedirect({redirect: "dashboard"});
    }
  }


  checkIfNeedsToSave(){
    if(this.props.invite_email && this.props.invite_email != ""){
      return true;
    }
    return false;
  }

  handleBack(){

    /*mobile*/
    dismissMobileKeyboard();

    if(this.props.user.canceled == 1){
      this.props.appRedirect({redirect:"goBack", payload:{type: "canceled"}});
    }else if(this.props.user.team_removed == 1){
      this.props.appRedirect({redirect:"goBack", payload:{type: "team_removed"}});
    }else{
      this.props.appRedirect({redirect:"goBack", payload:{type: "billing"}});
    }
  }

  requestTeam(){
    /*mobile*/
    dismissMobileKeyboard();

    const { token, invite_email } = this.props;
    this.props.editTeam({
      token,
      team: 0,
      type: "request_to_join",
      payload: {email: invite_email}
    });

  }

  render(){
    return(
      <Container>
        <Header
          title="Request to Join Team"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.requestTeam() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            requestTeam={this.requestTeam.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, team, drawer }) => {
  const { token, user } = auth;
  const { invite_email } = team;
  const { stats } = drawer;

  return {
    token,
    user,
    invite_email,
    stats
  };
}



export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  appRedirect,
  teamFieldChanged,
  editTeam
})(RequestTeam);
