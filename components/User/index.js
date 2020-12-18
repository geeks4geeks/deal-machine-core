import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, WebContainer, Scroll, Wrapper, Title, Copy } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  toggleActionSheet,
  updateTeamMembers,
  selectActiveTeamMember,
  toggleModal,
  setModal
} from 'app/NativeActions';

import Body from './Body';

class User extends Component {

  componentDidMount(){

  }

  componentDidUpdate(prevProps){

  }

  componentWillUnmount(){

  }

  /*native functions*/
  handleBack(){
    if(this.props.active_team_member.member_type == "invite"){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "invite", invite_id: this.props.active_team_member.id}})
    }else{
      this.props.appRedirect({redirect: "goBack", payload: {remove: "user", user_id: this.props.active_team_member.id}})
    }
    this.props.selectActiveTeamMember(null);
  }

  renderTitle(){
    if(this.props.active_team_member.firstname){
      return this.props.active_team_member.firstname+" "+this.props.active_team_member.lastname;
    }

    return this.props.active_team_member.email;
  }

  render(){


    if(this.props.active_team_member && this.props.active_team_member != "invite" && this.props.active_team_member != "collect_dealfinders"){
      return(
        <Container>
          <Header
            title={this.renderTitle()}
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack.bind(this)}
            rightButtonIcon={this.props.user.team_clearance_level > 1 &&
              this.props.active_team_member.team_owner != 1 &&
              this.props.active_team_member.id != this.props.user.id ? "more-vert" : ""}
            rightButtonAction={this.props.user.team_clearance_level > 1 &&
              this.props.active_team_member.team_owner != 1 &&
              this.props.active_team_member.id != this.props.user.id ? ()=>{
              this.props.toggleActionSheet("user_more")
            } : ()=>{}}
          />
          <WebContainer>
            <Scroll>
              <Body {...this.props} />
            </Scroll>
          </WebContainer>
        </Container>
      )
    }
    if(!this.props.isMobile){
      /*
      return(
        <Container fill>
          <Wrapper style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign: "center"}}>Select a team member</Title>
            <Copy>Select a team member on the left panel to display them here.</Copy>
          </Wrapper>
        </Container>
      )
      */
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings, native, team }) => {
  const { token, user } = auth;
  const { colors } = settings;

  const { device, isMobile, platform } = native;
  const {
    active_team_member
  } = team;

  return {
    token,
    user,
    colors,
    device,
    isMobile,
    platform,
    active_team_member
  };
}

export default connect(mapStateToProps, {
  appRedirect,
  toggleActionSheet,
  updateTeamMembers,
  selectActiveTeamMember,
  toggleModal,
  setModal

})(User);
