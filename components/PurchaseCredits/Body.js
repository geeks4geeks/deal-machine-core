import React, { Component } from 'react';
import { Wrapper, Scroll, CardBody, Copy, Bold, Form } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

import {
  /*common functions*/
  renderPrice,
  numberWithCommas
} from 'app/NativeActions';

class Body extends Component{


  render(){
    if(this.props.stats.billing && this.props.editCreditPurchase){
      return (
        <Scroll>
          <CardBody>
            <Copy>
              Select the amount to add to your account. (Minimum or $50.00)
            </Copy>
          </CardBody>
          <Form onSubmit={()=>this.props.purchaseCredits()}>
            <Inputs {...this.props} />
            <Buttons {...this.props} />
          </Form>
          <CardBody>
            <Copy>
              By pressing "Complete Purchase" your card will be charged <Bold>{renderPrice(100*this.props.editCreditPurchase.credit_amount)}</Bold> and <Bold>{renderPrice(100*this.props.editCreditPurchase.credit_amount)}</Bold> will be added to your account.
            </Copy>
          </CardBody>
        </Scroll>
      );
    }

    return <Wrapper />

  }

}

export default Body;
