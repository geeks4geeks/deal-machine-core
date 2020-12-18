import React, { Component } from 'react';
import {
  Wrapper,
  Copy,
  Bold
} from 'app/NativeComponents/common';

class CtaText extends Component{

  render(){

    if(parseInt(this.props.user.pause_sending) === 1 || (parseInt(this.props.user.pause_sending) === 1 && parseInt(this.props.active_property.deal.campaign_id) === 0)){
      return(
        <Wrapper>
          <Copy style={{textAlign: "center"}}>
            The next mailer will be sent when your team's settings are changed. You can change this setting by going to <Bold>Settings &gt; Default Mailing Options &gt; Sending Mode.</Bold>
          </Copy>
        </Wrapper>
      );
    }else if(parseInt(this.props.active_property.deal.status) === 0 && parseInt(this.props.active_property.deal.approved) === 1 && parseInt(this.props.user.pause_sending) === 0){
      if(parseInt(this.props.active_property.corp_owner) !== 1 && (parseInt(this.props.active_property.deal.other_possible_matches_tried) === 0 && parseInt(this.props.active_property.corp_owner) !== 1)){
        if(parseInt(this.props.active_property.deal.campaign_id) !== 1){
          return (
            <Wrapper>
              <Copy style={{textAlign: "center"}}>
                <Bold>Congrats!</Bold> Your campaign has started and your mail has been added to the print queue. You also may want to try <Bold>Skip Tracing</Bold> to get more information about the property owner <Bold>(additional addresses, phone numbers, emails, etc.).</Bold>
              </Copy>
            </Wrapper>

          );
        }
        return (
          <Wrapper>
            <Copy style={{textAlign: "center"}}>
              <Bold>Congrats!</Bold> Your mail has been added to the print queue. You also may want to try <Bold>Skip Tracing</Bold> to get more information about the property owner <Bold>(additional addresses, phone numbers, emails, etc.).</Bold>
            </Copy>
          </Wrapper>

        );
      }

      if(parseInt(this.props.active_property.deal.campaign_id) !== 1){
        return (
          <Wrapper>
            <Copy style={{textAlign: "center"}}>
              <Bold>Congrats!</Bold> Your campaign has started and your mail has been added to the print queue. Next, click the back arrow and <Bold>add your next property!</Bold>
            </Copy>
          </Wrapper>
        );

      }
      return (
        <Wrapper>
          <Copy style={{textAlign: "center"}}>
            <Bold>Congrats!</Bold> Your mail has been added to the print queue. Next, click the back arrow and <Bold>add your next property!</Bold>
          </Copy>
        </Wrapper>
      );

    }else if(parseInt(this.props.active_property.deal.status) === 1 && parseInt(this.props.active_property.approved) === 1){
      if(parseInt(this.props.active_property.corp_owner) !== 1 && (parseInt(this.props.active_property.other_possible_matches_tried) === 0 && parseInt(this.props.active_property.corp_owner) !== 1)){

        if(parseInt(this.props.active_property.deal.campaign_id) !== 1){
          return (
            <Wrapper>
              <Copy style={{textAlign: "center"}}>
                <Bold>Congrats!</Bold> Your campaign has started and your mail has been sent to the property owner. You also may want to try <Bold>Skip Tracing</Bold> to get more information about the property owner <Bold>(additional addresses, phone numbers, emails, etc.).</Bold>
              </Copy>
            </Wrapper>
          );

        }
        return (
          <Wrapper>
            <Copy style={{textAlign: "center"}}>
              <Bold>Congrats!</Bold> Your mail has been sent to the property owner. You also may want to try <Bold>Skip Tracing</Bold> to get more information about the property owner <Bold>(additional addresses, phone numbers, emails, etc.).</Bold>
            </Copy>
          </Wrapper>
        );
      }
      if(parseInt(this.props.active_property.campaign_id) !== 1){
        return (
          <Wrapper>
            <Copy style={{textAlign: "center"}}>
              <Bold>Congrats!</Bold> Your campaign has started and your mail has been sent to the property owner. Next, click the back arrow and <Bold>add your next property!</Bold>
            </Copy>
          </Wrapper>
        );
      }
      return (
        <Wrapper>
          <Copy style={{textAlign: "center"}}>
            <Bold>Congrats!</Bold> Your mail has been sent to the property owner. Next, click the back arrow and <Bold>add your next property!</Bold>
          </Copy>
        </Wrapper>
      );
    }

    return <Wrapper />
  }
}

export default CtaText;
