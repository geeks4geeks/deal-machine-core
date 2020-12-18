import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Card
} from 'app/NativeComponents/common';

import {
  CardLabel
} from 'app/NativeComponents/snippets';

import CampaignTextInfo from './CampaignTextInfo';
import CampaignPreview from './CampaignPreview';
import CampaignCta from './CampaignCta';

import {
  reloadPreviews,
  setEditModal,
  showTemplatePreview
} from 'app/NativeActions';

class CampaignInfo extends Component{


  /* functions */

  render(){
    if(!this.props.active_property_loading){
      if(this.props.active_property.deal && this.props.main_owner_info){
        if(this.props.active_property.deal.id && parseInt(this.props.active_property.deal.id) !== 0){
          if(this.props.user.team_clearance_level > 0 && this.props.main_owner_info.owner_name){
            return (
              <Card>
                <CardLabel
                  title={"Outreach Campaign:"}
                  icon={"flag"}
                  hasButton={parseInt(this.props.active_property.archived) !== 1 && parseInt(this.props.active_property.closed) !== 1 ? true : false}
                  onPress={()=>{
                    this.props.setEditModal({
                      title:"Edit Mailing Options",
                      description: "Edit mailing options for "+this.props.active_property.property_address,
                      slug: "mailing-options",
                      type: "edit_mailing_options",
                      fields:{
                        start_mailers: parseInt(this.props.active_property.deal.approved) === 1 ? 1 : 0,
                        template_id: this.props.active_property.deal.mail_template_id,
                        template_name: this.props.active_property.deal.mail_template_name,
                        campaign_id: this.props.active_property.deal.campaign_id,
                        campaign_title: this.props.active_property.deal.campaign_title,

                        resend_freq: parseInt(this.props.active_property.deal.resend_freq),
                        resend_freq_switch: this.props.active_property.deal.resend_freq > 0 ? "on" : "off",
                        resend_limit: parseInt(this.props.active_property.deal.resend_limit),
                        resend_limit_switch: parseInt(this.props.active_property.deal.resend_limit) === 0 ? "on" : "off"
                      },
                      save_button_text: "Save Mailing Options",
                      modalAction: ({fields})=>{

                        this.props.updateLead({
                          token: this.props.token,
                          type: "edit_mailing_options_for_leads",
                          start_mailers: fields.start_mailers,
                          campaign_id: fields.campaign_id,
                          mail_template_id: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.template_id,
                          resend_freq: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_freq_switch === "off" ? 0 : fields.resend_freq,
                          resend_limit: parseInt(fields.campaign_id) !== 0 && fields.campaign_id != null ? 0 : fields.resend_limit_switch === "on" ? 0 : fields.resend_limit,
                          deal_ids: this.props.active_property.deal.id

                        })
                      }
                    })
                    this.props.appRedirect({
                      redirect: "goForward",
                      payload: {add: "mailing-options"}
                    })
                  }}
                  hasBorder={true}
                />

                <CampaignTextInfo {...this.props} />
                <CampaignPreview {...this.props}/>
                <CampaignCta {...this.props} />
              </Card>
            )
          }
        }
      }
    }

    return <Wrapper />;
  }
}

const mapStateToProps = ({ template, campaign }) => {
  const { preview_info } = template;
  const { campaigns } = campaign;
  return {
    preview_info,
    campaigns
  };
}


export default connect(mapStateToProps, {
  reloadPreviews,
  setEditModal,
  showTemplatePreview
})(CampaignInfo);
