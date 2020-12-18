import React, { Component } from 'react';

import {
  Wrapper,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import {
  determineDisplayProperty
} from 'app/NativeActions';

class PropertyAddress extends Component {



  render(){

    const display_property = determineDisplayProperty(this.props.active_property);

    return (
      <Wrapper>
        <Copy style={{color: this.props.color ? this.props.color : this.props.colors.text_color}}><Bold>{display_property.property_address+" "+display_property.property_address2}</Bold></Copy>
        <Copy style={{color: this.props.color ? this.props.color : this.props.colors.text_color}}>{display_property.property_address_city+", "+display_property.property_address_state+" "+display_property.property_address_zip}</Copy>
      </Wrapper>
    )
  }

}

export default PropertyAddress;
