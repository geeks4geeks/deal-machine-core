import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Row,
  Card,
  Copy
} from 'app/NativeComponents/common';

import {
  InformationItem
} from 'app/NativeComponents/snippets';

import {
  getCampaignInfo
} from 'app/NativeActions';

class CampaignTextInfo extends Component{

  render(){

    if(this.props.active_property.deal.campaign_id != 0){

      var campaign_text = "";
      if(this.props.active_property.deal.closed == 1 || this.props.active_property.deal.campaign_complete == 1){
        campaign_text = "Campaign Complete";
      }else if(this.props.active_property.deal.archived == 1){
        campaign_text = "Campaign In Trash";
      }else if(this.props.active_property.deal.approved != 1){
        if(this.props.active_property.deal.paused == 1){
          campaign_text = "Campaign Paused";
        }else{
          campaign_text = "Campaign Not Started";
        }
      }else{
        const campaign_info = getCampaignInfo({campaign_id: this.props.active_property.deal.campaign_id, campaigns: this.props.campaigns})
        if(campaign_info){
          const number_of_steps = campaign_info.steps.length + 1;
          campaign_text = "Step "+this.props.active_property.deal.campaign_step+" of "+number_of_steps;
        }else{
          if(this.props.active_property.deal.paused == 1){
            campaign_text = "Campaign Paused";
          }else{
            campaign_text = "Campaign Not Started";
          }
        }

      }

      return (
        <CardBody style={{
          paddingTop: 0,
          borderBottomWidth: 1,
          borderBottomColor: this.props.colors.border_color,
          borderBottomStyle: "solid"
        }}>
          <InformationItem
            item={this.props.active_property.deal.campaign_title}
            label={"Using Campaign:"}
          />
          <InformationItem
            size="small"
            item={campaign_text}
            label={"Current Step:"}
          />
        </CardBody>
      )
    }else{

      var repeat_mail_text = "";

      if(parseInt(this.props.active_property.deal.resend_freq) === 0){
        repeat_mail_text = "Off";
      }else{
        repeat_mail_text = "On; ";

        if(parseInt(this.props.active_property.deal.resend_freq) === 1){
          repeat_mail_text += "Sending every day"
        }else{
          repeat_mail_text += "Sending every "+this.props.active_property.deal.resend_freq+" days";
        }
        if(parseInt(this.props.active_property.deal.resend_limit) === 0){
          repeat_mail_text += "; Repeating forever";
        }else if(parseInt(this.props.active_property.deal.resend_limit) === 1){
          repeat_mail_text += "; Repeating once";
        }else{
          repeat_mail_text += "; Repeating "+this.props.active_property.deal.resend_limit+" times";
        }
      }


      if(this.props.active_property.deal.mail_template_id !== 0){
        return (
          <CardBody>
            <Wrapper style={{marginBottom: 10, flex: 1}}>
              <InformationItem
                size="small"

                item={this.props.active_property.deal.mail_template_name}
                label={"Using Template:"}
              />
            </Wrapper>
            <Wrapper>

              <InformationItem
                size="small"
                item={repeat_mail_text}
                label={"Repeat Mail:"}
              />
            </Wrapper>
          </CardBody>
        )
      }

      return (
        <CardBody style={{
          paddingTop: 0
        }}>
          <Copy>
            You have not selected a mail template or campaign for this property. Mail cannot be sent until you select either a mail template or a campaign.
          </Copy>
        </CardBody>
      )
    }

  }
}

export default CampaignTextInfo;
