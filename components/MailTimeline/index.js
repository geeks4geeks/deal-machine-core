import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalContainer, WebContainer, Wrapper, Scroll } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  appRedirect
} from 'app/NativeActions';

import Body from './Body';


class MailTimeline extends Component{

  componentDidMount(){
    if(!this.props.active_property){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "edit-note"}})
    }else if(!this.props.active_property.deal){
      this.props.appRedirect({redirect: "goBack", payload: {remove: "edit-note"}})
    }
  }
  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload: {remove: "mail-timeline"}})
  }

  render(){
    if(this.props.active_property){
      if(this.props.active_property.deal){
        return(
          <ModalContainer style={{maxWidth: 500}}>
            <Header
              title="Mail Tracking"

              leftButtonIcon="arrow-back"
              leftButtonAction={this.handleBack.bind(this)}
            />
            <WebContainer>
              <Scroll>
                <Body {...this.props} />
              </Scroll>
            </WebContainer>
          </ModalContainer>
        )
      }
    }

    return <Wrapper />

  }

}

const mapStateToProps = ({ auth, settings, property_map, activity }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { active_property } = property_map;
  const { mail_timeline } = activity;
  return {
    token,
    user,
    active_property,
    mail_timeline
  }
}



export default connect(mapStateToProps, {
  appRedirect
})(MailTimeline);
