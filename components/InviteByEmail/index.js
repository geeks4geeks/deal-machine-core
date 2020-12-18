import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  updateTeamMembers,
  selectActiveTeamMember,
  /* common functions */
  dismissMobileKeyboard
} from 'app/NativeActions';

import Body from './Body';

class InviteByEmail extends Component {

  constructor(props){
    super(props);

    this.state = {
      invite_email_options:{
        email: ""
      }
    }
  }

  editInviteEmailOptions({prop, value}){
    this.setState({
      invite_email_options:{
        ...this.state.invite_email_options,
        [prop]: value
      }
    })
  }

  componentDidMount(){

  }



  /* native functions */
  handleBack(){
    dismissMobileKeyboard();
    this.props.selectActiveTeamMember(null);
    this.props.appRedirect({redirect: "goBack", payload:{remove: "invite"}});
  }

  componentWillUnmount(){
    this.props.selectActiveTeamMember(null);

  }

  sendInvite(){
    dismissMobileKeyboard();

    this.props.updateTeamMembers({
      token: this.props.token,
      email: this.state.invite_email_options.email,
      type: this.props.invite_type == "dealfinder" ? "invite_dealfinder" : "invite_member"
    })
  }

  checkIfNeedsToSave(){
    if(this.state.invite_email_options.email && this.state.invite_email_options.email != ""){
      return true
    }

    return false;
  }

  render(){
    return(
      <Container>
        <Header
          title={this.props.invite_type == "dealfinder" ? "Invite DealFinder" : "Invite Team Member"}
          leftButtonIcon={this.props.device == "desktop" ? "close" : "arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.sendInvite() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            invite_email_options={this.state.invite_email_options}
            sendInvite={this.sendInvite.bind(this)}
            editInviteEmailOptions={this.editInviteEmailOptions.bind(this)}
          />
        </KeyboardView>
      </Container>

    )
  }
}



const mapStateToProps = ({ auth, native, team }) => {
  const { token, user } = auth;
  const { device } = native;
  const { invite_type } = team

  return {
    token,
    user,
    device,
    invite_type
  };
}

export default connect(mapStateToProps, {
  updateTeamMembers,
  selectActiveTeamMember,
  appRedirect
})(InviteByEmail);
