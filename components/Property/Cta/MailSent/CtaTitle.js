import React, { Component } from 'react';
import {
  Wrapper,
  Title
} from 'app/NativeComponents/common';

class CtaTitle extends Component{

  render(){

    if(parseInt(this.props.active_property.deal.campaign_id) !== 0){
      return(
        <Wrapper style={{marginTop: 10, marginBottom: 10}}>
          <Title style={{textAlign: "center"}}>
            Your campaign has started!
          </Title>
        </Wrapper>
      );
    }else if((parseInt(this.props.active_property.deal.status) === 0 && parseInt(this.props.active_property.deal.approved) === 1) && parseInt(this.props.user.pause_sending) !== 1){
      return (
        <Wrapper style={{marginTop: 10, marginBottom: 10}}>
          <Title style={{textAlign: "center"}}>
            Your mail is on its way!
          </Title>
        </Wrapper>
      )
    }else if(parseInt(this.props.user.pause_sending) === 1){
      return(
        <Wrapper style={{marginTop: 10, marginBottom: 10}}>
          <Title style={{textAlign: "center"}}>
            Your mailings have been paused
          </Title>
        </Wrapper>
      );
    }

    return (
      <Wrapper style={{marginTop: 10, marginBottom: 10}}>
        <Title style={{textAlign: "center"}}>
          Your mail has been sent!
        </Title>
      </Wrapper>
    );
  }

}

export default CtaTitle;
