import React, { Component } from 'react';
import { Wrapper, CardBody, Copy, Form } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Wrapper>
        <CardBody>
          <Copy>
            Are you trying to join another DealMachine member's team? Enter the account owner's email address and we'll send your request to them.
          </Copy>
        </CardBody>
        <Form onSubmit={()=>this.props.requestTeam()}>
          <Inputs {...this.props} />
          <Buttons {...this.props} />
        </Form>
      </Wrapper>
    );
  }

}

export default Body;
