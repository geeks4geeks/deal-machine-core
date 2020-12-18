import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

import AddressFields from './AddressFields';

class AddOwnerFields extends Component{

  render(){
    //get state name Array


    return (
      <Wrapper>

        <Card>
          <Input
            ref="owner_name"
            name="owner_name"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Owner Name"
            onChange={value => this.props.updateField({ prop: "owner_name", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "address")}
            value={this.props.fields.owner_name}
            type="text"
          />
        </Card>
        <AddressFields {...this.props} />
      </Wrapper>
    );
  }

}

export default AddOwnerFields;
