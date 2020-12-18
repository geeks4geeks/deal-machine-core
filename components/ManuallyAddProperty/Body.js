import React, { Component } from 'react';
import { Wrapper, CardBody, Copy } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Wrapper>
        <CardBody>
          <Copy>Manually enter the address of your lead.</Copy>
        </CardBody>
        <Inputs {...this.props} />
        <Buttons {...this.props}/>
      </Wrapper>
    );
  }

}

export default Body;
