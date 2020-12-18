import React, { Component } from 'react';
import {
  Wrapper,
  CardBody
} from 'app/NativeComponents/common';

import TemplatePreviewWrapper from './TemplatePreviewWrapper'
import CampaignUpNext from './CampaignUpNext';

class CampaignPreview extends Component{


  /* functions */

  render(){

    if(this.props.active_property.deal.closed != 1 &&
      this.props.active_property.deal.archived != 1 &&
      this.props.active_property.deal.campaign_complete != 1 &&
      (this.props.active_property.deal.campaign_id != 0 || this.props.active_property.deal.mail_template_id != 0)
    ){
      return (
        <CardBody style={{
          alignItems: "center",
          backgroundColor: this.props.colors.background_color
        }}>
          <TemplatePreviewWrapper {...this.props}/>
          <CampaignUpNext {...this.props}/>
        </CardBody>
      )
    }

    return <Wrapper />;
  }
}

export default CampaignPreview;
