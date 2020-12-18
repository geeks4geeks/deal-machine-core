import React, { Component } from 'react';
import { Scroll, CardBody, Title, Copy } from 'app/NativeComponents/common';

import BillingCard from './BillingCard';
import BillingAddress from './BillingAddress';
class Body extends Component{


  render(){

    if(this.props.onboarding && this.props.card_info.bad_card != 1){
      return (
        <Scroll>
          <CardBody>
            <Copy>
              Complete the following to add a card to your DealMachine account.
            </Copy>
          </CardBody>

          <BillingCard {...this.props} buttonText="Add Card"/>
        </Scroll>
      )
    }
    return (
      <Scroll>
        <CardBody>
          <Title>
            Update your card on file:
          </Title>
          <Copy>
            Complete the following to update the card associated with your DealMachine account.
          </Copy>
        </CardBody>
        <BillingCard {...this.props}/>
      </Scroll>
    )

  }

}

export default Body;
