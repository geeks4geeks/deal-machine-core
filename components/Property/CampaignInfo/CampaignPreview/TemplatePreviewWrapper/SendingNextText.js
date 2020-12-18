import React, { Component } from 'react';
import {
  Wrapper,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import moment from 'moment';

class SendingNextText extends Component{

  renderTime(date_updated){
    if(date_updated){
      var date = new Date();
      var offsetInHours = date.getTimezoneOffset() / 60;
      return "at "+moment(date_updated).subtract(offsetInHours, "hours").add(1, "hours").format("h:mm a");
    }else{
      return "in one hour";
    }
  }

  render(){
    if(this.props.active_property.deal.campaign_id == 0){
      if(this.props.user.pause_sending == 1 && this.props.active_property.deal.approved == 1){
        return (
          <Wrapper style={{textAlign: "center"}}>
            <Copy>Sending mail is <Bold>paused.</Bold> The next mailer will be sent when your <Bold>team's settings</Bold> are changed.</Copy>
          </Wrapper>
        )
      }else if(this.props.active_property.deal.paused == 1){
        return (
          <Wrapper style={{textAlign: "center"}}>
            <Copy>Mailers are <Bold>paused</Bold> for this lead. The next mailer will be sent when you <Bold>resume mailers</Bold> for this lead.</Copy>
          </Wrapper>
        )
      }else if(parseInt(this.props.active_property.deal.times_mailed) >= parseInt(this.props.active_property.deal.resend_limit) && this.props.active_property.deal.resend_limit != 0 && this.props.active_property.deal.approved == 1){
        return (
          <Wrapper style={{textAlign: "center"}}>
            <Copy>You've reached the number of times to send <Bold>repeat mail.</Bold> No more mailers will be sent until you change this deal's <Bold>repeat mail settings.</Bold></Copy>
          </Wrapper>
        );
      }else if(this.props.active_property.deal.resend_freq > 0 && this.props.active_property.deal.status == 1 && this.props.active_property.deal.approved == 1){
        return (
          <Wrapper style={{textAlign: "center"}}>
            <Copy>Your next mailer is scheduled to send <Bold>{moment(this.props.active_property.deal.sent_date).add(this.props.active_property.deal.resend_freq, "days").format("MMMM Do")}</Bold></Copy>
          </Wrapper>
        );
      }else if(this.props.active_property.deal.status == 0 && this.props.active_property.deal.approved == 1){


        return (
          <Wrapper style={{textAlign: "center"}}>
            <Copy>Your mailer is in the <Bold>sending queue.</Bold> Your mail will be printed and sent <Bold>{this.renderTime(this.props.active_property.deal.date_updated)} </Bold> (To cancel this deal: undo action or trash deal before that time)</Copy>
          </Wrapper>
        );
      }



    }

    return <Wrapper />;
  }
}

export default SendingNextText;
