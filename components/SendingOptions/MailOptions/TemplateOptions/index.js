import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import TemplateCopy from './TemplateCopy';
import TemplateSelect from './TemplateSelect';
import RepeatFreq from './RepeatFreq';
import RepeatLimit from './RepeatLimit';

class TemplateOptions extends Component{

  render(){

    if((this.props.select_default_sending_options && (this.props.editUser.default_campaign_id == 0 || this.props.editUser.default_campaign_id == null)) ||
      (!this.props.select_default_sending_options && (this.props.editHouse.campaign_id == 0 || this.props.editHouse.campaign_id == null)) ||
      this.props.onboarding
    ){

  

      return (
        <Wrapper>
          <TemplateCopy {...this.props}/>
          <TemplateSelect {...this.props}/>
          <RepeatFreq {...this.props}/>
          <RepeatLimit {...this.props}/>
        </Wrapper>
      );
    }

    return <Wrapper />
  }

}

export default TemplateOptions;
