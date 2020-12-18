import React, { Component } from 'react';
import { Wrapper, CardBody, Copy, Form } from 'app/NativeComponents/common';

import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Wrapper>
        <CardBody>
          <Copy>
            You've been removed from your team. If you want to try DealMachine for yourself, or join a new team, select an option below.
          </Copy>
        </CardBody>
        <Buttons {...this.props} />
      </Wrapper>
    );
  }

}

export default Body;
