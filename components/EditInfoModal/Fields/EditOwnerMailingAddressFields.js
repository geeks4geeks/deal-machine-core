import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets'

import AddressFields from './AddressFields';

class EditOwnerMailingAddressFields extends Component{

  render(){
    //get state name Array


    return (
      <Wrapper>

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

export default EditOwnerMailingAddressFields;
