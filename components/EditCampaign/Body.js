import React, { Component } from 'react';
import { Wrapper, Form, Card, Input, MultiLineInput } from 'app/NativeComponents/common';

import CampaignStep from './CampaignStep';
import CampaignSteps from './CampaignSteps';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    if(this.props.editCampaign){
      return(
        <Form onSubmit={()=>this.props.saveCampaign()}>
          <Card>
            <Input
              ref="title"
              name="title"
              returnKeyType="done"
              blurOnSubmit={true}
              autoCapitalize="words"
              keyboardType="default"
              placeholder="Campaign Name"
              onChange={value => this.props.campaignFieldChanged({ prop: "title", value })}
              value={this.props.editCampaign.title ? this.props.editCampaign.title : ""}
            />
            <MultiLineInput
              ref="description"
              name="description"
              autoCapitalize="sentences"
              blurOnSubmit={true}
              returnKeyType="done"
              keyboardType="default"
              placeholder={"Enter your description here."}
              label={"Campaign Description"}
              onChange={value => this.props.campaignFieldChanged({ prop: "description", value })}
              value={this.props.editCampaign.description ? this.props.editCampaign.description : ""}
              type={"text"}
            />
          </Card>

          <CampaignStep {...this.props}
            step={{
              id: 0,
              index: 1,
              resend_switch: this.props.editCampaign.resend_switch,
              resend_freq: this.props.editCampaign.resend_freq,
              resend_limit: this.props.editCampaign.resend_limit,
              template_id: this.props.editCampaign.original_template_id,
              template_title: this.props.editCampaign.original_template_title
            }}
          />

          <CampaignSteps {...this.props} />
          <Buttons {...this.props} />
        </Form>
      );
    }

    return <Wrapper />
  }
}

export default Body;
