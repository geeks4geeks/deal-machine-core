import React, { Component } from 'react';
import { Wrapper, Card, Input, CardBody, SecondaryButton, Copy } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

import {
  callPhoneNumber,
  textPhoneNumber
} from 'app/NativeActions';

class EditPhoneNumberFields extends Component{

  renderBadNumberSwitch(){
    if(parseInt(this.props.fields.manual_number) !== 1 && this.props.edit_modal.type !== "add_owner_phone_number"){
      return(
        <Card>
          <ToggleSwitch
            onChange={value => {
              this.props.updateField({ prop: "bad_phone", value: value === true ? 1 : 0 })
            }}
            value={parseInt(this.props.fields.bad_phone) === 1 ? true : false}
            title={"Mark As Bad?"}
            text={"Mark this phone number as a bad number."}
          />
        </Card>
      )
    }
  }

  renderMobileButtons(){
    if(this.props.device !== "desktop" && this.props.isMobile && this.props.edit_modal.type !== "add_owner_phone_number"){
      return(
        <Wrapper>
          <CardBody>
            <Copy>More Options:</Copy>
          </CardBody>
          <Card>
            <SecondaryButton onPress={()=>{
              callPhoneNumber(this.props.fields.phone_number);
            }}>
              Call {this.props.fields.phone_number}
            </SecondaryButton>
          </Card>

          <Card>
            <SecondaryButton onPress={()=>{
              textPhoneNumber(this.props.fields.phone_number);
            }}>
              Text {this.props.fields.phone_number}
            </SecondaryButton>
          </Card>
        </Wrapper>
      )
    }
  }

  render(){
    //get state name Array

    return (
      <Wrapper>

        <Card>
          <Input
            editable={parseInt(this.props.fields.manual_number) === 1 || this.props.edit_modal.type === "add_owner_phone_number" ? true : false}

            ref={"phone_number"}
            name={"phone_number"}
            placeholder={"Phone Number"}
            onChange={(value)=>{
              this.props.updateField({prop: "phone_number", value})
            }}
            value={this.props.fields.phone_number}
            type="text"
            keyboardType="numeric"
            mask_type={'cel-phone'}
            mask={"(999) 999-9999"}
            onSubmitEditing={()=>focusNextField(this.refs, "phone_label")}

          />
          <Input
            editable={true}
            ref="phone_label"
            name="phone_label"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Description"
            onChange={value => this.props.updateField({ prop: "phone_label", value })}
            onSubmitEditing={()=>this.props.saveInfo()}
            value={this.props.fields.phone_label}
            type="text"
          />

        </Card>

        {this.renderBadNumberSwitch()}
        {this.renderMobileButtons()}
      </Wrapper>
    );
  }

}

export default EditPhoneNumberFields;
