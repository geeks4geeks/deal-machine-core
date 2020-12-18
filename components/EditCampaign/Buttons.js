import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, SecondaryButton } from 'app/NativeComponents/common';
import { RemoveTextButton, FeatureLockButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  renderCopyButton(){
    if(this.props.checkIfCanCopy()){
      return(
        <Card>
          <PrimaryButton onPress={() => this.props.copyCampaign()}>
            Clone Template
          </PrimaryButton>
        </Card>
      )
    }
  }

  render(){

    if(this.props.checkIfNeedsToSave()){
      return(
        <Wrapper>
          <Card>

            <SecondaryButton onPress={()=>{
              this.props.addCampaignStep({step:{
                id: 0,
                index: this.props.editCampaign.steps.length + 2,
                resend_switch: "off",
                send_after: 21,
                resend_freq: 0,
                resend_limit: 0,
                template_id: 0,
                template_title: ""
              }});
              this.props.campaignFieldChanged({prop: "current_step", value: this.props.editCampaign.steps.length + 2})
            }}>
              Add Step To Campaign
            </SecondaryButton>
          </Card>
          <Card>
            <FeatureLockButton
              onPress={()=>this.props.saveCampaign()}
              feature_slug={"campaigns"}
              isPrimaryButton
              formButton
            >
              {
                this.props.editCampaign.id ?
                "Save Campaign" :
                "Create New Campaign"
              }
            </FeatureLockButton>
          </Card>
        </Wrapper>
      );

    }else if(this.props.editCampaign.id && this.props.editCampaign.current_step == null){


      return (
        <Wrapper>
        {
          this.renderCopyButton()
        }
          <Card>
            <SecondaryButton onPress={()=>{
              this.props.addCampaignStep({step:{
                id: 0,
                index: this.props.editCampaign.steps.length + 2,
                resend_switch: "off",
                send_after: 21,
                resend_freq: 0,
                resend_limit: 0,
                template_id: 0,
                template_title: ""
              }});
              this.props.campaignFieldChanged({prop: "current_step", value: this.props.editCampaign.steps.length + 2})
            }}>
              Add Step To Campaign
            </SecondaryButton>
          </Card>
          <RemoveTextButton
            text={"Delete Campaign"}
            onPress={()=>this.props.toggleActionSheet("delete_campaign")}
          />
        </Wrapper>
      )

    }

    return <Wrapper />
  }
}

export default Buttons;
