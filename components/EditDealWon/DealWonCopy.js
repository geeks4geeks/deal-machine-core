import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  Animation,
  Icon,
  Copy,
  Bold,
  CardBody,
  Title
} from 'app/NativeComponents/common';

import {
  TextButton
} from 'app/NativeComponents/snippets';

class DealWonCopy extends Component{

  renderBackButton(){
    return(
      <TextButton
        onPress={()=>this.props.appRedirect({redirect: "goBack", payload: {remove: "purchase-details"}})}
        text={"Nah, I don't track ROI"}
      />
    )
  }

  render(){
    if(this.props.active_property.deal.closed == 1 && this.props.active_property.deal.purchase_profit == null){
      return(
        <CardBody style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 0
          }}>
            <Animation type="zoomIn">
              <Icon
                color={this.props.colors.success_color}
                icon="notifications-active"
                size={44}
              />
            </Animation>
            <Wrapper style={{marginTop: 10, marginBottom: 10}}>
              <Title style={{textAlign: "center"}}>Ring that bell!</Title>
            </Wrapper>
            <Wrapper>
              <Copy style={{textAlign: "center"}}>
                <Bold>You just closed this Deal! </Bold>Fill out the info below to see your ROI using DealMachine.
              </Copy>
            </Wrapper>
            {this.renderBackButton()}

        </CardBody>
      );
    }
    return(
      <Wrapper />
    );
  }
}

export default DealWonCopy;
