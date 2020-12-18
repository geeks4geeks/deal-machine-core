import React, { Component } from 'react';
import { Scroll, CardBody, Copy, Bold, Form } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

import {
  /* common functions */
  renderPrice
} from 'app/NativeActions';

class Body extends Component{


  render(){
    return (
      <Scroll>
        <CardBody>
          <Copy>
            DealCredit on your account is used to purchase mailers and skip traces.
          </Copy>
        </CardBody>
        <Form onSubmit={()=>this.props.saveDefaultCreditAmount()}>
          <Inputs {...this.props} />
          <Buttons {...this.props} />
        </Form>
      </Scroll>
    );

  }

}

export default Body;
