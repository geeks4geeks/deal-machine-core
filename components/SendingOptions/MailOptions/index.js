import React, { Component } from 'react';
import { Wrapper,  } from 'app/NativeComponents/common';

import CampaignSelect from './CampaignSelect';
import TemplateOptions from './TemplateOptions';

class MailOptions extends Component{



  render(){
    return (
      <Wrapper>
        <CampaignSelect {...this.props} />
        <TemplateOptions {...this.props}/>
      </Wrapper>
    );

    return <Wrapper />
  }

}

export default MailOptions;
