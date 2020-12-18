
import React, { Component } from 'react';
import {connect} from 'react-redux'

import { Container, WebContainer, Spinner } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  changeTab,
  appRedirect,
  toggleBadgePopup,
  getAllBadges
} from 'app/NativeActions';

class Badges extends Component{

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }
    this.props.getAllBadges({token: this.props.token});
    this.props.changeTab("settings");

  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});

  }


  render(){
    return(
      <Container>
        <Header
          title="Badges"
          statusBarStyle="dark-content"
          leftButtonIcon={"arrow-back"}
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

const mapStateToProps = ({ native, badges, auth, settings }) => {
  const { token, user } = auth;
  const { device, platform } = native;
  const { colors, dark_mode } = settings;
  const { not_earned_badges, all_badges, my_badges, badges_loaded_all } = badges;


  return {
    token,
    user,
    device,
    colors,
    dark_mode,
    platform,
    all_badges,
    my_badges,
    not_earned_badges,
    badges_loaded_all
  }
}

export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  changeTab,
  appRedirect,
  toggleBadgePopup,
  getAllBadges
})(Badges);
