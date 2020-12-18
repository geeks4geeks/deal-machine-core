import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import RepeatLimitSwitch from './RepeatLimitSwitch';
import RepeatLimitNumber from './RepeatLimitNumber';

class RepeatLimit extends Component{

  render(){

    if(this.props.select_default_sending_options){
      if(this.props.editUser.default_resend_freq_switch == "on"){
        return(
          <Card>
            <RepeatLimitSwitch {...this.props} />
            <RepeatLimitNumber {...this.props} />

          </Card>
        );
      }
    }else{
      if(this.props.editHouse.resend_freq_switch == "on"){
        return(
          <Card>
            <RepeatLimitSwitch {...this.props} />
            <RepeatLimitNumber {...this.props} />
            
          </Card>
        );
      }
    }

    return <Wrapper />;
  }
}

export default RepeatLimit;
