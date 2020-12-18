import React, { Component } from 'react';
import { Wrapper, CardBody, Copy, Form } from 'app/NativeComponents/common';

import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Wrapper>
        <CardBody>
          <Copy>
            {"You've requested to join "+this.props.user.requested_team_name+"'s team. Please wait while they review your request. If you believe your request has been accepted. Please press refresh the app."}
          </Copy>
        </CardBody>
        <Buttons {...this.props} />
      </Wrapper>
    );
  }

}

export default Body;
