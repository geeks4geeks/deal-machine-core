import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets'
import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

import AddressFields from './AddressFields';

class EditOwnerFields extends Component{

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

        <Card>
          <ToggleSwitch
            value={parseInt(this.props.fields.send_to_address) === 1 ? true : false}
            onChange={value => {
              this.props.updateField({ prop: "send_to_address", value: value === true ? 1 : 0 })
            }}
            title={"Send mail to this address?"}
            text={'This will send a mailer to this address everytime you "send mail" for this lead.'}
          />
        </Card>
      </Wrapper>
    );
  }

}

export default EditOwnerFields;
