import React, { Component } from "react";
import { connect } from "react-redux";

import { Scroll, Container, LeftPanelContainer, WebContainer, Wrapper, CardBody, Spin, Row, Copy } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import OnboardingContainer from 'app/DealMachineCore/snippets/OnboardingContainer';

import {
  appRedirect,
  toggleModal,
  setModal,
  selectActiveTeamMember,
  getTeamMembers,
  toggleCanPop,
  lockDrawer,
  setInviteType,
  toggleDrawer
} from "app/NativeActions";

import TeamList from './TeamList';

class Team extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount() {
    if (this.props.device == "mobile") {
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }


    this.props.selectActiveTeamMember(null);
    //TODO double check billing?
    this.loadItems();

  }

  loadItems(){
    this.props.getTeamMembers({
      token: this.props.token,
      load_type: "load",
      type: "team_members",
      search: this.props.team_members_search,
      begin: 0
    });
  }

  renderBody(){
    if(this.props.team_members){
      if(this.props.team_members_loading && this.props.team_members.length == 0){
        return(
          <Wrapper  style={{flex: 1}}>
              <Wrapper style={{
                alignItems: "center",
                justifyContent: "center"}}>
                <CardBody>
                  <Row>
                    <Spin size="small"/><Copy style={{marginLeft: 10}}>Loading Team...</Copy>
                  </Row>
                </CardBody>
              </Wrapper>
          </Wrapper>
        );
      }

      if(this.props.team_members.length > 0){
        return (
          <Wrapper style={{flex: 1}}>
            <TeamList {...this.props}/>
          </Wrapper>
        );
      }
    }



    return <Wrapper />
  }

  render() {
    if(!this.props.isMobile || this.props.active_team_member == null || this.props.device == "mobile"){
      if(this.props.isMobile){
        return(
            <Container>
              <Header
                title="Team"

                leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
                leftButtonAction={
                  this.props.device == "desktop"
                    ? () => {}
                    : () => this.props.toggleDrawer("open")
                }

              />
              <Scroll style={{flex: 1}}>

                {this.renderBody()}

              </Scroll>
            </Container>
        );
      }
      return(
        <LeftPanelContainer type="list" style={{overflowY: "auto"}}>
          <Header
            title="Team"

            leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
            leftButtonAction={
              this.props.device == "desktop"
                ? () => {}
                : () => this.props.toggleDrawer("open")
            }

          />
          <Scroll style={{flex: 1}}>

            {this.renderBody()}

          </Scroll>
        </LeftPanelContainer>
      );
    }

    return <Wrapper />


  }
}

const mapStateToProps = ({ auth, settings, native, billing, team }) => {
  const { token, user } = auth;
  const { colors } = settings;

  const { device, platform, isMobile } = native;

  const { plan_modules, card_info } = billing;

  const{
    active_team_member,
    team_members,
    team_members_loading,
    team_members_error,
    team_members_refreshing,
    team_members_loaded_all,
    team_members_limit,
    team_members_begin,
    team_members_search
  } = team;


  return {
    token,
    user,
    device,
    platform,
    isMobile,

    plan_modules,
    card_info,

    colors,

    active_team_member,
    team_members,
    team_members_loading,
    team_members_error,
    team_members_refreshing,
    team_members_loaded_all,
    team_members_limit,
    team_members_begin,
    team_members_search
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    toggleModal,
    setModal,
    selectActiveTeamMember,
    getTeamMembers,
    toggleCanPop,
    lockDrawer,
    setInviteType,
    toggleDrawer

  }
)(Team);
