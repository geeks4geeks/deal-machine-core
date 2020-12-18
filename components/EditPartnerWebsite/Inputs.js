import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

class Inputs extends Component{


  render(){

    return (
      <Wrapper>
        <Card>
          <Input
            ref="website"
            name="website"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="email-address"
            placeholder="Partner Website"
            onChange={value => this.props.updatePartnerFieldChange({ prop: "website", value })}
            value={this.props.editPartner.website}
            type="text"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default Inputs;
