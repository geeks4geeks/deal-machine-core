import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import WithMarketingSwitch from './WithMarketingSwitch';
import CampaignSelect from './CampaignSelect';
import TemplateOptions from './TemplateOptions';

class EditMailingOptions extends Component{



  render(){
    return (
      <Wrapper>
        <WithMarketingSwitch {...this.props} />

        <CampaignSelect {...this.props} />
        <TemplateOptions {...this.props}/>
      </Wrapper>
    );
  }

}

export default EditMailingOptions;
