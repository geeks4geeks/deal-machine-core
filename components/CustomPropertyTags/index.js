
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  WebContainer,
} from 'app/NativeComponents/common';

import { Header } from 'app/NativeComponents/snippets';
import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  changeTab,

  getTags,
  appRedirect,
  removeTeamTag,
  hideDefaultTag,
  showDefaultTag,

  setModal,
  toggleModal
 } from 'app/NativeActions';

class CustomPropertyTags extends Component{

  componentDidMount(){
    this.props.changeTab("settings");
  }

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    this.props.changeTab("settings");

    if(this.props.user.team_clearance_level > 0){

      if(this.props.custom_tags){
        if(this.props.custom_tags.length == 0){
          this.props.getTags(this.props.token);
        }
      }else{
        this.props.getTags(this.props.token);
      }

    }else{

      this.props.appRedirect({redirect: "settings"});

    }

  }

  handleBack(){
    if(this.props.device == "mobile"){
      this.props.lockDrawer(false);
    }
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
  }


  render(){

    return(
      <Container>
        <Header
          title="Manage Property Tags"
          leftButtonIcon="arrow-back"
          leftButtonAction={()=>this.handleBack()}
          rightButtonIcon="add"
          rightButtonAction={()=>this.props.appRedirect({redirect: "createTag"})}
        />
        <WebContainer>
          <Body {...this.props}/>
        </WebContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, deal, property_tags, native, settings}) => {

  const { token, user } = auth;
  const { all_tags } = deal
  const{ device } = native;
  const{ colors } = settings;
  const {
    custom_tags,
    default_tags,
    tags_loaded
  } = property_tags;

  return {
    all_tags,
    custom_tags,
    default_tags,
    tags_loaded,
    device,
    token,
    user,
    colors
  };
}

export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  changeTab,

  getTags,
  appRedirect,
  removeTeamTag,
  hideDefaultTag,
  showDefaultTag,

  setModal,
  toggleModal
})(CustomPropertyTags);
