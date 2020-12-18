import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer, Spinner } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  appRedirect,
  changeTab,
  getStats
} from 'app/NativeActions';

class Settings extends Component{

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer(false);
      this.props.lockDrawer(true);
    }

    this.props.changeTab("settings");

    if(
      this.props.user.team_clearance_level > 0 ||
      this.props.user_dealfinder_page.require_training == 0
    ){
      this.props.appRedirect({redirect: "dashboard"});
    }

  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
  }

  render(){

    if(this.props.user_dealfinder_page){

      return(
        <Container>
          <Header
            title="DealFinder Training"
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
    return (
      <Container>
        <Header
          title="DealFinder Training"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
        />
        <Spinner/>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, native, drawer, team_link }) => {
  const { token, user } = auth;
  const { device, isMobile } = native;
  const { open } = drawer;
  const { require_training, user_dealfinder_page, dealfinder_page_defaults } = team_link;

  return {
    token,
    user,
    device,
    isMobile,
    open,

    require_training,
    user_dealfinder_page,
    dealfinder_page_defaults
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  appRedirect,
  lockDrawer,
  changeTab
})(Settings);
