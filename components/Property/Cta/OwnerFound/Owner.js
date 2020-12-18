import React, { Component } from 'react';
import {
  Wrapper,
  Title,
  Copy
} from 'app/NativeComponents/common';

import {
  /* common functions */
  ownerNameFormat,
  formatAddress
} from 'app/NativeActions';

class Owner extends Component{

  render(){

    return (
      <Wrapper>
        <Title style={{textAlign: "center"}}>{ownerNameFormat(this.props.owner.owner_name, this.props.active_property)}</Title>
        <Copy style={{textAlign: "center"}}>
          {formatAddress({address: {
            address: this.props.owner.owner_address,
            address2: this.props.owner.owner_address2,
            address_city: this.props.owner.owner_address_city,
            address_state: this.props.owner.owner_address_state,
            address_zip: this.props.owner.owner_address_zip,
          }}).line1}
        </Copy>
        <Copy style={{textAlign: "center"}}>
          {formatAddress({address: {
            address: this.props.owner.owner_address,
            address2: this.props.owner.owner_address2,
            address_city: this.props.owner.owner_address_city,
            address_state: this.props.owner.owner_address_state,
            address_zip: this.props.owner.owner_address_zip,
          }}).line2}
        </Copy>
      </Wrapper>
    );
  }

}

export default Owner;
