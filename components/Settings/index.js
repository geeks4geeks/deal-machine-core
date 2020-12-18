import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  selectDefaultSendingOptions,
  appRedirect,
  changeTab,
  setModal,
  toggleModal,
  updateUserFieldChange,
  setDarkMode,
  setPhotoToCameraroll,
  updateUser,
  uploadList
} from 'app/NativeActions';



class Settings extends Component{

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false)
    }

    this.props.changeTab("settings");

  }

  render(){
    return(
      <Container>
        <Header
          title="Settings"
          leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
          leftButtonAction={
            this.props.device == "desktop" ? ()=>{} : ()=>this.props.toggleDrawer("open")
          }
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

const mapStateToProps = ({ auth, native, drawer, settings, team_link }) => {
  const { token, user } = auth;
  const { device, platform } = native;
  const { stats, open } = drawer;
  const { editUser, colors, dark_mode, photoCameraRoll } = settings;
  const { user_dealfinder_page } = team_link;

  return {
    token,
    user,
    device,
    platform,
    stats,
    open,
    editUser,
    colors,
    dark_mode,
    photoCameraRoll,
    user_dealfinder_page
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  selectDefaultSendingOptions,
  appRedirect,
  changeTab,
  setModal,
  toggleModal,
  updateUserFieldChange,
  setDarkMode,
  setPhotoToCameraroll,
  updateUser,
  uploadList
})(Settings);
