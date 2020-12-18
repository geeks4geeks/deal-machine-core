import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import TemplateSelect from './TemplateSelect';
import RepeatFreq from './RepeatFreq';
import RepeatLimit from './RepeatLimit';

class TemplateOptions extends Component{

  render(){

    if(parseInt(this.props.fields.campaign_id) === 0 || this.props.fields.campaign_id == null){

      return (
        <Wrapper>
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
