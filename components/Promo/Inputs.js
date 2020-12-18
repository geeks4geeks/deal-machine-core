import React, { Component } from 'react';
import { Scroll, Card, CardBody, Copy, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

class Inputs extends Component{


  render(){

    return (
      <Scroll>
        <CardBody>
          <Copy>
            Enter a promo code to get free sends and other exclusive offers from DealMachine.
          </Copy>
        </CardBody>
        <Card>
          <Input
            ref="promo"
            name="promo"
            returnKeyType={"done"}
            blurOnSubmit={false}
            autoCapitalize="characters"
            keyboardType="default"
            placeholder="Promo Code"
            onChange={value => this.props.promoFieldChange(value)}
            onSubmitEditing={()=>this.props.enterPromo()}
            value={this.props.promoText}
            className="uppercase"
            type="text"
          />
        </Card>
      </Scroll>
    );
  }

}

export default Inputs;
