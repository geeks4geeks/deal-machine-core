import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  RightPanelContainer,
  WebContainer,
  KeyboardView,
  Scroll,
  Wrapper,
  Row,
  Card,
  CardBody
} from "app/NativeComponents/common";

import { Header } from 'app/NativeComponents/snippets';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  mobileToggleDrawer,
  changeTab,
  appRedirect
} from 'app/NativeActions';

import TutorialVideo from "./TutorialVideo";
import CaseStudies from "./CaseStudies";
import UpcomingWebinars from "./UpcomingWebinars";

import Analytics from './Analytics';

class Dashboard extends Component {

  componentDidMount(){
    /*mobile*/
    if(this.props.isMobile){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false)
    }

    this.props.changeTab("dashboard");

    if(parseInt(this.props.user.team_clearance_level) === 0){
      this.props.appRedirect({redirect: "map"})
    }
  }

  render() {

    return (

      <Container>
        <Header
          title="Dashboard"
          leftButtonIcon="menu"
          leftButtonAction={
            this.props.device == "desktop" ? ()=>{
              this.props.mobileToggleDrawer(!this.props.mobile_toggle_drawer)
            } : ()=>this.props.toggleDrawer("open")
          }


          rightButtonIcon={this.props.isMobile ? "notifications" : ""}
          rightButtonAction={this.props.isMobile ? ()=>{
            this.props.appRedirect({redirect: "notification_panel"})
          } : ()=>{}}
        />
        <WebContainer style={{maxWidth: 800}}>
          <KeyboardView>
            <TutorialVideo {...this.props}/>
            <CaseStudies {...this.props} />
            <UpcomingWebinars {...this.props} />

            <Analytics {...this.props}/>
          </KeyboardView>
        </WebContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, settings, native }) => {
  const { token, user } = auth;
  const { colors } = settings;

  const { isMobile, device, mobile_toggle_drawer } = native;

  return {
    token,
    user,
    isMobile,
    colors,
    device,
    mobile_toggle_drawer
  };
};

export default connect(
  mapStateToProps,
  {
    toggleCanPop,
    toggleDrawer,
    lockDrawer,
    mobileToggleDrawer,
    changeTab,
    appRedirect
  }
)(Dashboard);
