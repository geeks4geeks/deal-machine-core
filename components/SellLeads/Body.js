import React, { Component } from "react";
import {
  Scroll,
  Wrapper,
  Card,
  CardBody,
  Copy,
  Bold,
  Button,
  Title
} from "app/NativeComponents/common";
import LeadInfo from "./LeadInfo";
import {
  /* common functions */
  getStateName
} from "app/NativeActions";

class Body extends Component {
  render() {
    return (
      <Scroll>
        <CardBody>
          <Title>
            We have a DealMachine Enterprise member in
            <Bold> {getStateName(this.props.user.address_state)}</Bold> that
            normally pays their own drivers to get leads. They sometimes buy
            leads outright as well. If they're interested, would you like to
            sell the leads from your DealMachine account in exchange for a
            1-time payment?
          </Title>
        </CardBody>
        <LeadInfo {...this.props}/>
      </Scroll>
    );
  }
}

export default Body;
