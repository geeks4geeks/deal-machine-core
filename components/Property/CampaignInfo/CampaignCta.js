import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  MenuButton
} from 'app/NativeComponents/snippets';

import moment from 'moment';

import {
  startMailers
} from 'app/NativeActions';

class CampaignCta extends Component{
  render(){

    if(this.props.active_property.owner_name &&
      this.props.active_property.deal.approved != 1 &&
      this.props.active_property.deal.status != 1 &&
      this.props.active_property.deal.archived != 1 &&
      this.props.active_property.deal.closed != 1 &&
      this.props.user.pause_sending == 0 &&
      (this.props.user.team_clearance_level > 1 || this.props.user.can_approve_mail == 1)
    ){


      if(this.props.active_property.deal.campaign_id != 0){
        return(
          <MenuButton
            style={{
              borderTopColor: this.props.colors.border_color,
              borderTopWidth: 1
            }}
            title={
              this.props.active_property.deal.paused == 1 ? "Resume Campaign" : "Start Campaign"
            }
            text={
              this.props.active_property.deal.paused == 1 ? "Resume your campaign right from where you left off." : "Start campaign and send your first mailer for this deal."
            }
            icon={"check"}
            onPress={()=>startMailers({
              props: this.props,
              properties: [this.props.active_property],
              total_property_count: 1
            })}
          />
        );
      }
      if(this.props.active_property.deal.mail_template_id != 0){
        return(
          <MenuButton
            style={{
              borderTopColor: this.props.colors.border_color,
              borderTopWidth: 1
            }}
            title={
              this.props.active_property.deal.paused == 1 ? "Resume Mailers" : "Start Mailers"
            }
            text={
              this.props.active_property.deal.resend_freq == 1 ?
                'Send mail using template: '+this.props.active_property.deal.mail_template_name+"\nRepeating every day" :
              this.props.active_property.resend_freq > 0 ?
                'Send mail using template: '+this.props.active_property.deal.mail_template_name+"\nRepeating every "+this.props.active_property.deal.resend_freq+" days" :
            'Send mail using template: '+this.props.active_property.deal.mail_template_name
                }
            icon={"check"}
            onPress={()=>startMailers({
              props: this.props,
              properties: [this.props.active_property],
              total_property_count: 1
            })}
          />
          );
      }


  }else if(
    this.props.active_property.owner_name &&
    this.props.active_property.deal.approved == 1 &&
    this.props.active_property.deal.status != 1 &&
    this.props.active_property.deal.archived != 1 &&
    this.props.active_property.deal.closed != 1 &&
    this.props.user.pause_sending == 0 &&
    (this.props.user.team_clearance_level > 1 || this.props.user.can_approve_mail == 1)
  ){
      if(this.props.active_property.deal.campaign_id != 0){
        return(
          <MenuButton
            style={{
              borderTopColor: this.props.colors.border_color,
              borderTopWidth: 1
            }}
            title={"Pause Campaign"}
            text= {"Temporarily pause this campaign. You can resume at any time."}
            icon={"pause"}
            onPress={()=>this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "pause_mailers"})}
          />
        );
      }
      return(
        <MenuButton
          style={{
            borderTopColor: this.props.colors.border_color,
            borderTopWidth: 1
          }}
          title={"Pause Mailers"}
          text= {"Temporarily pause mailers. You can resume at any time."}
          icon={"pause"}
          onPress={()=>this.props.updateLead({token: this.props.token, deal_ids: this.props.active_property.deal.id, type: "pause_mailers"})}
        />
      );

  }

    return <Wrapper />;
  }
}

export default CampaignCta;
