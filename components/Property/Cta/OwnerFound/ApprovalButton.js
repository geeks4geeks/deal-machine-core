import React, { Component } from 'react';
import {
  Card,
  CenterCenter,
  Wrapper
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';
import {
  startMailers
} from 'app/NativeActions';

class ApprovalButton extends Component{

  render(){

    if(parseInt(this.props.active_property.corp_owner) === 1 && parseInt(this.props.active_property.owner_status_info.is_bank) === 1){
      return <Wrapper />
    }

    if(this.props.user.team_clearance_level > 1 || this.props.user.can_approve_mail === 1){

      return(

        <CenterCenter>
          <PillButton primary={true} onPress={()=>startMailers({
            props: this.props,
            properties: [this.props.active_property],
            total_property_count: 1
          })}>
            {
              parseInt(this.props.active_property.deal.paused === 1) ? parseInt(this.props.active_property.deal.campaign_id) !== 0 ? "Resume Campaign" : "Resume Mailers" :
              parseInt(this.props.active_property.deal.campaign_id) !== 0 ? "Start Campaign" : "Start Mailers"
            }
          </PillButton>
        </CenterCenter>
      )
    }

    return <Wrapper />;

  }

}

export default ApprovalButton;
