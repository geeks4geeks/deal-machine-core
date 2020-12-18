import React, { Component } from 'react';
import {
  Wrapper,
  Card
} from 'app/NativeComponents/common';

import RepeatLimitSwitch from './RepeatLimitSwitch';
import RepeatLimitNumber from './RepeatLimitNumber';

class RepeatLimit extends Component{

  render(){

    if(this.props.fields.resend_freq_switch === "on"){
      return(
        <Card>
          <RepeatLimitSwitch {...this.props} />
          <RepeatLimitNumber {...this.props} />

        </Card>
      );
    }

    return <Wrapper />;
  }
}

export default RepeatLimit;
