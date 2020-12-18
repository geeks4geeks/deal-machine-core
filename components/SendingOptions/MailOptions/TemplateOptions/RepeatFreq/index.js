import React, { Component } from 'react';
import {
  Card 
} from 'app/NativeComponents/common';

import RepeatFreqSwitch from './RepeatFreqSwitch';
import RepeatFreqNumber from './RepeatFreqNumber';

class RepeatFreq extends Component{


  render(){

    return(
      <Card>
        <RepeatFreqSwitch {...this.props} />
        <RepeatFreqNumber {...this.props} />
      </Card>
    )
  }
}

export default RepeatFreq;
