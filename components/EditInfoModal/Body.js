import React from 'react';

import {
  Wrapper,
  Copy
} from 'app/NativeComponents/common';

import AddOwnerFields from './Fields/AddOwnerFields';
import EditOwnerFields from './Fields/EditOwnerFields';
import EditPropertyAddress from './Fields/EditPropertyAddress';
import AddOwnerMailingAddressFields from './Fields/AddOwnerMailingAddressFields';
import EditOwnerMailingAddressFields from './Fields/EditOwnerMailingAddressFields';
import EditPhoneNumberFields from './Fields/EditPhoneNumberFields';
import EditEmailAddressFields from './Fields/EditEmailAddressFields';

import EditMailingOptions from './Fields/EditMailingOptions';

import SaveButton from './SaveButton';
import RemoveButton from './RemoveButton';

const renderFields = (props) => {
  switch(props.edit_modal.type){

    case "add_owner":
      return <AddOwnerFields {...props}/>

    case "edit_owner":
      return <EditOwnerFields {...props}/>

    case "edit_property_address":
      return <EditPropertyAddress {...props}/>

    case "add_owner_mailing_address":
      return <AddOwnerMailingAddressFields {...props}/>

    case "edit_owner_mailing_address":
      return <EditOwnerMailingAddressFields {...props}/>

    case "add_owner_phone_number":
    case "edit_owner_phone_number":
      return <EditPhoneNumberFields {...props}/>

    case "add_owner_email_address":
    case "edit_owner_email_address":
      return <EditEmailAddressFields {...props}/>

    case "edit_mailing_options":
      return <EditMailingOptions {...props}/>


    default:
    break;
  }
  return <Wrapper />
}

const Body = (props) => {


  return (
    <Wrapper>
      <Wrapper style={{
        padding: props.edit_modal.popoverTarget && props.device === "desktop" ? 10 : 20
      }}>
        <Copy>{props.edit_modal.description}</Copy>
      </Wrapper>
      {renderFields(props)}
      <SaveButton {...props} />
      <RemoveButton {...props} />

    </Wrapper>
  )

}



export default Body;
